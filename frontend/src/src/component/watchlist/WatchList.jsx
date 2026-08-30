import "./WatchList.css";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "react-toastify";

import API from "../../api/api";

import BuyModal from "../BuyModal/BuyModal";
import SellModal from "../SellModal/SellModal";

function WatchList({ onOrderSuccess }) {
  const [stocks, setStocks] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [selectedStock, setSelectedStock] =
    useState(null);

  const [selectedSellStock, setSelectedSellStock] =
    useState(null);

  // =================================
  // DEFAULT STOCKS
  // =================================

  const defaultStocks = [
    {
      name: "RELIANCE",
      price: 1450,
      day: "+1.25%",
    },
    {
      name: "TCS",
      price: 4200,
      day: "+0.85%",
    },
    {
      name: "INFY",
      price: 1750,
      day: "-0.45%",
    },
    {
      name: "HDFCBANK",
      price: 1950,
      day: "+0.65%",
    },
    {
      name: "ICICIBANK",
      price: 1350,
      day: "+0.72%",
    },
    {
      name: "SBIN",
      price: 850,
      day: "-0.30%",
    },
    {
      name: "WIPRO",
      price: 520,
      day: "+0.40%",
    },
    {
      name: "ITC",
      price: 470,
      day: "+0.55%",
    },
  ];

  // =================================
  // FORMAT STOCKS
  // =================================

  const formatStocks = (data) => {
    return data.map((stock) => ({
      id: stock.name.toLowerCase(),
      name: stock.name,
      price: Number(stock.price || 0),
      day: stock.day || "0%",
    }));
  };

  // =================================
  // SYNC ONE HOLDING PRICE
  // =================================

  const syncHoldingPrice = async (stock) => {
    try {
      await API.put("/holdings/price", {
        name: stock.name,
        price: Number(stock.price),
      });

      console.log(
        `LTP UPDATED: ${stock.name} = ₹${stock.price}`
      );

      return true;
    } catch (err) {
      console.log(
        `No holding found for ${stock.name}`
      );

      return false;
    }
  };

  // =================================
  // SYNC ALL HOLDINGS
  // =================================

  const syncAllHoldingPrices = async (stockList) => {
    try {
      await Promise.all(
        stockList.map((stock) =>
          syncHoldingPrice(stock)
        )
      );

      console.log(
        "All holding LTP prices synced"
      );
    } catch (err) {
      console.error(
        "SYNC ALL HOLDINGS ERROR:",
        err
      );
    }
  };

  // =================================
  // LOAD MARKET PRICES
  // =================================

  const fetchMarketPrices = async () => {
    try {
      setLoading(true);

      let stockList = [];

      try {
        const res =
          await API.get("/market-prices");

        const marketPrices =
          Array.isArray(res.data)
            ? res.data
            : [];

        if (marketPrices.length > 0) {
          stockList =
            formatStocks(marketPrices);
        }
      } catch (marketError) {
        console.log(
          "Market API unavailable, using default stocks"
        );
      }

      if (stockList.length === 0) {
        stockList =
          formatStocks(defaultStocks);
      }

      setStocks(stockList);

      await syncAllHoldingPrices(
        stockList
      );

    } catch (err) {
      console.error(
        "MARKET PRICE ERROR:",
        err
      );

      const fallback =
        formatStocks(defaultStocks);

      setStocks(fallback);

      toast.error(
        "Unable to load market prices"
      );

    } finally {
      setLoading(false);
    }
  };

  // =================================
  // INITIAL LOAD
  // =================================

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  // =================================
  // BUY
  // =================================

  const handleBuy = async (stock) => {
    await syncHoldingPrice(stock);

    setSelectedStock(stock);
  };

  // =================================
  // SELL
  // =================================

  const handleSell = async (stock) => {
    await syncHoldingPrice(stock);

    setSelectedSellStock(stock);
  };

  // =================================
  // ORDER SUCCESS
  // =================================

  const handleOrderSuccess = (data) => {
    console.log(
      "✅ ORDER SUCCESS:",
      data
    );

    // Close both modals
    setSelectedStock(null);
    setSelectedSellStock(null);

    // Tell Dashboard to refresh
    if (onOrderSuccess) {
      onOrderSuccess(data);
    }
  };

  // =================================
  // SEARCH
  // =================================

  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) =>
      stock.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
  }, [stocks, search]);

  // =================================
  // DAY CHANGE
  // =================================

  const getChangeClass = (day) => {
    if (!day) {
      return "neutral";
    }

    return day.startsWith("+")
      ? "profit"
      : "loss";
  };

  // =================================
  // UI
  // =================================

  return (
    <>
      <div className="watchlist">

        {/* HEADER */}

        <div className="watchlist-header">

          <div>
            <h2 className="watchlist-title">
              Watchlist
            </h2>

            <p className="watchlist-subtitle">
              Track your favourite stocks
            </p>
          </div>

          <button
            type="button"
            className="watchlist-refresh"
            onClick={fetchMarketPrices}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "↻ Refresh"}
          </button>

        </div>

        {/* SEARCH */}

        <div className="watchlist-search">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search stock..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* STOCK LIST */}

        <div className="watchlist-list">

          {loading ? (

            <div className="watchlist-empty">

              <div className="empty-icon">
                📊
              </div>

              <h4>
                Loading Stocks...
              </h4>

            </div>

          ) : filteredStocks.length === 0 ? (

            <div className="watchlist-empty">

              <div className="empty-icon">
                🔍
              </div>

              <h4>
                No Stocks Found
              </h4>

              <p>
                Try searching another stock.
              </p>

            </div>

          ) : (

            filteredStocks.map((stock) => (

              <div
                className="watchlist-stock"
                key={stock.id}
              >

                {/* STOCK INFO */}

                <div className="stock-info">

                  <h4>
                    {stock.name}
                  </h4>

                  <span>
                    Market Stock
                  </span>

                </div>

                {/* PRICE */}

                <div className="stock-price">

                  <strong>
                    ₹
                    {Number(
                      stock.price
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                  <span
                    className={getChangeClass(
                      stock.day
                    )}
                  >
                    {stock.day}
                  </span>

                </div>

                {/* ACTIONS */}

                <div className="stock-actions">

                  <button
                    type="button"
                    className="buy-btn"
                    onClick={() =>
                      handleBuy(stock)
                    }
                  >
                    Buy
                  </button>

                  <button
                    type="button"
                    className="sell-btn"
                    onClick={() =>
                      handleSell(stock)
                    }
                  >
                    Sell
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* BUY MODAL */}

      <BuyModal
        stock={selectedStock}
        onClose={() =>
          setSelectedStock(null)
        }
        onOrderSuccess={
          handleOrderSuccess
        }
      />

      {/* SELL MODAL */}

      <SellModal
        stock={selectedSellStock}
        onClose={() =>
          setSelectedSellStock(null)
        }
        onOrderSuccess={
          handleOrderSuccess
        }
      />

    </>
  );
}

export default WatchList;