migration.up = function(db) {
	db.createTable({
		"columns": {
			"source_id": "string",
			"name":"varchar",
			"map":"varchar",
			"date": "date",
			"region":  "varchar",
			"organiser": "varchar",
			"url": "varchar",
			"eventCenterLatitude": "float",
			"eventCenterLongitude": "float",
			"classification": "integer",
			"day": "boolean",
			"night": "boolean",
			"eventCenter": "varchar",
			
		},
		"adapter": {
			"type": "sql",
			"collection_name": "event"
		}
		
	});

};

migration.down = function(db) {
	db.dropTable("event");

};
