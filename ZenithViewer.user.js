// ==UserScript==
// @name         Zenith Viewer
// @namespace    http://tampermonkey.net/
// @version      1.0b
// @description  try to take over the world!
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @author       NitroCipher / ZenithKnight
// @match        https://www.youtube.com/watch?v=*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var baseURL = "https://you-link.herokuapp.com/?url=https://www.youtube.com/watch?v=";
    var vidID = getUrlVars()["v"];
    var newURL = (baseURL + vidID);
    var parsedURL;
    var relatedLinks = "<div #upnext style='font-size: 16px;'>Related:</div><br/>";

    setTimeout(function(){ replaceVideo(); }, 3000);

    function replaceVideo() {
        if ($("yt-player-error-message-renderer")[0]){
            $.getJSON(newURL, function(data) {
                //data is the JSON string
                parsedURL = data[0].url;
                //alert(parsedURL);
                $("yt-player-error-message-renderer").replaceWith(`<video autoplay width="`+document.getElementById("primary-inner").offsetWidth+`" controls><source src="` +parsedURL+ `" type="video/mp4"></video>`);
            });
            var relatedAPI = "https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=" +vidID+ "&type=video&maxResults=10&key=AIzaSyD1Nal2lugzvpAwTYh7g4W0tETmrjSlxKY";
            $.getJSON(relatedAPI, function(data) {
                //alert(data.items[0].snippet.title);
                data.items.forEach(getRelated);
                $("#related").replaceWith(relatedLinks);
            });
        }
    }

    function getRelated(item, index) {
        //relatedLinks = relatedLinks + "<br/>";
        relatedLinks = relatedLinks + `<div style="display: table-row;"><a href=https://www.youtube.com/watch?v=` +item.id.videoId+ `><img width="168" style="display: table-cell;" src=` +item.snippet.thumbnails.medium.url+ `></img></a><div #video-title style="font-size: 14px; font-weight: 500; display: table-cell;">` +item.snippet.title+ `</div></div><br/>`;
    }

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
})();
