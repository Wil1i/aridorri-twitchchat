var chatHandler = document.getElementById("chatHandler");
var chatCounter = document.getElementById("chatsCount");

let messageCount = 0;
let childs = 0;

function isSpacial(tags) {
  const userPermissions = [];
  try {
    if (tags.mod) {
      userPermissions.push("mod");
    } else if (tags.badges && tags.badges.vip) {
      userPermissions.push("vip");
    }
    return userPermissions;
  } catch {
    return false;
  }
  return false;
}

function newMessage(mode, username, message, user) {
  user = user || NaN;

  var newChat = document.createElement("li");
  var userName = document.createElement("h3");
  var textChat = document.createElement("p");

  userName.innerHTML = username;
  textChat.innerHTML = message;
  userName.style.color = user.color;

  newChat.className = "chat";

  chatHandler.insertBefore(newChat, chatHandler.childNodes[0]);
  newChat.appendChild(userName);
  newChat.appendChild(textChat);

  const userPermission = isSpacial(user);
  if (userPermission.indexOf("mod") !== -1) {
    newChat.style.backgroundColor = "#3D5B3D";
  } else if (userPermission.indexOf("vip") !== -1) {
    newChat.style.backgroundColor = "#643F64";
  } else {
    newChat.style.backgroundColor = "rgb(77, 77, 77)";
  }

  if (user) messageCount++;
  chatCounter.innerHTML = messageCount;

  childs++;
  if (childs >= 40) chatHandler.lastChild.remove();
}

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },

  channels: ["aridorri"],
});
client.connect();

client.on("connected", () => {
  newMessage("console", "Bot", "Bot is now ready");
});

client.on("message", (channel, tags, message, self) => {
  newMessage("message", tags["display-name"], message, tags);
});
