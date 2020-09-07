import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

class App extends React.Component {
  state = {
    quotes: [
      {
        quote:
          "Life isn’t about getting and having, it’s about giving and being.",
        author: "Kevin Kruse"
      }
    ],
    index: 0
  };

  componentDidMount() {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        this.setState(
          {
            quotes: res.quotes
          },
          this.getRandomIndex
        );
      });
  }

  getRandomIndex() {
    const { quotes } = this.state;
    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      });
    }
  }

  render() {
    const { quotes, index } = this.state;

    const quote = quotes[index];

    const tweetURL = `https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`;

    const whatsAppURL = `https://wa.me/?text=_${quote.quote}_ - ${quote.author}`;

    return (
      <div className="d-flex justify-content-center vh-100 align-items-center" id="page">
        <p className="display-4 text-white" id="heading">Random Quote Generator App</p><br />
        <div className="box p-4" id="quote-box">
          {quote && (
            <div className="mb-4">
              <h5 className="pt-2" id="text">
                <i className="fa fa-quote-left mr-2"></i>
                {quote.quote}
              </h5>
              <cite className="d-block text-right" id="author">
                - {quote.author}
              </cite>
            </div>
          )}

          <div className="d-flex justify-content-between">
            <div id="button">
              <a
                className="btn btn-sm btn-white bg-dark text-white m-1"
                href={tweetURL}
                target="_blank"
                rel="noopener noreferrer"
                id="tweet-quote"
              >
                <i className="fab fa-twitter"></i> Tweet
              </a>
              <a
                className="btn btn-sm btn-white bg-dark text-white"
                href={whatsAppURL}
                data-action="share/whatsapp/share"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i> WhatsApp
              </a>
            </div>
            <button
              className="btn btn-sm btn-white text-dark"
              id="new-quote"
              onClick={this.getRandomIndex.bind(this)}
            >
              <i className="fas fa-random"></i> Refresh Quote
            </button>
          </div>
        </div>
        <div className="footer">
          <a className="p-2 text-dark" href="https://github.com/shadmankhan" target="_blank" rel="noopener noreferrer">Shadman Khan &copy; 2020</a>
        </div>
      </div>
    );
  }
}

export default App;
