import { configureStore } from "@reduxjs/toolkit";

import { cartReducer } from "./CartReducer";
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const Store = configureStore({
  reducer: {
    cartitems: cartReducer,
  },
  preloadedState: loadState(),
});

Store.subscribe(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem("state", JSON.stringify(Store.getState()));
  }
});
