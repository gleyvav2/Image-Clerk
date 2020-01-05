document.addEventListener('DOMContentLoaded', function () {
btnsubmit = document.getElementById('btnsubmit');
btnsubmit.addEventListener('click', function(){
    container = document.getElementById('container')
    container.innerHTML = "";
btnsubmit1 = document.getElementById("submitvalue").value;
var searchNumber = 1
var request = new XMLHttpRequest();
    request.open('GET',"https://www.googleapis.com/customsearch/v1?q="+btnsubmit1+"&cx=003698229636584901938%3Aphcqygc4eow&num=6&searchType=image&start="+searchNumber+"&key=AIzaSyAtOATS6Oexri75oO_ykPXR4QzsZ8AX0-o" , true);
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
         container = document.getElementById('container')
        for (i = 0; i < imagesTN.length; i++) {
        var x = document.createElement("IMG");
        x.setAttribute("src", imagesTN[i]);
        x.setAttribute("width", "210");
        x.setAttribute("height", "125");
        x.setAttribute("href", images[i]);
        container.appendChild(x);
        var x1 = document.createElement("button");
        x1.setAttribute("src", images[i]);
        x1.setAttribute("value", "Expand");
        container.appendChild(x1);
        reloadpls = 1
console.log(jsonResponse)

    }


        }}}})
        next6 = document.getElementById('next6');
        next6.addEventListener('click', function(){
        })

 
      
 }
)