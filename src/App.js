import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import ListBooks from './ListBooks'
import Loading from "./Loading"

class BooksApp extends React.Component {
  state = {
    books: [],
	 loading: false,
	 teste:''
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
			let hasBook = true;

			for(let myBook in myBooks){
				myBook.id === book.id ? myBook.shelf = shelf : hasBook = false
			}
			this.setState({
				books: myBooks,
				loading: false
			})

			if(!hasBook){
				BooksAPI.getAll().then(books => this.setState({
					books,
					loading: false
				}))
			}
		})	
  }

  render() {
    const { books,loading } = this.state;
    return (
      <div className="app">
			{loading && <Loading /> }
			<Route path='/search' render={({ history }) => (
				<SearchBook books = {books} alterShelf={this.alterShelf} loading={loading}/>
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
