///**************
		/*
		 * 
		 Three variable arrays:
		 Data Transform:
		 Static portion:	id:_model.attributes.id
		 Variable:	 		[fldname]: _model.attributes.[fldname]
		 
		 Save Data:
		 Static Portion:	id: $.name.datid,
		 Variable:			[fldname]: $.[fldname].value,
		 
		 Local Save data:
		 Static portion: NA
		 Variable:		 itemModel.set('[fldname]', $.[fldname].value);
						
		 */
		////*************
		
		var args = arguments[0] || {};
		var parentTab = args.parentTab || '';
		var dataId = (args.dataId === 0 || args.dataId > 0) ? args.dataId : '';
		
		if (dataId !== '') {
			var model = Alloy.Collections[args.model].get(dataId);
			$.thingDetail.set(model.attributes);
			
			$.thingDetail = _.extend({}, $.thingDetail, {
				transform : function() {
					return dataTransformation(this);
				}
			});
		
			function dataTransformation(_model) {
				return {
					//ModelVars
					id : _model.attributes.id,
					name:_model.attributes.name,age:_model.attributes.age,adult_id:_model.attributes.adult_id,mom:_model.attributes.mom,
					//ModelVars
				};
			}
		}
		
		function savetoremote(){
			var sendit = Ti.Network.createHTTPClient({
					onerror : function(e) {
						Ti.API.debug(e.error);
						savetoremote();
						alert('There was an error during the connection');
					},
					timeout : 1000,
				});
				//TODO: make lowercase
			sendit.open('POST', Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+args.model+'/mobilesave');
			sendit.send({
				//Model Vars
				id: $.name.datid,
				name:$.name.value,age:$.age.value,adult_id:$.adult_id.value,mom:$.mom.value,
				//Model Vars
			});
			// Function to be called upon a successful response
			sendit.onload = function() {
				var json = JSON.parse(this.responseText);
				// var json = json.todo;
				// if the database is empty show an alert
				if (json.length == 0) {
					$.table.headerTitle = 'The database row is empty';
					
				}
			};
		}
		
		///Buttons!
		
		$.cancelbtn.addEventListener('click', function(){
			//$.kidsdetail.close();
			$.detail.close();
		});
		
		$.savebtn.addEventListener('click', function(){
			var itemModel = model;
			//Model VARS
			//itemModel.set("name", $.name.value);
				itemModel.set("age", $.age.value);
				itemModel.set("adult_id", $.adult_id.value);
				itemModel.set("mom", $.mom.value);
				
			//End model vars
			//TODO: fix all lowercase
			globalsave(Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+args.tablename+'/mobilesave', {id: $.name.datid,name:$.name.value,age:$.age.value,adult_id:$.adult_id.value,mom:$.mom.value,},args.model,{id: $.name.datid,name:$.name.value,age:$.age.value,adult_id:$.adult_id.value,mom:$.mom.value,});
			//itemModel.save();
			//Alloy.Collections.Thing.fetch();
			//savetoremote();
			//$.kidsdetail.close();
			$.detail.close();
		});
		
		 // Android
		if (OS_ANDROID) {
			$.kidsdetail.addEventListener('open', function() {
				if($.kidsdetail.activity) {
					var activity = $.kidsdetail.activity;
		
					// Action Bar
					if( Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) {      
						activity.actionBar.title = L('detail', 'Detail');
						activity.actionBar.displayHomeAsUp = true; 
						activity.actionBar.onHomeIconItemSelected = function() {               
							//$.kidsdetail.close();
							$.detail.close();
							//$.kidsdetail = null;
							$.detail = null;
						};             
					}
				}
			});
			
			// Back Button - not really necessary here - this is the default behavior anyway?
			$.kidsdetail.addEventListener('android:back', function() {              
					//$.kidsdetail.close();
					$.detail.close();
					//$.kidsdetail = null;
					$.detail = null;
			});     
		}