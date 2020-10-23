import { client, channel } from "..";
import commands from "../data/commands.data.json";
import emojis from "../data/emote.data.json";
export default class CommandsService {
  private static welcomeMessageCounter = 0;
  public static init() {
    this.fetchCommands();
    this.fetchEmojis();
    this.getCommands();
    this.getEmojiCommmands();
    this.sendWelcomeCounter();
    this.sendWelcomeMessage();
  }

  private static fetchCommands() {
    for (const com of commands) {
      client.on("chat", async (channel, userstate, message, self) => {
        if (
          (com.command as any) === message.substr(1) ||
          com.command.includes(message.substr(1))
        ) {
          await client.say(channel, com.answer);
        }
      });
    }
  }
  private static fetchEmojis() {
    for (const com of emojis) {
      client.on("chat", async (channel, userstate, message, self) => {
        if (
          (com.command as any) === message.substr(1) ||
          com.command.includes(message.substr(1))
        ) {
          await client.say(channel, com.answer);
        }
      });
    }
  }
  private static getCommands() {
    client.on("chat", async (channel, userstate, message, self) => {
      if (message === "!commands")
        await client.say(
          channel,
          commands.map((c) => c.command.join(" | ")).join(" | ")
        );
    });
  }
  private static getEmojiCommmands() {
    client.on("chat", async (channel, userstate, message, self) => {
      if (message === "!emote")
        await client.say(
          channel,
          emojis.map((c) => c.command.join(" | ")).join(" | ")
        );
    });
  }
  private static sendWelcomeCounter() {
    client.on("chat", async (channel, userstate, message, self) => {
      if (!self) this.welcomeMessageCounter++;
    });
  }
  private static sendWelcomeMessage() {
    setInterval(async () => {
      if (this.welcomeMessageCounter > 0) {
        await client.say(
          channel,
          "Herzlich Willkommen auf meinem Kanal. Hier bekommst du Softwareentwicklung und Gameplay geboten. Tippe !localtrack um mehr über mein aktuelles Projekt zu erfahren, !commands für alle verfügbaren Befehle und !emotecommands für alle Emote basierten Befehle.  Ich wünsche dir viel Spaß und eine gute Unterhaltung."
        );
        this.welcomeMessageCounter = 0;
      }
    }, 30000);
  }
}
