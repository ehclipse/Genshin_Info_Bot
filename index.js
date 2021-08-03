/* 

Author: Brian Tran
Date: 5-30-2021

*******************
Important Info:
- Must have "Manage Messages Permissions"
******************* 
     
*/


const Discord = require('discord.js');

const client = new Discord.Client();
const prefix = '.';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('js'));  // filters all javascript files in commands folder


const discord_buttons = require('discord-buttons');

discord_buttons(client); 

const {MessageMenuOption, MessageMenu} = require("discord-buttons");




const mainMenuSelect = require('./menuHandler/mainMenuHandler');
const artifactMenuSelect = require('./menuHandler/artifactMenuHandler');
const weaponMenuSelect = require('./menuHandler/weaponMenuHandler');
const characterMenuSelect = require('./menuHandler/characterMenuHandler');
const elementMenuSelect = require('./menuHandler/elementMenuHandler');
const nationMenuSelect = require('./menuHandler/nationMenuHandler');

var mainMenuRef; // message reference to main menu

var botUserMap = new Map();



for(const file of commandFiles){ // for each command file, it will require it instead of me manually putting require('') for each command it will automatically do it 
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Embeds
// Create menu embed
const character_embed = new Discord.MessageEmbed()
.setTitle('Character Menu')
.setDescription('Select a character to view it\'s info')
.setColor('#ff00ff')
.setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
.setThumbnail('https://static.wikia.nocookie.net/gensin-impact/images/4/4b/Raiden_Shogun_Cutscene.png/revision/latest/smart/width/250/height/250?cb=20210629034806');

// Create Artifact Embed
const artifact_embed = new Discord.MessageEmbed()
.setTitle('Artifacts Menu')
.setDescription('Select an artifact to view it\'s info')
.setColor('#ff00ff')
.setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
.setThumbnail('https://static.wikia.nocookie.net/gensin-impact/images/9/9f/Icon_Sands_of_Eon.png/revision/latest?cb=20210201215830');




const weapon_embed = new Discord.MessageEmbed()
.setTitle('Weapons Menu')
.setDescription('Select a weapon to view it\'s stats')
.setColor('#ff00ff')
.setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
.setThumbnail('https://static.wikia.nocookie.net/gensin-impact/images/8/81/Icon_Bow.png/revision/latest/top-crop/width/360/height/360?cb=20210413210801');

const element_embed = new Discord.MessageEmbed()
.setTitle('Elements Menu')
.setDescription('Select an element to view it\'s info')
.setColor('#ff00ff')
.setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
.setThumbnail('https://i.pinimg.com/736x/3b/0d/07/3b0d073db56d05d84ef6f2303e1f3586.jpg');

const nation_embed = new Discord.MessageEmbed()
.setTitle('Nations Menu')
.setDescription('Select a nation to view it\'s info')
.setColor('#ff00ff')
.setFooter('Eula Bot','https://i.pinimg.com/236x/4e/f3/02/4ef3020c1dace7794f7dd96d04025b14.jpg')
.setThumbnail('https://static.wikia.nocookie.net/gensin-impact/images/8/80/Emblem_Mondstadt.png/revision/latest?cb=20201116194623');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



client.once('ready', () => {
    console.log('Bot is online!');
    client.user.setActivity('Inazuma', {type: "PLAYING"});

});


client.on('message', async msg => {
    const args = msg.content.slice(prefix.length).split(/ +/);

    if(msg.author.id == client.user.id) // if sender is bot
    {
       

    }

    switch(args[0]){

        case "help":
            client.commands.get('help').execute(msg, args);
            break;
        case "genshin": 

            mainMenuRef = await client.commands.get('drop_down').execute(msg, args);
            botUserMap[msg.author.id] = { 
                mainMenuRef: mainMenuRef,
                userid: msg.author.id,
                commmandMsgRef: msg, // reference to the user's msg calling the bot Ex: 'Ehyclipse: .genshin'
                position: 'main',

            }
                        
            break;
 
    }
});






client.on("clickMenu",  async (menu) => {
    if(menu.message.id == botUserMap[menu.clicker.user.id].mainMenuRef.id) // If the main menu is selected and the user was the one that asked the bot for the menu
    {
        switch(botUserMap[menu.clicker.user.id].position){
            case 'main':
                mainMenuSelect(menu, botUserMap, artifact_embed, weapon_embed, character_embed, element_embed, nation_embed);
                break;
            case 'artifact':
                artifactMenuSelect(menu, botUserMap[menu.clicker.user.id].mainMenuRef);
                break;
            case 'weapon':
                weaponMenuSelect(menu, botUserMap[menu.clicker.user.id].mainMenuRef);
                break;
            case 'character':
                characterMenuSelect(menu, botUserMap[menu.clicker.user.id].mainMenuRef);
                break;
            case 'element':
                elementMenuSelect(menu, botUserMap[menu.clicker.user.id].mainMenuRef);
                break;
            case 'nation':
                nationMenuSelect(menu, botUserMap[menu.clicker.user.id].mainMenuRef);
                break;

             
        }
           
      
    }
 
    else{
        menu.reply.send("Error: The menu that you have just selected was called my another user. Please use '.genshin' command to create another menu.")
    }

});



client.login(process.env.DISC_TOKEN);


// Idea for bot
// Use emote reacts to navigate through embedded thing
// Have embedded list the categories: artifacts, characters, enemies, etc.

// Stuff to add:
// Prefix validation. Make sure user uses prefix before executing command

// Current Commands:
// Help
// Menus