import { searchReducer } from './reducers/searchSlice';
import { menuReducer } from './reducers/menuSlice';
import { modalReducer } from './reducers/modalSlice';
import { userReducer } from './reducers/userSlice';
import { subscribeReducer } from './reducers/subscribeSlice';
import { homeReducer } from './reducers/homeSlice';
import { AnyAction, combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

export const rootReducer = combineReducers({
	menu: menuReducer,
	search: searchReducer,
	modal: modalReducer,
	user: userReducer,
	subscribe: subscribeReducer,
	home: homeReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const reducer = (state: RootState | undefined, action: AnyAction) => {
    if (action.type === HYDRATE)
        return {
            ...state,
            ...action.payload,
        }
    else return rootReducer(state, action)
}