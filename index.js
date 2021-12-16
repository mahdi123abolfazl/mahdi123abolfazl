require("dotenv").config();//Loading .env
const fs = require("fs");
const { Collection, Client } = require("discord.js");

const client = new Client();//Making a discord bot client
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()

client.config = {
  prefix: process.env.PREFIX
}

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

/////////////////////////////////////       Status Bot (animated)        /////////////////////////////////////
client.on("ready", () => {
    function status() {

        const micneshin = client.guilds.cache.get("918099739713626112")  //ID bezar
        const membercount = client.users.cache.size  //ID bezar
        const voiceChannels = micneshin.channels.cache.filter(c => c.type === 'voice');
        let count = 0;

        for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
        let go = [`${count} Active Mics`, "+help", "", "+help", `${membercount} Users!`, "LIGHT Legend ™"]
        let plsc = ["WATCHING", "WATCHINGM", "", "WATCHING", "WATCHING", "COMPETING"]
        let Power = Math.floor(Math.random() * go.length);
        client.user.setActivity(go[Power], { type: plsc[Power] });
    }; setInterval(status, 10000)
});



/////////////////////////////////////  Reply Message To Channel  /////////////////////////////////////         
client.on('message', msg => {
  if (msg.content === 'music') {
    msg.channel.send('Music Bot: =h | =p');
  }
});



client.on('message', msg => {
  if (msg.content === 'Music') {
    msg.channel.send('Music Bot: =h | =p');
  }
});



client.on('message', msg => {
  if (msg.content === 'MUSIC') {
    msg.channel.reply.send('Music Bot: =h | =p');
  }
});



client.on('message', msg => {
  if (msg.content === 'admin') {
    msg.channel.send('Wait');
  }
});




/////////////////////////////////////  Off nashodan bot be khatere error haye alaki  /////////////////////////////////////
process.on("unhandledRejection", (reason, promise) => {
  try {
    console.error(
      "Unhandled Rejection at: ",
      promise,
      "reason: ",
      reason.stack || reason
    );
  } catch {
    console.error(reason);
  }

});






/////////////////////////////////////  Command slist (serverlist)  /////////////////////////////////////
client.on('message', message => {
  if (message.content === '+slist') { 
    const Guilds = client.guilds.cache.array().map((G, I) => `${I + 1}. \n**${G.name}**  \nID: **${G.id}**`).join("===================\n");
    if (!Guilds) return message.channel.send("No Guild");
    return message.channel.send(Guilds, { split: { char: "\n\n" } }); }
});





/////////////////////////////////////  command clear chat (limiting)  /////////////////////////////////////
client.on('message', (message) => {
        if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
      
        const args = message.content
          .toLowerCase()
          .slice(process.env.PREFIX.length)
          .trim()
          .split(/\s+/);
        const [command, input] = args;
      
        if (command === 'clear' || command === 'c') {
          if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel
              .send(
                "Shoma Perm Lazem Ra Nadarid",
              );
          }
      
          if (isNaN(input)) {
            return message.channel
              .send('Meghdare Payami Ke Mikhayd Pak She Ra Vared Konid')
              .then((sent) => {
                setTimeout(() => {
                  sent.delete();
                }, 5000);
              });
          }
          if (Number(input) < 0) {
            return message.channel
              .send('Yek Adad Entekhab konid')
              .then((sent) => {
                setTimeout(() => {
                  sent.delete();
                }, 5000);
              });
          }
      
          // add an extra to delete the current message too
          const amount = Number(input) > 100
            ? 101
            : Number(input) + 1;
      
          message.channel.bulkDelete(amount, true)
          .then((_message) => {
            message.channel
              // do you want to include the current message here?
              // if not it should be ${_message.size - 1}
              .send(`\`${_message.size - 1}\` Message Deleted`)
              .then((sent) => {
                setTimeout(() => {
                    sent.delete();
}, 6000);
});
});
}
});


                    //////////////////////////////////// command say /////////////////////////////////////////


var prefix = ["+"];

client.on("ready", () => {
  console.log(client.user.tag + "is now ready!");
});

client.on("message", async msg => {
  
  if(msg.author.bot) return;
  
  const args = msg.content.slice(prefix[0].length).trim().split(/ +/g);
  
  const command = args.shift().toLowerCase();
  
  if(!command){
    msg.channel.send("");
  }else if (command === "say"){
      const say = args.slice(0).join(" ");
    
      if(!say) return msg.channel.send("provide message");
    
      return msg.channel.send(say)
    }
})



      
//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

//Logging in to discord
client.login(process.env.TOKEN)
