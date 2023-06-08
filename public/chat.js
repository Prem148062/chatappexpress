const message = document.getElementById("message");
const chatMessage = document.getElementById("chatMessage");
const chatEvent = new WebSocket(`ws://${location.host}${location.pathname}`);
chatEvent.addEventListener("open", () => {
  console.log("Connected to ws .....");
});
chatEvent.addEventListener("close", () => {
  console.log("Disconnected from ws .....");
});
chatEvent.addEventListener("message", ({ data }) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerText = data;
  chatMessage.append(div);
});

async function handlerSumit(event) {
  event.preventDefault();
  chatEvent.send(message.value);
  message.value = "";
}
