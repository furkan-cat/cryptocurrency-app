import { makeObservable, observable, action, computed, toJS } from "mobx";
import { ENV } from "../constants/env";
import { ICurrency } from "../types";

class FavoritesStore {
  @observable data: Record<string, ICurrency> = {};
  @observable loading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action setLoading(state: boolean) {
    this.loading = state;
  }

  @action set(payload: any) {
    this.data = payload;
  }

  @action async add(payload: ICurrency) {
    if (this.data[payload.id]) {
      this.remove(payload.id);
    } else {
      try {
        this.data[payload.id] = payload;
        const data = await this.getChartData(payload.id);

        this.data[payload.id] = {
          ...payload,
          chartData: data,
        };
      } catch (err) {
        console.log(err);
      }
    }
    // this.data.push(payload);
  }

  @action remove(id: any) {
    delete this.data[id];
    // this.data = this.data.filter((item) => item.id !== id);
  }

  @action async getChartData(id: string) {
    try {
      const res = await fetch(
        `${ENV.baseURL}/coins/${id}/market_chart?vs_currency=usd&days=1`
      );
      const data = await res.json();

      return data.prices;
    } catch (err) {
      throw Error("Something went wrong with fetching data!");
    }
  }

  @computed get getData() {
    return Object.values(this.data);
  }
}

export default FavoritesStore;
