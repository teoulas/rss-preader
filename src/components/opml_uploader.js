import { h, Component } from 'preact';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';

export default class OPMLUploader extends Component {
  browseFiles = (ev) => {
    this.fileInput.click();
  }

  parseOPML = (ev) => {
    let input = ev.target;
    let reader = new FileReader();
    reader.onload = () => {
      let fileText = reader.result;
      let xmlDoc = (new DOMParser()).parseFromString(fileText, "application/xml");
      let newSources = Array.from(xmlDoc.querySelectorAll('outline[type="rss"]')).map((node) => {
        return {
          name: node.getAttribute('title'),
          url: node.getAttribute('xmlUrl')
        };
      });
      this.props.appendSources(newSources);
    }
    reader.readAsText(input.files[0]);
  }

  render(props, state) {
    return (
      <div>
        <Button ripple raised onClick={this.browseFiles}>
          Import sources from OPML &hellip;
        </Button>
        <input type="file" accept=".xml,.opml" onChange={this.parseOPML}
          ref={(el) => this.fileInput = el} />
      </div>
    );
  }
}
