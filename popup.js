// popup.js

let isSubmitting = false;

document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    reportUrl(document.getElementById('journalUrl').value);
});

document.getElementById('reportCurrentSite').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTabUrl = tabs[0].url;
        reportUrl(currentTabUrl);
    });
});

document.getElementById('journalUrl').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        reportUrl(document.getElementById('journalUrl').value);
    }
});

function reportUrl(url) {
    if (isSubmitting) return; // Prevent multiple submissions
    isSubmitting = true;
    displayMessage('Reporting...');

    fetch('https://script.google.com/macros/s/AKfycbxQiOqmJCsxlrk82LEg-Urrv7X0KFrZmZBaiC4xFwNkycacfWHHi1jDoT0s0c9Dy7eIyw/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        displayMessage('Reported URL: ' + url);
        document.getElementById('journalUrl').value = '';
        isSubmitting = false; // Reset the submitting flag
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage('Failed to report URL.');
        isSubmitting = false; // Reset the submitting flag even on error
    });
}

function displayMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = message;
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}
