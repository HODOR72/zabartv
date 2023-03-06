import { IContent } from '@/types/IContent';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPage } from './thunks';

interface IBlock {
	content: IContent;
}

interface IPage {
	child_items: {
		blocks: IBlock[];
	};
	content: IContent;
}

interface IState {
	data: [IPage] | [];
	isLoading: boolean;
	isError: boolean;
}

const initialState: IState = {
	data: [],
	isLoading: true,
	isError: false,
};

export const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {},
	extraReducers: {
		[getPage.fulfilled.type]: (state, action: PayloadAction<[IPage]>) => {
			state.isLoading = false;
			state.isError = false;
			state.data = action.payload;
		},
		[getPage.pending.type]: (state) => {
			state.isLoading = true;
		},
		[getPage.rejected.type]: (state) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

export const pageReducer = pageSlice.reducer;
