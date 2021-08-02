

// Character Menu Handler
const apiBaseURL = "https://api.genshin.dev" // the base url of the genshin api
const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = async (menu, msgRef) => {

    const characterData = await fetch(`${apiBaseURL}/characters/${menu.values[0]}`)
        .then((data) => {
            return data.json();
        });
    
 
    


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
            {name: "Rarity", value: `${characterData['rarity']}`, inline: true},
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
    
    menu.reply.defer();

    
}