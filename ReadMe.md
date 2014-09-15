ReadMe.md

Planet Kevin Pocket Edition is an interactive country information app.
It integrates an Angular application with a url-based SVG file, which 
is accessed through d3.js, as a controller. It uses localStorage to 
save 3Mb in two files (the SVG and the Country Data) so that there is
only a one time hit for the assets. It uses less.js to provide device-
specific CSS. 

Structure:

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
	--views		each independent screen element has its own view

This code is not guaranteed to do anything. There are many bugs that 
I know to exist and many others that I do not. 

This page was last updated September 15, 2014.






