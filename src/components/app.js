import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import FeedSources from '../routes/feed_sources';
import CloudBackups from '../routes/cloud_backups';
import Snackbar from 'preact-material-components/Snackbar';
import 'preact-material-components/Snackbar/style.css';
import fetchJsonp from 'fetch-jsonp';
import parseDate from 'date-fns/parse';

// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
  constructor() {
    super();
    this.state.sources = JSON.parse(localStorage.getItem("feedSources") || "[]");
    this.state.articles = JSON.parse(localStorage.getItem("cachedArticles") || "[]");
  }

  appendSources = (newSources) => {
    let mergedSources = this.state.sources.concat(newSources);
    try {
      localStorage.setItem("feedSources", JSON.stringify(mergedSources));
    } catch (e) {
      alert("Saving to localStorage failed!");
    }
    this.setState({sources: mergedSources});
  }

  clearSources = () => {
    try {
      localStorage.setItem("feedSources", "[]");
    } catch (e) {
      alert("Clearing localStorage failed!");
    }
    this.setState({sources: []});
  }

  removeSource = (source) => {
    let newSources = this.state.sources.filter((s) =>
      s !== source
    );
    try {
    localStorage.setItem("feedSources", JSON.stringify(newSources));
    } catch (e) {
      alert("Updating localStorage failed!");
    }
    this.setState({sources: newSources});
  }

  refreshArticles = () => {
    let feeds = this.state.sources.map((feed) => feed.url);
    let yql = `SELECT * FROM feednormalizer
      WHERE url IN ('${feeds.join("','")}') AND output = 'atom_1.0'
      | sort(field='updated', descending='true')`.replace(/\s+/g, ' ');
    let url = 'https://query.yahooapis.com/v1/public/yql?q=' +
      encodeURIComponent(yql) + '&format=json';
    fetchJsonp(url, {timeout: 10000}).then((response) =>
      response.json()
    ).then((json) => {
      let articles = json.query.results.feed.reduce((articles, currentFeed) => {
        return articles.concat(currentFeed.entry.map(entry => {
          console.log(entry);
          let summary = entry.summary ? entry.summary.content : entry.content;
          let el = document.createElement('div');
          el.innerHTML = summary;
          let plainSummary = el.innerText;
          return {
            title: entry.title,
            summary: plainSummary,
            time: parseDate(entry.published || entry.date),
            url: entry.link
          };
        }));
      }, []);
      this.setState({articles: articles});
    });
  }

  /** Gets fired when the route changes.
   *  @param {Object} event   "change" event from [preact-router](http://git.io/preact-router)
   *  @param {string} event.url The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render({}, { sources, articles }) {
    return (
      <div id="app">
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" articles={articles} refreshArticles={this.refreshArticles} />
          <FeedSources path="/feed_sources" sources={sources}
            appendSources={this.appendSources} clearSources={this.clearSources}
            removeSource={this.removeSource} />
          <CloudBackups path="/cloud_backups" />
        </Router>
        <Snackbar ref={bar => { this.bar = bar; }} />
      </div>
    );
  }
}
