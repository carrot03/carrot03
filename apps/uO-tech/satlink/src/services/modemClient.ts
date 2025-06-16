import mqtt, { MqttClient, IClientOptions, IClientSubscribeOptions } from 'mqtt';
import { v4 as uuidv4 } from 'uuid';

export type ModemCommandAction = 'GET' | 'PUT' | 'POST' | 'DELETE';

export interface ModemCommand {
  action: ModemCommandAction;
  path: string;
  params?: Record<string, any>;
  request_id: string;
  timestamp: string;
}

export interface ModemResponse {
  request_id: string;
  status: number;
  data?: any;
  timestamp: string;
}

export interface ModemError {
  request_id?: string;
  code: number;
  message: string;
  details?: any;
  timestamp: string;
}

type PendingRequest = {
  resolve: (value: ModemResponse) => void;
  reject: (reason?: any) => void;
  timeout: NodeJS.Timeout;
  responseTopic: string;
};

const DEFAULT_CONFIG = {
  BROKER_URL: 'ws://localhost:1884/mqtt',
  COMMAND_TOPIC_PREFIX: 'modem/commands',
  RESPONSE_TOPIC_PREFIX: 'modem/responses',
  ERROR_TOPIC: 'modem/errors',
  DEFAULT_TIMEOUT: 5000,
  QOS: 0 as 0 | 1 | 2,
};

export class ModemClient {
  private client: MqttClient;
  private pendingRequests: Map<string, PendingRequest>;
  private connected: boolean = false;
  private config: typeof DEFAULT_CONFIG;
  private connectionPromise: Promise<void>;

  constructor(config: Partial<typeof DEFAULT_CONFIG> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.pendingRequests = new Map();
    
    this.client = mqtt.connect(this.config.BROKER_URL, {
      protocolVersion: 5,
      transport: 'websockets',
      wsOptions: {
        path: '/mqtt',
        headers: {
          'Origin': 'http://localhost',
          'Sec-WebSocket-Protocol': 'mqtt'
        }
      },
      reconnectPeriod: 1000,
      connectTimeout: 4000,
      clientId: `modem-client-${uuidv4().substring(0, 8)}`
    });

    this.connectionPromise = new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        this.connected = true;
        console.log('[ModemClient] Connected to MQTT broker');
        resolve();
      });
      
      this.client.on('error', (err) => {
        reject(err);
      });
    });

    this.setupEventListeners();
  }

  public async sendCommand(
    action: ModemCommandAction,
    path: string,
    params: Record<string, any> = {},
    timeout: number = this.config.DEFAULT_TIMEOUT
  ): Promise<ModemResponse> {
    await this.connectionPromise;

    if (!this.connected) {
      throw new Error('MQTT client not connected');
    }

    const requestId = uuidv4();
    const commandTopic = this.config.COMMAND_TOPIC_PREFIX;
    const responseTopic = `${this.config.RESPONSE_TOPIC_PREFIX}/${requestId}`;

    const command: ModemCommand = {
      action,
      path,
      params,
      request_id: requestId,
      // timestamp: new Date().toISOString(),
    };

    await this.subscribeToTopic(responseTopic);

    return new Promise<ModemResponse>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        this.cleanupRequest(requestId);
        reject(new Error(`Request ${requestId} timed out after ${timeout}ms`));
      }, timeout);

      this.pendingRequests.set(requestId, {
        resolve,
        reject,
        timeout: timeoutId,
        responseTopic,
      });
      console.log('[ModemClient] Sending command:', { command, requestId });
      this.client.publish(
        commandTopic,
        JSON.stringify(command),
        { qos: this.config.QOS },
        (err) => {
          if (err) {
            this.cleanupRequest(requestId);
            reject(new Error(`Failed to publish command: ${err.message}`));
          }
        }
      );
    });
  }

  public async disconnect(): Promise<void> {
    return new Promise((resolve) => {
      this.client.end(false, () => {
        this.connected = false;
        this.pendingRequests.clear();
        resolve();
      });
    });
  }

  private setupEventListeners(): void {
    this.client.on('message', (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        console.debug('[ModemClient] Received message:', { topic, payload });

        if (topic.startsWith(this.config.RESPONSE_TOPIC_PREFIX)) {
          this.handleResponse(topic, payload as ModemResponse);
        } else if (topic === this.config.ERROR_TOPIC) {
          this.handleError(payload as ModemError);
        }
      } catch (err) {
        console.error('[ModemClient] Failed to parse message:', err);
      }
    });

    this.client.on('error', (err) => {
      console.error('[ModemClient] MQTT error:', err);
    });

    this.client.on('close', () => {
      this.connected = false;
      console.log('[ModemClient] Disconnected from MQTT broker');
    });

    this.client.on('packetsend', (packet) => {
      console.debug('[ModemClient] Packet sent:', packet);
    });

    this.client.on('packetreceive', (packet) => {
      console.debug('[ModemClient] Packet received:', packet);
    });
  }

  private async subscribeToTopic(topic: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const options: IClientSubscribeOptions = { qos: this.config.QOS };
      this.client.subscribe(topic, options, (err) => {
        if (err) {
          reject(new Error(`Failed to subscribe to ${topic}: ${err.message}`));
        } else {
          console.debug(`[ModemClient] Subscribed to ${topic}`);
          resolve();
        }
      });
    });
  }

  private handleResponse(topic: string, response: ModemResponse): void {
    const requestId = topic.split('/')[2];
    const pendingRequest = this.pendingRequests.get(requestId);

    if (!pendingRequest) {
      console.warn(`[ModemClient] Received response for unknown request ID: ${requestId}`);
      return;
    }

    if (response.status >= 200 && response.status < 300) {
      pendingRequest.resolve(response);
    } else {
      pendingRequest.reject(response);
    }
    this.cleanupRequest(requestId);
  }

  private handleError(error: ModemError): void {
    console.error('[ModemClient] Modem error:', error);
    if (error.request_id) {
      const pendingRequest = this.pendingRequests.get(error.request_id);
      if (pendingRequest) {
        pendingRequest.reject(error);
        this.cleanupRequest(error.request_id);
      }
    }
  }

  private cleanupRequest(requestId: string): void {
    const pendingRequest = this.pendingRequests.get(requestId);
    if (!pendingRequest) return;

    clearTimeout(pendingRequest.timeout);
    this.client.unsubscribe(pendingRequest.responseTopic);
    this.pendingRequests.delete(requestId);
  }
}

export function createModemClient(config?: Partial<typeof DEFAULT_CONFIG>): ModemClient {
  return new ModemClient(config);
}