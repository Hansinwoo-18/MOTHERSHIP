const chatFeed =
document.getElementById("chatFeed");

const operators = [

"RAVEN",
"GHOST",
"ATLAS",
"NOVA",
"CIPHER",
"ECHO",
"ORION",
"PHOENIX",
"VIPER",
"TITAN",
"SPECTER",
"VALKYRIE",
"HUNTER",
"SHADOW",
"BLAZE",
"SENTINEL"

];

const codes = [

"green",
"blue",
"purple",
"yellow",
"red"

];

const messages = [

"Mission completed.",
"Target located.",
"Intel package received.",
"Satellite uplink active.",
"Network stable.",
"Monitoring sector.",
"Recon team deployed.",
"Awaiting extraction.",
"Encrypted report uploaded.",
"Threat level unchanged.",
"Secure channel established.",
"Area secured.",
"Signal restored.",
"Scanning communications.",
"Tracking movement.",
"Receiving classified data.",
"Asset reached destination.",
"Patrol route updated.",
"Drone feed online.",
"Operator checking in."

];

function createMessage(){

const operator =
operators[Math.floor(Math.random()*operators.length)];

const code =
codes[Math.floor(Math.random()*codes.length)];

const text =
messages[Math.floor(Math.random()*messages.length)];

const now = new Date();

const time =
now.toLocaleTimeString();

const div =
document.createElement("div");

div.className =
`message ${code}`;

div.innerHTML = `
<span class="time">[${time}]</span>
<strong>${operator}</strong>
→ ${text}
`;

chatFeed.prepend(div);

if(chatFeed.children.length > 100){

chatFeed.removeChild(
chatFeed.lastChild
);

}

}

for(let i=0;i<25;i++){

createMessage();

}

setInterval(createMessage, 1500);