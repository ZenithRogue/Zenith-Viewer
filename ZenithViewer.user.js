// ==UserScript==
// @name         Zenith Viewer
// @namespace    http://tampermonkey.net/
// @version      0.1
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
    var baseURL = "https://you-link.herokuapp.com/?url=https://www.youtube.com/watch?v="
    var vidID = getUrlVars()["v"];
    var newURL = (baseURL + vidID);
    var parsedURL;

    setTimeout(function(){ replaceVideo(); }, 9000);

    function replaceVideo() {
        if ($("yt-player-error-message-renderer")[0]){
            $.getJSON(newURL, function(data) {
                //data is the JSON string
                parsedURL = data[0].url;
                //alert(parsedURL);
                $("yt-player-error-message-renderer").replaceWith(`<video width="720" controls><source src="` +parsedURL+ `" type="video/mp4"></video>`);
            });
        }
    }

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
})();
