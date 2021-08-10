

// Character Menu Handler
const apiBaseURL = "https://api.genshin.dev" // the base url of the genshin api
const fetch = require('node-fetch');
const Discord = require('discord.js');
const {MessageMenuOption, MessageMenu} = require("discord-buttons");

const characterMenuOptionsPG_1 = require('../menuOptions/character/characterOptionsPG_1');
const characterMenuOptionsPG_2 = require('../menuOptions/character/characterOptionsPG_2');
const charactertSubMenuOptions = require('../menuOptions/character/characterSubMenuOptions');


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

    
     // character Sub Menu
     let characterSubMenu = new MessageMenu()
        .setID("charMenu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Click me to make a Selection!")
        .addOptions(charactertSubMenuOptions);

    // Character PG Menus
    let characterMenuPG_1 = new MessageMenu()
        .setID("charMenu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Click me to make a Selection!")
        .addOptions(characterMenuOptionsPG_1);

    let characterMenuPG_2 = new MessageMenu()
        .setID("charMenu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Click me to make a Selection!")
        .addOptions(characterMenuOptionsPG_2);

    switch(menu.values[0]){
        case "backMain":
            createMainMenu(); // creates and sends main menu to user
            break;
        case "characterPG_1":
            msgRef.edit(characterMenuPG_1);
            break;
        case "characterPG_2":
            msgRef.edit(characterMenuPG_2);
            break;
        case "backChar":
            msgRef.edit(characterSubMenu);
            break;
        default:
            const characterData = await fetch(`${apiBaseURL}/characters/${menu.values[0]}`)
            .then((data) => {
                return data.json();
            });

            let rarityStars = ""

            for(let x = 0; x < characterData.rarity; x++)
                rarityStars += "⭐ ";

            const character_embed = new Discord.MessageEmbed()
                .setColor('#ff00ff')
                .setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
                .setThumbnail(`${apiBaseURL}/characters/${menu.values[0]}/icon`) //https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg
                .setImage(`${apiBaseURL}/characters/${menu.values[0]}/portrait`) //https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg
                .setTitle(`${characterData.name}`)
                .setDescription(`${characterData['description']}`)
                .addFields(
                    {name: "Vision", value: `${characterData.vision}`, inline: true}, 
                    {name: "Weapon", value: `${characterData['weapon']}`, inline: true}, 
                    {name: "Nation", value: `${characterData['nation']}`, inline: true},
                    {name: "Rarity", value: rarityStars, inline: true},
                    {name: "Constellation", value: `${characterData['constellation']}`, inline: true},
                    {name: "Birthday", value: `${characterData['birthday']}`, inline: true},

                );
            
            /* Because of Hu-Tao not having enough detail with upgrades.
            // for each skill talents in the character, add fields for it
            const upgradesSkillTalents = (upgrades_array) => {
                let upgradeST = "";
                upgrades_array.forEach((upgrade) => {
                    upgradeST += `\`${upgrade.name}\`: ${upgrade.value}\n`
                });
                return upgradeST;
            }

            characterData.skillTalents.forEach((character) => {
                character_embed.addField(`${character.type}: ${character.name}`, `${character.description}\n **Upgrades**:\n ${upgradesSkillTalents(character.upgrades)}\n\n`, false)
            })
            */

            // Skill Talents
            characterData.skillTalents.forEach((skillTalent) => {
                character_embed.addField(`**${skillTalent.unlock}: ${skillTalent.name}**`, `${skillTalent.description}`, false);
            })
            
            // Passive Talents
            characterData.passiveTalents.forEach((passiveTalent) => {
                character_embed.addField(`Passive: ${passiveTalent.name}`, `\`${passiveTalent.unlock}\`\n${passiveTalent.description}`, false);
            })

            // Constellations 
            characterData.constellations.forEach((constellation) => {
                character_embed.addField(`Constellation: ${constellation.name}`, `\`${constellation.unlock}\`\n${constellation.description}`, false);
            })
            
            msgRef.edit(character_embed);
            break;

    }
 

    menu.reply.defer();

    
}