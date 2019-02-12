import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
		BooksAPI.getAll().then(books => this.setState({
			books
    }))
  }
  
  alterShelf = (book,shelf) => {
    BooksAPI.update(book,shelf).then(() => {
      let myBooks = this.state.books;
      myBooks.map(myBook => (
        myBook.id === book.id ? myBook.shelf = shelf : myBooks
      ))
      console.log(book)
      console.log(myBooks)
      this.setState({
        books: myBooks
      })})
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
			<Route path='/search' render={({ history }) => (
				<SearchBook books = {books}/>
			)} />

			<Route exact path='/' render={() => (
        <ListBooks books = {books} alterShelf={this.alterShelf}/>
        )}
			/>
      </div>
    )
  }
}

export default BooksApp
