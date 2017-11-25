
function Nav(){const SELF=this;SELF.renderMap=ko.observable(false).syncWith('renderMap');SELF.location=ko.observable().syncWith('currentLocation',true);SELF.locations=ko.observableArray();SELF.loadingState=ko.observable('Loading...').syncWith('loadingState');SELF.loadStateTimeout=null;SELF.loadingState.subscribe(function(msg){clearTimeout(SELF.loadStateTimeout);if(msg.match(/error/i)!==null){SELF.loadingState.stopSyncingWith('loadingState');return;}
SELF.loadStateTimeout=setTimeout(function(){SELF.loadingState('');},2000);});SELF.filter=ko.observable().syncWith('filter',true);SELF.categories=ko.observableArray().subscribeTo('categories',true);SELF.centerMap=ko.observable().syncWith('centerMap',true);SELF.recenterMap=function(){SELF.centerMap(true);};SELF.onCitySelection=function(location){SELF.location(location);};SELF.onFilterSelection=function(filter){SELF.filter([filter]);};SELF.add=function(name,latlng){SELF.locations.unshift({name:name,position:latlng,});};SELF.getUserLocation=function(){if(navigator.geolocation){navigator.geolocation.getCurrentPosition(SELF.getCityFromLatLng);}};SELF.getCityFromLatLng=function(position){SELF.loadingState('getting your municipality from gps coordinates...');const geocoder=new google.maps.Geocoder;const latlng={lat:position.coords.latitude,lng:position.coords.longitude,};geocoder.geocode({'location':latlng},function(results,status){if(status!=='OK'){SELF.loadingState('could not get municipality from gps coordinates');SELF.renderMap(true);return;}
results=results[0].address_components;let types=[];let city=false;let state=false;for(let i=0;i<results.length;i++){types=results[i].types;for(let j=0;j<types.length;j++){if(!city&&types[j]==='locality'){city=results[i].short_name;}
if(!state&&types[j]==='administrative_area_level_1'){state=results[i].short_name;}}}
const name=city+', '+state;SELF.add(name,latlng);SELF.current(SELF.locations()[0]);SELF.renderMap(true);});};if(navigator.geolocation){navigator.geolocation.getCurrentPosition(SELF.getCityFromLatLng);}else{SELF.loadingState('rendering map...');SELF.renderMap(true);}
SELF.current=ko.observable().syncWith('currentLocation');if(window.locations&&window.defaultLocations!==0){window.locations.forEach(function(location){SELF.locations.push(new Location(location.name,location.position));if(location.default&&location.default===true){let lastIndex=SELF.locations().length-1;SELF.current(SELF.locations()[lastIndex]);}});}}