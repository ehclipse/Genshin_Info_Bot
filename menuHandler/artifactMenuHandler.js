

// Artifact Menu Handler
const apiBaseURL = "https://api.genshin.dev" // the base url of the genshin api
const fetch = require('node-fetch');
const Discord = require('discord.js');
const {MessageMenuOption, MessageMenu} = require("discord-buttons");
const artifactMenuOptionsPG_1 = require('../menuOptions/artifact/artifactOptionsPG_1');
const artifactMenuOptionsPG_2 = require('../menuOptions/artifact/artifactOptionPG_2');
const artifactSubMenuOptions = require('../menuOptions/artifact/artifactSubMenuOptions');


module.exports = async (menu, msgRef, botUser) => {
    const createMainMenu = () => {
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

    // artifact Sub Menu
    let artifactSubMenu = new MessageMenu()
            .setID("artifactMenu")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(artifactSubMenuOptions);

    // Create Artifact PG Menus Here!
    let artifactMenuPG_1 = new MessageMenu()
            .setID("artifactMenu")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(artifactMenuOptionsPG_1);
    
    let artifactMenuPG_2 = new MessageMenu()
            .setID("artifactMenu")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(artifactMenuOptionsPG_2);

    switch(menu.values[0])
    {
        case "backMain":
            createMainMenu(); // creates and sends main menu to user
            break;
        case "artifactPG_1":
            msgRef.edit(artifactMenuPG_1);
            break;
        case "artifactPG_2":
            msgRef.edit(artifactMenuPG_2);
            break;
        case "backArt":
            msgRef.edit(artifactSubMenu);
            break;
        default:
            const artifactData = await fetch(`${apiBaseURL}/artifacts/${menu.values[0]}`)
            .then((data) => {
                return data.json();
            });

            let rarityStars = ""

            for(let x = 0; x < artifactData.max_rarity; x++)
                rarityStars += "⭐ ";


            const artifact_embed = new Discord.MessageEmbed()
                .setColor('#ff00ff')
                .setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
                .setThumbnail('https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
                .setTitle(`${artifactData.name}`)
                .addFields(
                    {name: "Max Rarity", value: rarityStars, inline: false}, 
                    {name: "2-piece bonus", value: `${artifactData['2-piece_bonus']}`, inline: false}, 
                    {name: "4-piece bonus", value: `${artifactData['4-piece_bonus']}`, inline: false}
                );
            
            msgRef.edit(artifact_embed);
            break;
        
    }

        
        
        

    menu.reply.defer();
}