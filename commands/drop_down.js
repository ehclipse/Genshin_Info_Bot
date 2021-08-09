
const {MessageMenuOption, MessageMenu, MessageButton} = require("discord-buttons");
const { Message, DiscordAPIError, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'drop_down',
    description: ' ',

    async execute(msg, args){

        let menuOptions = [
            {
                label: "Artifacts",
                value: "artifacts",
                emoji: "⌛",
            },
            {
                label: "Characters",
                value: "characters",
                emoji: "😃"
            },
            {
                label: "Consumables",
                value: "consumables",
                emoji: "🧋"
            },
            {
                label: "Domains",
                value: "domains",
                emoji: "⛩️"
            },
            {
                label: "Elements",
                value: "elements",
                emoji: "❄️"
            },
            {
                label: "Enemies",
                value: "enemies",
                emoji: "👺"
            },
            {
                label: "Materials",
                value: "materials",
                emoji: "🪵"
            },
            {
                label: "Nations",
                value: "nations",
                emoji: "🎌"
            },
            {
                label: "Weapons",
                value: "weapons",
                emoji: "⚔️"
            },
        ]

        /*
         // Button
        const mainMenuButton = new MessageButton()
            .setStyle('grey')
            .setID('mainMenuButton')
            .setLabel('Back to Main Menu');*/

        let selection = new MessageMenu()
            .setID("select")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(menuOptions);

        
        var msg_ref = msg.channel.send("__", selection) 

        console.log("menu");

        return msg_ref;

    }

}