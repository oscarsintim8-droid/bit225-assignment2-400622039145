// app.js
// Controls the BlueLib Catalogue page: showing, searching, filtering,
// adding and borrowing books. The books array comes from data.js.

// ----- Get the elements we need from the page -----
const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const addBookForm = document.getElementById("add-book-form");
const formMessage = document.getElementById("form-message");

// ----- Pick a default cover image for a category -----
// Used for books added through the form (they have no image of their own).
function getDefaultCover(category) {
    return "images/default-" + category.toLowerCase() + ".svg";
}

// ----- Create one book card element -----
// Builds the card with createElement and textContent (safe for any typed text).
function createBookCard(book) {
    const card = document.createElement("article");
    card.className = "book-card";

    // Cover image. Books added with the form use a default cover for their category.
    const cover = document.createElement("img");
    cover.className = "book-cover";
    cover.src = book.image || getDefaultCover(book.category);
    cover.alt = "Cover of " + book.title;

    const title = document.createElement("h3");
    title.className = "book-title";
    title.textContent = book.title;

    const author = document.createElement("p");
    author.className = "book-author";
    author.textContent = "Author: " + book.author;

    const category = document.createElement("p");
    category.className = "book-category";
    category.textContent = "Category: " + book.category;

    const copies = document.createElement("p");
    copies.className = "book-copies";

    const borrowButton = document.createElement("button");
    borrowButton.className = "btn borrow-btn";
    borrowButton.type = "button";
    borrowButton.textContent = "Borrow";
    borrowButton.dataset.id = book.id; // lets us know which book was clicked

    if (book.copies === 0) {
        copies.textContent = "Out of stock";
        copies.classList.add("out-of-stock");
        borrowButton.disabled = true;
    } else {
        copies.textContent = "Copies available: " + book.copies;
    }

    card.append(cover, title, author, category, copies, borrowButton);
    return card;
}

// ----- Work out which books match the search box and category dropdown -----
// Both filters are applied together.
function getFilteredBooks() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    return books.filter(function (book) {
        const matchesTitle = book.title.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
        return matchesTitle && matchesCategory;
    });
}

// ----- Show the books on the page -----
// Clears the list, then adds a card for each matching book.
// Shows "No books found." when nothing matches.
function renderBooks() {
    const visibleBooks = getFilteredBooks();
    bookList.innerHTML = "";

    if (visibleBooks.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "No books found.";
        bookList.appendChild(message);
        return;
    }

    visibleBooks.forEach(function (book) {
        bookList.appendChild(createBookCard(book));
    });
}

// ----- Borrow a book -----
// Reduces copies by 1 (never below 0), then redraws the cards.
function borrowBook(bookId) {
    const book = books.find(function (item) {
        return item.id === bookId;
    });

    if (book && book.copies > 0) {
        book.copies = book.copies - 1;
    }
    renderBooks();
}

// ----- Form message helper -----
// type is "error" or "success"
function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = "form-message " + type;
}

// ----- Add a new book from the form -----
// Checks every field first. Only adds the book if everything is valid.
function handleAddBook(event) {
    event.preventDefault(); // stop the page from reloading

    const title = addBookForm.elements["title"].value.trim();
    const author = addBookForm.elements["author"].value.trim();
    const category = addBookForm.elements["category"].value;
    const copiesText = addBookForm.elements["copies"].value.trim();

    if (title === "" || author === "" || category === "" || copiesText === "") {
        showFormMessage("Please fill in every field.", "error");
        return;
    }

    // Only digits allowed: this rejects negatives, decimals and letters
    if (!/^\d+$/.test(copiesText)) {
        showFormMessage("Copies must be a whole number of 0 or more.", "error");
        return;
    }

    books.push({
        id: nextBookId,
        title: title,
        author: author,
        category: category,
        copies: Number(copiesText),
        image: getDefaultCover(category)
    });
    nextBookId = nextBookId + 1;

    renderBooks();
    addBookForm.reset();
    showFormMessage("Book added to the catalogue.", "success");
}

// ----- Event listeners -----
searchInput.addEventListener("input", renderBooks);      // filter while typing
categoryFilter.addEventListener("change", renderBooks);  // filter by category
addBookForm.addEventListener("submit", handleAddBook);

// One listener on the list handles every Borrow button, including new books
bookList.addEventListener("click", function (event) {
    const button = event.target.closest(".borrow-btn");
    if (button) {
        borrowBook(Number(button.dataset.id));
    }
});

// ----- Show the books when the page first loads -----
renderBooks();
