# MyReads Project

Final assessment project for Udacity's React Fundamentals course.

Using the provided template with API, CSS and HTML structure.

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon.
│   └── index.html 
└── src
    ├── App.css # Styles for the app.
    ├── App.js # This is the root of the app.
    ├── SearchBook.js # This is a component to search books and add in your shelves.
    ├── ListBooks.js # This is a component to show the shelves and your books.
    ├── BookItem.js # This is a component to show the book and its properties.
    ├── Loading.js # This is a component to show a loading circle on operations.
    ├── Loading.css # Styles for Loading component.
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for the app.
    ├── index.css # Global styles.
    ├── index.css # Global styles.
    └── index.js # It is used for DOM rendering only.
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend . For more information can be found at the following link :
[Starter Code for the React MyReads Project](https://github.com/udacity/reactnd-project-myreads-starter)

## About the project

This project has as a function to present two pages: Home and search. In the home can be observed the books added separated by shelves: reading currently, I want to read and read.

At home it is possible to swap books from shelves and remove them while selecting shelf as none.

In the search it is possible to search by the name of the book and add them to one of its shelves. You will be presented with books you already own and books that are not yet on one of your bookshelves.

For search examples, check out [SEARCH_TERMS.md](SEARCH_TERMS.md).

## Contributing

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
