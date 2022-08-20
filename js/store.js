export class StoreSetup {
  constructor(init = {}) {
    const self = this;
    this.subscribers = [];

    this.state = new Proxy(init, {
      async set(state, key, value) {
        state[key] = value;

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

  newSearch(search) {
    this.set("searchedAPI", search);
    console.log(search);
  }
}

export const store = new StoreSetup({ search: "No new searches" });
