import tmi from "tmi.js";
import { config } from "dotenv";
import CommandsService from "./services/commands.service";
config();
export let client: tmi.Client;
export const channel = process.env.CHANNEL as string;
(async () => {
  client = tmi.Client({
    connection: { reconnect: true, secure: true },
    options: { debug: true },
    identity: {
      username: process.env.USERNAME,
      password: "oauth:" + process.env.PASSWORD,
    },
    channels: ["#" + channel],
  });

  await client.connect();

  CommandsService.init();
})();
