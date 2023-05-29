chrome.devtools.panels.create(
  'chrome-network-tab',
  '',
  '../../entry.html#/devtool',
  function (panel) {
    let panelWindow;
    let tabId = chrome.devtools.inspectedWindow.tabId;

    panel.onShown.addListener(function (extPanelWindow) {
      extPanelWindow instanceof Window;
      panelWindow = extPanelWindow;
    });

    chrome.webRequest.onBeforeRequest.addListener(
      (details) => {
        panelWindow && panelWindow.postMessage(
          {
            details,
            type: 'my-network-message'
          },
          '*',
        );
      },
      { tabId, urls: ['<all_urls>'] },
      ['requestBody'],
    );
  },
);
