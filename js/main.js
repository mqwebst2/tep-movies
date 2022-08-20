import "./components/movieResult.js";

import { search } from "./api.js";

document.querySelector("#form").addEventListener("submit", (event) => {
  event.preventDefault();

  const titleInput = document.querySelector("#title").value.replace(/\s/g, "+");
  const output = document.querySelector("#output");

  search(titleInput, output);
});
