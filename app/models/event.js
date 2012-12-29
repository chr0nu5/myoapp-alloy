exports.definition = {
	
	config: {
		"columns": {
			"name":"varchar",
			"forest":"varchar",
			"date": "date",
			"region":  "varchar",
			"club": "varchar",
			"url": "varchar",
			"latitude": "float",
			"longitude": "float",
			"is_championship": "boolean",
			"is_national": "boolean",
			"type": "string",
			"registration_date": "date",
			"registration_link": "varchar",
			"registred": "boolean",
			"location": "varchar",
			
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
			
			// extended functions go here			
			
		}); // end extend
		
		return Collection;
	}
		
}

