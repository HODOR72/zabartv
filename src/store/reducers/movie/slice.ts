import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '@/types/IMovie';
import { getMovieBySlug } from './thunks';

interface IState {
	data: [IMovie] | [];
	isLoading: boolean;
	isError: boolean;
}

const initialState: IState = {
	data: [],
	isLoading: true,
	isError: false,
};

export const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {},
	extraReducers: {
		[getMovieBySlug.fulfilled.type]: (state, action: PayloadAction<[IMovie]>) => {
			state.isLoading = false;
			state.isError = false;
			state.data = action.payload;
		},
		[getMovieBySlug.pending.type]: (state) => {
			state.isLoading = true;
		},
		[getMovieBySlug.rejected.type]: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

export const movieReducer = movieSlice.reducer;
