import { createSlice } from "@reduxjs/toolkit";
interface Initial {
  email: string;
  refreshToken: string;
}
const initialState: Initial = { email: "", refreshToken: "" };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { email, refreshToken } = action.payload;
      state.email = email;
      state.refreshToken = refreshToken;
    },
  },
});
export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
