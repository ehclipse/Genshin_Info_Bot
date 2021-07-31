const {MessageMenuOption, MessageMenu} = require("discord-buttons");
const artifactMenuOptions = require('../menuOptions/artifactOptions');
const weaponMenuOptions = require('../menuOptions/weaponOptions');
const characterMenuOptions = require('../menuOptions/characterOptions');

module.exports = (menu, botUserMap, artifact_embed, weapon_embed, character_embed) => {

    let artifactMenu = new MessageMenu()
            .setID("artifactMenu")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(artifactMenuOptions);

    let weaponMenu = new MessageMenu()
            .setID("weaponMenu")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(weaponMenuOptions);
    
    let characterMenu = new MessageMenu()
            .setID("characterMenu")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click me to make a Selection!")
            .addOptions(characterMenuOptions);

    switch(menu.values[0]){
        case "artifacts":
            botUserMap[menu.clicker.user.id].mainMenuRef.edit(artifact_embed, artifactMenu);
            botUserMap[menu.clicker.user.id].position = 'artifact';
            menu.reply.defer();
            break;
        case "characters":
            console.log('characters');
            botUserMap[menu.clicker.user.id].mainMenuRef.edit(character_embed, characterMenu);
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
            menu.reply.defer();
            break;
        case "weapons":
            botUserMap[menu.clicker.user.id].mainMenuRef.edit(weapon_embed, weaponMenu);
            botUserMap[menu.clicker.user.id].position = 'weapon';
            console.log('weapons');
            menu.reply.defer();
            break;

    }
}