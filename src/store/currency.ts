import { action, makeObservable, observable } from "mobx";
import { ENV } from "../constants/env";

class CurrencyStore {
  @observable data: Record<string, any> = {};
  @observable loading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action set(payload: object[]) {
    this.data = payload;
  }

  @action setLoading(state: boolean) {
    this.loading = state;
  }

  @action async getData() {
    // take a prop to change currency TL - USD - RUB etc.
    this.setLoading(true);

    try {
      const res = await fetch(
        `${ENV.baseURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
      );
      const data = await res.json();
      this.set(data); // set data to state
    } catch (error) {
      throw Error("Something went wrong with fetching data!");
    } finally {
      this.setLoading(false);
    }
  }
}

export default CurrencyStore;
