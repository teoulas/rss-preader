import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import FeedSources from '../routes/feed_sources';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
  constructor() {
    super();
    this.state.sources = [];
  }

  appendSources = (newSources) => {
    this.setState({
      sources: this.state.sources.concat(newSources)
    });
  }

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render(props, state) {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
          <FeedSources path="/" sources={state.sources} appendSources={this.appendSources} />
				</Router>
			</div>
		);
	}
}
