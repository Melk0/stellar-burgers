import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TIngredient } from '@utils-types';
import { getFeedsApi, getOrderByNumberApi } from '@api';

export interface feedState {
  order: TOrder | null;
  ingredients: TIngredient[];
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null | undefined;
  loading: boolean;
}

export const initialState: feedState = {
  order: null,
  ingredients: [],
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false
};

export const getFeeds = createAsyncThunk('feed/getFeeds', getFeedsApi);
export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    orderFeedSelector: (state) => state.order,
    ordersFeedSelector: (state) => state.orders,
    totalFeedSelector: (state) => state.total,
    totalFeedTodaySelector: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const feedReducer = feedSlice.reducer;
export const {
  orderFeedSelector,
  ordersFeedSelector,
  totalFeedSelector,
  totalFeedTodaySelector
} = feedSlice.selectors;
