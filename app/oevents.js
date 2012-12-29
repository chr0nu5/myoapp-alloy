var oevents = {
	load: function() {
		var today = new Date();
					var lastUpdate = ""//Info.getInfo("eventsLastUpdate");
					var minDate = new Date(today.getTime() - (60*1000*60*60*24));
					
					var query = {};
					query.minDate = Services.getTechDate(minDate);
					var url = Alloy.CFG.oeventsUrl.replace("{last_update}" ,lastUpdate ).replace("{query}", JSON.stringify(query));  
					Services.getJson(url, function(result){
						for(var i = 0; i < result.items.length; i++) {
							var item = result.items[i];
							Event.save(item);
							
						}
						//Info.setInfo("eventsLastUpdate", (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + (new Date()).getDate() + " " + (new Date()).getHours() + ":" +(new Date()).getMinutes())
						if(callback != undefined) {
							callback();
						}
					}, 
					function(error) {
						if(callback != undefined) {
							callback();
						}
					})
	}
};



module.exports = oevents;
