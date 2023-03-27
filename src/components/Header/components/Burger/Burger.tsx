import { ButtonBase } from '@/components/ButtonBase/ButtonBase';
import { useTypedActions } from '@/hooks/useTypedActions';
import { MenuIcon } from '@/icons';
import styles from './Burger.module.scss';

export const Burger = () => {
	const { showMenu } = useTypedActions((state) => state.menu);

	const handleShow = () => showMenu(true);

	return (
		<ButtonBase onClick={handleShow} className={styles.burger}>
			<MenuIcon />
		</ButtonBase>
	);
};
