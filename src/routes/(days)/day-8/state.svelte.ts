export type Card = {
	num: number;
	show: boolean;
	removed: boolean;
	id: string;
};

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const cards: Card[] = $state([]);
const won = $derived(!cards.find((card) => !card.removed));
let prevOpenCardIndex: number | null = $state(null);
let movesCount = $state(0);

const unsuffeledCards = nums.concat(nums);

unsuffeledCards.forEach((card, index) => {
	cards[index] = {
		num: card,
		show: false,
		removed: false,
		id: crypto.randomUUID()
	};
});

export const createCards = () => {
	const suffleCards = () => {
		prevOpenCardIndex = null;
		movesCount = 0;
		for (let i = 0; i < cards.length; i++) {
			cards[i].removed = false;
			cards[i].show = false;
			const randIndex = Math.floor(Math.random() * cards.length);
			const temp = cards[randIndex];
			temp.removed = false;
			temp.show = false;
			cards[randIndex] = cards[i];
			cards[i] = temp;
		}
	};

	suffleCards();

	const onCardClick = (cardIndex: number) => {
		const card = cards[cardIndex];
		if (prevOpenCardIndex && cards[prevOpenCardIndex].id === card.id) return;

		card.show = !card.show;

		if (prevOpenCardIndex === null) {
			movesCount++;
			return (prevOpenCardIndex = cardIndex);
		}

		const prevOpenCard = cards[prevOpenCardIndex];

		if (prevOpenCard.num === card.num) {
			setTimeout(() => {
				prevOpenCard.removed = true;
				card.removed = true;
				prevOpenCardIndex = null;
			}, 750);
		} else {
			setTimeout(() => {
				prevOpenCard.show = false;
				card.show = false;
				prevOpenCardIndex = null;
			}, 750);
		}
	};

	return {
		get cards() {
			return cards;
		},

		get prevOpenCardIndex() {
			return prevOpenCardIndex;
		},

		get movesCount() {
			return movesCount;
		},

		get won() {
			return won;
		},

		suffleCards,
		onCardClick
	};
};
