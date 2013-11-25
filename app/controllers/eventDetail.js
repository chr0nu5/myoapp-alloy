var Services = require("/Services");


function openAnnouncment() {
	
	Ti.Platform.openURL($.model.get("url"));
}
function openTimetable() {
	var to;
	var item = $.model.toJSON();
	if($.model.get("eventCenter")) {
		to = "to=" + $.model.get("eventCenter");
	}
	else if(item.latitude && item.longitude) {
		to = "toll=" + item.latitude + ',' + item.longitude;
	}
	
	if(item.date) {
		var date = item.date / 1000;
	}
	var timetableUrl = "sbbmobileb2c://timetable?" + to  +"&time=" + date + '&accessid=dm89518e7a4e0bcf670';
	console.log(timetableUrl);
	Ti.Platform.openURL(timetableUrl);
	
}
function openMaps() {
	var item = $.model.toJSON();
	Alloy.Globals.App.trigger("openMapsList",  {map: item.map, longitude: item.longitude, latitude: item.latitude});
}
function openStartlist() {
	alert("Funktion ist noch nicht implementiert.")	;
}

$.model = $model;