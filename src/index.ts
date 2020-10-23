import tmi from "tmi.js";
import { ApiClient } from "twitch";
import { ClientCredentialsAuthProvider } from "twitch-auth";
import { SimpleAdapter, WebHookListener } from "twitch-webhooks";
import { config } from "dotenv";
import CommandsService from "./services/commands.service";
config();
export let client: tmi.Client;
export let webhook: WebHookListener;
export const channel = process.env.CHANNEL as string;
(async () => {
  const clientId = process.env.CLIENT_ID as string;
  client = tmi.Client({
    connection: { reconnect: true, secure: true, port: 8089 },
    options: { debug: true },
    identity: {
      username: process.env.USERNAME,
      password: "oauth:" + process.env.PASSWORD,
    },
    channels: ["#" + channel],
  });
  await client.connect();

  const authProvider = new ClientCredentialsAuthProvider(
    clientId,
    process.env.CLIENT_SECRET as string
  );
  const apiClient = new ApiClient({ authProvider, logLevel: 7 });
  webhook = new WebHookListener(
    apiClient,
    new SimpleAdapter({
      hostName: "http://localhost",
      listenerPort: 8090,
    })
  );
  webhook.listen();

  CommandsService.init();

  webhook.subscribeToFollowsToUser(process.env.USERNAME as string, () => {});
})();
