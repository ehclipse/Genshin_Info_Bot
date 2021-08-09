// Weapon Menu Handler
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

        let selection = new MessageMenu()
            .setID("select")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(menuOptions);

        msgRef.edit(selection);
        botUser.position = 'main';
    }
    else{
        const weaponData = await fetch(`${apiBaseURL}/weapons/${menu.values[0]}`)
            .then((data) => {
                return data.json();
            });

        const weapon_embed = new Discord.MessageEmbed()
            .setColor('#ff00ff')
            .setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
            .setThumbnail(`${apiBaseURL}/weapons/${menu.values[0]}/icon`)
            .setTitle(`${weaponData.name}`)
            .addFields(
                {name: "Rarity", value: `${weaponData.rarity}`, inline: false}, 
                {name: "Base Attack", value: `${weaponData.baseAttack}`, inline: false}, 
                {name: "Sub Stat", value: `${weaponData['subStat']}`, inline: false}, 
                {name: `Passive: ${weaponData['passiveName']}`, value: `${weaponData['passiveDesc']}`, inline: false}

                );
        
        msgRef.edit(weapon_embed);
    }
    menu.reply.defer();
}