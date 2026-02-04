import { booksRef, db } from "./modules/firebaseConfig.js";
import { Book } from "./modules/Book.js";
import { getVisibleBooks } from "./modules/filterNsort.js";
import { push, onValue, remove, update, ref } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const list = document.querySelector("#list");
const filterSelect = document.querySelector("#filter");
const sortSelect = document.querySelector("#sort");

let currentFilter = "all";
let currentSort = "added-asc";
let books = [];

onValue(booksRef, snapshot => {
    const data = snapshot.val();
    console.log(data);
    books = [];

    if (data) {
        for (const key in data) {
            const book = new Book(key, data[key].title, data[key].author, data[key].favorite);
            books.push(book);
        }
    }

    renderBooks();
}, error => {
    console.error("Firebase read failed:", error);
    alert("Kunde inte hämta böcker från databasen.");
});

form.addEventListener("submit", e => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    if (!title || !author) return;

    push(booksRef, {
        title,
        author,
        favorite: false
    })
        .catch(error => {
            console.error("Failed to add book:", error);
            alert("Kunde inte spara boken. Försök igen.");
        });

    form.reset();
});

filterSelect.addEventListener("change", event => {
    currentFilter = event.target.value;
    renderBooks();
});

sortSelect.addEventListener("change", event => {
    currentSort = event.target.value;
    renderBooks();
});

function renderBooks() {
    list.innerHTML = "";

    const visibleBooks = getVisibleBooks(books, currentFilter, currentSort);

    visibleBooks.forEach(book => {
        const li = document.createElement("li");
        li.classList.add("items");

        const text = document.createElement("span");
        text.innerHTML = `<strong>${book.getTitle()}</strong> by <strong>${book.getAuthor()}</strong>`;

        if (book.getFavorite()) text.classList.add("text");

        const favBtn = document.createElement("button");
        favBtn.textContent = book.getFavorite() ? "Remove favorite" : "Add favorite";

        favBtn.addEventListener("click", () => {
            const bookRef = ref(db, `/books/${book.getId()}`);
            update(bookRef, {
                favorite: !book.getFavorite()
            })
                .catch(error => {
                    console.error("Failed to update book:", error);
                    alert("Kunde inte uppdatera boken.");
                });
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";

        deleteBtn.addEventListener("click", () => {
            const bookRef = ref(db, `/books/${book.getId()}`);
            remove(bookRef)
                .catch(error => {
                    console.error("Failed to delete book:", error);
                    alert("Kunde inte ta bort boken.");
                });
        });

        li.append(text, " ", favBtn, " ", deleteBtn);
        list.appendChild(li);
    });
}