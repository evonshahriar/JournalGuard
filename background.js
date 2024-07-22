// background.js

async function fetchCSV() {
  const response = await fetch(chrome.runtime.getURL('predatory_sites.csv'));
  const text = await response.text();
  console.log('Fetched CSV:', text);  // Log fetched CSV content
  return text;
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

let predatoryList = [];

async function initialize() {
  predatoryList = await getPredatoryList();
  console.log('Predatory List Loaded:', predatoryList);  // Log the entire list
}

chrome.runtime.onInstalled.addListener(() => {
  initialize();
});

chrome.webNavigation.onCompleted.addListener(function(details) {
  const url = new URL(details.url);
  const hostname = url.hostname.replace('www.', '');
  console.log('Navigated to:', hostname);  // Log the hostname of each navigated URL
  if (predatoryList.includes(hostname)) {
      console.log('Predatory site detected:', hostname);  // Log if a predatory site is detected
      chrome.tabs.sendMessage(details.tabId, { action: "warnUser" });
  } else {
      console.log('Site not in predatory list:', hostname);  // Log if site is not detected
  }
}, {url: [{urlMatches: '.*'}]});
