const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type, payload) => {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

socket.addEventListener("open", ()=>{
    console.log("Connected to Server");
});

socket.addEventListener("message", (message)=>{
    // console.log("Server message: " + message.data, "nice to meet you~");
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li)
});

socket.addEventListener("close", ()=>{
    console.log("Disconnected from Server");
});

const handleSubmit = (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

const handleNickSubmit = (event) => {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);