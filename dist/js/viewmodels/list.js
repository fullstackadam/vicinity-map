
function List(){const SELF=this;SELF.loadingState=ko.observable().syncWith('loadingState',true);SELF.places=ko.observableArray();SELF.markerActionQueue=ko.observableArray().syncWith('markerActionQueue');SELF.location=ko.observable().subscribeTo('currentLocation',true);SELF.filter=ko.observable(['all']).syncWith('filter');SELF.centerMap=ko.observable().syncWith('centerMap',true);SELF.filtered=ko.computed(function(){const CATEGORY_FILTER=SELF.filter()[0];return ko.utils.arrayFilter(SELF.places(),function(place){let keep=false;if(place.category===CATEGORY_FILTER||CATEGORY_FILTER==='all'){keep=true;}
return keep;});},SELF).publishOn('places');SELF.categories=ko.computed(function(){const CATEGORIES=['all'];ko.utils.arrayForEach(SELF.places(),function(place){const CATEGORY=place.category;if(CATEGORIES.indexOf(CATEGORY)===-1){CATEGORIES.push(CATEGORY);}});return CATEGORIES;},SELF).publishOn('categories');SELF.onMouseoverListItem=function(place){SELF.newMarkerAction(place.markerId,'highlight');};SELF.onMouseoutListItem=function(place){SELF.newMarkerAction(place.markerId,'unhighlight');};SELF.onClickListItem=function(place){SELF.newMarkerAction(place.markerId,'openInfoWindow');};SELF.newMarkerAction=function(markerId,action){action={id:markerId,action:action,};SELF.markerActionQueue.push(action);}
SELF.import=function(lat,lng,callback){SELF.loadingState('getting places from HERE api...');const platform=new H.service.Platform({app_id:'JaSjic2QLCII4hn6wa2V',app_code:'-9DtJ2wENRacgkqeW0haBg',});let search=new H.places.Explore(platform.getPlacesService());let searchResult;let error;const PARAMS={at:lat+','+lng,};function onResult(data){SELF.places([]);data.results.items.forEach(function(place,id){place.id=id;SELF.places.push(new Place(place));});if(callback!==undefined){callback();}}
function onError(data){const error=data;SELF.loadingState('ERROR: could not load places from HERE api!');}
search.request(PARAMS,{},onResult,onError);};SELF.location.subscribe(function(location){SELF.import(SELF.location().position.lat,SELF.location().position.lng,function(){while(1){if(window.map)SELF.centerMap(true);break;}});});}