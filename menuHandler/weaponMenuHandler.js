// Weapon Menu Handler
const apiBaseURL = "https://api.genshin.dev" // the base url of the genshin api
const fetch = require('node-fetch');
const Discord = require('discord.js');


module.exports = async (menu, msgRef) => {
    const weaponData = await fetch(`${apiBaseURL}/weapons/${menu.values[0]}`)
        .then((data) => {
            return data.json();
        });

    const weapon_embed = new Discord.MessageEmbed()
        .setColor('#ff00ff')
        .setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
        .setThumbnail('https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
        .setTitle(`${weaponData.name}`)
        .addFields(
            {name: "Rarity", value: `${weaponData.rarity}`, inline: false}, 
            {name: "Base Attack", value: `${weaponData.baseAttack}`, inline: false}, 
            {name: "Sub Stat", value: `${weaponData['subStat']}`, inline: false}, 
            {name: `Passive: ${weaponData['passiveName']}`, value: `${weaponData['passiveDesc']}`, inline: false}

            );
    
    msgRef.edit(weapon_embed);
    
    menu.reply.defer();
}