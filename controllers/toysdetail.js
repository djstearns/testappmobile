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
					name:_model.attributes.name,
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
				name:$.name.value,
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
			//$.toysdetail.close();
			$.detail.close();
		});
		
		$.savebtn.addEventListener('click', function(){
			var itemModel = model;
			//Model VARS
			//itemModel.set("name", $.name.value);
				
			//End model vars
			//TODO: fix all lowercase
			globalsave(Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+args.tablename+'/mobilesave', {id: $.name.datid,name:$.name.value,},args.model,{id: $.name.datid,name:$.name.value,});
			//itemModel.save();
			//Alloy.Collections.Thing.fetch();
			//savetoremote();
			//$.toysdetail.close();
			$.detail.close();
		});
		
		 // Android
		if (OS_ANDROID) {
			$.toysdetail.addEventListener('open', function() {
				if($.toysdetail.activity) {
					var activity = $.toysdetail.activity;
		
					// Action Bar
					if( Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) {      
						activity.actionBar.title = L('detail', 'Detail');
						activity.actionBar.displayHomeAsUp = true; 
						activity.actionBar.onHomeIconItemSelected = function() {               
							//$.toysdetail.close();
							$.detail.close();
							//$.toysdetail = null;
							$.detail = null;
						};             
					}
				}
			});
			
			// Back Button - not really necessary here - this is the default behavior anyway?
			$.toysdetail.addEventListener('android:back', function() {              
					//$.toysdetail.close();
					$.detail.close();
					//$.toysdetail = null;
					$.detail = null;
			});     
		}