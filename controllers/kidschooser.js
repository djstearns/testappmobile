
			var singlename = 'kid';
			var modelname = 'kids';
			var Modelname = 'Kid';
			var tblname = 'kids';
			
			
			//We will need to add event listeners for each unique table view created for each tab.
			$.tblview.addEventListener('click', function(e) {
			//var send = things.get(e.rowData.model);
				
				Ti.App.fireEvent('changekidfield', {
					value: e.rowData.dataId,
					title: e.rowData.title
				}); 
				$.tblviewWindow.close();
				
				//Alloy.Globals.testchildren = Alloy.Globals.testchildren - 1;
			});
			if(OS_IOS){
				$.cancel.addEventListener('click', function(e) {
			//var send = things.get(e.rowData.model);
				$.tblviewWindow.close();
				//Alloy.Globals.testchildren = Alloy.Globals.testchildren - 1;
			});
			
			}
			
			var things = Alloy.Collections[Modelname];
			
			things.fetch();	
			 
			function closeWindow(){
				$.tblviewWindow.close();
			} 
			 
			 // Android
			if (OS_ANDROID) {
			   $.tblviewWindow.addEventListener('open', function() {
					if($.tblviewWindow.activity) {
						var activity = $.tblviewWindow.activity;
						// Menu
						//activity.invalidateOptionsMenu();
						activity.onCreateOptionsMenu = function(e) {
							var menu = e.menu;
							if(Alloy.Globals.configureLogin == true){
								//add logout action
								var menuItem1 = menu.add({
									title: L('cancel', 'Cancel'),
									showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
								});
								//add recipe_yingredient!!!!
								menuItem1.addEventListener('click', closeWindow);
							//end logout action
							};
							
							////
							//// add other actions to menu at Home here.
							////
						}; 
					}
				});
				
				// Back Button - not really necessary here - this is the default behaviour anyway?
				$.tblviewWindow.addEventListener('android:back', function() {              
					$.tblviewWindow.close();
					$.tblviewWindow = null;
				});     
			};
			