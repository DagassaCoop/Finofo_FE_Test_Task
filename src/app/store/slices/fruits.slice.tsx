import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import { EFruitAPISort, IFruit } from '@/app/interfaces/fruit.interface';
import { IFruitsState } from '@/app/interfaces/fruitState.interfaces';

// Services
import { getSortsTitles } from '@/services/fruits.service';

// API
import { getAllFruits } from '@/api/fruit.api';

const initialState: IFruitsState = {
  savedFruits: [],
  sortsTitles: {
    [EFruitAPISort.family]: [],
    [EFruitAPISort.genus]: [],
    [EFruitAPISort.order]: [],
  },
};

export const fetchFruits = createAsyncThunk('fruits/fetchFruits', async () => {
  const fruits = await getAllFruits();
  return fruits;
});

export const fruitsSlice = createSlice({
  name: 'fruits',
  initialState,
  reducers: {
    addFruit(state, action: PayloadAction<IFruit>) {
      state.savedFruits.push(action.payload);
    },
    addFruits(state, action: PayloadAction<IFruit[]>) {
      action.payload.forEach((fruit) => {
        state.savedFruits.push(fruit);
      });
    },
    removeFruitById(state, action: PayloadAction<number>) {
      const index = state.savedFruits.findIndex((fruit) => fruit.id === action.payload);
      state.savedFruits.splice(index, 1);
    },
    removeAllFruits(state) {
      state.savedFruits = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFruits.fulfilled, (state, action) => {
      const {
        [EFruitAPISort.family]: familyTitles,
        [EFruitAPISort.genus]: genusTitles,
        [EFruitAPISort.order]: orderTitles,
      } = getSortsTitles(action.payload);

      state.sortsTitles[EFruitAPISort.family] = familyTitles;
      state.sortsTitles[EFruitAPISort.genus] = genusTitles;
      state.sortsTitles[EFruitAPISort.order] = orderTitles;
    });
  },
});

export const { addFruit, addFruits, removeFruitById, removeAllFruits } = fruitsSlice.actions;

export default fruitsSlice.reducer;
