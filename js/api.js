let apiKey = document.querySelector("#api-key").value.trim();

export async function search(param, results) {
  const url = await fetch(`https://omdbapi.com/?s=${param}&apikey=${apiKey}`);

  const data = await url.json();
  const search = data.Search;

  for (let i = 0; i < search.length; i++) {
    const titles = search[i].Title;
    const year = search[i].Year;
    const poster = search[i].Poster;

    const newMovie = document.createElement("movie-result");
    newMovie.setAttribute("name", titles);
    newMovie.setAttribute("year", year);
    newMovie.setAttribute("poster", poster);

    results.append(newMovie);
  }
}
