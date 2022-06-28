import { action, makeObservable, observable, toJS } from "mobx";
import { ENV } from "../constants/env";
import { IhistoricalDayProps } from "../types";

class DetailStore {
  @observable data: Record<string, any> = {};
  @observable historicalData: Record<string, any> = [];
  @observable days: any = {};
  @observable loading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action setDays(state: IhistoricalDayProps) {
    this.days = state;
  }

  @action setLoading(state: boolean) {
    this.loading = state;
  }

  @action add(id: string, payload: object[]) {
    this.data[id] = payload;
  }

  @action setHistoricalData(payload: object[]) {
    this.historicalData = payload;
  }

  @action async getHistorical(id: string, days: string, currency = "usd") {
    this.setLoading(true);
    try {
      const res = await fetch(
        `${ENV.baseURL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      const data = await res.json();
      
      this.setHistoricalData(data.prices);
    } catch (err) {
      throw Error("Something went wrong with fetching data!");
    } finally {
      this.setLoading(false);
    }
  }

  @action async getCoin(id: string) {
    this.setLoading(true);
    try {
      const res = await fetch(`${ENV.baseURL}/coins/${id}`);
      const data = await res.json();
      this.add(data.id, data);
    } catch (err) {
      throw Error("Something went wrong with fetching data!");
    } finally {
      this.setLoading(false);
    }
  }
}

export default DetailStore;
