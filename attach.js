async function doPost(e) {
  const update = e.postData ? JSON.parse(e.postData.contents) : null;
  const chatId = update?.chat?.id;
  const updateText = update?.message?.text;
  const updateAttachments = update?.message?.attachments;

  if (updateText && updateText.trim() !== '') {
    await processUpdate(updateText, chatId); // The processUpdate function should be awaited here
  } else if (updateAttachments) {
    await processAttachments(updateAttachments, chatId); // The processAttachments function should be awaited here
  } else {
    await sendMessage(`Please use text messages or attach a file with me`, chatId); // The sendMessage function should be awaited here
  }
}

async function processUpdate(updateText, chatId) {
  try {
    await sendMessage(updateText, chatId);
  } catch (error) {
    console.error(`Failed to send message: ${error}`);
    // Handle the error appropriately (e.g., send error message, retry, etc.)
  }
}

async function processAttachments(attachments, chatId) {
  for (const attachment of attachments) {
    const attachmentType = attachment?.type;
    const attachmentUrl = attachment?.url;

    if (attachmentType === 'image' || attachmentType === 'document') {
      try {
        const fileContents = await convertFile(attachmentUrl);
        await sendMessage(fileContents, chatId);
      } catch (error) {
        console.error(`Failed to convert or send file contents: ${error}`);
        // Handle the error appropriately (e.g., send error message, retry, etc.)
      }
    } else {
      await sendMessage(`Unsupported file format: ${attachmentType}`, chatId);
    }
  }
}

async function convertFile(attachmentUrl) {
  // Implement the code to convert the file to text or PDF
  // ...
}

async function sendMessage(message, chatId) {
  // Implement the code to send the message
  // ...
}
