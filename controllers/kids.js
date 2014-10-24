
			var singlename = 'kid';
			var modelname = 'kids';
			var Modelname = 'Kid';
			var tblname = 'kids';
			//foreach manytomany get list and add 'cancel'
					var ManyToManys = ['adults','related toys', 'Cancel'];
					var hasmultimanytomany = true;
					//ELSE PRINT
					var ManyToMany = '';//'yingredients';
					//var hasmultimanytomay = false;			
					//Arguments coming in:
					//var hasmultimanytomay = false;
									
			var args = arguments[0] || {};
			var parentTab = args.parentTab || '';
			var manytomanyaddscreen = args.manytomanyaddscreen;
			var related = args.related;
			var dataId = (args.dataId === 0 || args.dataId > 0) ? args.dataId : '';
			//VARS:
			//HAS CHILDREN = true;
			//HAS PARENT = false;
			
			function openAddItem(){
				globalopenAddItem(parentTab, related, modelname, singlename, manytomanyaddscreen, dataId);
			}
			
			function deleterecord(e){
				globaldelete(e, parentTab, modelname, singlename, dataId, manytomanyaddscreen, $.tblview);
				Ti.API.info('e_id:'+e.rowData.dataId);
			}
			
			function editmany(e){
				if(parentTab!=''){
					//check to see the type of relation...if not in relation array, must me related (m2m)
					var checkarray = Alloy.Globals.RELATIONSHIP[tblname];
					var mmtblname = '';
					var mmModelname = '';
					Ti.API.info(checkarray);
					if (typeof Alloy.Globals.RELATIONSHIP[tblname][manytomanyaddscreen] != 'undefined') {
						//HM
					   mmModelname = Alloy.Globals.RELATIONSHIP[tblname].sModelname;
						globalopenDetail(e, mmModelname, tblname);
						
					}else{
						//m2m only!
						mmtblname = Alloy.Globals.RELATIONSHIP[tblname].related[manytomanyaddscreen].manytomanytblname;
						mmModelname = Alloy.Globals.RELATIONSHIP[tblname].related[manytomanyaddscreen].manytomanyModelname;
						
							//open recipes_yingredients inspector!!!
						var db = Titanium.Database.open('_alloy_');
						//Ti.API.info(dataId);
						//db.execute('BEGIN IMMEDIATE TRANSACTION');
						var rows = db.execute('SELECT id FROM '+mmtblname+' WHERE '+Alloy.Globals.RELATIONSHIP[manytomanyaddscreen].singlename+'_id = ? AND '+ singlename + '_id = ?',dataId, e.rowData.dataId);
						if(rows.getRowCount() == 1){  
							//Ti.API.info(rows.fieldByName('yingredient_id')); 
							var ythings = Alloy.Collections[mmModelname];
							ythings.fetch();
							//Ti.API.info('id shoulbe: '+rows.fieldByName('id'));
							var addController = Alloy.createController(mmtblname+'Edit', {
								parentTab: Alloy.Globals.tabGroup.getActiveTab(),
								dataId: rows.fieldByName('id'),
								model: ythings.get(rows.fieldByName('id'))			  
							});
							var addview = addController.getView();
							if (OS_IOS) {
								//Alloy.Globals.navgroup.open(addview); 
								var tab = Alloy.Globals.tabGroup.getActiveTab();
								tab.open(addview);  
							} else if (OS_ANDROID) {
								addview.open();
							}
							
							//db.execute('COMMIT TRANSACTION');
							db.close();
						}else{
							alert('Error: you have duplicate records!');
						}
					}
					
				}else{
					globalopenDetail(e, Modelname, tblname);
				}
			}
			
			if(OS_IOS){
				$.addbtn.addEventListener('click', function(){
					globalopenAddItem(parentTab, related, modelname, singlename, manytomanyaddscreen, dataId);
				});
				
				$.refresh.addEventListener('click', function(){
					globalgetrecords(modelname, Modelname);
				});
				
				$.editme.addEventListener('click', function(e){
				   globaledittable(e, $.tblview);
				});	
				$.tblview.addEventListener('delete',function(e){
					deleterecord(e);	
					
				});
				$.tblview.addEventListener('longpress', function(e) {
				//var send = things.get(e.rowData.model);
					globalopenDetail(e, Modelname, tblname);
				});
				/*
				$.tblview.addEventListener('dblclick', function(e) {
				//var send = things.get(e.rowData.model);
					editmany(e);
				});
				*/
			}
			
			var things = Alloy.Collections[Modelname];
			//fech data
			things.fetch();	
			
			globalgetrecords(modelname, Modelname);
			
			$.tblview.addEventListener('click', function(e) {
				if(parentTab!=''){
					//show detail of related.
					editmany(e);
				}else{
					if(ManyToMany == '' && ManyToManys == ''){
						globalopenDetail(e, Modelname, tblname);
					}else{
						globalopenChild( e, ManyToManys, ManyToMany, hasmultimanytomany, modelname, parentTab );
					}
			   }
			});
			
			function gettherecords(){
				globalgetrecords(modelname, Modelname);
			}
			
			//loader (both)
			function myLoader(e) {
				// Length before
				var ln = things.models.length;
				Ti.API.info(ln);
				
					var newthing = [];
					var data = [];
					var sendit = Ti.Network.createHTTPClient({
						onerror : function(e) {
							Ti.API.debug(e.error);
							
							alert('There was an error during the connection');
						},
						timeout : 1000,
					});
					// Here you have to change it for your local ip
					var lnstr = (ln/20)+1;
					sendit.open('GET', Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+modelname+'/page:'+lnstr.toString());
					//sendit.open('https://maps.googleapis.com/maps/api/place/nearbysearch/json?types=hospital&location=13.01883,80.266113&radius=1000&sensor=false&key=AIzaSyDStAQQtoqnewuLdFwiT-FO0vtkeVx8Sks');
					sendit.send();
					// Function to be called upon a successful response
					sendit.onload = function() {
						var json = JSON.parse(this.responseText);
						// var json = json.todo;
						// if the database is empty show an alert
						if (json.length == 0) {
							$.table.headerTitle = 'The database row is empty';
							
						}
						// Emptying the data to refresh the view
						// Insert the JSON data to the table view
						var records = json;
						for ( var i = 0, iLen = records.length; i < iLen; i++) {
					
							newthing.push(records[i][Modelname]);
							//Ti.API.info(recipes[i].Recipe.name);
						}
						
						Alloy.Collections[Modelname].reset(newthing);
				
						// save all of the elements
						Alloy.Collections[Modelname].each(function(_m) {
							_m.save();
						});
						
						//Send data to model
						var things = Alloy.Collections[Modelname];
						//fech data
						 things.fetch({
			
							// Some data for the sync adapter to retrieve next page
							data: { offset: ln },
					
							// Don't reset the collection, but add to it
							add: true,
					
							// Don't trigger an add event for every model, but just one fetch
							silent: true,
					
							success: function (col) {
								Ti.API.info('successful here');
								// Call done if we didn't add anymore models
								(col.models.length === ln) ? e.done() : e.success();
							},
					
							error: e.error
						});
						//end new
					   
						
					};
			}
			
			 // Android Navigation
			if(OS_ANDROID) {
				
				$.tblviewWindow.addEventListener('open', function() {
					if($.tblviewWindow.activity) {
						var activity = $.tblviewWindow.activity;
			
						// Action Bar
						if( Ti.Platform.Android.API_LEVEL >= 11 && activity.actionBar) {      
							activity.actionBar.title = L('detail', 'Detail');
							activity.actionBar.displayHomeAsUp = true; 
							activity.actionBar.onHomeIconItemSelected = function() {               
								$.tblviewWindow.close();
								$.tblviewWindow = null;
							};             
						}
						
						activity.onCreateOptionsMenu = function(e) {
							var menu = e.menu;
							 
							// Menu Item 1
							var menuItem1 = menu.add({
								title : 'Add',
								showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
							});
							
							menuItem1.addEventListener('click', openAddItem);
						};
						
					}
				});
				
				//necessary to change the menu for Add
			 
				$.tblviewWindow.addEventListener('focus', function() {
						if($.tblviewWindow.activity) {
							var activity = Alloy.Globals.tabGroup.activity;
							
							// Menu
							activity.invalidateOptionsMenu();
							activity.onCreateOptionsMenu = function(e) {
								var menu = e.menu;
								if(Alloy.Globals.configureLogin == true){
									//add logout action	
									var menuItem1 = menu.add({
										title: L('add', 'Add '+Modelname),
										showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER
									});
								   menuItem1.addEventListener('click', openAddItem);
									
									var menuItem2 = menu.add({
										title: L('refresh', 'Refresh'),
										showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER
									});
								   
								   menuItem2.addEventListener('click', gettherecords);
									
								   
								};
					
							};            
						}   
					});
				
				  //edit and delete
				$.tblviewWindow.addEventListener('swipe', function(e) {
					if(parentTab!=''){
						var row = e;
						
						var opts = {
						  cancel: 4,
						  options: ['Edit Relation','Delete Relation', 'Edit Record', 'Delete Record', 'Cancel'],
						  title: 'Edit or Delete?'
						};
							
						var dialog = Ti.UI.createOptionDialog(opts);
						 
						dialog.addEventListener('click',function(evt){
							//get relation record
							switch(evt.index){
								case 0:
									editmany(row);
								break;
								case 1:
									deleterecord(row);
								break;
								case 2:
									globalopenDetail(row, Modelname, modelname);
								break;
								case 3:
									deleterecord(row);
								break;
							}
						});
						 
						dialog.show();
					
					}else{
						var row = e;
						Ti.API.info('e:'+row);
						var alertDialog = Titanium.UI.createAlertDialog({
							title: 'Edit or Delete Record?',
							message: 'Edit or Delete?',
							buttonNames: ['Edit','Delete', 'Cancel'],
							cancel: 2
						});
						 
						alertDialog.addEventListener('click',function(e){
							switch(e.index){
								case 0:
									 globalopenDetail(row, Modelname, modelname);
								break;
								case 1:
									deleterecord(row);
								break;
								case 2:
									//do nothing.
								break;
								
							} 
							   
						});
						 
						alertDialog.show();
					}
					
				  
				});
				
				// Back Button - not really necessary here - this is the default behaviour anyway?
				$.tblviewWindow.addEventListener('android:back', function() {              
					$.tblviewWindow.close();
					$.tblviewWindow = null;
				});     
			};
			$.tblviewWindow.addEventListener('focus', function(e){
				if(parentTab!=''){
					Ti.API.info('args not empty!');
					//var recipesyingredient = Alloy.Collection.RecipesYingredient;
					var things = Alloy.Collections[Modelname];
					//recipesyingredient.fetch({query:'SELECT * FROM recipes_yingredient WHERE recipe_id ='+dataId});
					var db = Titanium.Database.open('_alloy_');
					//db.execute('BEGIN IMMEDIATE TRANSACTION');
					if(related==true){
						//ManyToMany
						var mmtblname = Alloy.Globals.RELATIONSHIP[modelname].related[manytomanyaddscreen].manytomanytblname;
						
						var rows = db.execute('SELECT '+singlename+'_id FROM '+mmtblname+' WHERE '+Alloy.Globals.RELATIONSHIP[manytomanyaddscreen].singlename+'_id = ?',dataId);
						if(rows.rowCount!=0){
							var str = '';
							while(rows.isValidRow()){  
								//Ti.API.info(rows.fieldByName('yingredient_id')); 
								str = str+rows.fieldByName(singlename+'_id')+',';
								rows.next();
							}
							db.close();
							str = str.substring(0, str.length - 1) + ')';
							things.fetch({query:'SELECT * FROM '+tblname+' WHERE id IN ('+str});
						}else{
							
							things.fetch({query:'SELECT * from '+mmtblname+' WHERE id = 0;'});
							$.tblview.headerTitle = 'The database row is empty';
							
						}
					}else{
						//HasMany
						//var rows = db.execute('SELECT * FROM '+hmtblname+' WHERE '+Alloy.Globals.RELATIONSHIP[manytomanyaddscreen].singlename+'_id = ?',dataId);
						things.fetch({query:'SELECT * FROM '+tblname+' WHERE '+Alloy.Globals.RELATIONSHIP[manytomanyaddscreen].singlename+'_id ='+dataId});
					}
				}else{
					Ti.API.info('args empty!');
					//get all records
					var things = Alloy.Collections[Modelname];
					//fech data
					things.fetch();	
				}
			});