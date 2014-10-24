// File models/thing.js
					exports.definition = {
						
					  config: {
						
						  columns: {
							  "id":"INTEGER PRIMARY KEY","kid_id":"integer","toy_id":"integer"
							 
						  },
						  adapter: {
							  type: "sql",
							  collection_name: "toys_kids",
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