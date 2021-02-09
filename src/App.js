import React from "react";
import {
  Menu
} from "semantic-ui-react";
import BookContainer from "./BookContainer"


class App extends React.Component {

  state = {
    books: []
  }
  componentDidMount(){
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(books => this.setState({books}))
  }



  render(){
  return (
    <div>

      <Menu inverted>
        <Menu.Item header>Bookliker</Menu.Item>
      </Menu>
      <main>
        <div className="ui vertical menu">
          {/* {console.log} */}
          {this.state.books.map(book => <BookContainer key={book.id} book={book}/>)}
        </div>
      </main>
    </div>
  ) };
}

export default App;
