loadScript('https://apis.google.com/js/api.js?onload=onApiLoad');
function loadScript(url){
  var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState !== 4) {
			return;
		}
		if(request.status !== 200){
			return;
		}
		eval(request.responseText);
	};
	request.open('GET', url);
	request.send();
}

var myDate = new Date();
currentdaystring = myDate.toLocaleDateString()
    
//////////////////////////Start verifying license ////////////////
chrome.storage.local.get('globalcount', function(result) {
  var finalcount = result.globalcount
chrome.storage.local.get('showstopper', function(result) {
  showstopper = result.showstopper
chrome.storage.local.get('currentdaystring', function(result) {
  if (showstopper == 1 && result.currentdaystring != currentdaystring ){
    globalcount1 = 0
    chrome.storage.local.set({"globalcount":globalcount1}, function() {})
  }})})
 
chrome.identity.getAuthToken({interactive: true}, function(token) {
var CWS_LICENSE_API_URL = 'https://www.googleapis.com/chromewebstore/v1.1/userlicenses/';
var req = new XMLHttpRequest();
req.open('GET', CWS_LICENSE_API_URL + chrome.runtime.id);
req.setRequestHeader('Authorization', 'Bearer ' + token);
req.onreadystatechange = function() {
  dailylimitchecker = 0
  if (req.readyState == 4) {
    var license = JSON.parse(req.responseText);
    var licenseStatus;
if (license.result && license.accessLevel == "FULL") {
  licenseStatus = "FULL";
if (licenseStatus == "FULL") { dailylimitchecker = 100
  removeupgrade = 1
      chrome.storage.local.set({"removeupgrade":removeupgrade}, function() {})
}
} else if (license.result  == false) {
    licenseStatus = "FREE_TRIAL";
    if (licenseStatus == "FREE_TRIAL") { dailylimitchecker = 15
      removeupgrade = 0
      chrome.storage.local.set({"removeupgrade":removeupgrade}, function() {})
}  
}
  }
chrome.storage.local.set({"dailylimitchecker":dailylimitchecker}, function() {})
}
req.send()
 
chrome.storage.local.get('dailylimitchecker', function(result) {
if (finalcount >= result.dailylimitchecker ) { 
  showstopper = 1
  console.log(showstopper)
  chrome.storage.local.set({"currentdaystring":currentdaystring}, function() {
  })
}else  {showstopper = 0 }
chrome.storage.local.set({"showstopper":showstopper}, function() {})
})})})
 
function counter(){chrome.storage.local.get('globalcount', function(result) {
var finalcount = result.globalcount
var globalcount1 = finalcount || 0 
globalcount1++
chrome.storage.local.set({"globalcount":globalcount1}, function() {})
})}
function stopped(){chrome.storage.local.get('showstopper', function(result) {
  if(result.showstopper == 1){
    var w = 550;
    var h = 440;
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2); 
 
 
    chrome.windows.create({'url': 'upgrade.html', 'type': 'popup', 'width': w, 'height': h, 'left': left, 'top': top} , function(window) {
 },)}})}