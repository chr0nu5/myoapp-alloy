var Services = require("/Services")

function doTransform(map) {
	
	map.thumbnailLink = "http://omaps.worldofo.com/images/"+map.thumblink + "_s.jpg";
	
	return map;
}


var url = Alloy.CFG.mapsUrl.replace("{forest}" , arguments[0]["map"] );
Services.getJson(url, function(data) {
	var maps = data.data;
	var rows = Array();
		if(maps.length > 0) {
		for (var i = 0; i < maps.length; i++) {
		    var map = maps[i];
		    map.__transform = doTransform(map);
		    var row = Alloy.createController("mapsRow", {
		        $model: map
		    });
		    rows.push(row.getView());
		}
		console.log(rows.length);
		$.mapsTable.setData(rows);
		$.label.setVisible(false);
		$.mapsTable.setVisible(true);
	}
	else {
		$.label.setText("Keine Karten gefunden")
	}
});