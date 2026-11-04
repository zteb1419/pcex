const button = document.createElement('button');
button.id = "bmButton";
button.textContent = "Bookmark It!";
button.style="background-color:#ffcc00; border-radius: 5px";


var interval = setInterval(function() {
  if(document.readyState === 'complete') {
    
    if (document.querySelector("#end")) {
      document.querySelector("#end").prepend(button);
      console.log("Button Added!");
      clearInterval(interval);
    }
  }    
}, 200);

String.prototype.toSeconds = function () { 	if (!this) return null; 	var ms = this.split(':'); 	return ( (+ms[0]) * 60 + (+ms[1] || 0));  }

button.addEventListener('click', () => {
  let curTime = document.querySelector(".ytp-time-current").innerHTML;
  curTime = curTime.toSeconds();
  console.log("Button Clicked, at: ", curTime);

  curTime ? chrome.runtime.sendMessage({bmCreate: true, position: curTime, vtitle: document.querySelector("#title > h1 > yt-formatted-string").innerText, function(response) {
    console.log(response.ok);
  }}) : alert("Bookmark cannot be created.");
  
});

chrome.runtime.onMessage.addListener((request, sender, response) => {
  alert('Bookmark: \n' + request.nbm.title.toUpperCase() + ' at '+ request.nbm.url.split('&')[1] + '\nCreated Successfully');
  console.log(request.nbm);
} )
