import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import BookItem from './BookItem';
import CircularIndeterminate from "./CircularIndeterminate"


class SearchBook extends React.Component {
	static propTypes = {
    books: PropTypes.array.isRequired,
    alterShelf: PropTypes.func.isRequired
	}

  state = {
	 myBooks:[],
    books: [],
	 query: '',
	 loading: false
  }

  componentDidMount() {
    if (this.props.books.length !== 0) {
		this.setState({
			myBooks: this.props.books
      })
    } 
  }

  updateQuery = (query) => {
	if(query.length > 0) {
		this.setState(() => ({
			query: query,
			loading: true
		 }))
	
		 BooksAPI.search(query).then(
			response => {
				const filteredBooks = this.filterBooksByTitle(query, this.state.myBooks);
			   let result = []
				if (response.error === undefined) {
					const filteredResponse = this.filterBooksByTitle(query, response);
					result = this.removeRepeatedBooks(filteredResponse,filteredBooks)
				} else {
					result = filteredBooks
				}
				this.setState({
					books: result,
					loading: false
				})
        }
      )
    } else {
      this.setState(() => ({
        books: [],
        query: query
      }))
    }
  }

  filterBooksByTitle = (query, books) => {
		query  = query.toLowerCase()
		const filteredBooks = books.filter(book => (
			book.title.toLowerCase().includes(query) 
		))
		console.log("myBooks")
    	console.log(filteredBooks)
    return filteredBooks
  }

	removeRepeatedBooks = (response,filteredBooks) =>{
		filteredBooks.map(book => (
		response.map((bookResponse, index) => {
			if (book.id === bookResponse.id) {
				response.splice(index, 1)
			}
		})
		))
		return filteredBooks.concat(response)
	}

    render() {
		const { books, query , loading} = this.state;
		const { alterShelf } = this.props;
      return(
        <div className="search-books">
              <div className="search-books-bar">
              <Link className='close-search' to='/'>
                  Close
              </Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input
                    className='search-contacts'
                    type='text'
                    placeholder='Search by title'
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
              </div>
              <div className="search-books-results">
				   {loading && <CircularIndeterminate /> }
               <ol className="books-grid">
                	{books.length >= 1 && books.map(book => (
              			<BookItem book={book} key={book.id} alterShelf={alterShelf}/>
            		))}
               </ol>
              </div>
            </div>

      )
    }
}


export default SearchBook