const books = document.querySelector(".books");
const addBtn = document.querySelector(".add-btn");
const dialog = document.querySelector("dialog");
const form = document.getElementById("form");
const myLibrary = [];


addBtn.addEventListener("click", () => {
  dialog.showModal();
})

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //Create a new book
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const pages = document.getElementById("bookPages").value;
  const readStatus = document.querySelector('input[name="readStatus"]:checked').value;
 
  const book = new Book(title, author, pages, readStatus);
  console.log(book);
  addBookToLibrary(book);
})

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor ")
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
  this.id = crypto.randomUUID();
}

function createBookCard() {
  const newCard = document.createElement("div");
    
}

function addBookToLibrary(book) {
  myLibrary.push(book);

  displayLibrary();
}

function displayLibrary() {
  books.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookId = book.id;
    const newCard = document.createElement("div");
      newCard.classList.add("book");
      newCard.id = bookId;

    const title = document.createElement("h2");
      title.textContent = `${book.title}`;
      newCard.appendChild(title);

    const author = document.createElement("h3");
      author.textContent = `By ${book.author}`;
      newCard.appendChild(author);

    const pages = document.createElement("p");
      pages.textContent = `${book.pages} pages`;
      newCard.appendChild(pages);
    
    const readStatus = document.createElement("p");
      readStatus.textContent = book.read === true ? "Readed: Yes" : "Readed: No";
      newCard.appendChild(readStatus);

    books.appendChild(newCard);
  })
}

const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const twilight = new Book("Twilight", "Stephenie Meyer", 498, true);
const itTheClown = new Book("It", "Stephen King", 1184, false);
const lotr = new Book("Lord of the Rings: The Fellowship of the Ring", "J.R.R. Tolkien", 423, true);

myLibrary.push(hobbit, twilight, itTheClown, lotr);

displayLibrary(myLibrary);
