function doPost(e) {
  const update = e.postData ? JSON.parse(e.postData.contents) : null;
  const chatId = update?.chat?.id;
  const updateText = update?.message?.text;

  if (updateText && updateText.trim()) {
    processUpdate(updateText, chatId);
  } else {
    sendMessage(`Please use text messages with me`, chatId);
  }
}

async function processUpdate(updateText, chatId) {
  await sendMessage(updateText, chatId);
}

function sendMessage(message, chatId) {
  // Implement the code to send the message
  // ...
}
