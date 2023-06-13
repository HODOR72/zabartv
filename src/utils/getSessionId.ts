export const getSessionId = () => {
	if (typeof window === 'undefined') {
		return 'qweqwe';
	} else {
		if (!window?.localStorage?.getItem('zabar_session_id')?.length) {
			window.localStorage.setItem('zabar_session_id', String(Date.now()));
		}

		return window.localStorage.getItem('zabar_session_id');
	}
};
