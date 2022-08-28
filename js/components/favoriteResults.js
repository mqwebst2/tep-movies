class Favorites extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const template = document
      .getElementById("favorites-template")
      .content.cloneNode(true);
    shadow.append(template);

    this.movieName = this.shadowRoot.querySelector("#fav-movie__title");
    this.movieYear = this.shadowRoot.querySelector("#fav-movie__year");
    this.moviePoster = this.shadowRoot.querySelector("#fav-movie__poster");
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

    // Unike button and functionality
    this.movieCommentUnikeBtn = this.shadowRoot.querySelector("#unlike-btn");

    this.movieCommentUnlikeBtn.addEventListener("click", (event) => {
      event.preventDefault();

      console.log(name);
    });
  }
}

customElements.define("favorite-result", Favorites);
