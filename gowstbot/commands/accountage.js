module.exports = {
  name: "accountage",
  aliases: ["accage"],
  description: "Recupera l'età dell'account Twitch di un determinato account. Se non ne viene fornito nessuno, controlla il tuo.",
  permission: 100,
  category: 'Twitch',
  cooldown: 5,
  Code: (async function accountAge(context, user) {
    const login = sb.User.normalizeUsername(user ?? context.user.Name).toLowerCase();
    const { statusCode, body } = await sb.Got("Helix", {
      url: "users",
      searchParams: { login }
    });

    if (statusCode !== 200 || body.data.length === 0) {
      return {
        reply: "Questo account Twitch non ha dati associati."
      };
    }

    const now = new sb.Date();
    const created = new sb.Date(body.data[0].created_at);
    const delta = sb.Utils.timeDelta(created, false, true);
    const pronoun = (login.toLowerCase() === context.user.Name) ? "Il tuo" : "Il loro";

    let anniversary = "";
    if (now.year > created.year && now.month === created.month && now.day === created.day) {
      const who = (login === context.platform.Self_Name) ? "il mio" : pronoun.toLowerCase();

      anniversary = `È il ${now.year - created.year}° anniversario di ${who} account Twitch! FeelsBirthdayMan Clap`;
    }

    return {
      reply: `${pronoun} account Twitch è stato creato ${delta}. ${anniversary}`
    };
  }),      
};