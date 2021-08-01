

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
    
    msgRef.edit(character_embed);
    
    menu.reply.defer();

    
}