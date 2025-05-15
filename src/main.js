import 'dotenv/config'
import BotGateway from "./BotGateway.js";
import Commands from "./Commands.js";

const bot = new BotGateway();
bot.setup();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;

if(process.env.DISCORD_PRODUCTION_GUILD_ID) {
    bot.deploy(
        DISCORD_TOKEN,
        DISCORD_APPLICATION_ID, 
        process.env.DISCORD_PRODUCTION_GUILD_ID, 
        Commands
    );
}

if(process.env.DISCORD_DEVELOPMENT_GUILD_ID) {
    bot.deploy(
        DISCORD_TOKEN,
        DISCORD_APPLICATION_ID,
        process.env.DISCORD_DEVELOPMENT_GUILD_ID,
        Commands
    );
}

Commands.map((command) => bot.addCommand(command))
bot.run(DISCORD_TOKEN)
