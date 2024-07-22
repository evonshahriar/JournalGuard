let cachedCSV = null;
let predatoryList = [];

async function fetchCSV() {
  if (cachedCSV) return cachedCSV;  // Return cached data if available
  console.log('Fetching CSV...');
  try {
    const response = await fetch(chrome.runtime.getURL('predatory_sites.csv'));
    const text = await response.text();
    cachedCSV = text;
    console.log('CSV fetched successfully');
    return text;
  } catch (error) {
    console.error('Failed to fetch CSV:', error);
    return '';
  }
}

function parseCSV(text) {
  const lines = text.split('\n');
  const result = [];
  for (const line of lines.slice(1)) {  // Skip header line
    const values = line.split(',');
    if (values.length > 1) {
      const url = values[0].trim().replace(/https?:\/\/(www\.)?/, '').replace(/\/$/, '');  // Normalize URL
      console.log('Parsed URL:', url);  // Log each parsed URL
      result.push(url);
    }
  }
  return result;
}

async function getPredatoryList() {
  const csvText = await fetchCSV();
  return parseCSV(csvText);
}

async function initialize() {
  try {
    predatoryList = await getPredatoryList();
    console.log('Predatory List Loaded:', predatoryList.length, 'entries');
  } catch (error) {
    console.error('Initialization error:', error);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed, initializing...');
  initialize();
  chrome.alarms.create('keepAlive', { periodInMinutes: 5 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'keepAlive') {
    console.log('KeepAlive alarm triggered, re-initializing...');
    initialize(); // Re-initialize or perform any action to keep the service worker alive
  }
});

chrome.webNavigation.onCompleted.addListener(async (details) => {
  try {
    const url = new URL(details.url);
    const hostname = url.hostname.replace('www.', '');
    console.log('Navigated to:', hostname);

    if (predatoryList.includes(hostname)) {
      console.log('Predatory site detected:', hostname);

      // Check if the content script is active
      chrome.tabs.sendMessage(details.tabId, { action: "ping" }, (response) => {
        if (chrome.runtime.lastError) {
          // If the content script is not active, inject it
          chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: ['content.js']
          }, () => {
            if (chrome.runtime.lastError) {
              console.error('Failed to inject content script:', chrome.runtime.lastError.message);
            } else {
              console.log('Content script injected successfully');
              // Send the warning message after injection
              chrome.tabs.sendMessage(details.tabId, { action: "warnUser" }, (response) => {
                if (chrome.runtime.lastError) {
                  console.error('Failed to send message to tab:', chrome.runtime.lastError.message);
                } else {
                  console.log('Message sent to tab successfully');
                }
              });
            }
          });
        } else {
          // If the content script is active, send the warning message
          chrome.tabs.sendMessage(details.tabId, { action: "warnUser" }, (response) => {
            if (chrome.runtime.lastError) {
              console.error('Failed to send message to tab:', chrome.runtime.lastError.message);
            } else {
              console.log('Message sent to tab successfully');
            }
          });
        }
      });
    } else {
      console.log('Site not in predatory list:', hostname);
    }
  } catch (error) {
    console.error('Navigation error:', error);
  }
}, { url: [{ urlMatches: '.*' }] });
