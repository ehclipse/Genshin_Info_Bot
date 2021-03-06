
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
                emoji: "â",
            },
            {
                label: "Characters",
                value: "characters",
                emoji: "đ"
            },
            {
                label: "Consumables",
                value: "consumables",
                emoji: "đ§"
            },
            {
                label: "Domains",
                value: "domains",
                emoji: "âŠī¸"
            },
            {
                label: "Elements",
                value: "elements",
                emoji: "âī¸"
            },
            {
                label: "Enemies",
                value: "enemies",
                emoji: "đē"
            },
            {
                label: "Materials",
                value: "materials",
                emoji: "đĒĩ"
            },
            {
                label: "Nations",
                value: "nations",
                emoji: "đ"
            },
            {
                label: "Weapons",
                value: "weapons",
                emoji: "âī¸"
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