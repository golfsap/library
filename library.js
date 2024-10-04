// UI elements
const shelf = document.getElementById('shelf-1');
const addBookBtn = document.getElementById('add-book');

// Event listeners
addBookBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("add book");
    const newBook = createNewBook();
    addBooktoLibrary(newBook);
    displayBooks();
    
})

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = true;
}

function createNewBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const hasRead = document.getElementById('hasRead').checked;

    return new Book(title, author, pages, hasRead);
}

function addBooktoLibrary(book) {
    // let book = prompt("Enter name of book: ");
    myLibrary.push(book);
}

function createBookCard(book) {
    const bookCard = document.createElement('div');
    const cardTitle = document.createElement('div');
    const cardAuthor = document.createElement('div');
    const cardPages = document.createElement('div');

    cardTitle.textContent = book.title;
    cardAuthor.textContent = book.author;
    cardPages.textContent = book.pages;

    bookCard.classList.add('book');
    cardTitle.classList.add('book-title');
    cardAuthor.classList.add('book-author');
    cardPages.classList.add('book-pages');

    shelf.appendChild(bookCard);
    bookCard.appendChild(cardTitle);
    bookCard.appendChild(cardAuthor);
    bookCard.appendChild(cardPages);
}

function displayBooks() {
    // fix if book is already in library dont display again
    shelf.textContent = '';
    myLibrary.forEach(item => {
        createBookCard(item);
    });
}


// addBooktoLibrary();
displayBooks();