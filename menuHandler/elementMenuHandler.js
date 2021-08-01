

// Element Menu Handler
const apiBaseURL = "https://api.genshin.dev" // the base url of the genshin api
const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = async (menu, msgRef) => {

    const elementData = await fetch(`${apiBaseURL}/elements/${menu.values[0]}`)
        .then((data) => {
            return data.json();
        });
    
 
    


    const element_embed = new Discord.MessageEmbed()
        .setColor('#ff00ff')
        .setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
        .setThumbnail(`${apiBaseURL}/elements/${menu.values[0]}/icon`) 
        .setTitle(`${elementData.name} Reactions`)

    // For each reaction in reactions array: add a field to the embed 
    elementData.reactions.forEach((reaction) => {
        element_embed.addField(`${reaction.name}`, `\`elements:\` ${reaction.elements}\n\`description\`: ${reaction.description}`)
    })
    
    msgRef.edit(element_embed);
    
    menu.reply.defer();

    
}