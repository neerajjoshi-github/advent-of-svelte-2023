export type Child = {
	id: string;
	tally: number;
	name: string;
};

export type Filter = 'all' | 'naughty' | 'nice';

const rows = 10;

let all: Child[] = $state([]);
let filtered: Child[] = $state([]);
let pageNumber = $state(0);
let childrensToRender: Child[] = $state([]);
const totalPages = $derived(Math.ceil(filtered.length / rows));

let filter: Filter = $state('all');
let searchText = $state('');

export const createChildrens = (childrens: Omit<Child, 'id'>[]) => {
	all = childrens.map((child) => {
		return { id: crypto.randomUUID(), ...child };
	});

	filtered = all;

	$effect(() => {
		childrensToRender = filtered.slice(pageNumber * rows, pageNumber * rows + rows);
	});

	$effect(() => {
		let tem_filtered: Child[] = [];
		if (filter === 'nice') {
			tem_filtered = all.filter((child) => child.tally >= 0);
		} else if (filter === 'naughty') {
			tem_filtered = all.filter((child) => child.tally < 0);
		} else {
			tem_filtered = all;
		}

		filtered = tem_filtered.filter((child) =>
			child.name.toLowerCase().includes(searchText.toLowerCase())
		);
	});

	const incrementTally = (id: string) => {
		const child = all.find((child) => child.id === id);
		if (!child) return;
		child.tally++;
	};
	const decermentTally = (id: string) => {
		const child = all.find((child) => child.id === id);
		if (!child) return;
		child.tally--;
	};

	const filterChildrens = (selectedFilter: Filter) => {
		filter = selectedFilter;
	};

	const searchChilderns = (text: string) => {
		searchText = text;
	};

	const addNewChild = (child: Omit<Child, 'id'>) => {
		const childToAdd: Child = {
			id: crypto.randomUUID(),
			...child
		};

		pageNumber = all.length % rows === 0 ? totalPages : totalPages - 1;
		all.push(childToAdd);
	};

	return {
		get childrens() {
			return childrensToRender;
		},

		searchChilderns,
		filterChildrens,
		incrementTally,
		decermentTally,
		addNewChild
	};
};

export const pagination = () => {
	const next = () => {
		if (pageNumber === totalPages - 1) return;
		pageNumber++;
	};

	const prev = () => {
		if (pageNumber === 0) return;
		pageNumber--;
	};

	const last = () => {
		if (pageNumber === totalPages - 1) return;
		pageNumber = totalPages - 1;
	};
	const first = () => {
		if (pageNumber === 0) return;
		pageNumber = 0;
	};

	return {
		get number() {
			return pageNumber + 1;
		},
		get totalPages() {
			return totalPages;
		},

		next,
		prev,
		last,
		first
	};
};
