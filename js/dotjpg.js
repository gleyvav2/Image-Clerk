document.addEventListener('DOMContentLoaded', function() {
    
  $('form').submit(false);
  btnsubmit = document.getElementById('btnsubmit');
  gliderhead = document.querySelector("#gliderhead")
  gliderhead.style.display = "none"

  function searchie() {
    counter()
      document.querySelector("#mainbody").style.display = "none"
      document.querySelector("#gliderhead").style.display = "none"
      $("#gliderhead").load(window.location.href + " #gliderhead>*");
      var searchNumber = 1
      var request = new XMLHttpRequest();
      request.open('GET', "https://www.googleapis.com/customsearch/v1?q=" + btnsubmit1 + "&cx=003698229636584901938%3Aphcqygc4eow&num=10&searchType=image&start=" + searchNumber + "&key=AIzaSyAtOATS6Oexri75oO_ykPXR4QzsZ8AX0-o", true);
      request.setRequestHeader('Accept', 'application/json');
      request.send()
      request.onreadystatechange = function() {
          if (request.readyState == 4) {
              if (request.status == 200) {
                  data = request.responseText;
                  var jsonResponse = JSON.parse(data);
                  items = jsonResponse.items;
                  console.log(items)
                  let imagesTN = items.map(items => items.image.thumbnailLink)
                  let images = items.map(items => items.link)
                  let imageh = items.map(items => items.image.height)
                  let imagew = items.map(items => items.image.width)
                  container = document.querySelector("#glider")
                  for (i = 0; i < imagesTN.length; i++) {
                      div = document.createElement("div")
                      var x = document.createElement("IMG");
                      x.setAttribute("src", imagesTN[i]);
                      x.setAttribute("width", "210");
                      x.setAttribute("height", "125");
                      x.setAttribute("data-zoom-src", images[i]);
                      x.setAttribute("id", "zoom-default");
                      container.appendChild(div)
                      btn = document.createElement("button")
                      btn.setAttribute("id", "Expand" + i)
                      btn.setAttribute("class", "uk-button uk-button-default")
                      btn.setAttribute("data-zoom-src", images[i]);
                      btn.innerHTML = 'Expand';
                      btn2 = document.createElement("button")
                      btn2.setAttribute("id", "save" + i)
                      btn2.setAttribute("class", "uk-button uk-button-secondary")
                      btn2.setAttribute("href", imagesTN[i]);
                      btn2.setAttribute("extension", images[i]);
                      btn2.innerHTML = 'Copy'
                      div.appendChild(x);
                      div.appendChild(btn);
                      div.appendChild(btn2);
                      extension = btn2.attributes.extension.value.match(/[^/]+(png)$/)
                      if (extension == null) {
                          btn2.setAttribute("disabled", "")
                      }

                  }
                  gliderhead.style.display = "block"
                   new Glider(document.querySelector('.glider'), {
                      slidesToShow: 4,
                      slidesToScroll: 4,
                      draggable: false,
                      dots: '.dots',
                      arrows: {
                          prev: '.glider-prev',
                          next: '.glider-next'
                      }

                  }

                  );

                  const zoomDefault = mediumZoom('#zoom-default', {
                      background: 'rgba(25, 18, 25, .9)',
                  })

                  for (i = 0; i < imagesTN.length; i++) {
                      Getall = document.getElementById('Expand' + i).addEventListener('click', function() {
                          urlbtn = this.dataset.zoomSrc
                          var w = 800;
                          var h = 600;
                          url = urlbtn
                          var left = (screen.width / 2) - (w / 2);
                          var top = (screen.height / 2) - (h / 2);
                          chrome.windows.create({
                              'url': url,
                              'type': 'popup',
                              'width': w,
                              'height': h,
                              'left': left,
                              'top': top
                          })
                      })
                  }
                  for (i = 0; i < imagesTN.length; i++) {
                      Getall = document.getElementById('save' + i).addEventListener('click', function() {
                          urlbtn = this.attributes.href.value
                          async function gg() {
                              try {
                                  const imgURL = urlbtn;
                                  const data = await fetch(imgURL);
                                  const blob = await data.blob();
                                  await navigator.clipboard.write([
                                      new ClipboardItem({
                                          [blob.type]: blob
                                      })
                                  ]);
                                  status = "success"
                                  UIkit.notification({
                                      message: '<span uk-icon=\'icon: check\'></span> Image saved to clipboard'
                                  }, status);

                              } catch (e) {}
                          }
                          gg() //////////////////////Fires copy feature /////////////
                      })
                  }
              }

          }
      }

  }

  btnsubmit.addEventListener('click', function() {
    chrome.storage.local.get('showstopper', function(result) {
        if (result.showstopper == 1){stopped()}
        else {   
      btnsubmit1 = document.getElementById("submitvalue").value;
      searchie()
        }})})

    window.addEventListener("keydown", function(e) {
      if (e.keyCode == 13) {
          chrome.storage.local.get('showstopper', function(result) {
      if (result.showstopper == 1){stopped()}
      else { 

          btnsubmit1 = document.getElementById("submitvalue").value;
          searchie()
      }})}})
        var logo = document.getElementById('logo');  
        logo.addEventListener('click', function() {
            var newURL = "https://www.geekspired.com";
            chrome.tabs.create({ url: newURL });
          })
      


    var lastTitle = "Image Clerk";
        if (lastTitle == document.title) {
            var donatebtn = document.getElementById('tutorial');  
            donatebtn.addEventListener('click', function() {
                window.location = "./tutorial/tutorial.html";
            })}

    var Upgrade = document.getElementById('Upgrade'); 
    chrome.storage.local.get('removeupgrade', function(result) { 
    if (result.removeupgrade == 1){ document.getElementById('Upgrade').style.setProperty("display", "none", "important");}
    else
    Upgrade.addEventListener('click', function() {
        console.log("upgrade")
      var w = 550;
      var h = 440;
      var left = (screen.width/2)-(w/2);
      var top = (screen.height/2)-(h/2); 
      chrome.windows.create({'url': 'upgrade.html', 'type': 'popup', 'width': w, 'height': h, 'left': left, 'top': top} )
      window.close()
    })})
})