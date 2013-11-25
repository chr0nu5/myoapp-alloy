exports.definition = {
	
	config: {
		"columns": {
			"source_id": "string",
			"name":"varchar",
			"map":"varchar",
			"date": "integer",
			"region":  "varchar",
			"organiser": "varchar",
			"url": "varchar",
			"eventCenterLatitude": "float",
			"eventCenterLongitude": "float",
			"classification": "integer",
			"day": "boolean",
			"night": "boolean",
			"eventCenter": "varchar",
			"enabled": "boolean",
			
		},
		"defaults":{
			"registred" : false
		},
		"adapter": {
			"type": "sql",
			"collection_name": "event"
		}
	},		

	extendModel: function(Model) {		
		_.extend(Model.prototype, {
						
			// extended functions go here

		}); // end extend
		
		return Model;
	},
	
	
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			getByData: function(data) {
				var item;
				var possibleItems = this.where({"source_id":data.source_id});
				if(possibleItems.length > 0) {
					item = possibleItems[0];
					item.set(data);
					console.log(item.get('date'));
				}
				else {
					item = Alloy.createModel("event", data);
					item.set('enabled', 1)
					this.add(item);
				}
				return item;
			}
		}); // end extend
		
		return Collection;
	}
		
};

