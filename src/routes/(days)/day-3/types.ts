export type Present = {
	name: string;
	weight: number;
	id: string;
};

export type Container = 'Presents Left' | 'Presents In Sleigh';

export type TransferData = {
	present: Present;
	index: number;
	container: Container;
};
