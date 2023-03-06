import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '@/types/ICategory';
import { getCategory } from './thunks';

interface IState {
	data: [ICategory] | [];
	isLoading: boolean;
	isError: boolean;
}

const initialState: IState = {
	data: [],
	isLoading: true,
	isError: false,
};

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: {
		[getCategory.fulfilled.type]: (state, action: PayloadAction<[ICategory]>) => {
			state.isLoading = false;
			state.isError = false;
			state.data = action.payload;
		},
		[getCategory.pending.type]: (state) => {
			state.isLoading = true;
		},
		[getCategory.rejected.type]: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

export const categoryReducer = categorySlice.reducer;
