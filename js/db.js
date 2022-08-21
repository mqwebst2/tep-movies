import { openDB } from "idb";

export const database = openDB("movie-search", 1, {
  upgrade(db) {
    db.createObjectStore("new-search");
    db.createObjectStore("new-comment");
  },
});
