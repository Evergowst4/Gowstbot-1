module.exports = {
    name: 'ab',
    description: 'Riempie il messaggio fornito con la parola (solitamente un\'emote) fornita come primo argomento.',
    usage: '<parola> <messaggio>',
    Code: (async function addBetween (context, word, ...args) {
		if (!word || args.length === 0) {
			return {
				success: false,
				reply: "Both the word and the message must be provided!"
			};
		}

		let nodes = args;
		if (context.params.sentences) {
			nodes = args.join(" ").split(/[?!.]/);
		}
		else if (args.length === 1) {
			nodes = Array.from(args[0]);
		}

		const result = [];
		for (const messageWord of nodes) {
			result.push(word, messageWord);
		}

		result.push(word);

		return {
			reply: result.join(" "),
			cooldown: {
				length: (context.append.pipe) ? null : this.Cooldown
			}
		};
	}),
  };