# CryptoDash

A live cryptocurrency dashboard built with Rust and Axum. Tracks prices, market data, and 7-day trends for 20 major coins.

**Live site:** https://crypto-api-htantawi.fly.dev

## Features

- Real-time prices and market data for 20 cryptocurrencies
- Sortable table with 1h, 24h, and 7-day change columns
- SVG sparklines showing 7-day price trends per coin
- Detail modal with Chart.js price chart, ATH, supply, and full market stats
- Global market stats bar (total market cap, BTC/ETH dominance, 24h volume)
- Search and filter by coin name or ticker
- Watchlist — star coins and filter to favourites (persisted in localStorage)
- Dark / light theme toggle (persisted in localStorage)
- Auto-refresh every 60 seconds

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Interactive dashboard |
| `GET` | `/api/coins` | All 20 coins — price, changes, market cap, sparkline |
| `GET` | `/api/coin/:symbol` | Single coin by ticker (e.g. `btc`, `eth`) |
| `GET` | `/api/global` | Global market stats |

## Supported Coins

BTC, ETH, BNB, SOL, XRP, DOGE, ADA, AVAX, TRX, LINK, DOT, LTC, SHIB, UNI, ATOM, XLM, BCH, NEAR, APT, FIL

## Tech Stack

- **Backend:** Rust (edition 2024), Axum 0.7, Tokio, reqwest
- **Frontend:** Vanilla HTML/CSS/JS embedded via `include_str!`, Chart.js 4.4.2
- **Data:** CoinGecko API v3 (free tier, no API key required)
- **Hosting:** Fly.io (Docker, IAD region, 256 MB RAM)

## Running Locally

```bash
cargo run
# Server starts at http://localhost:3000
```

## Deploying

```bash
fly deploy
```

## Architecture

See [`docs/architecture.html`](docs/architecture.html) for a full breakdown of the request flow, file structure, test plan, and known limitations.
