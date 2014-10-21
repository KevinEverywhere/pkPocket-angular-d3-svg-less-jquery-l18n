'use strict';

var svgWorldModule = angular.module('svgWorldModule', [])
//		.service('svgWorldService', ["$window", "$rootScope", "$http", "$q", "$state", "MapService", "LocalCRUDService",
		.service('D3Service', ["$window", "$rootScope", "$http", "$q", "$state", "MapService", "LocalCRUDService",
		 function($window, $rootScope, $http, $q, $state, MapService, LocalCRUDService) {
			var jsonURL="assets/world.json"; //"countryJSONObj.php";
			var service={
				_width:-1,
				_height:-1,
				contentArray:[],
				currentContent:-1,
				currentCountry:null,
				currentCountryObj:null,
				currentScale:-1,
				svgClicked:false,
				svgCallTimer:null,
				svgCallTimeoutLength:250,
				selectedColor:"#C00",
				defaultColor:"#FFF",
				defaultSVGWidth:1080,
				defaultSVGHeight:460,
				records:[],
				initialScale:0.4,
				jsonURL:"assets/world.json",
				jsonOBJ:null,
				svgURL:"assets/groupedWorld.svg",
				d3Data:null,
				inited:false,
				initSVG:function(_width, _height, targetContainer, contentAddress){
					this._width=_width;
					this._height=_height;
					this.targetContainer=targetContainer;
					this.contentAddress=contentAddress;
					this.initMyContent();
					this.loadSVG(this.getCurrent());
				},
				createCountryObject:function(obj, svg, whichEl){
					var _this=this,countryObject={
						selectedTimes:0,
						visitedTimes:0,
						parent:_this,
						countryImg:svg, 
						targetImg:whichEl,
						incrSelected:function(){
							this.selectedTimes++;
						},
						_name:function(){
							return this.CountryName.replace("+"," ");
						},
						updateSelectShading:function(){
							var o=Math.max(0.2,(1-(this.selectedTimes/10)));
							$(this.countryImg).attr('opacity',o);
						},
						incrementCount:function(){
							this.visitedTimes++;
						},
						getColor:function(){
							var _color=null;
							try{
								_color=$(this.countryImg).selectAll('g').selectAll('path').attr('fill');
							}catch(oops){
								console.log('getColor oops='+oops);
							}
							return _color;
						//	d3.select("#china").selectAll('g').selectAll('path').attr('fill','#c33');
						},
						setColor:function(_color, _opacity){
							// console.log(this.CountryName + ", color=" + _color + ', opac=' + _opacity + ",this.countryImg=" + this.countryImg);
							try{
								$(this.countryImg).selectAll('g').selectAll('path').attr('fill',_color);
								this.colorChildAreas(_color, _opacity);
							}catch(oops){
							console.log('setColor oops='+oops);
							// d3.select("#china").selectAll('g').selectAll('path').attr('fill','#c33');
							}
							if(_opacity){try{$(this.countryImg).attr('opacity', _opacity);}catch(oops){}}
						},
						colorChildAreas:function(_color, _opacity){
							try{
								$(this.countryImg).selectAll("use")
									.filter(function(){$(this.href.baseVal).
										selectAll('g').select('path').attr('fill',_color);});
							}catch(oops){
								console.log('colorChildareas oops='+oops);
							}
						}
					};
					for(var z in countryObject){
						obj[z]=countryObject[z];
					}
				},
				initCountries:function(){
					for(var z in this.d3Data.world.countries){
						var dd=this.d3Data.world.countries[z].GeoObject;
						try{
							var bv=d3.selectAll("use").filter(function(){return this.href.baseVal=='#'+dd})[0][0];
							this.createCountryObject(
								this.d3Data.world.countries[z],
								bv.href.baseVal,
								d3.select("#" + dd)
							);
						}catch(oops){}
					}
				},
				incrementContent:function(){
					this.currentContent=Math.floor(Math.min(this.currentContent+1,this.contentArray.length-.6));
				},
				loadSVGXML:function(_xml){
					$rootScope.$broadcast("enoughLoaded");
					var xml;
					if(_xml == null){
						xml = LocalCRUDService.manageLocalCRUD('retrieve', 'svgWorld', 'stringToXML');
					}else{
						xml=_xml;
					}
	        		try{
						this.importedNode = document.importNode(xml.documentElement, true);
						d3.select("#" + this.targetContainer).node().appendChild(this.importedNode);
						this.initWorld(true);
						this.initCountries();
					}catch(oops){
		        		try{
		        			var _xml=LocalCRUDService.manageLocalCRUD('retrieve', 'svgWorld','stringToXML');
		                    xml = $.parseXML(_xml);
							this.importedNode = document.importNode(xml.documentElement, true);
							d3.select("#" + this.targetContainer).node().appendChild(this.importedNode);
							this.initWorld(true);
							this.initCountries();
						}catch(oops){
							console.log("Load SVG no noBueno Try-Catch");
						}						
					}
	            },
				loadSVG:function(whatURL){
					$rootScope.$broadcast("svgLoaded");
					var me=this;
					if(document.getElementsByTagName("svg").length===0){
						var _LocalCRUDService=LocalCRUDService;
						if(LocalCRUDService.manageLocalCRUD('retrieve', 'svgWorld')){
							this.loadSVGXML(null);
						}else{
		        			this.d3World=d3.xml(this.getCurrent(), "image/svg+xml",function(xml) {
		        				console.log("xml=" + xml);
								_LocalCRUDService.manageLocalCRUD("create",{"key":"svgWorld","value":xml},"xmlToString");
								me.loadSVGXML(xml);
							});
						}
					}else{
						me.initWorld();
						me.initCountries();
					}
				},
				initWorld:function(init){
					var me=this;
					document.getElementById("theWorld").addEventListener("touchend", function(evt){
						me.svgCall(evt);
					}, false);
					document.getElementById("theWorld").addEventListener("click",  function(evt){
						me.svgCall(evt);
					}, false);
					if(init){this.testScaling()};
				},
				getTContainer:function(){
					return(document.getElementById(this.targetContainer));
				},
				testScaling:function(){
					var _w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
					var _h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
					var w=Math.max(_w, _h),h=Math.min(_w, _h);
					var actualWorld={width:1060,height:480};
					this.currentScale=(h/actualWorld.width)
					this.currentScale<0 ?  this.scaleWorld(this.initialScale) : this.scaleWorld(this.currentScale);
				},

				increaseScaleWorld:function(evt){
					var y=evt;
					for(var z in y){
					//	console.log("increaseScaleWorld=" + z + '=' + y[z]);
					}
					this.scaleWorld(this.currentScale*1.5, {x:evt.clientX, y:evt.clientY});
				},
				scaleWorld:function(toWhatArg, offsetObj){
					var toWhat=this.currentScale=Math.max(Math.min(toWhatArg,4),0),_this=this.getTContainer().getBoundingClientRect(); // arbitrary 4x max
					var xMult=(offsetObj ? offsetObj.x : 1);
					var yMult=(offsetObj ? offsetObj.y : 1);
					this.getTContainer().style.left= ((xMult!=1 ? -((toWhat * xMult)-_this.x)/2  : 0)-(this._width-(toWhat*this._width))/2) + "px";
					this.getTContainer().style.top=  ((yMult!=1 ? -((toWhat * yMult)-_this.y)/2 : 0)-(this._height-(toWhat*this._height))/2) + "px";
					this.getTContainer().style.opacity=1;
					this.addTransform("scale","scale("+toWhat+", "+toWhat+")");
					this.updateTransforms();
				},
				_transforms:{},
				addTransform:function(whatTransform, whatValue){
					this._transforms[whatTransform]=whatValue;
				},
				updateTransforms:function(){
					var sp="";
					for(var z in this._transforms){
						sp+=this._transforms[z] + " ";
		//				this.addTransform("scale","scale("+toWhat+", "+toWhat+")");
					}
					try{
						document.getElementById("worldDiv").style.webkitTransform=sp;
						document.getElementById("worldDiv").style.MozTransform = sp;
						document.getElementById("worldDiv").style.transform = sp;
					}catch(oops){
						try{
							document.getElementById("worldDiv").style.MozTransform = sp;
							document.getElementById("worldDiv").style.transform = sp;
						}catch(oops){
								document.getElementById("worldDiv").style.transform = sp;
							consoloe.log(xp + " failed");
						}
					}
				},
				setCountryVal:function(whichCountry, whichProp, whichVal){
					this.getCountry(whichCountry)[whichProp]=whichVal;
				},
				setMyContent:function(whichEl, whichProp, whichVal){
					d3.select(whichEl).attr(whichProp,whichVal);
				},
				getCountry:function(whichCountry){
					$window.whichCountry=whichCountry;
					console.log("getCountry:function(" + whichCountry)
					var zz=null;
					for(var z in this.d3Data.world.countries){
						try{
							if(this.d3Data.world.countries[z].GeoObject && whichCountry.GeoObject
							 && whichCountry.GeoObject.indexOf(this.d3Data.world.countries[z].GeoObject)!=-1){
								zz=this.d3Data.world.countries[z];
								break;
							}
						}catch(oops){}
					}
					if(zz==null){
						for(var z in this.d3Data.world.countries){
							try{
								if(
								(whichCountry.CountryName.indexOf(this.d3Data.world.countries[z].CountryName)==0) ||
								(whichCountry.CountryName.indexOf(this.d3Data.world.countries[z]._name())==0)
								){
									zz=this.d3Data.world.countries[z];
									break;
								}
							}catch(oops){}
						}
					}

					return zz;
 				},
				swapHighlights:function(whichCountry){
					console.log("swapHighlights:function(" + whichCountry);
					this.bindCountryObject(this.getCountry(whichCountry));
 				},
				highlightCountry:function(whichCountry){
					try{
						console.log("highlightCountry:function(" + whichCountry)
						d3.select("#" + whichCountry.Code).attr('opacity',0.1)
					}catch(oops){
						console.log("country highlight failed");
					}
 				},
				unhighlightCountry:function(whichCountry){
					try{
						console.log("UN HLCountry:function(" + whichCountry)
						d3.select("#" + whichCountry.Code).attr('opacity',1)
					}catch(oops){
						console.log("no country to unhighlight");
					}
 				},
				setCountry:function(whichCountry, whichEl){
					console.log("whichCountry.code="+ whichCountry.Code);
					if(this.currentCountryObj== null ||  whichCountry!= this.currentCountryObj){
						console.log("inner.TS="+ whichCountry.CountryName + ";whichEl=" + whichEl);
						MapService.userActivated=true;
						try{
							$rootScope.$broadcast("countrySelected",{Country:whichCountry});
							console.log("this is a success currentCountryObj");
						}catch(oops){
							console.log('notBueno');
						}
					}
				},
				bindCountryObject:function(obj, func, whichEl){
					if(this.currentCountryObj){
						this.unhighlightCountry(this.currentCountryObj);
					}
					if(func){
						if(!obj.selectedTimes){
							this.createCountryObject(obj, whichEl);
						}
						this.currentCountryObj=obj;
						obj[func]();
					}else{
						this.currentCountryObj=obj;
					}
					this.highlightCountry(this.currentCountryObj);
				},
				svgCallClickThrough:function(evt){
					try{
						this.setCountry(this.fromCountryCode(evt.target.parentNode.id), evt.target.parentNode);
					}catch(oops){
					}
					this.svgClicked=false;
				},
				svgCallDoubleClick:function(evt){
					console.log("svgCallDoubleClick=" + evt.target + 'svgCall=' + evt);
					this.increaseScaleWorld(evt);
					this.svgClicked=false;
				},
				svgCall:function(evt){
					var me=this,_evt=evt;
					if(this.svgClicked==true){
						this.svgCallDoubleClick(evt);
						$window.clearTimeout(this.svgCallTimer);
					}else{
						this.svgClicked=true;
						this.svgCallTimer=$window.setTimeout(function(evt){
							me.svgCallClickThrough(_evt);
						},this.svgCallTimeoutLength);
					}
				},
				getCurrent:function(){
					return(this.contentArray[this.currentContent]);
				},
				initMyContent:function(){
					if(typeof(this.contentAddress).toLowerCase()=="string"){
						this.contentArray.push(this.contentAddress);
					}else{
						this.contentArray=this.contentAddress;
					}
					this.incrementContent();
				},
				fromCountryCode:function(which){
					var w=null,arr=this.d3Data.world.countries;
					for(var z=0;z<arr.length;z++){
						if(arr[z].Code===which){
							w=arr[z];
						}
					}
					return(w);
				},
				init:function(){
					var me=this;
					if(!this.inited){
						d3.json(this.jsonURL,function(err, d){
							if(!err){
								me.d3Data=d;
								$rootScope.countries=me.d3Data.world.countries;
								me.initSVG(me.defaultSVGWidth,me.defaultSVGHeight,"worldDiv",me.svgURL);
							}else{
								console.log("ERR("+err);
							}
						});	
						this.inited=true;
					}else{
						$rootScope.countries=me.d3Data.world.countries;
						 me.initSVG(me.defaultSVGWidth,me.defaultSVGHeight,"worldDiv",me.svgURL);
					}
				}
			}
			$rootScope.swapHighlights=service.swapHighlights;
			// service.init();
			return service;
		}]);
