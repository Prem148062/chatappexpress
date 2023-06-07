const message = document.getElementById("message");
const chatMessage = document.getElementById("chatMessage");

const chatEvent = new EventSource("http://localhost:3000/chat");
chatEvent.addEventListener("message", (event) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerText = JSON.parse(event.data).message;
  chatMessage.append(div);
});

async function handlerSumit(event) {
  event.preventDefault();

  await fetch("/chat", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message.value }),
  });
  message.value = "";
}
