import { createContext, useContext } from "react";
import CurrencyStore from "./currency";
import FavoritesStore from "./favorites";
import DetailStore from "./detail";

interface IRootStoreContext {
  favorites: FavoritesStore;
  currencies: CurrencyStore;
  details: DetailStore;
}

class RootStore {
  favorites = new FavoritesStore();
  currencies = new CurrencyStore();
  details = new DetailStore();
}

const RootStoreContext = createContext<IRootStoreContext>(new RootStore());
export const useStore = () => useContext(RootStoreContext);
