function doPost(e) {
  const update = e.postData ? JSON.parse(e.postData.contents) : null;
  const chatId = update?.chat?.id;
  const updateText = update?.message?.text;
  const updateAttachments = update?.message?.attachments;

  if (updateText && updateText.trim()) {
    processUpdate(updateText, chatId);
  } else if (updateAttachments) {
    processAttachments(updateAttachments, chatId);
  } else {
    sendMessage(`Please use text messages or attach a file with me`, chatId);
  }
}

async function processUpdate(updateText, chatId) {
  await sendMessage(updateText, chatId);
}

async function processAttachments(attachments, chatId) {
  for (const attachment of attachments) {
    const attachmentType = attachment?.type;
    const attachmentUrl = attachment?.url;

    if (attachmentType === 'image' || attachmentType === 'document') {
      // Convert the file to text or PDF
      const fileContents = await convertFile(attachmentUrl);

      // Send the file contents as a message
      await sendMessage(fileContents, chatId);
    } else {
      sendMessage(`Unsupported file format: ${attachmentType}`, chatId);
    }
  }
}

async function convertFile(attachmentUrl) {
  // Implement the code to convert the file to text or PDF
  // ...
}

function sendMessage(message, chatId) {
  // Implement the code to send the message
  // ...
}
