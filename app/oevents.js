var Services = require('/Services'),
	Alloy = require('alloy');

var oevents = {
	load: function(callback) {
		console.log("huhu");
		var today = new Date();
		var lastUpdate = ""//Info.getInfo("eventsLastUpdate");
		var minDate = today.getTime() - (60*1000*60*60*24);
		var maxDate = today.getTime() + (60*1000*60*60*24);
		
		var query = {date: {"$gt": minDate, "$lt": maxDate}};
		query.lastModification = {"$gt": 0}
		var url = Alloy.CFG.oeventsUrl.replace("{query}", JSON.stringify(query));  
		Services.getJson(url, function(result){
				var events = Alloy.Collections.instance("event");
				events.fetch({
					
					success: function() {
						try
						{	
							for(var i = 0; i < result.length; i++) {
								var item = result[i];
								item.source_id = item.id;
								item.id = null;
								var eventModel = events.getByData(item);
								eventModel.save();
								}
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
					}
				});
		}, 
		function(error) {
			console.log(error);
			if(callback != undefined) {
				callback();
			}
		});
	}
};



module.exports = oevents;
