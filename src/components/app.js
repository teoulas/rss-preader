import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import FeedSources from '../routes/feed_sources';
import OPMLUploader from './opml_uploader';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
  constructor() {
    super();
    this.state.sources = [
      {name: "The Verge", url: "http://www.theverge.com/rss/full.xml"}
    ];
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
          <FeedSources path="/" sources={state.sources} />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
      <OPMLUploader />
			</div>
		);
	}
}
