import { h, Component } from 'preact';
import List from 'preact-material-components/List';

export default class Home extends Component {
  componentDidMount() {
    this.props.refreshArticles();
  }

	render({articles = []}, {}) {
		return (
      <List>
      {articles.map((article) =>
        <List.Item>
          <List.TextContainer>
            <List.PrimaryText>{article.title}</List.PrimaryText>
            <List.SecondaryText>{article.summary} / {article.time.toString()}</List.SecondaryText>
          </List.TextContainer>
        </List.Item>
      )}
      </List>
		);
	}
}
