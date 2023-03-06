import { menuActions } from './reducers/menu/slice';
import { searchActions } from './reducers/search/slice';
import { modalActions } from './reducers/modal/slice';
import { userActions } from './reducers/user/slice';
import { playerActions } from './reducers/player/slice';
import { authActions } from './reducers/auth/slice';

export const ActionCreators = {
	user: userActions,
	modal: modalActions,
	search: searchActions,
	menu: menuActions,
	player: playerActions,
	auth: authActions,
};
