"use client";

import store  from "./store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

persistStore(store);
export function Providers({ children }) {
    return <Provider store={store}>{children}</Provider>;
}