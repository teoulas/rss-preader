import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import FeedSources from '../routes/feed_sources';
import CloudBackups from '../routes/cloud_backups';

// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
  constructor() {
    super();
    this.state.sources = JSON.parse(localStorage.getItem("feedSources") || "[]");
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

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render({}, { sources }) {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
          <Home path="/" sources={sources} />
          <FeedSources path="/feed_sources" sources={sources}
            appendSources={this.appendSources} clearSources={this.clearSources} />
          <CloudBackups path="/cloud_backups" />
				</Router>
			</div>
		);
	}
}
