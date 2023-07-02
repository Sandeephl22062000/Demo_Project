import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import post from "./post";
import food from "./food";
import trainer from "./trainer";
import challenge from "./challenges";
const store = configureStore({
  reducer: {
    user,
    trainer,
    post,
    food,
    challenge,
  },
});

export default store;
