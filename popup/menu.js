function queryMessage(msg) {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(tabs => {
    browser.tabs.sendMessage(tabs[0].id, {command: msg});
  }).catch(alertError);
}

function alertError(error) {
  alert(`Failed to execute script: ${error.message}`);
}

function clickListener() {
  document.addEventListener("click", (e) => {
    x = e.target.id;
    if (x === "on" || x === "off") queryMessage(x);
  })
}

browser.tabs.executeScript({file: "/content_scripts/lightswitch.js"})
.then(clickListener)
.catch(alertError);