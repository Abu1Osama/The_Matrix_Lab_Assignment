import React, { useState } from "react";
import axios from "axios";
import "../Styles/PairToken.scss";
import serchico from "../assest/search.png";
import fetchico from "../assest/ic_outline-info.png";
import dollarico from "../assest/pepicons-pop_dollar.png";
import tokenico from "../assest/ic_baseline-token.png";

function PairAddress() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState("Search for pair address");
  const sortedData = data.sort((a, b) => b.priceUsd - a.priceUsd);
  // console.log(sortedData);
  const fetchdata = () => {
    axios
      .get(`https://api.dexscreener.com/latest/dex/search/?q=${searchQuery}`)
      .then((res) => {
        // console.log(res.data.pairs);
        const fetchedData = res.data.pairs;
        setData(fetchedData);
        setShowData(fetchedData.length > 0);
        if (fetchedData.length === 0) {
          setNoDataMessage("No data found. Please try a different search.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSearchClick = () => {
    fetchdata();
  };

  return (
    <div className="pairaddress" id="pairaddress">
      <div className="pair-top">
        <div className="inp">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img
            className="searchico"
            src={serchico}
            alt=""
            onClick={handleSearchClick}
          />
        </div>
        <div className="connect">
          <button>Connect</button>
        </div>
      </div>

      <div className="container">
        {showData && <h1 className="serch-top">Pair Search Results</h1>}
        {showData ? (
          sortedData.map((item, index) => (
            <div className="data-wrapper">
              <div className="fetchdata" key={index}>
                <div className="name">
                  <h2>Basic Info</h2>
                </div>
                <div className="pair">
                  <span>Pair created at</span>
                  <span>{item.pairCreatedAt}</span>
                </div>
                <div className="symbol">
                  <span>Symbol</span>
                  <span>{item.baseToken.symbol}</span>
                </div>
                <div className="dexID">
                  <span>Dex ID</span>
                  <span>{item.dexId}</span>
                </div>
                <div className="address">
                  <span>Pair Address</span>
                  <span>{item.pairAddress}</span>
                </div>
                <div className="fetchico">
                  <img src={fetchico} alt="" />
                </div>
              </div>
              <div className="fetchdata  basetoken">
                <div className="name">
                  <h2>Base token</h2>
                </div>
                <div className="pair">
                  <span>Name</span>
                  <span>{item.baseToken.name}</span>
                </div>
                <div className="symbol">
                  <span>Symbol</span>
                  <span>{item.baseToken.symbol}</span>
                </div>

                <div className="address">
                  <span>Address</span>
                  <span>{item.baseToken.address}</span>
                </div>
                <div className="fetchico">
                  <img src={tokenico} alt="" />
                </div>
              </div>
              <div className="fetchdata QuoteToken">
                <div className="name">
                  <h2>Quote Token</h2>
                </div>
                <div className="pair">
                  <span>Name</span>
                  <span>{item.quoteToken.name}</span>
                </div>
                <div className="symbol">
                  <span>Symbol</span>
                  <span>{item.quoteToken.symbol}</span>
                </div>

                <div className="address">
                  <span>Address</span>
                  <span>{item.quoteToken.address}</span>
                </div>
                <div className="fetchico">
                  <img src={tokenico} alt="" />
                </div>
              </div>
              <div className="fetchdata price">
                <div className="name">
                  <h2>Price</h2>
                </div>
                <div className="pair">
                  <span>Price Native</span>
                  <span>{item.priceNative}</span>
                </div>
                <div className="symbol">
                  <span>Price USD</span>
                  <span>{item.priceUsd}</span>
                </div>

                <div className="fetchico">
                  <img src={dollarico} alt="" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data-message">
            {noDataMessage} <br />
            <p>E.g.: 0xabC9f3c5F164D751f3A21,0x4163A7E5D1d5513</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PairAddress;
