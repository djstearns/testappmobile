
			var Modelname = 'toyskids';
			var modelname = 'toyskids';
			var tblname = 'toys_kids';
			// Check for expected controller args
			//
			var args = arguments[0] || {};
			var parentTab = args.parentTab || '';
			var dataId = (args.dataId === 0 || args.dataId > 0) ? args.dataId : '';
			
			//
			// The list controller shouldn't call detail unless it has an id it is going to pass it in the first place
			// Just double check we got it anyway and do nothing if we didn't
			//
			Ti.API.info(dataId);
			if (dataId != '') {
				//Ti.API.info('id:'+args.dataId.attributes.id);
				$.thingDetail.set(args.model.attributes);
				
				$.thingDetail = _.extend({}, $.thingDetail, {
					transform : function() {
						return dataTransformation(this);
					}
				});
			
				
				function dataTransformation(_model) {
				   // Ti.API.info(_model.attributes.name);
					return {
						id : _model.attributes.id,
						widget_id : _model.attributes.widget_id,
						worker_id : _model.attributes.worker_id,
						itemqty: _model.attributes.numbermade
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
				sendit.open('POST', Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+Modelname+'/mobilesave');
				//sendit.open('https://maps.googleapis.com/maps/api/place/nearbysearch/json?types=hospital&location=13.01883,80.266113&radius=1000&sensor=false&key=AIzaSyDStAQQtoqnewuLdFwiT-FO0vtkeVx8Sks');
				sendit.send({
					id: $.name.datid,
					name: $.name.value,
					description: $.description.value
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
			
			$.cancelbtn.addEventListener('click', function(){
				//$.Toydetail.close();
				$.detail.close();
			});
			
			$.savebtn.addEventListener('click', function(){
				var itemModel = args.model;
				//itemModel.set('description', $.description.value);
				itemModel.set('name', $.name.value);
				
				itemModel.save();
			
				// force tables to update
				Alloy.Collections.Thing.fetch();
				//save to remote
				savetoremote();
				//$.Toydetail.close();
				$.detail.close();
			});
			
			 // Android
			if (OS_ANDROID) {
				$.Toydetail.addEventListener('open', function() {
					if($.Toydetail.activity) {
						var activity = $.Toydetail.activity;
			
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
				
				// Back Button - not really necessary here - this is the default behaviour anyway?
				$.Toydetail.addEventListener('android:back', function() {              
					//$.toysdetail.close();
					$.detail.close();
					//$.toysdetail = null;
					$.detail = null;
				});     
			}
			
			// iOS
			// as detail was opened in the tabGroup, iOS will handle the nav itself (back button action and title)
			// but we could change the iOS back button text:
			//$.Toydetail.backButtonTitle = L('backText', 'Back to List');
			