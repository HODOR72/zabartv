import { Fragment, ReactNode, useCallback } from 'react';
import styles from './Grid.module.scss';

interface GridProps<T> {
	items: Array<T>;
	renderItem: (item: any) => ReactNode;
	className?: string;
}

export function Grid<T>({ items, renderItem }: GridProps<T>) {
	const renderItems = useCallback(
		(_items: typeof items) =>
			_items?.map((item, idx) => <Fragment key={idx}>{renderItem(item)}</Fragment>),
		[renderItem]
	);

	return (
		<div className={styles.container}>
			<div className={styles.grid}>{renderItems(items)}</div>
		</div>
	);
}
