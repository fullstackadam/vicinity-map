
function Marker(map,place){this.map=map;this.name=place.name;this.address=place.address;this.hours=place.hours;this.icon=place.icon;this.defaultIcon=place.icon;const latlng={lat:place.lat,lng:place.lng,};const markerObj={animation:google.maps.Animation.DROP,position:latlng,icon:this.icon,map:this.map,};google.maps.Marker.call(this,markerObj);this.infoWindow=null;this.addListener('click',function(){this.openInfoWindow();});}
Marker.prototype=Object.create(google.maps.Marker.prototype);Marker.constructor.prototype=Marker;Marker.prototype.highlightedIcon=window.markerHighlightedIcon;Marker.prototype.highlight=function(){this.setIcon(this.highlightedIcon);this.setAnimation(google.maps.Animation.BOUNCE);};Marker.prototype.unhighlight=function(){this.setAnimation(null);this.setIcon(this.defaultIcon);};Marker.prototype.openInfoWindow=function(){if(this.infoWindow===null){this.infoWindow=new InfoWindow(this);}
const marker=this;this.infoWindow.open();this.infoWindow.addListener('closeclick',function(e){marker.closeInfoWindow();});this.highlight();};Marker.prototype.closeInfoWindow=function(){if(this.infoWindow===null||!this.infoWindow.opened){return;}
this.infoWindow.close();this.unhighlight();};