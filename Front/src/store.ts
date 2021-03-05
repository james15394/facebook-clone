import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./components/Feed/ContentCreator/postSlice";
import userReducer from "./components/SignUp/userSlice";
const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
