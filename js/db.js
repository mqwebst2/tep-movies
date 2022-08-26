import { openDB } from "idb";

export const database = openDB("movieSearch", 1, {
  upgrade(db) {
    db.createObjectStore("stateChange");
    db.createObjectStore("favorites");
    db.createObjectStore("newSearch");
  },
});
