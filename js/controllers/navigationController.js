'use strict';

masterMapApp.controller('NavigationCtrl',
  function NavigationCtrl($scope, $rootScope) {

})


/*

   	  var routes={
      $scope.$route = $route;
      $scope.$location = $location;
      $scope.$routeParams = $routeParams;
   	  	'/': {templateUrl: 'views/main.html'},
   	  	'/work/': {templateUrl: 'views/work.html'},
   	  	'/media/': {templateUrl: 'views/media.html'},
   	  	'/links/': {templateUrl: 'views/links.html'},
   	  	'/contact/': {templateUrl: 'views/contact.html'}
   	  }
      $scope.Home = 'localization.filter("_Home_")';
      $scope.work = "Work";
      $scope.media = "Media";
      $scope.links = "Links";
      $scope.contact = "Contact";
   	  var defaultRoute=routes["/"];
   	  $scope.$watch(function(){
   	  	return $location.path();
   	  }, function(newPath){
   	  	$scope.selectedRoute=routes[newPath] || defaultRoute;
   	  });
   	  /* localize
   	  
   	      $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/work/', {
        templateUrl: 'views/work.html',
        controller: 'WorkCtrl'
      })
      .when('/media/', {
        templateUrl: 'views/media.html',
        controller: 'MediaCtrl'
      })
      .when('/links/', {
        templateUrl: 'views/links.html',
        controller: 'LinksCtrl'
      })
      .when('/contact/', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/navigation/', {
        templateUrl: 'views/navigation.html',
        controller: 'NavigationCtrl'
      })

{
	"_Greeting_" : "Welcome to the latest version of my website.",
    "_NavInstruct_":"Select an icon to navigate.",
    "_Home_":"Home",
    "_Work_":"Work",
    "_Media_":"Media",
    "_Links_":"Links",
    "_Contact_":"Contact"
}


function ($scope) {
  	$scope.home = "Home";
  	$scope.work = "Work";
  	$scope.media = "Media";
  	$scope.links = "Links";
  	$scope.contact = "Contact";
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });


<div id="ctrl-as-exmpl" ng-controller="SettingsController1 as settings">
  Name: <input type="text" ng-model="settings.name"/>
  [ <a href="" ng-click="settings.greet()">greet</a> ]<br/>
  Contact:
  <ul>
    <li ng-repeat="contact in settings.contacts">
      <select ng-model="contact.type">
         <option>phone</option>
         <option>email</option>
      </select>
      <input type="text" ng-model="contact.value"/>
      [ <a href="" ng-click="settings.clearContact(contact)">clear</a>
      | <a href="" ng-click="settings.removeContact(contact)">X</a> ]
    </li>
    <li>[ <a href="" ng-click="settings.addContact()">add</a> ]</li>
 </ul>
</div>



/*

{
	"_Greeting_" : "Welcome to the latest version of my website.",
    "_NavInstruct_":"Select an icon to navigate.",
    "_Home_":"Home",
    "_Work_":"Work",
    "_Media_":"Media",
    "_Links_":"Links",
    "_Contact_":"Contact"
}


Look into the individually named location files for values. Key is

{
MissionStatement: "Code and hope for the best.",


}

app.service('translationService', function($resource) {  
        this.getTranslation = function($scope, language) {
            var languageFilePath = 'locale_' + language + '.json';
            $resource(languageFilePath).get(function (data) {
                $scope.translation = data;
            });
        };
    })


  .directive('getTranslation', function() {
    return translationService.getTranslation($scope, $cookies.lang.substring(0,2));
  });
  
  
- See more at: http://codingsmackdown.tv/blog/2012/12/14/localizing-your-angularjs-app/#sthash.GQ1U7h5b.dpuf)
}

<div class="container-fluid" >
    <div class="row-fluid">
        <h2 ng-bind="'_FormControllerTitle_' | i18n"></h2>
    </div>
    <div class="row-fluid">
        <form name="myForm" class="form-horizontal span5 well">
            <div class="row-fluid">
                <input type="text" ng-model="person.FirstName" required id="FirstName" name="FirstName" class="input-large" placeholder="{{'_FirstNameLabel_' | i18n}}" />
            </div>
            <div class="row-fluid">

*/
