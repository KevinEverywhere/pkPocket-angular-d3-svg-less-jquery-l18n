<!doctype html>
<html>
<head><title>PK Pocket Edition Loading...</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="Preloader">
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name = "viewport" content="initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,width=device-width" />
<!--

    This page performs preloading and storage functions for the
    Planet Kevin Pocket Edition App. It tests for the availability
    of cached SVG and PHP information, and if available, sends the 
    user to index2.php, the actual home page. If not available, it
    preloads these two heavy assets, and then forwards the user to 
    the actual home page.


-->
        <style type="text/css">
            div{
                text-align: center;
                margin: auto;
                padding: 1em;
                vertical-align: middle;
                width: 100%;
                height: 100%;
                overflow: hidden;
                font: 700 small-caps 1.2em arial;
                color:  #700;
            }

            @media screen and (min-width: 720px){
                div{
                    font: 700 small-caps 1.6em arial;
                }
            }

            .fromZero{
                position: absolute;
                left: 0em;
                top: 8em;
                opacity: 0;
            }
            .loader{
                position: absolute;
                top: 0em;
                left: 0em;
                right: 0em;
                bottom: 0em;
                z-index: 987654321;
                width: 100%;
                height: 100%;
            }
            .yinYang{
                position: absolute;
                top: -2.0em;
                left: 0em;
                right: 0em;
                background-image:  url(assets/yinYang.png);
                width: 360px;
                height: 360px;
                margin: auto;
                padding: 0em;
                fill: #000;
                color: #000;
                transform:scale(.1);
            }
            .animCircleInf{
                -webkit-animation: animCircle 1.5s linear 0s 9;
                -moz-animation:    animCircle 1.5s linear 0s 9;
                -o-animation:      animCircle 1.5s linear 0s 9;
                animation:         animCircle 1.5s linear 0s 9;
            }
            @-webkit-keyframes animCircle{
               0%   {-webkit-transform: rotate( 0deg) scale(.2);}
              25%  {-webkit-transform: rotate( 90deg) scale(.225);}
              50%  {-webkit-transform: rotate( 180deg) scale(.25);}
              75%  {-webkit-transform: rotate( 270deg) scale(.225);}
              100% {-webkit-transform: rotate( 360deg) scale(.2);}
            }
            @-moz-keyframes animCircle{
               0%   {transform: rotate( 0deg) scale(.2);}
              25%  {transform: rotate( 90deg) scale(.225);}
              50%  {transform: rotate( 180deg) scale(.25);}
              75%  {transform: rotate( 270deg) scale(.225);}
              100% {transform: rotate( 360deg) scale(.2);}
            }
            @-o-keyframes animCircle{
               0%   {transform: rotate( 0deg) scale(.2);}
              25%  {transform: rotate( 90deg) scale(.225);}
              50%  {transform: rotate( 180deg) scale(.25);}
              75%  {transform: rotate( 270deg) scale(.225);}
              100% {transform: rotate( 360deg) scale(.2);}
            }
            @keyframes animCircle{
               0%   {transform: rotate( 0deg) scale(.2);}
              25%  {transform: rotate( 90deg) scale(.225);}
              50%  {transform: rotate( 180deg) scale(.25);}
              75%  {transform: rotate( 270deg) scale(.225);}
              100% {transform: rotate( 360deg) scale(.2);}
           }
           @-webkit-keyframes fadeOut{
              0%   { opacity: 0;left: -60em;}
              20% { opacity: 1;left: -2em; }
              80% { opacity: 1;left: -1em; }
              100%   { opacity: 0;left: 60em;}
            }
            @-moz-keyframes fadeOut{
              0%   { opacity: 0;left: -60em;}
              20% { opacity: 1;left: -2em; }
              80% { opacity: 1;left: -1em; }
              100%   { opacity: 0;left: 60em;}
            }
            @-o-keyframes fadeOut{
              0%   { opacity: 0;left: -60em;}
              20% { opacity: 1;left: -2em; }
              80% { opacity: 1;left: -1em; }
              100%   { opacity: 0;left: 60em;}
            }
            @keyframes fadeOut{
              0%   { opacity: 0;left: -60em;}
              20% { opacity: 1;left: -2em; }
              80% { opacity: 1;left: -1em; }
              100%   { opacity: 0;left: 60em;}
            }

            @-webkit-keyframes fadeIn{
              0%   { opacity: 0;left: 0.8em;}
              20% { opacity: 1;left: -0.8em; }
              80% { opacity: 1;left: -2em; }
              100%   { opacity: 0;left: -60em;}
            }
            @-moz-keyframes fadeIn{
              0%   { opacity: 0;left: 0.8em;}
              20% { opacity: 1;left: -0.8em; }
              80% { opacity: 1;left: -2em; }
              100%   { opacity: 0;left: -60em;}
            }
            @-o-keyframes fadeIn{
              0%   { opacity: 0;left: 0.8em;}
              20% { opacity: 1;left: -0.8em; }
              80% { opacity: 1;left: -2em; }
              100%   { opacity: 0;left: -60em;}
            }
            @keyframes fadeIn{
              0%   { opacity: 0;left: 0.8em;}
              20% { opacity: 1;left: -0.8em; }
              80% { opacity: 1;left: -2em; }
              100%   { opacity: 0;left: -60em;}
            }
            .step1{
                -webkit-animation: fadeIn 1s ease-in-out 0s;
                -moz-animation:    fadeIn 1s ease-in-out 0s;
                -o-animation:      fadeIn 1s ease-in-out 0s;
                animation:         fadeIn 1s ease-in-out 0s;
            }
            .step2{
                -webkit-animation: fadeIn 1.2s ease-in-out 1s;
                -moz-animation:    fadeIn 1.2s ease-in-out 1s;
                -o-animation:      fadeIn 1.2s ease-in-out 1s;
                animation:         fadeIn 1.2s ease-in-out 1s;
            }
            .step3{
                -webkit-animation: fadeIn 1.1s ease-in-out 2.3s;
                -moz-animation:    fadeIn 1.1s ease-in-out 2.3s;
                -o-animation:      fadeIn 1.1s ease-in-out 2.3s;
                animation:         fadeIn 1.1s ease-in-out 2.3s;
            }
            .step4{
                -webkit-animation: fadeOut 1s ease-in-out 3.5s;
                -moz-animation:    fadeOut 1s ease-in-out 3.5s;
                -o-animation:      fadeOut 1s ease-in-out 3.5s;
                animation:         fadeOut 1s ease-in-out 3.5s;
            }
        </style>
    </head>
    <body>
        <div class="loader">
        <div class="yinYang animCircleInf"></div>
            <script>

                function closeChild(){
                    document.getElementById("preview").style.display="none";
                    document.body.removeChild(document.getElementById('preview'));
                }

                var d3DataURL="../angular/php/countryJSONObj.php";
                var svgWorldURL="../svgVideo/d3World.fxg.svg";
                var prepped=[{"d3Data":false,"svgWorld":false}];
                function doNext() {
                    if(prepped["d3Data"] && prepped["svgWorld"]){
                      location.href="index2.php#/country/";
                    }else{
                      setTimeout("doNext()",1000);
                    }
                }
                function doThenStore(localValue, hasFunc) {
                    if(window.XMLHttpRequest) {
                        window[localValue]= new XMLHttpRequest();
                    } else if(window.ActiveXObject) {
                        window[localValue]= new ActiveXObject("Microsoft.XMLHTTP");
                    } else {
                        return false;
                    }
                    var _localValue=localValue;
                    var _hasFunc=(hasFunc ? hasFunc : null);
                    window[localValue].open("GET", window[localValue + "URL"], true);
                    window[localValue].send(null);
                    window[localValue].onreadystatechange=function() {
                        if (window[localValue].readyState == 4){
                            if (window[localValue].status == 200) {
                                if(_hasFunc){
                                    localStorage[localValue]=window[_hasFunc](window[localValue].responseXML);
                                }else{
                                    localStorage[localValue]=window[localValue].responseXML;
                                }
                                prepped[localValue]=true;
                            } else {
                                alert("There was a problem retrieving the XML data:\n" + window[localValue].statusText);
                            }
                        }
                    }
                }

                function xmlToString(xml){
                    try{
                        var oSerializer = new XMLSerializer();
                        var sXML = oSerializer.serializeToString(xml);
                        return sXML;
                    }catch(oops){
                        return xml;
                    }
                };
                function checkAvailable(which, hasFunc) {
                    var isReady=true;
                    if(!localStorage[which]){
                        doThenStore(which, hasFunc);
                        isReady=false;
                    }else{
                        prepped[which]=true;
                    }
                    return isReady;
                };
                function canStore() {
                    try {
                        return 'localStorage' in window && window['localStorage'] !== null;
                    } catch (e) {
                        return false;
                    }
                }
                if(canStore()){
                    var searchURLs=true;
                    if(!checkAvailable("svgWorld", "xmlToString")){
                      searchURLs=false;
                    }
                    if(!checkAvailable('d3Data')){
                      searchURLs=false;
                    }
                    var str="";
                    if(searchURLs){
                        str+='<div class="fromZero step1"><p>Welcome back!</p></div>';
                        if(top.location.href.indexOf("angular/index2.php")==-1){
                            setTimeout("doNext()",1500);
                        }
                    }else{
                        setTimeout("doNext()",4800);
                        if(localStorage["pkVisited"]){
                            str+='<div class="fromZero step1"><p>Welcome back to</p></div>';
                            str+='<div class="fromZero step2"><p>Planet Kevin</p></div>';
                            str+='<div class="fromZero step3"><p>Loading Assets...</p></div>';
                            str+='<div class="fromZero step4"><p>Loading...</p></div>';
                        }else{
                            str+='<div class="fromZero step1"><p>Welcome to</p></div>';
                            str+='<div class="fromZero step2"><p>Planet Kevin</p></div>';
                            str+='<div class="fromZero step3"><p>Loading Assets...</p></div>';
                            str+='<div class="fromZero step4"><p>Loading...</p></div>';
                            localStorage["pkVisited"]=true;
                        }
                    }
                    document.write(str);
                    console.log(str);
                }else{
                    document.write('<div class="noStep"><p>This content can not be seen in your device and browser combination.</p></div>')
                }
                /*
                */
            </script>
        </div>
    </body>
</html>
