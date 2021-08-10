// Weapon Menu Handler
const apiBaseURL = "https://api.genshin.dev" // the base url of the genshin api
const fetch = require('node-fetch');
const Discord = require('discord.js');
const {MessageMenuOption, MessageMenu} = require("discord-buttons");

const weaponMenuOptionsPG_1 = require('../menuOptions/weapon/weaponOptionsPG_1');
const weaponMenuOptionsPG_2 = require('../menuOptions/weapon/weaponOptionsPG_2');
const weaponMenuOptionsPG_3 = require('../menuOptions/weapon/weaponOptionsPG_3');
const weaponMenuOptionsPG_4 = require('../menuOptions/weapon/weaponOptionsPG_4');
const weaponMenuOptionsPG_5 = require('../menuOptions/weapon/weaponOptionsPG_5');
const weaponSubMenuOptions = require('../menuOptions/weapon/weaponSubMenuOptions');


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

    // Weapon Sub Menu
    let weaponSubMenu = new MessageMenu()
        .setID("weaponMenu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Click me to make a Selection!")
        .addOptions(weaponSubMenuOptions);

    // Weapon PG Menus
    let weaponMenuPG_1 = new MessageMenu()
        .setID("weaponMenu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Click me to make a Selection!")
        .addOptions(weaponMenuOptionsPG_1);

    let weaponMenuPG_2 = new MessageMenu()
        .setID("weaponMenu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Click me to make a Selection!")
        .addOptions(weaponMenuOptionsPG_2);
    
    let weaponMenuPG_3 = new MessageMenu()
        .setID("weaponMenu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Click me to make a Selection!")
        .addOptions(weaponMenuOptionsPG_3);
        
    let weaponMenuPG_4 = new MessageMenu()
        .setID("weaponMenu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Click me to make a Selection!")
        .addOptions(weaponMenuOptionsPG_4);
    
    let weaponMenuPG_5 = new MessageMenu()
        .setID("weaponMenu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Click me to make a Selection!")
        .addOptions(weaponMenuOptionsPG_5);

    switch(menu.values[0])
    {
        case "backMain":
           createMainMenu(); // creates and sends main menu to user
           break;
        case "weaponPG_1":
            msgRef.edit(weaponMenuPG_1);
            break;
        case "weaponPG_2":
            msgRef.edit(weaponMenuPG_2);
            break;
        case "weaponPG_3":
            msgRef.edit(weaponMenuPG_3);
            break;
        case "weaponPG_4":
            msgRef.edit(weaponMenuPG_4);
            break;
        case "weaponPG_5":
            msgRef.edit(weaponMenuPG_5);
            break;
        case "backWeapon":
            msgRef.edit(weaponSubMenu);
            break;
        default:
            const weaponData = await fetch(`${apiBaseURL}/weapons/${menu.values[0]}`)
            .then((data) => {
                return data.json();
            });

            let rarityStars = ""

            for(let x = 0; x < weaponData.rarity; x++)
                rarityStars += "⭐ ";

            const weapon_embed = new Discord.MessageEmbed()
                .setColor('#ff00ff')
                .setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
                .setThumbnail(`${apiBaseURL}/weapons/${menu.values[0]}/icon`)
                .setTitle(`${weaponData.name}`)
                .addFields(
                    {name: "Rarity", value: rarityStars, inline: false}, 
                    {name: "Base Attack", value: `${weaponData.baseAttack}`, inline: false}, 
                    {name: "Sub Stat", value: `${weaponData['subStat']}`, inline: false}, 
                    {name: `Passive: ${weaponData['passiveName']}`, value: `${weaponData['passiveDesc']}`, inline: false}

                );
        
            msgRef.edit(weapon_embed);
            break;
    }

    menu.reply.defer();
}