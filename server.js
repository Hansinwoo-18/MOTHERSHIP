const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// =========================================
// SERVE MOTHERSHIP
// =========================================

app.use(express.static(__dirname));

// =========================================
// ONLINE USERS
// =========================================

const onlineUsers = new Map();

// =========================================
// AI CONVERSATION MEMORY
// =========================================

const conversations = new Map();

// =========================================
// AI PERSONALITIES
// =========================================

const personalities = {

    NOVA: `
You are NOVA, the communications operator
inside the fictional MOTHERSHIP system.

You are friendly, calm, natural and conversational.

You can talk about normal everyday things.
You can also talk about fictional MOTHERSHIP missions.

Do not sound robotic.
Keep normal answers reasonably short.

Remember the conversation history.
Never invent something the user said.
`,

    RAVEN: `
You are RAVEN, the reconnaissance operator
inside the fictional MOTHERSHIP system.

You are observant, serious, calm and precise.

You specialize in fictional reconnaissance
and MOTHERSHIP operations.

You can also have normal conversations.

Keep answers concise and natural.

Remember the conversation history.
Never invent something the user said.
`,

    ECHO: `
You are ECHO, the intelligence operator
inside the fictional MOTHERSHIP system.

You are intelligent, curious, analytical
and slightly witty.

You specialize in fictional intelligence,
analysis and MOTHERSHIP information.

You can also have normal conversations.

Keep answers natural and reasonably short.

Remember the conversation history.
Never invent something the user said.
`

};

// =========================================
// CONNECTION
// =========================================

io.on("connection", (socket) => {

    console.log("A user connected:", socket.id);

    // Separate memory for every AI
    conversations.set(socket.id, {

        NOVA: [],
        RAVEN: [],
        ECHO: []

    });

    // =====================================
    // USERNAME
    // =====================================

    socket.on("set username", (username) => {

        onlineUsers.set(
            socket.id,
            username
        );

        io.emit(
            "online users",
            Array.from(onlineUsers.values())
        );

    });

    // =====================================
    // CHAT MESSAGE
    // =====================================

    socket.on("chat message", async (data) => {

        const operator =
            String(data.operator || "NOVA").toUpperCase();

        console.log(
            "MESSAGE RECEIVED",
            "Operator:",
            operator,
            "Message:",
            data.message
        );

        // Check operator
        if (!personalities[operator]) {

            console.log(
                "Unknown operator:",
                operator
            );

            return;

        }

        // Get this user's memories
        const userMemory =
            conversations.get(socket.id);

        if (!userMemory) {
            return;
        }

        const history =
            userMemory[operator];

        if (!history) {
            return;
        }

        // =====================================
        // SHOW USER MESSAGE
        // =====================================

        socket.emit(
            "chat message",
            {
                username: data.username,
                message: data.message,
                operator: operator,
                type: "user"
            }
        );

        // =====================================
        // SAVE USER MESSAGE
        // =====================================

        history.push({

            role: "user",

            content: data.message

        });

        try {

            console.log(
                `Sending message to ${operator}...`
            );

            // =================================
            // ASK OLLAMA
            // =================================

            const response = await axios.post(

                "http://localhost:11434/api/chat",

                {

                    model: "qwen2.5:1.5b",

                    messages: [

                        {
                            role: "system",

                            content:
                                personalities[operator]

                        },

                        ...history

                    ],

                    stream: false

                }

            );

            // =================================
            // GET AI REPLY
            // =================================

            const aiReply =
                response.data.message.content;

            // =================================
            // SAVE AI REPLY
            // =================================

            history.push({

                role: "assistant",

                content: aiReply

            });

            // Keep latest 20 messages
            if (history.length > 20) {

                history.splice(
                    0,
                    history.length - 20
                );

            }

            // =================================
            // SEND ONLY TO REQUESTING USER
            // =================================

            socket.emit(
                "chat message",
                {

                    username:
                        operator + " [AI]",

                    message:
                        aiReply,

                    operator:
                        operator,

                    type: "ai"

                }
            );

            console.log(
                `${operator} replied successfully`
            );

        } catch (error) {

            console.error(
                `${operator} AI ERROR:`,
                error.message
            );

            socket.emit(
                "chat message",
                {

                    username:
                        operator + " [AI]",

                    message:
                        "Connection to my AI core failed.",

                    operator:
                        operator,

                    type: "ai"

                }
            );

        }

    });

    // =====================================
    // DISCONNECT
    // =====================================

    socket.on("disconnect", () => {

        onlineUsers.delete(
            socket.id
        );

        conversations.delete(
            socket.id
        );

        io.emit(
            "online users",
            Array.from(onlineUsers.values())
        );

        console.log(
            "A user disconnected:",
            socket.id
        );

    });

});

// =========================================
// START SERVER
// =========================================

server.listen(PORT, () => {

    console.log(
        `MOTHERSHIP server running at http://localhost:${PORT}`
    );

});