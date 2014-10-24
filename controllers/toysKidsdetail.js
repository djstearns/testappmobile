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
					kid_id:_model.attributes.kid_id,toy_id:_model.attributes.toy_id,
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
				kid_id:$.kid_id.value,toy_id:$.toy_id.value,
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
			//$.toysKidsdetail.close();
			$.detail.close();
		});
		
		$.savebtn.addEventListener('click', function(){
			var itemModel = model;
			//Model VARS
			//itemModel.set("kid_id", $.kid_id.value);
				itemModel.set("toy_id", $.toy_id.value);
				
			//End model vars
			//TODO: fix all lowercase
			globalsave(Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+args.tablename+'/mobilesave', {id: $.name.datid,kid_id:$.kid_id.value,toy_id:$.toy_id.value,},args.model,{id: $.name.datid,kid_id:$.kid_id.value,toy_id:$.toy_id.value,});
			//itemModel.save();
			//Alloy.Collections.Thing.fetch();
			//savetoremote();
			//$.toysKidsdetail.close();
			$.detail.close();
		});
		
		 // Android
		if (OS_ANDROID) {
			$.toysKidsdetail.addEventListener('open', function() {
				if($.toysKidsdetail.activity) {
					var activity = $.toysKidsdetail.activity;
		
					// Action Bar
					if( Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) {      
						activity.actionBar.title = L('detail', 'Detail');
						activity.actionBar.displayHomeAsUp = true; 
						activity.actionBar.onHomeIconItemSelected = function() {               
							//$.toysKidsdetail.close();
							$.detail.close();
							//$.toysKidsdetail = null;
							$.detail = null;
						};             
					}
				}
			});
			
			// Back Button - not really necessary here - this is the default behavior anyway?
			$.toysKidsdetail.addEventListener('android:back', function() {              
					//$.toysKidsdetail.close();
					$.detail.close();
					//$.toysKidsdetail = null;
					$.detail = null;
			});     
		}