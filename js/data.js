// data.js
// Holds the starting list of books. app.js reads and changes this array.
// Each book has an id so the Borrow button can find the right book,
// and an image path for the cover shown on the card.

const books = [
    { id: 1, title: "JavaScript: The Good Parts", author: "Douglas Crockford", category: "IT",       copies: 4, image: "images/javascript-good-parts.svg" },
    { id: 2, title: "Eloquent JavaScript",        author: "Marijn Haverbeke",  category: "IT",       copies: 3, image: "images/eloquent-javascript.svg" },
    { id: 3, title: "The Lean Startup",           author: "Eric Ries",         category: "Business", copies: 2, image: "images/lean-startup.svg" },
    { id: 4, title: "Rich Dad Poor Dad",          author: "Robert Kiyosaki",   category: "Business", copies: 5, image: "images/rich-dad-poor-dad.svg" },
    { id: 5, title: "A Brief History of Time",    author: "Stephen Hawking",   category: "Science",  copies: 1, image: "images/brief-history-of-time.svg" },
    { id: 6, title: "The Selfish Gene",           author: "Richard Dawkins",   category: "Science",  copies: 3, image: "images/selfish-gene.svg" },
    { id: 7, title: "Things Fall Apart",          author: "Chinua Achebe",     category: "Arts",     copies: 6, image: "images/things-fall-apart.svg" },
    { id: 8, title: "The Story of Art",           author: "E. H. Gombrich",    category: "Arts",     copies: 0, image: "images/story-of-art.svg" }
];

// Used to give new books a unique id (continues after the last sample book)
let nextBookId = books.length + 1;
