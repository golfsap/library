class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        if (this.read == true) {
            this.read = false;
        }
        else {
            this.read = true;
        }
    }
}

// UI elements
const shelf = document.getElementById('shelf-1');
const addBookBtn = document.getElementById('add-book');
const modal = document.getElementById('modal');
const newBookBtn = document.getElementById('new-book');
const removeBookBtn = document.getElementById('remove-book');
const closeModalBtn = document.getElementById('close-modal');

// Form elements
const modalForm = document.getElementById('modal-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const hasRead = document.getElementById('hasRead');

// Event listeners
addBookBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("add book");
    addBookFromInput();
})

closeModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("close btn");
    modal.classList.add('hidden');
})

newBookBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    console.log('new book btn')
    modal.classList.remove('hidden');
})

removeBookBtn.addEventListener('click', (e) => {
    // add function to remove book from array
    removeBookFromLibrary(e);
    // displaybooks again
    displayBooks();
})

document.addEventListener('click', (event) => {
    let clickInside = modal.contains(event.target)
    if (!clickInside) {
        modal.classList.add('hidden');
    }
})

const myLibrary = [];

function createNewBook() {
    // Add input validation: neg page numbers
    return new Book(title.value, author.value, pages.value, hasRead.checked);
}

function addBookFromInput() {
    const newBook = createNewBook();
    addBooktoLibrary(newBook);
    modalForm.reset();
    displayBooks();
}

function addBooktoLibrary(book) {
    if (myLibrary.length == 18) {
        alert('Maximum number of books reached!');
        return;
    }
    myLibrary.push(book);
}

function removeBookFromLibrary(e) {
    let bookIndex = e.target.parentNode.dataset.bookNumber;
    myLibrary.splice(bookIndex,1);
}

function createBookCard(book) {
    const bookCard = document.createElement('div');
    const cardTitle = document.createElement('div');
    const cardAuthor = document.createElement('div');
    const cardPages = document.createElement('div');

    // Create read checkbox
    const cardReadToggle = document.createElement('div');
    const cardCheckbox = document.createElement('input');
    cardCheckbox.type = 'checkbox';
    const checkboxLabel = document.createElement('label');
    // Create Remove book button
    const cardRemoveBtn = document.createElement('button');
    // Create book number data attr corresponding to library index
    bookCard.dataset.bookNumber = myLibrary.indexOf(book);
    cardTitle.textContent = book.title;
    cardAuthor.textContent = book.author;

    if (book.pages == 1) {
        cardPages.textContent = book.pages + ' page';
    }
    else {
        cardPages.textContent = book.pages + ' pages';
    }

    if (book.read) {
        cardCheckbox.checked = true;
    }
    else {
        cardCheckbox.checked = false;
    }
    
    checkboxLabel.textContent = 'Read';
    cardRemoveBtn.textContent = 'Remove Book';

    bookCard.classList.add('book');
    cardTitle.classList.add('book-title');
    cardAuthor.classList.add('book-author');
    cardPages.classList.add('book-pages');
    cardRemoveBtn.classList.add('btn');

    shelf.appendChild(bookCard);
    bookCard.appendChild(cardTitle);
    bookCard.appendChild(cardAuthor);
    bookCard.appendChild(cardPages);
    bookCard.appendChild(cardReadToggle);
    cardReadToggle.appendChild(cardCheckbox);
    cardReadToggle.appendChild(checkboxLabel);

    bookCard.appendChild(cardRemoveBtn);

    // Add event listener for read checkbox toggle
    cardCheckbox.addEventListener('change', (e) => {
        book.toggleRead();
    })

    // Add event listener for every new remove button
    cardRemoveBtn.addEventListener('click', (e) => {
        removeBookFromLibrary(e);
        displayBooks();
    })
}

function displayBooks() {
    shelf.textContent = '';
    myLibrary.forEach(item => {
        createBookCard(item);
    });
}


// addBooktoLibrary();
displayBooks();