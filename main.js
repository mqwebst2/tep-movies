//Conditional text box fields based on radio button being checked
const form = document.getElementById("form");
const testForm = document.getElementById("form-content");
const output = document.getElementById("output");
const radioFields = document.querySelectorAll(".radio-field");
const additionalFields = document.querySelectorAll(".additional");

if (additionalFields && additionalFields.length > 0) {
  [...additionalFields].forEach((additionalField) => {
    additionalField.hidden = true;
  });
}

if (radioFields && radioFields.length > 0) {
  [...radioFields].forEach((radioField) => {
    radioField.setAttribute("aria-expanded", false);
    radioField.setAttribute("aria-controls", radioField.dataset.controls);

    radioField.addEventListener("click", (event) => {
      const additionalField = document.getElementById(
        event.target.getAttribute("aria-controls")
      );

      let isChecked = event.target.checked;

      [...additionalFields].forEach((additionalField) => {
        additionalField.hidden = true;
      });

      if (isChecked) {
        event.target.setAttribute("aria-expanded", true);
        additionalField.hidden = false;
      } else {
        event.target.setAttribute("aria-expanded", false);
        additionalField.hidden = true;
      }
    });
  });
}

//Tell form what to do on Submit Button Click
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  output.replaceChildren();

  const formData = new FormData(form);

  const input = [];

  for (const value of formData.values()) {
    let valueString = value;
    input.push(valueString);
  }

  formDisable();

  let url = "";
  const apiKeyValue = "apikey=" + input[0];
  const year = "y=" + input[4];
  const plot = "plot=" + input[5];

  //Get value of Title or IMDb Id based on input
  if (input[1] == "title-radio") {
    let title = "t=" + input[2];
    url =
      "https://www.omdbapi.com/?" +
      title +
      "&" +
      year +
      "&" +
      plot +
      "&" +
      apiKeyValue;
  } else if (input[2] == "imdb-radio") {
    let imdbID = "i=" + input[3];
    url =
      "https://www.omdbapi.com/?" +
      imdbID +
      "&" +
      year +
      "&" +
      plot +
      "&" +
      apiKeyValue;
  } else {
    alert("There are problems with the input values.");
    return url;
  }

  generateMovie(url).then((data) => {
    console.log(url);
    showMovie(data);
  });
});

async function generateMovie(url) {
  const resp = await fetch(url);
  return resp.json();
}

function showMovie(data) {
  const movieTitle = document.createElement("p");
  const dataTitle = data.Title;
  movieTitle.textContent = dataTitle;

  const movieYear = document.createElement("p");
  const dataYear = data.Year;
  movieYear.textContent = dataYear;

  const movieRating = document.createElement("p");
  const dataRating = data.Rating;
  movieRating.textContent = dataRating;

  const movieReleased = document.createElement("p");
  const dataReleased = data.Released;
  movieReleased.textContent = dataReleased;

  const moviePoster = document.createElement("img");
  const dataPoster = data.Poster;
  moviePoster.src = dataPoster;

  output.appendChild(movieTitle);
  output.appendChild(movieYear);
  output.appendChild(movieRating);
  output.appendChild(movieReleased);
  output.appendChild(moviePoster);
}

//Disable/Enable Form Contents (***on submit not yet added***)
function formDisable() {
  if (!testForm.disabled) {
    testForm.disabled = true;
  } else {
    testForm.disabled = false;
  }
}
