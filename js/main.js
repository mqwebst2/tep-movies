import "./components/movieResult.js";
import "./components/favoriteResults.js";

import { store } from "./store.js";
import { search } from "./api.js";
import { outputTemplate } from "./components/resultTemplate.js";

let idList = [];

// PAGE LOAD EVENT
window.addEventListener("DOMContentLoaded", () => {
  const apiKey = document.querySelector("#api-key");
  store.setAPI(apiKey);
});

console.log(idList);

// FORM SUBMISSION EVENT
document.querySelector("#form").addEventListener("submit", (event) => {
  event.preventDefault();

  const titleInput = document.querySelector("#title").value.replace(/\s/g, "+");
  const output = document.querySelector("#output");

  output.innerHTML = outputTemplate;

  search(titleInput, output);
});
