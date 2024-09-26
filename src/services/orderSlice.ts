import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

export interface IOrderState {
  order: TOrder | null;
  error: string | null | undefined;
  loading: boolean;
}

export const initialState: IOrderState = {
  order: null,
  error: null,
  loading: false
};

export const newOrder = createAsyncThunk('order/newOrder', orderBurgerApi);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    deleteOrder: (state) => {
      state.order = null;
      state.loading = false;
    }
  },
  selectors: {
    orderSelector: (state) => state.order,
    orderLoadingSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(newOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { deleteOrder } = orderSlice.actions;
export const { orderSelector, orderLoadingSelector } = orderSlice.selectors;
