require('dotenv').config();
const tmi = require('tmi.js'); // See https://tmijs.com/ for tmi docs

const client = new tmi.client({
  identity: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  channels: [
    process.env.DB_CHANNEL_ONE
  ],
});

// Event handlers (defined below)
client.on('connected', onConnectedHandler);
client.on('message', onMessageHandler);
client.on('raided', onRaided);

// Connect to Twitch:
client.connect();

// on MESSAGES
function onMessageHandler(target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  const commandWholeText = msg.trim().split(" ");
  const commandName = commandWholeText[0];
  // const commandText = msg.trim().slice(commandName.length).trim();

  if (commandName === '!dice') {
    client.say(target, `You rolled a ${rollDice()}`);
  }
  if (commandName === `!discord`) {
    client.say(target, `join the discord: ${process.env.DB_DISCORD}`);
  }
  if (commandName === `!nft`) {
    client.say(target, `I'm working with an amazing team producing unique "TCG" collectables. Watch this video to learn how to play! https://www.youtube.com/watch?v=j5a0jTc9S10 Collect packs and battle others!`);
  }
  // if (commandName === `!say`) {
  //   if (commandText.length > 0) {
  //     client.say(target, `@${context.username} said, " ${commandText} "`);
  //   } else {
  //     client.say(target, `@${context.username}, Do you want me to say anything?`);
  //   }
  // }
  if (commandName === `!so` && commandWholeText[1]) {
    if (commandWholeText[1].includes('@')) {
      client.say(target, `Shoutout ${commandWholeText[1]}`);
    }
  }
  if (commandName === `!twitter`) {
    client.say(target, `don't ratio me pls ${process.env.DB_TWITTER}`);
  }
  if (commandName === `!youtube`) {
    client.say(target, `watch the video: ${process.env.DB_YOUTUBE}`);
  }
};

// on RAIDS
function onRaided(channel, username, viewers, tags) {
  console.log(channel);
  console.log(username);
  console.log(viewers);
  // console.log(tags);
};

// Functions
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
};

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
};