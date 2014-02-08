var Services = require('/Services'),
	Alloy = require('alloy');

var oevents = {
	load: function(callback) {
		console.log("huhu");
		var today = new Date();
		var lastUpdate = ""//Info.getInfo("eventsLastUpdate");
		//var minDate = today.getTime() - (60*1000*60*60*24);
		//var maxDate = today.getTime() + (60*1000*60*60*24);
		
		var config = Alloy.Collections.instance("config");
		config.fetch({success: function() {
		var lastModification = config.getValue("eventsLastUpdate");
		if(!lastModification) {
			lastModification = 0;
		}
		console.log(lastModification)
		//var query = {date: {"$gt": minDate, "$lt": maxDate}};
		var query = {};
		query.lastModification = {"$gt": lastModification}
		var url = Alloy.CFG.oeventsUrl.replace("{query}", JSON.stringify(query));  
		var events = Alloy.Collections.instance("event");
		Services.getJson(url, function(result){
						try
						{	
							for(var i = 0; i < result.length; i++) {
								var item = result[i];
								item.source_id = item.id;
								item.id = null;
								var eventModel = events.getByData(item);
								eventModel.save();
								}
								config.setValue("eventsLastUpdate", (new Date().getTime()));
							//Info.setInfo("eventsLastUpdate", (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + (new Date()).getDate() + " " + (new Date()).getHours() + ":" +(new Date()).getMinutes())
							if(callback != undefined) {
								
								callback();
							}
						}
						catch(error){
							alert(error);
							if(callback != undefined) {
								callback();
							}
						}
		}, 
		function(error) {
			console.log(error);
			if(callback != undefined) {
				callback();
			}
		});
		}});
	}
};



module.exports = oevents;
