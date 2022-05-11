
const socket = io();
const chatContainer = document.querySelector(".chatCont");
const textarea = document.querySelector("#textarea");
const msgSendBtn =  document.querySelector("#sendBtn");
let userName;
do {
    userName = prompt("Enter Your Name : ");
} while (!userName);

msgSendBtn.addEventListener("click",()=>{
    sendMessage(textarea.value);
})


// textarea.addEventListener("keyup", (event) => {
//     if (event.key == "Enter") {
//         sendMessage(event.target.value);
//     }
// });

function sendMessage(msg) {
    if(msg==""){
        return;
    }
    let msgObj = {
        user: userName,
        message: msg.trim(),
    }
    appendMessage(msgObj, "outgoing");

    // sending message to server via socket
    socket.emit("message", msgObj); //this takes the object as a message
}

function appendMessage(message, msgType) {
    let newMeassageBox = document.createElement("div");
    newMeassageBox.innerHTML =
        `
             <h2 class="name">${message.user}</h2>
             <p>${message.message}</p>   
        `;
    chatContainer.appendChild(newMeassageBox);
    textarea.value = "";
    if (msgType == "outgoing") {
        newMeassageBox.classList.add("outgoing", "message");
    }
    else {
        newMeassageBox.classList.add("incoming", "message");
    }
}


// receving the message from the server
socket.on("message", (msg) => {
    console.log(msg);
    appendMessage(msg, "incoming");
    scrollToBottom();
})

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}