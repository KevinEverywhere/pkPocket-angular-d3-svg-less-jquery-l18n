<?php
//          FILE: proxy.php
//
// LAST MODIFIED: 2006-03-23
//
//        AUTHOR: Troy Wolf <troy@troywolf.com>
//
//   DESCRIPTION: Allow scripts to request content they otherwise may not be
//                able to. For example, AJAX (XmlHttpRequest) requests from a
//                client script are only allowed to make requests to the same
//                host that the script is served from. This is to prevent
//                "cross-domain" scripting. With proxy.php, the javascript
//                client can pass the requested URL in and get back the
//                response from the external server.
//
//         USAGE: "src" required parameter. For example:
//                http://www.mydomain.com/proxy.php?src=http://www.yahoo.com
//                strrpos($haystack, $needle)

require_once("class_http.php");

// proxy.php requires Troy's class_http. http://www.troywolf.com/articles
// Alter the path according to your environment.
// The website, herokuapp.com, says that their API lookup is free. This URL is set to one
// URL at a time (planetkevin.com). It needs to be modified if it is moved. The strrpos
// function looks for planetkevin.com and www.planetkevin.com

$thisServer="planetkevin.com"; // You need to change this to your domain.
$rateServer="rate-exchange.herokuapp.com";
$rateSelf="/fetchRate";
$rateURL="http://" . $rateServer . $rateSelf . "?from=";

$weatherServer="http://api.wunderground.com/api/";
$weatherID="67dbc96b08ac7c32d9"; // YOu need to change this to your wunderground API key.
$weatherFrag1="/geolookup/conditions/forecast/q";
$weatherFrag2=".json";

$weatherURL= $weatherServer . $weatherID . $weatherFrag1;

$wikipediaServerOpen="http://en.wikipedia.org/w/api.php?format=json&action=query&titles=";
$wikipediaServerClose="&prop=revisions&rvprop=content&callback=?";



if(strrpos($_SERVER['SERVER_NAME'], $thisServer)>-1 && strrpos($_SERVER['SERVER_NAME'], $thisServer)<5){

	$src = isset($_GET['src'])?$_GET['src']:false;

	if (!$src) {
	    header("HTTP/1.0 400 Bad Request");
	    echo ""; // proxy.php failed because src parameter is missing";
	    exit();
	}

	// Instantiate the http object used to make the web requests.
	// More info about this object at www.troywolf.com/articles
	if (!$h = new http()) {
	    header("HTTP/1.0 501 Script Error");
	    echo ""; // "proxy.php failed trying to initialize the http object";
	    exit();
	}

	$fetchURL=explode(',',$src);

//	$met = (strlen($fetchURL[0])==3 && strlen($fetchURL[1])==3) ? true : false;
	$wiki = isset($_GET['wiki'])?$_GET['wiki']:false;
	$met = isset($_GET['met'])?$_GET['met']:false;

	if($wiki){
		$h->url = $wikipediaServerOpen  . $wiki  . $wikipediaServerClose;
	}else{
	if($met){
		$h->url = $weatherURL . '/' . $fetchURL[0]  . '/' . $fetchURL[1] . $weatherFrag2;

	}else{
		$h->url = $rateURL . $fetchURL[0]  . '&to=' . $fetchURL[1];

	}
}

		$h->postvars = $_POST;
		if (!$h->fetch($h->url)) {
		    header("HTTP/1.0 501 Script Error");
		    echo ""; // "proxy.php had an error attempting to query the url";
		    exit();
		}

		// Forward the headers to the client.
		$ary_headers = split("\n", $h->header);
		foreach($ary_headers as $hdr) { header($hdr); }


	// Send the response body to the client.
}else{
	echo('{"To":"BAD","From":"SAD","Rate":"0.999"}');
}
echo $h->body;

?>