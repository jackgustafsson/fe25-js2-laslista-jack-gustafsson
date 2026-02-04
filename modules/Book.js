export class Book {
    #id;
    #title;
    #author;
    #favorite;

    constructor(id, title, author, favorite) {
        this.#id = id;
        this.#title = title;
        this.#author = author;
        this.#favorite = favorite;
    }

    getId() {
        return this.#id;
    }

    getTitle() {
        return this.#title;
    }

    getAuthor() {
        return this.#author;
    }

    getFavorite() {
        return this.#favorite;
    }
}
