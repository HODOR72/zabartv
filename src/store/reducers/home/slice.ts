import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getHeroMovies, getHomeCategories } from './thunks';
import { ICategory } from '@/types/ICategory';
import { IPage } from '@/types/IPage';

interface IState {
	data: ICategory[];
	hero: [[IPage]] | [];
	isLoading: boolean;
	isError: boolean;
}

const initialState: IState = {
	data: [],
	hero: [],
	isLoading: true,
	isError: false,
};

export const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {},
	extraReducers: {
		[getHomeCategories.fulfilled.type]: (state, action: PayloadAction<ICategory[]>) => {
			state.isLoading = false;
			state.isError = false;
			state.data = action.payload;
		},
		[getHomeCategories.pending.type]: (state) => {
			state.isLoading = true;
		},
		[getHomeCategories.rejected.type]: (state) => {
			state.isLoading = false;
			state.isError = true;
		},

		[getHeroMovies.fulfilled.type]: (state, action: PayloadAction<[[IPage]]>) => {
			state.isLoading = false;
			state.isError = false;
			state.hero = action.payload;
		},
		[getHeroMovies.pending.type]: (state) => {
			state.isLoading = true;
		},
		[getHeroMovies.rejected.type]: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

export const homeReducer = homeSlice.reducer;
