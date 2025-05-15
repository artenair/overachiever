import 'dotenv/config'
import BotGateway from "./BotGateway.js";
import Commands from "./Commands.js";

const bot = new BotGateway();
bot.setup();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const GUILD_TOKEN = process.env.DISCORD_GUILD_ID;
Commands.map((command) => bot.addCommand(command))
bot.run(DISCORD_TOKEN, GUILD_TOKEN)
