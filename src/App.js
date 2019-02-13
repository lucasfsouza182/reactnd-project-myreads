import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: false
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
		BooksAPI.getAll().then(books => this.setState({
      books,
      loading: false
    }))
  }
  
  alterShelf = (book,shelf) => {
    this.setState({
      loading: true
    })
    BooksAPI.update(book,shelf).then(() => {
      let myBooks = this.state.books;
      myBooks.map(myBook => (
        myBook.id === book.id ? myBook.shelf = shelf : myBooks
      ))
      console.log(book)
      console.log(myBooks)
      this.setState({
        books: myBooks,
        loading: false
      })})
  }

  render() {
    const { books,loading } = this.state;
    return (
      <div className="app">
			<Route path='/search' render={({ history }) => (
				<SearchBook books = {books} alterShelf={this.alterShelf} />
			)} />

			<Route exact path='/' render={() => (
        	<ListBooks books = {books} alterShelf={this.alterShelf} loading={loading}/>
        )}
			/>
      </div>
    )
  }
}

export default BooksApp
