#### ReadMe.md

Planet Kevin Pocket Edition (PKPE) is an interactive country information 
app. It integrates an Angular application with a url-based SVG file, 
which is accessed through d3.js, as a controller. It uses localStorage to 
save 3Mb in two files (the SVG and the Country Data) so that there is
only a one time hit for the assets. It uses less.js to provide device-
specific CSS. It can be tested using the Selenium webdriver by running 
the file "seleniumTests.js" from node at the command line.

#### Logic Flow

PKPE is a bootstrapped angular application. Due to the loading 
requirements of the framework and its assets, it was determined that a non-
framework-based intro screen would be less intrusive to endusers. This 
permits a short animation to either welcome users for the first time,
or a shorter animation to welcome back return visitors. While the 
animation is displayed, the background work of the app loading takes
place.

#### Preloader and Less

The index page passes several variables to Less, and updates them 
when the window is resized or the orientation is changed. The
properties that are device and browser specific include:

**uaFont**:		This is set for each browser/device type.

**bigW**:		This refers to the width in landscape mode.

**smallW**:		This refers to the width in portrait mode.

**halfW**:		This is equal to half the landscape width.

These are updated through the getCurrentDimensions function.

--- To Do: There are some configurations that result in
    a cropped navigation: specifically, landscape views that 
    are close to square. This requires some additional
    business logic that tests not only portrait/landscape
    orientation, but also that makes allowance for aspect
    ratios like 5:4, 9:8---displays that correspond to 
    desktop users who resize their window arbitrarily.

#### Index.php Structure

The index page includes a minimal amount of JavaScript and CSS in 
order for the page to be fast loading. It loads a number of libraries
and angular modules in the HEAD element, and then presents a
stripped down Div structure that supports the angular app. The div
with id, animStepIntro contains the business logic to support the
intro animation and the localStorage management of the SVG and
country data asset files.

The div with id, masterMapApp contains the angular application.
Those familiar with angular attributes, such as ng-show, ng-include,
and ui-view will recognize their utility. Conditional classes
and ngModel-supported content can be seen throughout the div elements.

There is no hard-coded text in the angular app. These exist in the 
locale_en.json file and demonstrate localization. This is achieved 
through the filter "i18nObj" in the i18nObj_module.js file. It 
provides a hierarchical method of localizing page contents.

--- NB, although the application was designed for locale_XX.json
	file to support language variations, in the PKPE app, localization
	is provided by Google Translate. This is augmented by the use of
	the skiptranslate class, provided by Google to protect areas that
	are not desired to be translated.

#### masterMapApp.js

The angular application is contained in masterMapApp.js. It references
a number of existing modules, as well as a number of custom modules, 
such as:

**d3Module**:		Used to interact with the SVG world map.

**mapModule**:		Used to interact with the Google Maps API

**weatherModule**:	Disabled currently due to usage restrictions

**il8nObj**:		Used to provide localization functionality

**localCRUD**:		Provides localStorage functionality

A number of properties and functions used across modules are 
attached to $rootScope here. 

A number of $broadcast events, as well as the application's
routing requirements, are defined here.


#### Structure:

	index.php 	preloader and local storage check
	index2.php 	principal file
	--assets 	images
	--css 		main.less, single stylesheet
	--js
		--controllers
				assigned one for each graphic element (view)
		--l18n
				localization
		--libs
				angular, d3, jquery, less, underscore
		--modules
				business logic
	--php 		Not Included
	--testing	Various testing frameworks
	--views		each independent screen element has its own view

This code is not guaranteed to do anything. There are many bugs that 
I know to exist and many others that I do not. This page will be
updated to remain current with the application content files. Contact
kevin@planetkevin.com for additional information.

This page was last updated October 3, 2014.

