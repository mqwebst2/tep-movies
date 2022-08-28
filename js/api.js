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

// export async function favSearch(list, output) {
//   let apiKey = document.querySelector("#api-key");

//   for (const item in list) {
//     const url = await fetch(
//       `https://omdbapi.com/?i=${item}&apikey=${apiKey.value}`
//     );

//     console.log(url);

//     const data = await url.json();
//     const search = data.Search;

//     for (let i = 0; i < search.length; i++) {
//       const titles = search[i].Title;
//       const year = search[i].Year;
//       const poster = search[i].Poster;
//       const id = search[i].imdbID;

//       const newFav = document.createElement("favorite-result");
//       newFav.setAttribute("name", titles);
//       newFav.setAttribute("year", year);
//       newFav.setAttribute("poster", poster);
//       newFav.setAttribute("imdbID", id);

//       output.append(newFav);
//     }
//   }
// }
