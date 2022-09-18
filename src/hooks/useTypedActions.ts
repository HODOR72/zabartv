import { bindActionCreators } from 'redux';
import { ActionsCreators } from '@/store/actions';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { NextThunkDispatch } from '@/store/store';

export interface TypedUseActionsHook<TState> {
	<TSelected extends {}>(selector: (actions: TState) => TSelected): TSelected;
}

export const useActions = <TState = {}, TSelected extends {} = {}>(
	callback: (actions: TState) => TSelected
) => {
	const actions = callback(ActionsCreators as unknown as TState);

	const dispatch = useAppDispatch() as NextThunkDispatch;

	return bindActionCreators(actions, dispatch) as unknown as TSelected;
};

export const useTypedActions: TypedUseActionsHook<typeof ActionsCreators> = useActions;
