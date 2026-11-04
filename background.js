chrome.runtime.onInstalled.addListener(() => console.log("VBookmarker installed."));

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url +"?t=" + request.position :
                "from the extension");
    if (request.bmCreate) {
      sendResponse({ok: "Bookmark Created."});
      chrome.bookmarks.search("Various", function(results) {
        console.log(results);

        chrome.bookmarks.create({'parentId': results[0].id,
          'title': request.vtitle,
          'url': sender.tab.url.split('&')[0] +"&t=" + request.position
          }, newBookmark => {             
              chrome.tabs.query({active: true, currentWindow: true}, tabs => 
                chrome.tabs.sendMessage(tabs[0].id, {nbm: newBookmark}))
          });
      });
    }
  });