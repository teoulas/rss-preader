import { h, Component } from 'preact';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import OPMLUploader from '../../components/opml_uploader';
import Button from 'preact-material-components/Button';

export default class FeedSources extends Component {
  render(props, state) {
    return (
      <div>
        {props.sources.length == 0 ? this.emptyList() : this.populatedList(props.sources)}
        <OPMLUploader appendSources={props.appendSources} />
        <Button ripple onClick={props.clearSources}>
          Clear all feeds
        </Button>
      </div>
    );
  }

  emptyList() {
    return (
      <List two-line dense>
        <List.Item>
          <List.ItemGraphic>info</List.ItemGraphic>
          <List.TextContainer>
            <List.PrimaryText>Your list is empty</List.PrimaryText>
            <List.SecondaryText>Import your RSS feed sources from an OPML file to get started</List.SecondaryText>
          </List.TextContainer>
        </List.Item>
      </List>
    );
  }

  populatedList(items) {
    return (
      <List two-line dense>
      {(items.map((item) =>
        <List.Item>
          <List.ItemGraphic>rss_feed</List.ItemGraphic>
          <List.TextContainer>
            <List.PrimaryText>{item.name}</List.PrimaryText>
            <List.SecondaryText>{item.url}</List.SecondaryText>
          </List.TextContainer>
        </List.Item>
      ))}
      </List>
    );
  }
}
