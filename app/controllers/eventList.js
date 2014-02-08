var Services = require("/Services");

function getBindingData(model, editMode) {
	var transform = model.toJSON();
	return {
		row2: {text: Services.combine(transform.region, transform.organiser)},
		row3: {text: Services.combine(transform.map, Services.getDateString(new Date(Math.floor(transform.date))))},
		name: {text: transform.name},
   		template: 'template',
   		properties: {
   			itemId: model.id
   			
   		},
		switch: {visible: editMode , value: transform.enabled ? true : false}
		
	};
}

function openEventDetail(e) {
	if(!editMode) {
		$.trigger("openEvent", e.itemId);
	}
	else {
		console.log(JSON.stringify(e));
		e.row.enableSwitch.value = !e.row.enableSwitch.value;
	}
}

var editMode = false;

exports.loadData = function(options) {
	options = _.extend({
		scrollDate: new Date()
	}, options);
        
    editMode = options.editMode;
	
	var rows = [];
	var pastEventsRows = [];
    var models = [];
    if(!options.editMode){
    	models = Alloy.Collections.event.where({enabled: 1});
    }
	else{
		models = Alloy.Collections.event.models;
	}
	
	var firstBinding = $.events.sections[0].getItems() == null || $.events.sections[0].getItems().length == 0;
	console.log($.events.sections[0].getItems());
	var scrollRowIndex = 0;

    for (var i = 0; i < models.length; i++) {
        var model = models[i];
        
    	rows.push(getBindingData(model, options.editMode));
		if(scrollRowIndex == 0 && Math.floor(model.get("date"))  >= options.scrollDate.getTime() - (1000*60*60*24)) {
			scrollRowIndex = i;
		}
    }
    $.events.sections[0].setItems(rows);
    
    
    if(firstBinding && rows.length > 0) {
   		var animation = {animated: false}; 
		if(OS_IOS) {
			animation = {animated: false, position: Ti.UI.iPhone.TableViewScrollPosition.TOP};
		}
		$.events.selectItem(0, scrollRowIndex);//, animation);
	 }
};



function onEnabledClicked(e) {
	e.cancelBubble = true;
}

function onEnabledChanged(e) {
	var model = Alloy.Collections.event.get(e.itemId);
	model.set('enabled', model.get('enabled') == 1 ? 0 : 1);
	model.save();
}

