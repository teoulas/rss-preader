import { h, Component } from 'preact';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import OPMLUploader from '../../components/opml_uploader';

export default class FeedSources extends Component {
  render(props, state) {
    return (
      <div>
      <List two-line dense>
        <List.Item>
          <List.ItemGraphic>info</List.ItemGraphic>
          <List.TextContainer>
            <List.PrimaryText>Your list is empty</List.PrimaryText>
            <List.SecondaryText>Import your RSS feed sources from an OPML file to get started</List.SecondaryText>
          </List.TextContainer>
        </List.Item>
      </List>
      <List two-line dense>
      {(props.sources.map((item) =>
        <List.Item>
          <List.TextContainer>
            <List.PrimaryText>{item.name}</List.PrimaryText>
            <List.SecondaryText>{item.url}</List.SecondaryText>
          </List.TextContainer>
        </List.Item>
      ))}
      </List>
      <OPMLUploader appendSources={props.appendSources} />
      </div>
    );
  }
}
