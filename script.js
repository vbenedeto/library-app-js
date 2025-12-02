
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  toggleStatus() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(...newBooks) {
    this.books.push(...newBooks);
  }

  removeBook(id) {
    this.books = this.books.filter(book => book.id !== id);
  }

  getBooks() {
    return this.books;
  }
}

const books = document.querySelector(".books");
const addBtn = document.querySelector(".add-btn");
const dialog = document.querySelector("dialog");
const closeDialogBtn = document.querySelector(".close-dialog-container__btn");
const form = document.getElementById("form");

const myLibrary = new Library();

function createBookCard(book, bookId) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.id = bookId;

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  newCard.appendChild(cardContent);

  const title = document.createElement("h2");
  title.textContent = `${book.title}`;
  title.classList.add("card-title");
  cardContent.appendChild(title);

  const author = document.createElement("h3");
  author.textContent = `By ${book.author}`;
  author.classList.add("card-author");
  cardContent.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = `${book.pages} pages`;
  pages.classList.add("card-pages");
  cardContent.appendChild(pages);

  const readStatus = document.createElement("p");
  readStatus.classList.add("card-status");
  readStatus.appendChild(document.createTextNode("Status: "));

  const statusValue = document.createElement("span");
  statusValue.classList.add("bold");
  statusValue.textContent = book.read ? "Completed" : "On Progress";
  readStatus.appendChild(statusValue);
  cardContent.appendChild(readStatus);

  const cardActions = document.createElement("div");
  cardActions.classList.add("card-actions");
  newCard.appendChild(cardActions);

  const switchStatusBtn = document.createElement("button");
  switchStatusBtn.textContent = "Change Read Status";
  switchStatusBtn.classList.add("card-btn");
  cardActions.appendChild(switchStatusBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Book";
  deleteBtn.classList.add("card-btn");
  cardActions.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", (event) => {
    const parentCard = event.target.closest(".card");
    const bookId = parentCard.id;

    myLibrary.removeBook(bookId);
    displayLibrary();
  })

  switchStatusBtn.addEventListener("click", () => {
    book.toggleStatus();
    displayLibrary();
  })

  return newCard;
}

function addBookToLibrary(book) {
  myLibrary.addBook(book);
  displayLibrary();
}

function displayLibrary() {
  books.innerHTML = "";
  myLibrary.books.forEach((book) => {
    const bookId = book.id;
    const newBookCard = createBookCard(book, bookId);
    books.appendChild(newBookCard);
  })
}

addBtn.addEventListener("click", () => {
 form.reset();
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const pages = document.getElementById("bookPages").value;
  const readStatus = document.querySelector("input[name='readStatus']:checked").value;
  const isRead = readStatus === "true";
  const book = new Book(title, author, pages, isRead);
  addBookToLibrary(book);
  dialog.close();
})

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
const prophetSong = new Book("Prophet Song", "Paul Lynch", 309, false);
const itTheClown = new Book("It", "Stephen King", 1184, false);
const lotr = new Book("Lord of the Rings: The Fellowship of the Ring", "J.R.R. Tolkien", 423, true);
const got = new Book("A Game Of Thrones", "George R. R. Martin", 694, true);

myLibrary.addBook(hobbit, prophetSong, itTheClown, lotr, got);

displayLibrary();
