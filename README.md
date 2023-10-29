# Gowstbot 

Gowstbot is a Twitch bot designed to send messages in streamer chats and interact with the audience through useful commands. The bot will have an extensive set of commands in the near future.

## Installation

1. Clone the GitHub repository to your local computer.
2. Execute the command "npm install" to install the necessary dependencies.

## Configuration

1. Enter the following information in the config.json file:
   - `owner.login`: your Twitch username.
   - `owner.userId`: your Twitch ID.
   - Generate the following options with your Twitch bot account through [Twitch Token Generator](https://twitchtokengenerator.com) and add them to the helix list: (chat:read, chat:edit, whispers:read, user:manage:whispers, channel:moderate, moderator:manage:banned_users, moderator:manage:announcements, moderator:manage:chat_messages, moderator:manage:chat_settings) and insert them in auth.twitch.helix.token/clientId.

## Usage

Execute the command "npm start" to start the Twitch bot.

If you wish to contribute to Gowstbot, feel free to do so :) .
