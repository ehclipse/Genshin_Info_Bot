

// Artifact Menu Handler
const apiBaseURL = "https://api.genshin.dev" // the base url of the genshin api
const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = async (menu, msgRef) => {

    const artifactData = await fetch(`${apiBaseURL}/artifacts/${menu.values[0]}`)
        .then((data) => {
            return data.json();
        });

    const artifact_embed = new Discord.MessageEmbed()
        .setColor('#ff00ff')
        .setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
        .setThumbnail('https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
        .setTitle(`${artifactData.name}`)
        .addFields(
            {name: "Max Rarity", value: `${artifactData.max_rarity}`, inline: false}, 
            {name: "2-piece bonus", value: `${artifactData['2-piece_bonus']}`, inline: false}, 
            {name: "4-piece bonus", value: `${artifactData['4-piece_bonus']}`, inline: false}
            );
    
    msgRef.edit(artifact_embed);
    
    menu.reply.defer();

    
}