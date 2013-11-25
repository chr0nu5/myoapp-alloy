var Services = require("/Services");

function doTransform(model) {
	var transform = model.toJSON();
	
	transform.row2 = Services.combine(transform.region, transform.organiser);
	transform.row3 = Services.combine(transform.map, Services.getDateString(new Date(transform.date)));
	
	return transform;
}

function openEventDetail(e) {
	if(!editMode) {
		$.trigger("openEvent",e );
	}
	else {
		console.log(JSON.stringify(e));
		e.row.enableSwitch.value = !e.row.enableSwitch.value;
	}
}

var editMode = false;

exports.loadData = function(options) {
	$.events.setData([]);
	options = _.extend({
		scrollDate: new Date()
	}, options);
	
	var rows = [];
    var models = [];
    if(!options.editMode){
    	models = Alloy.Collections.event.where({enabled: 1});
    }
	else{
		models = Alloy.Collections.event.models;
	}
	console.log(models.length);
	var scrollRowIndex = 0;
    for (var i = 0; i < models.length; i++) {
        var model = models[i];
        model.__transform = doTransform(model);
        var row = Alloy.createController("eventRow", {
            id: "eventRow",
            $model: model,
            editMode: options.editMode
        });
        editMode = options.editMode;
        row.model = model;
        rows.push(row.getView());
        
		if(scrollRowIndex == 0 && model.get("date")  >= options.scrollDate.getTime() - (1000*60*60*24)) {
			scrollRowIndex = i;
		}
    }
    $.events.setData(rows);
	$.events.scrollToIndex(scrollRowIndex, {animated: false, position: Ti.UI.iPhone.TableViewScrollPosition.TOP});
};
