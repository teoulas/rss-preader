import { h, Component } from 'preact';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';

export default class FeedSources extends Component {
  render(props, state) {
    return (
      <List two-line>
      {(props.sources.map((item) =>
        <List.Item>
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
