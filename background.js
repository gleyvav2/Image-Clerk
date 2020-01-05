///////////////////////////////Create right click//
chrome.contextMenus.create({
  "id":"DotJpg",
  "title": "DotJpg",
  "contexts": ["selection","editable"],
})

///////////////////////////////Send to top right click//
chrome.contextMenus.onClicked.addListener(function(info){
          function popup(){var w = 850;
      var h = 570;
      var left = (screen.width/2)-(w/2);
      var top = (screen.height/2)-(h/2); 
      chrome.windows.create({'url': 'dotjpg.html', 'type': 'popup', 'width': w, 'height': h, 'left': left, 'top': top} )}
      popup()    
          })