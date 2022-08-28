export const favoritesTemplate = `
    <h2>Favorites</h2>
    <template id="favorites-template">
      <style>
        #fav-movie__content {
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

        #fav-movie__content > img {
          height: 240px;
          border-radius: 6px;
        }

        .unlike {
          margin: 2em 0 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .unlike__btn-items {
          display: flex;
          flex-direction: row;
          margin: 8% 0 4% 0;
          column-gap: 8%;
        }

        .unlike__btn {
          width: 100px;
          height: 40px;
          background-color: #1670ba;
          color: white;
          border: none;
          border-radius: 4px;
        }
      </style>

      <div id="fav-movie__content">
        <h2 id="fav-movie__title">New Movie: The Movie</h2>
        <div id="fav-movie__year">2022</div>
        <img id="fav-movie__poster" src="" />

        <div class="unlike">
          <div class="unlike__btn-items">
            <button id="like-btn" class="comment-and-like__btn">Unlike</button>
          </div>
        </div>
      </div>
    </template>
    `;
