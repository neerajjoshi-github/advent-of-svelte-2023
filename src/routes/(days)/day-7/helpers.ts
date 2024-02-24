export const morseMap = new Map([
	['A', '.-'],
	['B', '-...'],
	['C', '-.-.'],
	['D', '-..'],
	['E', '.'],
	['F', '..-.'],
	['G', '--.'],
	['H', '....'],
	['I', '..'],
	['J', '.---'],
	['K', '-.-'],
	['L', '.-..'],
	['M', '--'],
	['N', '-.'],
	['O', '---'],
	['P', '.--.'],
	['Q', '--.-'],
	['R', '.-.'],
	['S', '...'],
	['T', '-'],
	['U', '..-'],
	['V', '...-'],
	['W', '.--'],
	['X', '-..-'],
	['Y', '-.--'],
	['Z', '--..'],
	['0', '-----'],
	['1', '.----'],
	['2', '..---'],
	['3', '...--'],
	['4', '....-'],
	['5', '.....'],
	['6', '-....'],
	['7', '--...'],
	['8', '---..'],
	['9', '----.'],
	['.', '.-.-.-'],
	[',', '--..--'],
	['?', '..--..'],
	["'", '.----.'],
	['!', '-.-.--'],
	['/', '-..-.'],
	['(', '-.--.'],
	[')', '-.--.-'],
	['&', '.-...'],
	[':', '---...'],
	[';', '-.-.-.'],
	['=', '-...-'],
	['+', '.-.-.'],
	['-', '-....-'],
	['_', '..--.-'],
	['"', '.-..-.'],
	['$', '...-..-'],
	['@', '.--.-.'],
	[' ', '/']
]);

export const sleep = async (time: number) => {
	await new Promise((resolve) =>
		setTimeout(() => {
			resolve(0);
		}, time)
	);
};