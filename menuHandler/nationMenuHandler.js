

// Character Menu Handler
const apiBaseURL = "https://api.genshin.dev" // the base url of the genshin api
const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = async (menu, msgRef) => {

    const nationData = await fetch(`${apiBaseURL}/nations/${menu.values[0]}`)
        .then((data) => {
            return data.json();
        });
    
 
    


    const nation_embed = new Discord.MessageEmbed()
        .setColor('#ff00ff')
        .setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
        .setThumbnail(`${apiBaseURL}/nations/${menu.values[0]}/icon`) 
        .setTitle(`${nationData.name}`)
        .addFields(
            {name: "Element", value: `${nationData.element}`, inline: false}, 
            {name: "Archon", value: `${nationData.archon}`, inline: false}, 
            {name: "Controlling Entity", value: `${nationData.controllingEntity}`, inline: false}, 
        );
    
    msgRef.edit(nation_embed);
    
    menu.reply.defer();

    
}