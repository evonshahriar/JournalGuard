let predatoryList = [];

async function fetchPredatoryList() {
  console.log('Fetching predatory list...');
  try {
    const response = await fetch(chrome.runtime.getURL('predatory_sites.csv'));
    const text = await response.text();
    const lines = text.split('\n');
    const list = lines.slice(1).map(line => line.split(',')[0].trim().replace(/https?:\/\/(www\.)?/, '').replace(/\/$/, ''));
    console.log('Predatory list fetched successfully:', list);
    return list;
  } catch (error) {
    console.error('Failed to fetch predatory list:', error);
    return [];
  }
}

async function initialize() {
  console.log('Initializing predatory list...');
  predatoryList = await fetchPredatoryList();
  console.log('Predatory list loaded with', predatoryList.length, 'entries');
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed, initializing...');
  initialize();
  chrome.alarms.create('refreshPredatoryList', { periodInMinutes: 5 });
  chrome.alarms.create('reloadExtension', { periodInMinutes: 1 });  // Add this line
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refreshPredatoryList') {
    console.log('Alarm triggered: refreshPredatoryList');
    initialize();
  } else if (alarm.name === 'reloadExtension') {  // Add this block
    console.log('Alarm triggered: reloadExtension');
    chrome.runtime.reload();
  }
});

chrome.webNavigation.onCompleted.addListener(async (details) => {
  const url = new URL(details.url);
  const hostname = url.hostname.replace('www.', '');

  if (predatoryList.includes(hostname)) {
    console.log('Predatory site detected:', hostname);
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['content.js']
    }).then(() => {
      chrome.tabs.sendMessage(details.tabId, { action: 'warnUser' });
    }).catch(error => console.error('Failed to inject content script:', error));
  } else {
    console.log('Site not in predatory list:', hostname);
  }
}, { url: [{ urlMatches: '.*' }] });
