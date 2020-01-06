document.addEventListener('DOMContentLoaded', function () {
btnsubmit = document.getElementById('btnsubmit');
gliderhead = document.querySelector("#gliderhead")
gliderhead.style.display = "none"
btnsubmit.addEventListener('click', function(){
btnsubmit1 = document.getElementById("submitvalue").value;
function searchie(){
$( "#gliderhead" ).load(window.location.href + " #gliderhead" );
var searchNumber = 1
var request = new XMLHttpRequest();
    request.open('GET',"https://www.googleapis.com/customsearch/v1?q="+btnsubmit1+"&cx=003698229636584901938%3Aphcqygc4eow&num=10&searchType=image&start="+searchNumber+"&key=AIzaSyAtOATS6Oexri75oO_ykPXR4QzsZ8AX0-o" , true);
    request.setRequestHeader('Accept', 'application/json');
    request.send()
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200){ 
          data = request.responseText; 
          var jsonResponse = JSON.parse(data);
          items = jsonResponse.items;
         let imagesTN = items.map(items => items.image.thumbnailLink )
         let images = items.map(items => items.link )
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
        btn.setAttribute("id","Expand")
        btn.setAttribute("data-zoom-src", images[i]);
        btn.innerHTML = 'Expand';
        btn2 = document.createElement("button")
        btn2.setAttribute("id","save")
        btn2.setAttribute("data-zoom-src", images[i]);
        btn2.innerHTML = 'save'
        div.appendChild(x);
        div.appendChild(btn);
        div.appendChild(btn2);
        btnexpand = document.getElementById('Expand');
    }
    btnexpand.addEventListener('click', function(){
      var w = 850;
         var h = 320;
         url = images
         var left = (screen.width/2)-(w/2);
         var top = (screen.height/2)-(h/2); 
         chrome.windows.create({'url': images, 'type': 'popup', 'width': w, 'height': h, 'left': left, 'top': top} )})
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
    });
    const zoomDefault = mediumZoom('#zoom-default',{   background: 'rgba(25, 18, 25, .9)',

  })

    document.querySelector('.glider').addEventListener('glider-slide-visible', function(event){
      var imgs_to_anticipate = 3;
      var glider = Glider(this);
      for (var i = 0; i <= imgs_to_anticipate; ++i){
        var index = Math.min(event.detail.slide + i, glider.slides.length - 1),
          glider = glider;
        loadImages.call(glider.slides[index],function(){
          glider.refresh(true);
        })
      }
    });
    function loadImages(callback){
      [].forEach.call(this.querySelectorAll('img'),function(img){
        var _img = new Image,  _src = img.getAttribute('data-src');
        _img.onload = function(){
          img.src = _src;
          img.classList.add('loaded');
          callback && callback(img);
        }
        if(img.src !== _src)	_img.src = _src;
      });
    }
    
  }

}}

}
searchie()   
window.addEventListener("keydown", function(e){
  if(e.keyCode == 13){ btnsubmit1 = document.getElementById("submitvalue").value;
 searchie() }})
})      
 }
)