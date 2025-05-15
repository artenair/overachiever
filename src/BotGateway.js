import { Client, Collection, Events, GatewayIntentBits, REST, Routes } from 'discord.js';

export default class BotGateway {

    constructor() {
        this.client = new Client({ intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
        ] });
        this.client.commands = new Collection;
    }

    setup() {
        this.client.once(Events.ClientReady, readyClient => {
            console.log(`Ready! Logged in as ${readyClient.user.tag}`);
        });
        this.client.on(Events.InteractionCreate, this.handleInteraction.bind(this))
    }

    async handleInteraction (interaction) {
        if(!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction, this.client);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
            }
        }
    }

    addCommand(command) {
        if(!this.isValidCommand(command)) return;
        this.client.commands.set(command.data.name, command)
    }

    isValidCommand(command) {
        return typeof command === 'object' && 
            command !== null && 
            !Array.isArray(command) && 
            'data' in command &&
            'execute' in command
        ;
    }

    run(token) {
        this.client.login(token);
    }

    async deploy(token, appId, guildId, commands) {
        try {
            const rest = new REST().setToken(token);
            const body = commands.filter(this.isValidCommand).map((command) => command.data.toJSON());

            const data = await rest.put(
                Routes.applicationGuildCommands(appId, guildId),
                { body },
            );
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    }

}
