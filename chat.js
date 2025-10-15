// /chat.js
async function sendMessage() {
  const msgInput = document.getElementById("msg");
  const userMessage = msgInput.value;
  if (!userMessage) return;

  const chatDiv = document.getElementById("chat");
  chatDiv.innerHTML += `<p><b>You:</b> ${userMessage}</p>`;
  msgInput.value = "";
  chatDiv.innerHTML += `<p><i>AI is typing...</i></p>`;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    chatDiv.innerHTML = chatDiv.innerHTML.replace("<p><i>AI is typing...</i></p>", "");
    chatDiv.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
    chatDiv.scrollTop = chatDiv.scrollHeight;

  } catch (error) {
    chatDiv.innerHTML += `<p><b>Error:</b> ${error.message}</p>`;
  }

}
