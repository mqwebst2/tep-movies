import { store } from "./store.js";

export async function search(param, output) {
  let apiKey = document.querySelector("#api-key");

  const url = await fetch(
    `https://omdbapi.com/?s=${param}&apikey=${apiKey.value}`
  );

  store.setHasKey(apiKey);
  store.addSearch(url.url);
  console.log(store.state);

  const data = await url.json();
  const search = data.Search;

  for (let i = 0; i < search.length; i++) {
    const titles = search[i].Title;
    const year = search[i].Year;
    const poster = search[i].Poster;
    const id = search[i].imdbID;

    const newMovie = document.createElement("movie-result");
    newMovie.setAttribute("name", titles);
    newMovie.setAttribute("year", year);
    newMovie.setAttribute("poster", poster);
    newMovie.setAttribute("imdbID", id);

    output.append(newMovie);
  }
}

// export async function favSearch(param, output) {
//   let apiKey = document.querySelector("#api-key");

//   for (let i = 0; i < param.length; i++) {
//     const url = await fetch(
//       `https://omdbapi.com/?i=${param[i]}&apikey=${apiKey.value}`
//     );

//     const data = await url.json();
//     const search = data.Search;

//     for (let i = 0; i < search.length; i++) {
//       const titles = search[i].Title;
//       const year = search[i].Year;
//       const poster = search[i].Poster;
//       const id = search[i].imdbID;

//       const newMovie = document.createElement("favorites");
//       newMovie.setAttribute("name", titles);
//       newMovie.setAttribute("year", year);
//       newMovie.setAttribute("poster", poster);
//       newMovie.setAttribute("imdbID", id);

//       output.append(newMovie);
//     }
//   }
// }
