async function doPost(e) {
  try {
    const update = e.postData ? JSON.parse(e.postData.contents) : null;
    const chatId = update?.chat?.id;
    const updateText = update?.message?.text;

    if (updateText && updateText.trim()) {
      await sendMessage(updateText, chatId);
    } else {
      await sendMessage(`Please use text messages with me`, chatId);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function sendMessage(message, chatId) {
  // Implement the code to send the message
  // ...
}

// Call the doPost function with the required argument
await doPost({ /* pass the required object here */ });
