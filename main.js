try {
  chrome.runtime.onInstalled.addListener(function(){
    chrome.tabs.create({url:"https://idislike.hatemzidi.com/newinstall.html"});
  });
} catch (er)  {

}