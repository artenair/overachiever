import { SlashCommandBuilder } from "discord.js";
import { ActionRowBuilder, Events, ModalBuilder } from 'discord.js';
import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import { TextInputBuilder, TextInputStyle } from 'discord.js';
import { AttachmentBuilder } from 'discord.js';
import { MessageFlags } from 'discord.js';
import { colors, allowedChannels } from "../constants.js";
import BadgeFactory from "../Factories/BadgeFactory.js";

export default {
    data: new SlashCommandBuilder()
        .setName("award")
        .setDescription("Awards an achievement to an user")
        .addUserOption(option =>
            option.setName('user')
            .setDescription('Select a user to award')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('color')
            .setDescription('Select a color')
            .setRequired(true)
            .addChoices(...colors)
        )
    ,
    async execute (interaction, client) {
        if(!allowedChannels.hasOwnProperty(interaction.guildId)) {
            await interaction.reply({
                content: 'This bot cannot be used in this server.',
                ephemeral: true
            });
        }
        if(!allowedChannels[interaction.guildId].includes(interaction.channelId)) {
            const mentions = allowedChannels[interaction.guildId].map((channelId) => `<#${channelId}>`).join(", ");
            await interaction.reply({
                content: `This bot can only be used in the following channels: ${mentions}`,
                flags: MessageFlags.Ephemeral 
            });
            return;
        }
        const modalId = `badgeModal--${interaction.user.id}`;
        const targetUser = interaction.options.getUser("user");
        const color = interaction.options.getString("color");

        const modal = new ModalBuilder()
            .setCustomId(modalId)
            .setTitle('Award an achievement!')
        ;

        // Fields
        const titleInput = new TextInputBuilder()
            .setCustomId('title')
            .setLabel('Achievement')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        ;

        const prizeInput = new TextInputBuilder()
            .setCustomId('prize')
            .setLabel('Prize')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        ;

        const descriptionInput = new TextInputBuilder()
            .setCustomId('description')
            .setLabel('A quirky quiA quirky quip')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        ;

        // Rows
        const rows = [
            new ActionRowBuilder().addComponents(titleInput),
            new ActionRowBuilder().addComponents(descriptionInput),
            new ActionRowBuilder().addComponents(prizeInput),
        ];

        modal.addComponents(...rows);

        await interaction.showModal(modal);

        const filter = (interaction) => interaction.customId === modalId;
        interaction
            .awaitModalSubmit({ filter, time: 300000})
            .then(async (modalInteraction) => {
                const title = modalInteraction.fields.getTextInputValue('title');
                const prize = modalInteraction.fields.getTextInputValue('prize');
                const description = modalInteraction.fields.getTextInputValue('description');
                const badge = await BadgeFactory.make({
                    title,
                    prize, 
                    description,
                    color
                });

                const attachment = new AttachmentBuilder(
                    badge,
                    { name: "badge.png" }
                );

                modalInteraction.reply({
                    content: `<@${targetUser.id}>, <@${interaction.user.id}> ti ha assegnato un achievement:`,
                    files: [ attachment ]
                });
            })
        ;
    }
}
