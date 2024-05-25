import { Client, Events } from 'discord.js';

export const registerClientEvents = (client: Client) => {
  client.on(Events.ClientReady, (client: Client) => {
    console.log(`${client.user.tag} is ALIVE!`);
  });
};
