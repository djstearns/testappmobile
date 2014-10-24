// File models/thing.js
					exports.definition = {
						
					  config: {
						
						  columns: {
							  "id":"INTEGER PRIMARY KEY","name":"string","age":"integer","adult_id":"integer","mom":"integer"
							 
						  },
						  adapter: {
							  type: "sql",
							  collection_name: "kids",
							  idAttribute: "id"
						  }
						  
						 
					  },        
					  extendModel: function(Model) {        
						  _.extend(Model.prototype, {
							  // extended functions and properties go here
						  });
					 
						  return Model;
					  },
					 
					   extendCollection: function(Collection) {        
						  _.extend(Collection.prototype, {
							  // extended functions and properties go here
						  });
					 
						  return Collection;
					  }
					};