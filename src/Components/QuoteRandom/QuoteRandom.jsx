import React, { useState, useEffect } from 'react'
import './QuoteRandom.css'
import reload_icon from '../assets/icons8-reload-50.png'
import twitter_icon from '../assets/icons8-twitter-50.png'


const QuoteRandom = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    quote: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Gautam Buddha"
  });

  useEffect(() => {
    async function loadQuotes() {
      try {
        const response = await fetch("https://dummyjson.com/quotes");
        const data = await response.json();
        setQuotes(data.quotes); // store quotes in state
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    }
    loadQuotes();
  }, []);

  const random = () => {
    if (quotes.length > 0) {
      const select = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(select);
    }
  };
  const handleTwitterShare = () => {
    const tweet = `${quote.quote} — ${quote.author}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className='container'>
    
    <h1>Quote Generator</h1>
    <div className="underline"></div>
      <div className="quote">{quote.quote}</div>
      <div>
        <div className="line"></div>
        <div className="bottom">
          <div className="author">— {quote.author}</div>
          <div className="icons">
            <img src={reload_icon} onClick={random} alt="reload" />
            <img src={twitter_icon}  onClick={handleTwitterShare} alt="twitter"  />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteRandom;