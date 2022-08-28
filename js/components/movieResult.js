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
    const id = this.getAttribute("imdbID");

    if (name) {
      this.movieName.textContent = name;
    }

    if (year) {
      this.movieYear.textContent = year;
    }

    if (name) {
      this.moviePoster.src = poster;
    }

    // Like button and functionality
    this.movieCommentLikeBtn = this.shadowRoot.querySelector("#like-btn");

    this.movieCommentLikeBtn.addEventListener("click", (event) => {
      event.preventDefault();

      store.setFavorite(id);

      store.subscribe((current) => {
        this.setAttribute("nameList", current.nameList);
      });
    });

    // Comment button and functionality
    this.movieComment = this.shadowRoot.querySelector("#movie-comment");
    this.movieCommentBtn = this.shadowRoot.querySelector("#post-btn");

    this.movieCommentBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const commentList = this.shadowRoot.querySelector(".comment-list");

      const newComment = this.movieComment.value;
      const commentItem = `<li class="comment-list__item">${newComment}</li>`;

      commentList.innerHTML += commentItem;

      this.movieComment.value = "";
    });
  }
}

customElements.define("movie-result", MovieResult);
