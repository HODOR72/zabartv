import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFooterMenu, getNavMenu } from './thunks';

interface IMenuItem {
	[x: string]: void;
	id: any;
	link_type: any;
	link_type_name: any;
	customer_group: any;
	slug: any;
	old_slug: any;
	link: any;
	class: any;
	icon: any;
	badge: any;
	full_link: any;
	// @ts-ignore
	content: {
		title_in_nav: any;
	};
}

interface IState {
	isOpened: boolean;
	navMenu: IMenuItem[] | [] ;
	footerMenu: IMenuItem[] | [];
}

const initialState: IState = {
	isOpened: false,
	navMenu: [],
	footerMenu: [],
};

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		showMenu: (state, action) => {
			state.isOpened = action.payload;
		},
	},
	extraReducers: {
		[getNavMenu.fulfilled.type]: (state, action: PayloadAction<IMenuItem[]> | any) => {
			state.navMenu = action.payload;
		},
		[getFooterMenu.fulfilled.type]: (state, action: PayloadAction<IMenuItem[]>) => {
			state.footerMenu = action.payload;
		},
	},
});

export const menuActions = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
