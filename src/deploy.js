import 'dotenv/config'
import BotGateway from "./BotGateway.js";
import Commands from "./Commands.js";

const bot = new BotGateway();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;
bot.deploy(DISCORD_TOKEN, DISCORD_APPLICATION_ID, Commands);
