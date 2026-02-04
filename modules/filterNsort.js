const filterBooks = (books, filter) => {
    if (filter === "favorites") return books.filter(book => book.getFavorite());
    return [...books];
};

const sortBooks = (books, sort) => {
    const copy = [...books];

    switch (sort) {
        case "title-asc":
            return copy.sort((a, b) => a.getTitle().localeCompare(b.getTitle(), "sv"));

        case "title-desc":
            return copy.sort((a, b) => b.getTitle().localeCompare(a.getTitle(), "sv"));

        case "author-asc":
            return copy.sort((a, b) => a.getAuthor().localeCompare(b.getAuthor(), "sv"));

        case "author-desc":
            return copy.sort((a, b) => b.getAuthor().localeCompare(a.getAuthor(), "sv"));

        case "added-desc":
            return copy.reverse();

        default:
            return copy;
    }
};

export const getVisibleBooks = (books, filter, sort) => sortBooks(filterBooks(books, filter), sort);