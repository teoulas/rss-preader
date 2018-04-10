import { h, Component } from 'preact';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';

export default class OPMLUploader extends Component {
  browseFiles(ev) {
    ev.preventDefault();
  }
  render(props, state) {
    return (
      <div>
        <Button ripple raised onClick={this.browseFiles}>Import OPML</Button>
        <input type="file" accept=".xml,.opml" />
      </div>
    );
  }
}
