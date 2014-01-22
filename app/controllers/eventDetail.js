var Services = require("/Services");


function openAnnouncment() {
	
	Ti.Platform.openURL($.model.get("url"));
}
function openTimetable() {
	var to = "";
	var item = $.model.toJSON();
	if($.model.get("eventCenter")) {
		to = "to=" + $.model.get("eventCenter");
	}
	else if(item.eventCenterLatitude && item.eventCenterLongitude) {
		to = "toll=" + item.eventCenterLatitude + ',' + item.eventCenterLongitude;
	}
    console.log("lat: " + item.eventCenterLatitude);
    console.log("long: " + item.eventCenterLongitude);

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
    Ti.Platform.openURL($.model.get("urlStartlist").replace("kind=all", ""));
}
function openResults() {
    Ti.Platform.openURL($.model.get("urlResults").replace("kind=all", ""));
}

$.model = $model;


if(!$.model.get("urlStartlist")) {
    $.sectionActions.remove($.startlistRow);
}

if(!$.model.get("urlResults")) {
    $.sectionActions.remove($.resultsRow);
}