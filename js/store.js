import { database } from "./db.js";

export class StoreSetup {
  constructor(init = {}) {
    const self = this;
    this.subscribers = [];
    this.newList = [];

    database.then(async (db) => {
      this.db = db;

      const keyValue = await db.get("stateChange", "keyValue");

      const nameList = await db.get("favorites", "nameList");

      if (keyValue) {
        this.set("hasKey", true);
      } else {
        this.set("hasKey", false);
      }

      if (nameList) {
        this.set("nameList", nameList);
        console.log(this.get("nameList"));
      } else {
        console.log("No available names for this state");
      }
    });

    this.state = new Proxy(init, {
      async set(state, key, value) {
        state[key] = value;

        if (self.db) {
          // await self.db.put("stateChange", state.keyValue, "keyValue");
          // await self.db.put("apiKey", state.hasKey, "hasKey");
          await self.db.put("stateChange", value, key);
        }

        self.subscribers.forEach((subscriber) => {
          subscriber(state);
          console.log(subscriber);
        });
        return true;
      },
    });
  }

  subscribe(cb) {
    if (typeof cb !== "function") {
      throw new Error(`You must subscribe with a function`);
    }

    this.subscribers.push(cb);
    cb(this.state);
  }

  set(key, value) {
    this.state[key] = value;
  }

  get(key) {
    return this.state[key];
  }

  addSearch(url) {
    this.set("searchURL", url);
  }

  setHasKey(keyValue) {
    this.set("keyValue", keyValue.value);
    this.disableField(keyValue);
    if (this.get("keyValue") === "") {
      this.set("hasKey", false);
    } else {
      this.set("hasKey", true);
    }
  }

  disableField(field) {
    field.disabled = true;
    field.type = "password";
  }

  setAPI(test) {
    database.then(async (db) => {
      this.db = db;

      const hasKey = await db.get("stateChange", "hasKey");
      const keyValue = await db.get("stateChange", "keyValue");

      if (hasKey) {
        if (keyValue !== "") {
          test.value = keyValue;
          this.disableField(test);
        }
      } else {
        test = "";
      }
    });
  }

  addFavorite(newFavorite) {
    this.state.nameList.push(newFavorite);
    console.log(this.state.nameList);
    console.log(this.state.nameList.length);

    database.then(async (db) => {
      this.db = db;

      this.db.put("favorites", this.state.nameList, "nameList");
    });
  }

  checkFavorite() {
    if (this.state.nameList !== []) {
      let checkList = [];

      for (let i = 0; i < this.state.nameList.length; i++) {
        checkList.push(this.state.nameList[i]);
      }

      console.log(checkList);
      return checkList;
    }
  }

  getFavorite() {
    database.then(async (db) => {
      this.db = db;

      const nameList = await db.get("favorites", "nameList");
      console.log(nameList);
    });
  }
}

export const store = new StoreSetup({
  keyValue: "",
  nameList: [],
  searchURL: "",
  hasKey: false,
});
