import { h, Component } from 'preact';
import List from 'preact-material-components/List';

export default class Home extends Component {
  componentDidMount() {
    // # find a workaround for CORS
    this.setState({
      articles: [
        {
          title: "Title of article",
          summary: "Short summary of the article",
          time: new Date(),
        }
      ]
    });
  }

	render({}, {articles = []}) {
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
