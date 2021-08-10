const {MessageMenuOption, MessageMenu} = require("discord-buttons");

const artifactSubMenuOptions = require('../menuOptions/artifact/artifactSubMenuOptions');
const charactertSubMenuOptions = require('../menuOptions/character/characterSubMenuOptions');
const weaponSubMenuOptions = require('../menuOptions/weapon/weaponSubMenuOptions');


const elementMenuOptions = require('../menuOptions/elementOptions');
const nationMenuOptions = require('../menuOptions/nationOptions');

module.exports = (menu, botUserMap, artifact_embed, weapon_embed, character_embed, element_embed, nation_embed) => {
    

   
    // Artifact Sub Menu
    let artifactSubMenu = new MessageMenu()
            .setID("artifactMenu")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(artifactSubMenuOptions);

    let weaponSubMenu = new MessageMenu()
            .setID("weaponMenu")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(weaponSubMenuOptions);
    
    let characterSubMenu = new MessageMenu()
            .setID("artifactMenu")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(charactertSubMenuOptions);

    let elementMenu = new MessageMenu()
            .setID("elementMenu")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(elementMenuOptions);
    
    let nationMenu = new MessageMenu()
            .setID("nationMenu")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(nationMenuOptions);

    switch(menu.values[0]){
        case "artifacts":
            botUserMap[menu.clicker.user.id].mainMenuRef.edit(artifact_embed, artifactSubMenu);
            botUserMap[menu.clicker.user.id].position = 'artifact';
            menu.reply.defer();
            break;
        case "characters":
            console.log('characters');
            botUserMap[menu.clicker.user.id].mainMenuRef.edit(character_embed, characterSubMenu);
            botUserMap[menu.clicker.user.id].position = 'character';
            menu.reply.defer();
            break;
        case "consumables":
            console.log('consumables');
            menu.reply.defer();
            break;
        case "domains":
            console.log('domains');
            menu.reply.defer();
            break;
        case "elements":
            console.log('elements');
            botUserMap[menu.clicker.user.id].mainMenuRef.edit(element_embed, elementMenu);
            botUserMap[menu.clicker.user.id].position = 'element';
            menu.reply.defer();
            break;
        case "enemies":
            console.log('enemies');    
            menu.reply.defer();
            break;
        case "materials":
            console.log('materials');
            menu.reply.defer();
            break;
        case "nations":
            console.log('nations');
            botUserMap[menu.clicker.user.id].mainMenuRef.edit(nation_embed, nationMenu);
            botUserMap[menu.clicker.user.id].position = 'nation';
            menu.reply.defer();
            break;
        case "weapons":
            botUserMap[menu.clicker.user.id].mainMenuRef.edit(weapon_embed, weaponSubMenu);
            botUserMap[menu.clicker.user.id].position = 'weapon';
            console.log('weapons');
            menu.reply.defer();
            break;

    }
}