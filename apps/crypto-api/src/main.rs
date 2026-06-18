use reqwest::header;
use axum::{
    extract::Path,
    http::StatusCode,
    response::Html,
    routing::get,
    Json, Router,
};
use serde_json::Value;
use std::net::SocketAddr;

const COINS: &[(&str, &str, &str)] = &[
    ("btc",  "bitcoin",          "Bitcoin"),
    ("eth",  "ethereum",         "Ethereum"),
    ("bnb",  "binancecoin",      "BNB"),
    ("sol",  "solana",           "Solana"),
    ("xrp",  "ripple",           "XRP"),
    ("doge", "dogecoin",         "Dogecoin"),
    ("ada",  "cardano",          "Cardano"),
    ("avax", "avalanche-2",      "Avalanche"),
    ("trx",  "tron",             "TRON"),
    ("link", "chainlink",        "Chainlink"),
    ("dot",  "polkadot",         "Polkadot"),
    ("ltc",  "litecoin",         "Litecoin"),
    ("shib", "shiba-inu",        "Shiba Inu"),
    ("uni",  "uniswap",          "Uniswap"),
    ("atom", "cosmos",           "Cosmos"),
    ("xlm",  "stellar",          "Stellar"),
    ("bch",  "bitcoin-cash",     "Bitcoin Cash"),
    ("near", "near",             "NEAR Protocol"),
    ("apt",  "aptos",            "Aptos"),
    ("fil",  "filecoin",         "Filecoin"),
];

fn symbol_to_coin(symbol: &str) -> Option<(&'static str, &'static str, &'static str)> {
    let lower = symbol.to_lowercase();
    COINS.iter()
        .find(|(sym, _, _)| *sym == lower.as_str())
        .copied()
}

async fn fetch_json(url: &str) -> Result<Value, (StatusCode, String)> {
    reqwest::Client::new()
        .get(url)
        .header(header::USER_AGENT, "rust-crypto-app/1.0 (learning project)")
        .send()
        .await
        .map_err(|e| (StatusCode::BAD_GATEWAY, e.to_string()))?
        .json::<Value>()
        .await
        .map_err(|e| (StatusCode::BAD_GATEWAY, e.to_string()))
}

async fn index() -> Html<&'static str> {
    Html(include_str!("index.html"))
}

async fn api_coins() -> Result<Json<Value>, (StatusCode, String)> {
    let ids = COINS.iter().map(|(_, id, _)| *id).collect::<Vec<_>>().join(",");
    let url = format!(
        "https://api.coingecko.com/api/v3/coins/markets\
         ?vs_currency=usd&ids={ids}\
         &order=market_cap_desc&sparkline=true\
         &price_change_percentage=1h,7d"
    );
    Ok(Json(fetch_json(&url).await?))
}

async fn api_coin(Path(symbol): Path<String>) -> Result<Json<Value>, (StatusCode, String)> {
    let (_, id, _) = symbol_to_coin(&symbol)
        .ok_or_else(|| (StatusCode::BAD_REQUEST, "Unsupported coin".to_string()))?;
    let url = format!(
        "https://api.coingecko.com/api/v3/coins/markets\
         ?vs_currency=usd&ids={id}\
         &sparkline=true&price_change_percentage=1h,7d"
    );
    let arr = fetch_json(&url).await?;
    let coin = arr.get(0)
        .ok_or_else(|| (StatusCode::BAD_GATEWAY, "No coin data returned".to_string()))?
        .clone();
    Ok(Json(coin))
}

async fn api_global() -> Result<Json<Value>, (StatusCode, String)> {
    Ok(Json(fetch_json("https://api.coingecko.com/api/v3/global").await?))
}

#[tokio::main]
async fn main() {
    let port: u16 = std::env::var("PORT")
        .ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(3000);
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    println!("Server running on http://{}", addr);

    let app = Router::new()
        .route("/", get(index))
        .route("/api/coins", get(api_coins))
        .route("/api/coin/:symbol", get(api_coin))
        .route("/api/global", get(api_global));

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn btc_maps_to_bitcoin() {
        let (_, id, _) = symbol_to_coin("btc").unwrap();
        assert_eq!(id, "bitcoin");
    }

    #[test]
    fn eth_maps_to_ethereum() {
        let (_, id, _) = symbol_to_coin("eth").unwrap();
        assert_eq!(id, "ethereum");
    }

    #[test]
    fn all_coins_are_reachable() {
        for (sym, _, _) in COINS {
            assert!(symbol_to_coin(sym).is_some(), "{sym} not found");
        }
    }

    #[test]
    fn symbol_lookup_is_case_insensitive() {
        let (_, id, _) = symbol_to_coin("BTC").unwrap();
        assert_eq!(id, "bitcoin");
        let (_, id, _) = symbol_to_coin("ETH").unwrap();
        assert_eq!(id, "ethereum");
    }

    #[test]
    fn unknown_symbol_returns_none() {
        assert!(symbol_to_coin("foo").is_none());
        assert!(symbol_to_coin("").is_none());
        assert!(symbol_to_coin("xyz").is_none());
    }
}
