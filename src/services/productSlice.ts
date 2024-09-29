import { getIngredientsApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface ingredientsState {
  ingredients: TIngredient[];
  error: string | null | undefined;
  loading: boolean;
}

export const initialState: ingredientsState = {
  ingredients: [],
  error: null,
  loading: false
};
export const getIngredientsApiThunk = createAsyncThunk(
  'products/getIngridients',
  getIngredientsApi
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    ingredientsLoadingSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsApiThunk.pending, (state) => {
      console.log(state);
      state.loading = true;
    });
    builder.addCase(getIngredientsApiThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log(state);
    });
    builder.addCase(getIngredientsApiThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload;
      console.log(state);
    });
  }
});

export const { ingredientsSelector, ingredientsLoadingSelector } =
  productSlice.selectors;
export const productReducer = productSlice.reducer;
