import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookItem extends Component {
  static propTypes = {
	book: PropTypes.object.isRequired,
	alterShelf: PropTypes.func.isRequired
  }

  state = {
	shelf : this.props.book.shelf ? this.props.book.shelf : "none"
  }

  changeShelf = event => {
	this.props.alterShelf(this.props.book , event.target.value)
	this.setState({
		shelf: event.target.value
	})
  }


	render() {
		const { book} = this.props;
		return (
			<li>
			<div className="book">
				<div className="book-top">
					<div className="book-cover" title={book.title} style={book.imageLinks 
																														? {width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }
																														: {width: 128, height: 193, backgroundImage: 'url("images/no-thumbnail.png")' }}></div>
					<div className="book-shelf-changer">
					<select onChange = {this.changeShelf} value={this.state.shelf}>
						<option value="move" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
          	<div className="book-authors">{book.authors && book.authors.join(", ")}</div>
			</div>
			</li>
		)
	}
}

export default BookItem;