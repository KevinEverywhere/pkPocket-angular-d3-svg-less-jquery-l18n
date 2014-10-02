<!doctype html>
<html>
<head>
<title>Planet Kevin Pocket Edition</title>
<link rel="dns-prefetch" href="//www.planetkevin.com">
<link rel="prefetch" href="//www.planetkevin.com">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="keywords" content="Angular -> SVG -> D3 -> JQuery -> Google Map v3 -> Less -> AJAX -> JavaScript -> HTML">
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name = "viewport" content="initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,width=device-width" />

<meta name="google-translate-customization" content="6443661d1806cc88-e247877e22d7d36d-g9c137a6467da3e2a-1c"></meta>

<script src='js/libs/jquery-1.9.1.min.js'></script>

<link rel="stylesheet/less" type="text/css" href="css/main.less" />
<script>
  $(document).ready(function (){
      var controllers=[
          "body",
          "key",
          "main",
          "footer",
          "contact",
          "navigation",
          "travel",
          "translate",
          "weather",
          "wikipedia",
          "currency",
          "svg",
          "ad"
      ];
      setTimeout(function(){
        var _script;
        $.each( controllers, function( index, value ){
            _script = document.createElement( "script" );
            _script.type = "text/javascript";
            _script.src = "js/controllers/" + value + "Controller.js";
            $("body").append(_script);
        });
      }, 500);
  });

/*
    Less is used to support responsive design, and with the variables defined 
    below, it passes JS window information as variables. This was required to 
    support the known size, 1080 x 460, of the SVG world map. 

    The resizing and orientation events affect the Less global variables, so
    all of its business logic is included together in this script element.
*/
var svgW=1080, svgH=460, bigW, smallW, halfW, thirdW, scaleW, scaleH, padding=10,
userAgent=navigator.userAgent,uaFont="";

if(userAgent.toLowerCase().indexOf("chrome")!=-1){
    uaFont="Roboto";
}else{
    if(userAgent.toLowerCase().indexOf("firefox")!=-1){
        uaFont='"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue"';
    }else if(userAgent.toLowerCase().indexOf("firefox")!=-1){
        uaFont='"Helvetica Neue Interface m3"';
    }
}

if (uaFont.length>0) {
    uaFont+= ", ";
}

uaFont+="Arial, sans-serif";

function changeOrient(evt){
    getCurrentDimensions();
    less.modifyVars({
        "@_BigW":(bigW * scaleW)-padding + "px",
        "@_SmallW":(smallW * scaleW)-padding + "px",
        "@_HalfW":((bigW-smallW)-padding  * scaleW) + "px",
        "@HalfW":((bigW / 2)  * scaleW) + "px",
        "@ThirdW":((bigW / 3)  * scaleW) + "px",
        "@QtrW":((bigW / 4)  * scaleW) + "px",
        "@_BigH":(svgHeight(bigW)-padding * scaleW) + "px",
        "@_SmallH":(svgHeight(smallW)-padding * scaleW) + "px",
        "@_HalfH":(smallW * scaleW) + "px",
        "@userFont":uaFont
    });
    console.log("$window.changeOrient");
}    

function getCurrentDimensions(){
    try{
        bigW=Math.max(window.innerWidth, window.innerHeight);
        smallW=Math.min(window.innerWidth, window.innerHeight);
    }catch(noBodyClient){
        try{
            bigW=Math.max(document.body.clientWidth, document.body.clientHeight);
            smallW=Math.min(document.body.clientWidth, document.body.clientHeight);
        }catch(noBodyClient){
            bigW=Math.max(window.screen.width, window.screen.height);
            smallW=Math.min(window.screen.width, window.screen.height);
        }
    }
    halfW=bigW/2;
    thirdW=bigW/3;
    scaleW=1; // svgW/bigW;
}

function svgHeight(num){
    return Math.round(svgH/svgW * num);
}

getCurrentDimensions();

less = {
    env: "development",
    async: false,
    fileAsync: false,
    poll: 1000,
    globalVars:{
        _BigW:(bigW * scaleW)-padding + "px",
        _SmallW:(smallW * scaleW)-padding + "px",
        _HalfW:((bigW-smallW)-padding  * scaleW) + "px",
        HalfW:((bigW / 2)  * scaleW) + "px",
        ThirdW:((bigW / 3)  * scaleW) + "px",
        QtrW:((bigW / 4)  * scaleW) + "px",
        _BigH:(svgHeight(bigW)-padding * scaleW) + "px",
        _SmallH:(svgHeight(smallW)-padding * scaleW) + "px",
        _HalfH:(smallW * scaleW) + "px",
        userFont:uaFont
    },
    dumpLineNumbers: "comments",
    relativeUrls: false,
    rootpath: ""
};

window.addEventListener('orientationchange', changeOrient, false);
window.addEventListener('resize', changeOrient, false);

</script>

<script src="js/libs/less-1.7.0.min.js"></script>
<!-- script type="text/javascript" src="http://developer.oanda.com/oandajs/oanda.js"></script -->
<script src="http://maps.google.com/maps/api/js?v=3.2&sensor=false"></script>
<script src='js/libs/d3.v3.min.js'></script>

<script src='js/libs/angular.js'></script>
<script src="js/modules/angular-animate.js"></script>
<script src="js/modules/angular-route.js"></script>
<script src="js/modules/angular-ui-router.js"></script>
<script src="js/modules/less_ng_module.js"></script>
<script src="js/modules/local_crud_module.js"></script>
<script src="js/modules/d3_module.js"></script>
<script src="js/modules/map_module.js"></script>
<script src="js/modules/il8nObj_module.js"></script>
<script src="js/modules/weather_module.js"></script>

    </head>
    <body>
<div class="fullSize" id="completeContainer">

        <div id="introDivHolder" class="loader">
        <div class="yinYang animCircleInf introDiv"></div>
        <div id="animStepIntro">
            <script>

                var d3DataURL="php/countryJSONObj.php";
                var svgWorldURL="assets/d3World.fxg.svg";
                var prepped=[{"d3Data":false,"svgWorld":false}];
                function doNext() {
                    if(prepped["d3Data"] && prepped["svgWorld"]){
                       try{
                        console.log("app starting...");
                          document.getElementById("introDivHolder").style.visibility="hidden";
                          document.getElementById("introDivHolder").style.display="none";
                          angular.bootstrap(document, ['masterMapApp']);
                      }catch(oops){
                        setTimeout("doNext()",1000);
                      }
                      if(location.href.indexOf("/country/")==-1){
                        location.href="#/country/";
                      }
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
                      str+='<div class="fromZero step1 introDiv"><p>Welcome back!</p></div>';
                      setTimeout("doNext()",1500);
                    }else{
                        setTimeout("doNext()",4000);
                        if(localStorage["pkVisited"]){
                            str+='<div class="fromZero step1 introDiv"><p>Welcome back to</p></div>';
                            str+='<div class="fromZero step2 introDiv"><p>Planet Kevin</p></div>';
                            str+='<div class="fromZero step3 introDiv"><p>Loading Assets...</p></div>';
                            str+='<div class="fromZero step4 introDiv"><p>Loading...</p></div>';
                        }else{
                            str+='<div class="fromZero step1 introDiv"><p>Welcome to</p></div>';
                            str+='<div class="fromZero step2 introDiv"><p>Planet Kevin</p></div>';
                            str+='<div class="fromZero step3 introDiv"><p>Loading Assets...</p></div>';
                            str+='<div class="fromZero step4 introDiv"><p>Loading...</p></div>';
                            localStorage["pkVisited"]=true;
                        }
                    }
                    document.write(str);
                    console.log(str);
                }else{
                    document.write('<div class="noStep introDiv"><p>This content can not be seen in your device and browser combination.</p></div>')
                }
                /*
                */
            </script>
        </div>
      </div>
        <div id="masterMapApp" class="fullSize">
            <div ng-controller="BodyController" ng-init="$rootScope.svgToggle=true" class="fullSize">
                <div ui-view="main" id="main" class="padded"></div>
                <div ng-show="isLoaded==true" id="container" class="container">
                    <div id="firstGroup">
                        <div id="svgMap" ng-show="$rootScope.svgToggle==true" ng-include src="'views/svg-map.html'"></div>
                        <div id="countryMapHolder" ng-init="countryToggle=true" class="holder {{countryToggle==true ? 'expanded' : 'collapsed'}}">
                            <div class="toggler" class='countryMap' id="googleMapHeader">
                                <span ng-click="countryToggle=!countryToggle">
                                    {{'locale' | i18nObj:'_CountryToggle_'}}
                                </span>
                                <span class="smallSpan" ng-show="$rootScope.svgToggle==false" ng-click="$rootScope.svgToggle=!$rootScope.svgToggle">
                                    {{'locale' | i18nObj:'_ShowWorld_'}}
                                </span>
                                <span class="smallSpan" ng-show="$rootScope.svgToggle==true" ng-click="$rootScope.svgToggle=!$rootScope.svgToggle">
                                    {{'locale' | i18nObj:'_HideWorld_'}}
                                </span>
                            </div>
                            <div class="{{countrySelected==true ? '' : ($rootScope.svgToggle==true ? '' : 'tempClassFull')}}" id="googleMap" ui-view="googleMap">{{'locale' | i18nObj:'_CountryInfo_'}}</div>
                            <!-- div class="{{countrySelected==true ? '' : ($rootScope.svgToggle==true ? 'tempClass' : 'tempClassFull')}}" id="googleMap" ui-view="googleMap">{{'locale' | i18nObj:'_CountryInfo_'}}</div>
                            <div class="{{$rootScope.svgToggle==true ? 'tempClass' : 'tempClass'}}" id="googleMap" ui-view="googleMap">{{'locale' | i18nObj:'_CountryInfo_'}}</div>
                            <div class="{{countrySelected==true ? '' : 'tempClass'}}" id="googleMap" ui-view="googleMap">{{'locale' | i18nObj:'_CountryInfo_'}}</div -->
                        </div>
                    </div>
                    <div id="secondGroup">
                        <div id="weatherHolder" ng-init="$rootScope.weatherToggle=false" class="holder {{$rootScope.weatherToggle==true ? 'expandedSmall' : 'collapsed'}}">
                            <div class="toggler" ng-click="$rootScope.weatherToggle=!$rootScope.weatherToggle" id="weatherHeader">{{'locale' | i18nObj:'_WeatherToggle_'}}</div>
                            <div class="collapsableSmall" ng-show="$rootScope.weatherToggle==true" id="weatherView" ng-include src="'views/weatherView.html'"></div>
                        </div>
                        <div id="travelHolder" class="holder {{travelToggle==true ? 'expandedSmall' : 'collapsed'}}">
                            <div class="toggler" ng-click="travelToggle=!travelToggle" id="travelHeader">{{'locale' | i18nObj:'_TravelToggle_'}}</div>
                            <div class="collapsableSmall" ng-show="travelToggle==true" id="travelView" ng-include src="'views/travelView.html'"></div>
                        </div>
                        <div id="wikipediaHolder" class="holder {{wikipediaToggle==true ? 'expandedSmall' : 'collapsed'}}">
                            <div class="toggler" ng-click="wikipediaToggle=!wikipediaToggle" id="wikipediaHeader">{{'locale' | i18nObj:'_WikipediaToggle_'}}</div>
                            <div class="collapsableSmall" ng-show="wikipediaToggle==true" id="wikipediaView" ng-include src="'views/wikipediaView.html'"></div>
                        </div>
                        <div id="currencyHolder" class="holder {{currencyToggle==true ? 'expandedSmall' : 'collapsed'}}">
                            <div class="toggler" ng-click="currencyToggle=!currencyToggle" id="currencyHeader">{{'locale' | i18nObj:'_CurrencyToggle_'}}</div>
                            <div class="collapsableSmall" ng-show="currencyToggle==true" id="currencyView" ng-include src="'views/currencyView.html'"></div>
                        </div>
                        <div ng-init="adToggle=true" id="adHolder" class="holder {{adToggle==true ? 'expanded' : 'collapsed'}}">
                            <div class="toggler" ng-click="adToggle=!adToggle" id="adHeader">{{'locale' | i18nObj:'_AboutToggle_'}}</div>
                            <div class="collapsableSmall" ng-show="adToggle==true" id="adView" ng-include src="'views/adView.html'"></div>
                        </div>
                    </div>
                </div>
                <div id="pageBottom" class="pageBottom">
                    <div class="rightFloater">{{'locale' | i18nObj:'_Footer_'}}</div>
                    <div class="leftFloater">
                        <div id="translateHolder" ng-include src="'views/translateView.html'"></div>
                    </div>
                    </div>
                <div ng-show="isLoaded==false" id="interstitial">{{'locale' | i18nObj:'_Loading_'}}</div>
                <div id="doesnotWork">{{'locale' | i18nObj:'_NoWork_'}}</div>
            </div>
        </div>
        </div>
        <script src='js/masterMapApp.js'></script>
    </body>
</html>
