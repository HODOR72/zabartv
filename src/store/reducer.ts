import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { searchReducer } from './reducers/search/slice';
import { menuReducer } from './reducers/menu/slice';
import { modalReducer } from './reducers/modal/slice';
import { userReducer } from './reducers/user/slice';
import { packagesReducer } from './reducers/packages/slice';
import { homeReducer } from './reducers/home/slice';
import { movieReducer } from './reducers/movie/slice';
import { playerReducer } from './reducers/player/slice';
import { categoryReducer } from './reducers/category/slice';
import { authReducer } from './reducers/auth/slice';
import { pageReducer } from './reducers/page/slice';

export const rootReducer = combineReducers({
	menu: menuReducer,
	search: searchReducer,
	modal: modalReducer,
	user: userReducer,
	subscribe: packagesReducer,
	home: homeReducer,
	movie: movieReducer,
	player: playerReducer,
	category: categoryReducer,
	auth: authReducer,
	page: pageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const reducer = (state: RootState | undefined, action: AnyAction) => {
	if (action.type === HYDRATE)
		return {
			...state,
			...action.payload,
		};
	else return rootReducer(state, action);
};
