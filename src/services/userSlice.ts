import {
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

interface UserState {
  user: TUser | null;
  isAuth: boolean;
  error: string | null | undefined;
  orders: TOrder[];
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  error: null,
  orders: []
};

export const registerUser = createAsyncThunk(
  'users/registerUser',
  registerUserApi
);
export const loginUser = createAsyncThunk('users/loginUser', loginUserApi);
export const logoutUser = createAsyncThunk('users/logoutUser', logoutApi);
export const getUser = createAsyncThunk('users/getUser', getUserApi);
export const updateUser = createAsyncThunk('users/updateUser', updateUserApi);
export const getOrders = createAsyncThunk('users/getOrders', getOrdersApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    userSelector: (state) => state.user,
    isAuthSelector: (state) => state.isAuth,
    userOrdersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
        state.isAuth = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
        state.isAuth = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = null;
        state.user = null;
        state.isAuth = true;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getOrders.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});
export const { userSelector, isAuthSelector, userOrdersSelector } =
  userSlice.selectors;
export const userReducer = userSlice.reducer;
