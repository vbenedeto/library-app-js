const books = document.querySelector(".books");
const addBtn = document.querySelector(".add-btn");
const deleteBtn = document.querySelector(".deleteBtn");
const dialog = document.querySelector("dialog");
const closeDialogBtn = document.querySelector(".close-dialog-container__btn");
const form = document.getElementById("form");
let myLibrary = [];

addBtn.addEventListener("click", () => {
  form.querySelectorAll("input[type='text'], input[type='number']").forEach(input => input.value = "");
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //Create a new book
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const pages = document.getElementById("bookPages").value;
  const readStatus = document.querySelector("input[name='readStatus']:checked").value;
  const isRead = readStatus === "true";
  const book = new Book(title, author, pages, isRead);
  addBookToLibrary(book);
  dialog.close();
})

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleStatus = function() {
  this.read = !this.read;
};

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
    myLibrary = myLibrary.filter((book) => book.id !== bookId);
    displayLibrary();
  })

  switchStatusBtn.addEventListener("click", () => {
    book.toggleStatus();
    displayLibrary();
  })

  return newCard;
}

function addBookToLibrary(book) {
  myLibrary.push(book);

  displayLibrary();
}

function displayLibrary() {
  books.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookId = book.id;
    const newBookCard = createBookCard(book, bookId);
    books.appendChild(newBookCard);
  })
}

const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const twilight = new Book("Twilight", "Stephenie Meyer", 498, true);
const itTheClown = new Book("It", "Stephen King", 1184, false);
const lotr = new Book("Lord of the Rings: The Fellowship of the Ring", "J.R.R. Tolkien", 423, true);

myLibrary.push(hobbit, twilight, itTheClown, lotr);

displayLibrary(myLibrary);
