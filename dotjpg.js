document.addEventListener('DOMContentLoaded', function () {
btnsubmit = document.getElementById('btnsubmit');
gliderhead = document.querySelector("#gliderhead")
gliderhead.style.display = "none"
btnsubmit.addEventListener('click', function(){
btnsubmit1 = document.getElementById("submitvalue").value;
function searchie(){
  container = document.getElementById('container')
  container.innerHTML = "";
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
        x.setAttribute("href", images[i]);
        container.appendChild(div)
        div.appendChild(x);
    }
    gliderhead.style.display = "block"
    new Glider(document.querySelector('.glider'), {
      slidesToShow: 4,
      slidesToScroll: 4,
      draggable: true,
      dots: '.dots',
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
      }
    });
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
})      
 }
)