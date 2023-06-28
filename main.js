// Import necessary libraries
const { google } = require('googleapis');
const { loadedUserPreferences } = require('./settings');
const { userProfile } = require('./userProfile');

// Create an OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URL'
);

// Set the token for the OAuth2 client
oAuth2Client.setCredentials({
  access_token: 'ACCESS_TOKEN',
  refresh_token: 'REFRESH_TOKEN'
});

// Create an instance of the desired Google service
const search = google.customsearch('v1');
const drive = google.drive('v3');
const gmail = google.gmail('v1');
const calendar = google.calendar('v3');

// Use the Google services in your code
async function performGoogleSearch(query) {
  const result = await search.cse.list({
    q: query,
    cx: loadedUserPreferences.searchEngineId,
    auth: oAuth2Client
  });
  return result.data.items;
}

async function listDriveFiles() {
  const result = await drive.files.list({
    auth: oAuth2Client,
    pageSize: 10,
    fields: 'files(name, webViewLink)'
  });
  return result.data.files;
}

async function sendEmail({ to, subject, body }) {
  const result = await gmail.users.messages.send({
    auth: oAuth2Client,
    userId: 'me',
    requestBody: {
      raw: createRawMessage({
        to,
        subject,
        body
      })
    }
  });
  return result.data;
}

async function createCalendarEvent({ summary, start, end }) {
  const result = await calendar.events.insert({
    auth: oAuth2Client,
    calendarId: 'primary',
    requestBody: {
      summary,
      start,
      end
    }
  });
  return result.data;
}

// Helper function to create a raw email message
function createRawMessage({ to, subject, body }) {
  const emailLines = [];
  emailLines.push(`To: ${to}`);
  emailLines.push('Content-Type: text/html; charset=utf-8');
  emailLines.push('MIME-Version: 1.0');
  emailLines.push(`Subject: ${subject}`);
  emailLines.push('');
  emailLines.push(body);
  return Buffer.from(emailLines.join(`\r\n`)).toString('base64');
}
// Use the functions to interact with Google services
async function main() {
  console.log(userProfile);

  const searchResults = await performGoogleSearch('AI Programming');
  console.log(searchResults);

  const driveFiles = await listDriveFiles();
  console.log(driveFiles);

  const emailResult = await sendEmail({
    to: loadedUserPreferences.recipientEmail,
    subject: 'Hello from AI Assistant',
    body: 'This is a test email sent using the Gmail API.'
  });
  console.log(emailResult);

  const eventResult = await createCalendarEvent({
    summary: 'Meeting with AI Programmer',
    start: {
      dateTime: '2022-01-01T09:00:00',
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: '2022-01-01T10:00:00',
      timeZone: 'America/Los_Angeles'
    }
  });
  console.log(eventResult);
}

main();
