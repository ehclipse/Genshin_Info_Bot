

// Character Menu Handler
const apiBaseURL = "https://api.genshin.dev" // the base url of the genshin api
const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = async (menu, msgRef) => {

    const characterData = await fetch(`${apiBaseURL}/characters/${menu.values[0]}`)
        .then((data) => {
            return data.json();
        });
    

    const characterIcon = await fetch(`${apiBaseURL}/characters/${menu.values[0]}/icon`)
        .then((response) => response.blob())
        .then(image => {
            return URL.createObjectURL(image)
        })
        .catch(error => {
            console.log(error);
        })

    const character_embed = new Discord.MessageEmbed()
        .setColor('#ff00ff')
        .setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
        .setThumbnail(characterIcon) //https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg
        .setTitle(`${characterData.name}`)
        .addFields(
            {name: "Vision", value: `${characterData.vision}`, inline: false}, 
            {name: "Weapon", value: `${characterData['weapon']}`, inline: false}, 
            {name: "Nation", value: `${characterData['nation']}`, inline: false},
            {name: "Rarity", value: `${characterData['rarity']}`, inline: false},
            {name: "Constellation", value: `${characterData['constellation']}`, inline: false},
            {name: "Birthday", value: `${characterData['birthday']}`, inline: false},
            {name: "Character Description", value: `${characterData['description']}`, inline: false},

            );
    
    msgRef.edit(character_embed);
    
    menu.reply.defer();

    
}