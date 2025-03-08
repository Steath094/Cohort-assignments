import {createSlice} from '@reduxjs/toolkit'

const userToken = localStorage.getItem("userToken");
const adminToken = localStorage.getItem("adminToken");

const initialState = {
  user: userToken,
  admin: adminToken,
  isAuthenticated: !!(userToken || adminToken),
  isAdmin: !!adminToken,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            localStorage.setItem("userToken", action.payload);
            localStorage.removeItem("adminToken"); // Remove admin token if logging in as user
            state.user = action.payload;
            state.admin = null;
            state.isAuthenticated = true;
            state.isAdmin = false;
          },
          loginAdmin: (state, action) => {
            localStorage.setItem("adminToken", action.payload);
            localStorage.removeItem("userToken"); // Remove user token if logging in as admin
            state.admin = action.payload;
            state.user = null;
            state.isAuthenticated = true;
            state.isAdmin = true;
          },
          logout: (state) => {
            localStorage.removeItem("userToken");
            localStorage.removeItem("adminToken");
            state.user = null;
            state.admin = null;
            state.isAuthenticated = false;
            state.isAdmin = false;
          },
      
    }
})

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;