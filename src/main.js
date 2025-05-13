import 'dotenv/config'
import BotGateway from "./BotGateway.js";
import Commands from "./Commands.js";

const bot = new BotGateway();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
Commands.map((command) => bot.addCommand(command))
bot.run(DISCORD_TOKEN)
