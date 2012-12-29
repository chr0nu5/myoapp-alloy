migration.up = function(db) {
	db.createTable({
		"columns": {
			"key":"string",
			"value":"string"
		},
		"adapter": {
			"type": "SQL",
			"collection_name": "config"
		}
	})
};

migration.down = function(db) {
	db.dropTable("config");
};
