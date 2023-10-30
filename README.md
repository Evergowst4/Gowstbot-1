# Gowstbot

Gowstbot is an in-development Twitch bot designed to interact with audiences in streamer chats through various commands. While it's not self-hosted currently, it will be in the future.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/en/download/current)
- Windows
- Optional: You have installed [Git](https://git-scm.com/downloads).

## Installing 

To install Gowstbot, follow these steps:

1. Clone the Gowstbot GitHub repository to your local machine using the command `git clone https://github.com/Evergowst/Gowstbot/`. Alternatively, you can download the zip file.
2. Run `npm install` to install the necessary dependencies.

## Configuring 

To configure Gowstbot:

1. Update the `config.json` file with the following information:
   - `owner.login`: Your Twitch username.
   - `owner.userId`: Your Twitch ID.
2. Generate the following options with your Twitch bot account through [Twitch Token Generator](https://twitchtokengenerator.com). Add the generated tokens to the `helix` list in `config.json` under `auth.twitch.helix.token/clientId`.

## Running Gowstbot

To run Gowstbot, use the following command: `npm start`.

## Commands

Find the list of active commands [here](https://github.com/Evergowst/commands).

## Support 

You can support me by sending a message on the channel of [Gowstbot](twitch.tv/Gowstbot) or [Evergowst4](twitch.tv/Evergowst4), or by creating an issue or making a pull request.

## Contact

You can contact me through [Gowstbot's Twitch channel](https://twitch.tv/Gowstbot) or [Evergowst4's Twitch channel](https://twitch.tv/Evergowst4), or via Discord at Evergowst#0869, or on Telegram as Evergowst4.
