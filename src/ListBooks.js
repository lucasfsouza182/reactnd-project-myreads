import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import BookItem from './BookItem';


class ListBooks extends React.Component {
	static propTypes = {
		books: PropTypes.array.isRequired
	}
	
	patternShelf = (shelf) => (
    shelf.charAt(0).toLowerCase() + shelf.slice(1).replace(/\s/g, "")
  )

	render(){
		const { books } = this.props;
		const shelfs = ["Currently Reading", "Want To Read", "Read"]
		
	return(
			<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
				{shelfs.map(shelf => (
					<div className="bookshelf" key = {shelf}>
						<h2 className="bookshelf-title">{shelf}</h2>
						<div className="bookshelf-books">
							<ol className="books-grid">
								{books.filter(book => book.shelf === this.patternShelf(shelf)).map(book => (
									<BookItem book={book} key={book.id} />
								))}
							</ol>
						</div>
					</div>
				))}
				</div>
					<div className="open-search">
						<Link to ='/search' className='close-search'>
							Add a book
						</Link>
					</div>
				</div>
			</div>
    )
  }
}

export default ListBooks