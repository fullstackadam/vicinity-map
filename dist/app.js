
var map;var defaultCities={'new-york':{lat:40.7128,lng:-74.0059},'san-francisco':{lat:37.7749,lng:-122.4194},'denver':{lat:39.7392,lng:-104.9903},'london':{lat:51.5074,lng:-0.1278},'manila':{lat:14.5995,lng:120.9842}};var defaultLocation=defaultCities.denver;var currentLocation=defaultLocation;function initMap(){function getLocation(){if(navigator.geolocation){navigator.geolocation.getCurrentPosition(updateLatLng);}
showPosition();}
getLocation();function doAfterLocationsLoaded(){octopus.addMarkers();}
function updateLatLng(position){currentLocation.lat=position.coords.latitude;currentLocation.lng=position.coords.longitude;}
function showPosition(){window.map=new google.maps.Map(document.getElementById('map'),{center:{lat:currentLocation.lat,lng:currentLocation.lng},scrollbar:false,zoom:14});octopus.getLocations(currentLocation.lat,currentLocation.lng,doAfterLocationsLoaded);}}
var octopus={addMarkers:function(){vm.locations().forEach(function(location){var lat=location.lat();var lng=location.lng();location.marker=vm.addMarker({position:{lat:lat,lng:lng},icon:location.icon()});});},getLocations:function(lat,lng,callback){if(lat===null&&lng===null){lat=currentLocation.lat;lng=currentLocation.lng;}
var platform=new H.service.Platform({'app_id':'JaSjic2QLCII4hn6wa2V','app_code':'-9DtJ2wENRacgkqeW0haBg'});var search=new H.places.Explore(platform.getPlacesService()),searchResult,error;var params={'at':lat+','+lng};function onResult(data){console.log(data.results.items);console.log(vm);data.results.items.forEach(function(location,id){location.id=id;vm.addLocation(location);});if(callback!==null){callback();}}
function onError(data){error=data;}
search.request(params,{},onResult,onError);},};function ViewModel(){var self=this;self.categoryFilter=ko.observable(['all']);self.locations=ko.observableArray([]);self.locationCategories=ko.computed(function(){var categories=['all'];ko.utils.arrayForEach(self.locations(),function(location){category=location.category();if(categories.indexOf(category)===-1){categories.push(category);}});return categories;},self);self.addMarker=function(location){var marker=new google.maps.Marker({animation:google.maps.Animation.DROP,position:location.position,icon:location.icon,map:map});return marker;};self.removeMarker=function(marker){markers.remove(marker);};self.addLocation=function(location){this.locations.push(new Location(location));};self.addCategory=function(category){if(this.locationCategories.indexOf(category)===-1){this.locationCategories.push(category);}};self.filteredLocations=ko.computed(function(){console.log('filter computed');var categoryFilter=self.categoryFilter()[0];if(categoryFilter==='all'){return self.locations();}
return ko.utils.arrayFilter(self.locations(),function(location){if(location.category()===categoryFilter){keep=true;location.marker.setVisible(true);}else{keep=false;location.marker.setVisible(false);}
return keep;});},self);self.onMouseoverListItem=function(location){location.marker.defaultIcon=location.marker.icon;location.marker.setIcon('/images/here2.png');};self.onMouseoutListItem=function(location){location.marker.setAnimation(null);location.marker.setIcon(location.marker.defaultIcon);if(location.infoWindow!==undefined){location.infoWindow.close();location.infoWindow.opened=false;}};self.onClickListItem=function(location){if(location.infoWindow===undefined){location.infoWindow=new google.maps.InfoWindow({content:'<h3>'+location.name()+'</h3><p><strong>Address:</strong> '+location.address()+'</p><p><strong>Hours:</strong> '+location.hours()+'</p>'});}
if(!location.infoWindow.opened){location.infoWindow.open(map,location.marker);location.infoWindow.opened=true;}
location.marker.setAnimation(google.maps.Animation.BOUNCE);};}
var Location=function(location){var self=this;var hours='N/A';self.id=ko.observable(location.id);self.name=ko.observable(location.title);self.category=ko.observable(location.category.id);self.lat=ko.observable(location.position[0]);self.lng=ko.observable(location.position[1]);self.icon=ko.observable(location.icon);self.visible=ko.observable(true);self.visible.subscribe(function(newValue){console.log(self.name()+' set visible to '+newValue);});if(location.openingHours!==undefined){hours=location.openingHours.text;}
self.hours=ko.observable(hours);self.address=ko.observable(location.vicinity);};var vm=new ViewModel();ko.applyBindings(vm);