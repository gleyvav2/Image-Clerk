///////////////////////////////Create right click//
chrome.contextMenus.create({
  "id":"DotJpg",
  "title": "DotJpg",
  "contexts": ["selection","editable"],
})

///////////////////////////////Send to top right click//
chrome.contextMenus.onClicked.addListener(function(info){
  selectedtext = info.selectionText
    var request = new XMLHttpRequest();
    request.open('GET',"https://www.googleapis.com/customsearch/v1?q="+selectedtext+"&cx=003698229636584901938%3Aphcqygc4eow&num=10&searchType=image&key=AIzaSyAtOATS6Oexri75oO_ykPXR4QzsZ8AX0-o" , true);
    request.setRequestHeader('Accept', 'application/json');
    request.send()
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200){ 
          data = request.responseText; 
          var jsonResponse = JSON.parse(data);
          items = jsonResponse.items;
         let images = items.map(items =>  items.link )
         console.log(images)
        }
      }
    }
  })