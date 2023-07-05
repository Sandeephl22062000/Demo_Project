import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import user from "./user";
import post from "./post";
import food from "./food";
import trainer from "./trainer";
import challenge from "./challenges";
const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: {
    user,
    trainer,
    post,
    food,
    challenge,
  },
  middleware,
});

export default store;
