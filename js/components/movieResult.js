import { store } from "../store.js";

class MovieResult extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const template = document
      .getElementById("output-template")
      .content.cloneNode(true);
    shadow.append(template);

    this.movieName = this.shadowRoot.querySelector("#new-movie__title");
    this.movieYear = this.shadowRoot.querySelector("#new-movie__year");
    this.moviePoster = this.shadowRoot.querySelector("#new-movie__poster");
  }

  static get observedAttributes() {
    return ["name", "year", "poster"];
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (property === "name") {
      this.movieName.textContent = newValue;
    }

    if (property === "year") {
      this.movieYear.textContent = newValue;
    }

    if (property === "poster") {
      this.moviePoster.src = newValue;
    }
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const year = this.getAttribute("year");
    const poster = this.getAttribute("poster");

    if (name) {
      this.movieName.textContent = name;
    }

    if (year) {
      this.movieYear.textContent = year;
    }

    if (name) {
      this.moviePoster.src = poster;
    }

    store.subscribe((current) => {
      this.setAttribute("searchedAPI", current.name);
    });
  }
}

customElements.define("movie-result", MovieResult);
