const { nanoid } = require('nanoid');

function randArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
    name: 'boobatv',
    description: "Random steamer from booba.tv",
    aliases: ['booba'],
    cooldown: 5,
    async execute(client, msg, utils) {
        const got = await import('got');
        const boobas = await got.default('https://api.booba.tv/').json()
        if (!boobas?.length) return { text: "no channels available at the moment", reply: true }

        const booba = randArray(boobas)
        const userTag = `@${booba.user_display_name.toLowerCase() === booba.user_login ? booba.user_display_name : booba.user_login}`

        return { text: `${userTag} • ${booba.stream_viewer_count} viewers https://static-cdn.jtvnw.net/previews-ttv/live_user_${booba.user_login}.jpg?${nanoid(4)}`, reply: true }
    },
};