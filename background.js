let predatoryList = [];

async function fetchPredatoryList() {
  console.log('Fetching predatory list...');
  try {
    const response = await fetch(chrome.runtime.getURL('predatory_sites.csv'));
    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const list = lines.slice(1).map(line => {
      const url = line.split(',')[0].trim();
      try {
        const hostname = new URL(url).hostname.replace(/www\./, '');
        return hostname.replace(/\/$/, '');
      } catch (e) {
        return null;
      }
    }).filter(hostname => hostname !== null);
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
  chrome.alarms.create('reloadExtension', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refreshPredatoryList') {
    console.log('Alarm triggered: refreshPredatoryList');
    initialize();
  } else if (alarm.name === 'reloadExtension') {
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
