

// Element Menu Handler
const apiBaseURL = "https://api.genshin.dev" // the base url of the genshin api
const fetch = require('node-fetch');
const Discord = require('discord.js');
const {MessageMenuOption, MessageMenu} = require("discord-buttons");

module.exports = async (menu, msgRef, botUser) => {
    if(menu.values[0] == "backMain")
    {
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

        let selection = new MessageMenu()
            .setID("select")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(menuOptions);

        msgRef.edit(selection);
        botUser.position = 'main';
    }
    else {
        const elementData = await fetch(`${apiBaseURL}/elements/${menu.values[0]}`)
            .then((data) => {
                return data.json();
            });

        const element_embed = new Discord.MessageEmbed()
            .setColor('#ff00ff')
            .setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
            .setThumbnail(`${apiBaseURL}/elements/${menu.values[0]}/icon`) 
            .setTitle(`${elementData.name} Reactions`)

        // For each reaction in reactions array: add a field to the embed 
        elementData.reactions.forEach((reaction) => {
            element_embed.addField(`${reaction.name}`, `\`elements:\` ${reaction.elements}\n\`description\`: ${reaction.description}`)
        })
        
        msgRef.edit(element_embed);
    }
    menu.reply.defer();

    
}