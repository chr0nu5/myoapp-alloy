exports.definition = {
	
	config: {
		"columns": {
			"key":"string",
			"value":"string"
		},
		"defaults": {
			"value": "",
		},
		"adapter": {
			"type": "sql",
			"collection_name": "config"
		}
	},		

	extendModel: function(Model) {		
		_.extend(Model.prototype, {

		}); // end extend
		
		return Model;
	},
	
	
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			get: function(key) {
				var item;
				var items =  Alloy.Collections.instance("config").where({"key": key});
				if(items.length > 0) {
					item =items[0];
				}
				else {
					item = Alloy.createModel("config", {key: key});
				}
				return item;
			},
			
			getValue:  function(key) {
				return this.get(key).get("value");
			},
			
			setValue: function(key, value) {
				var item = this.get(key);
				item.set("value", value);
				if(item.isNew()) {
					Alloy.Collections.instance("config").add(item);
				}
				item.save();
			}
			
		}); // end extend
		
		
		return Collection;
	}
		
}

