import { database } from "./db.js";

export class StoreSetup {
  constructor(init = {}) {
    const self = this;
    this.subscribers = [];

    database.then(async (db) => {
      this.db = db;

      const keyValue = await db.get("stateChange", "keyValue");

      if (keyValue) {
        this.set("hasKey", true);
      } else {
        this.set("hasKey", false);
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
    console.log(this.state[key]);
    return this.state[key];
  }

  disableField(field) {
    field.disabled = true;
    field.type = "password";
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

  addSearch(url) {
    this.set("searchURL", url);
  }
}

export const store = new StoreSetup({
  keyValue: "",
  searchURL: "",
  hasKey: false,
});
