export const outputTemplate = `
  <h2>Movie Results</h2>
  <template id="output-template">
    <style>
      #new-movie__content {
        margin: 4% auto;
        padding: 4%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 360px;
        border: solid 2px #1670ba;
        border-radius: 8px;
        background-color: #333;
        color: white;
      }

      #new-movie__content > img {
        height: 240px;
        border-radius: 6px;
      }

      .comment-and-like {
        margin: 2em 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .comment-and-like__btn-items {
        display: flex;
        flex-direction: row;
        margin: 8% 0 4% 0;
        column-gap: 8%;
      }

      .comment-and-like__btn {
        width: 100px;
        height: 40px;
        background-color: #1670ba;
        color: white;
        border: none;
        border-radius: 4px;
      }

      .comment-list {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    </style>

    <div id="new-movie__content">
      <h2 id="new-movie__title">New Movie: The Movie</h2>
      <div id="new-movie__year">2022</div>
      <img id="new-movie__poster" src="" />

      <div class="comment-and-like">
        <label for="movie-comment">Leave A Comment:</label>
        <textarea
          id="movie-comment"
          name="movie-comment"
          cols="36"
          rows="6"
        ></textarea><br />
        <div class="comment-and-like__btn-items">
          <button id="post-btn" class="comment-and-like__btn">Post</button>
          <button id="like-btn" class="comment-and-like__btn">Like</button>
        </div>
        <div id="new-comment">
          <ul class="comment-list"></ul>
        </div>
      </div>
    </div>
  </template>
  `;
