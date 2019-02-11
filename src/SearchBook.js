import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import BookItem from './BookItem';


class SearchBook extends React.Component {
	static propTypes = {
		books: PropTypes.array.isRequired
	}

  state = {
	 myBooks:[],
    books: [],
    query: ''
  }

  componentDidMount() {
    if (this.props.books.length !== 0) {
      this.setState({
      myBooks: this.props.books
      })
    } 
  }

  updateQuery = (query) => {
	if(query.length !== 0) {
		this.setState(() => ({
			query: query.trim()
		 }))
	
		 BooksAPI.search(query).then(
			response => {
				const filteredBooks = this.filterBooksByTitle(query, this.state.myBooks);
			   let result = []
				if (response.error === undefined) {
          console.log(response)
					result = response.concat(filteredBooks)
				} else {
					result = filteredBooks
				}
				this.setState({
					books: result
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

  filterBooksByTitle = (query, myBooks) => {
    query  = query.toLowerCase()
	  const filteredBooks = myBooks.filter(myBook => (
	    myBook.title.toLowerCase().includes(query) 
    ))
    console.log(filteredBooks)
    return filteredBooks
  }

    render() {
		const { books, query } = this.state;
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
                    placeholder='Search by title or author'
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    />

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                	{books.length >= 1 && books.map(book => (
              			<BookItem book={book} key={book.id} />
            		))}
                </ol>
              </div>
            </div>

      )
    }
}


export default SearchBook