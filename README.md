# BlueLib Catalogue

**Course:** BIT225 Advanced Web Technologies, Assignment 2
**Student:** Oscar Sintim
**Student ID:** [400622039145]

## Purpose
A single-page online library catalogue where users can search books, filter by category, add new books and borrow copies. Built to practise DOM manipulation with plain JavaScript.

## Technologies used
- HTML5
- CSS3 (custom properties, Grid, media queries)
- Vanilla JavaScript (no frameworks or libraries)

## Main features
- Book cards (with cover images) are created by JavaScript from an array (nothing hard-coded in the HTML)
- Search by title while typing
- Category filter that works together with the search
- "No books found." message when nothing matches
- Add Book form with validation (all fields required, copies must be a whole number of 0 or more)
- Borrow button reduces copies by 1; at 0 it shows "Out of stock" and is disabled
- Responsive layout: 3 cards per row on desktop, 2 on tablet, 1 below 600px

## Folder structure
```text
bit225-assignment2-<studentID>/
├── index.html
├── README.md
├── css/
│   └── style.css
├── images/       (book cover images)
└── js/
    ├── data.js   (starting book array)
    └── app.js    (page behaviour)
```

## How to run
1. Download or unzip the project folder.
2. Double-click `index.html` to open it in a web browser.
No installation or server is needed.
