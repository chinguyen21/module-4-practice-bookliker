import React, {Component} from 'react'
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";

class BookContainer extends Component {
  
  state = {
    likers: this.props.book.users,
    display: false,
    liked: this.props.book.users.map(user=>user.username).includes("pouros")
  }
  
  handleClick = () => {
    this.setState({display: !this.state.display})
  }

  handleLike =(likedBook) => {
      let updateBook = {
        users: this.state.liked ? this.state.likers.filter(liker => liker.username !== "pouros") : [...this.state.likers, {"id": 1,"username": "pouros"}]
      }

      let reqPackage = {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updateBook)
      }

      fetch(`http://localhost:3000/books/${likedBook.id}`, reqPackage)
      .then(res => res.json())
      .then(uBook => {
        this.setState({
          likers: uBook.users,
          liked: !this.state.liked
        })
      })
   
  }

  render(){
    console.log(this.state.likers)
    console.log(this.state.liked)
    return(
    <div>
        <Menu vertical inverted>
          <Menu.Item as={"a"} onClick={this.handleClick}>
           {this.props.book.title}
          </Menu.Item>
        </Menu>

        <Container text>
          <Header>{this.props.book.title}</Header>
          <Image
            src= {this.props.book.img_url}
            size="small"
          />
          {this.state.display ? 
            <div>
              <p>{this.props.book.description}</p>
              <Button onClick={() => this.handleLike(this.props.book)}
                color="red"
                content= {this.state.liked ? "Unlike" : "Like"}
                icon="heart"
                label={{
                  basic: true,
                  color: "red",
                  pointing: "left",
                  content: this.state.likers.length
                }}/>
              <Header>Liked by</Header>
              <List>
                {this.state.likers.map(user => <List.Item icon="user" content={user.username} />)}
              </List>
            </div>
          : null
          }
        </Container>
      </div>
  )  }
}

export default BookContainer;