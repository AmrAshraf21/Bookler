import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { persistConfig } from "./persistConfig";

import authReducer from "./authSlice";
import hotel from "./hotelSlice";

const persistedHotelsReducer = persistReducer(
	{ ...persistConfig, key: "hotels", whitelist: undefined }, // only persist hotels slice here
	hotel
);

export const store = configureStore({
	reducer: {
		auth: authReducer,
		hotels: persistedHotelsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
