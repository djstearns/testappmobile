Alloy.Globals.PLUGIN = 'testapp/';Alloy.Globals.BASEURL = 'http://www.derekstearns.com/appcreator/';
		Alloy.Globals.RELATIONSHIP = {"adults":{
					"Modelname":"Adults",
					"modelname":"adults",
					"singlename":"adult",
					"tblname":"adults",
					"sModelname":"Adult",	},"kids":{
					"Modelname":"Kids",
					"modelname":"kids",
					"singlename":"kid",
					"tblname":"kids",
					"sModelname":"Kid","adults":{
							"relation":"BT",
							"tblname":"adults",
							"Modelname":"Adults",
							"modelname":"adults",
							"sModelname":"Adult"
						},"related":{"toys":{
							"manytomanytblname":"toys_kids",
							"manytomanyModelname":"ToysKids",
							"manytomanymodelname":"toyskids"
						}}	},"toys":{
					"Modelname":"Toys",
					"modelname":"toys",
					"singlename":"toy",
					"tblname":"toys",
					"sModelname":"Toy","related":{"kids":{
							"manytomanytblname":"toys_kids",
							"manytomanyModelname":"ToysKids",
							"manytomanymodelname":"toyskids"
						}}	},"toyskids":{
					"Modelname":"ToysKids",
					"modelname":"toysKids",
					"singlename":"toysKid",
					"tblname":"toysKids",
					"sModelname":"ToysKid","kids":{
							"relation":"BT",
							"tblname":"kids",
							"Modelname":"Kids",
							"modelname":"kids",
							"sModelname":"Kid"
						},"toys":{
							"relation":"BT",
							"tblname":"toys",
							"Modelname":"Toys",
							"modelname":"toys",
							"sModelname":"Toy"
						}	}};
		Alloy.Globals.LocalDB == true;
		if(Alloy.Globals.LocalDB == true){
			Alloy.Collections.Adults = Alloy.createCollection("adult");
			Alloy.Collections.Kids = Alloy.createCollection("kid");
			Alloy.Collections.Toys = Alloy.createCollection("toy");
			Alloy.Collections.Toys_kids = Alloy.createCollection("toysKid");
		};
		//:::::::APP CREATOR SYNC OPTIONS:::::::
			//::::THE DB:::::::
			//USER WILL BE ASKED: 'will there be an onboard DB?'
				//IF SO, APPCREATOR will print 'Alloy.Globals.LocalDB = true;'
				//ELSE, APPCREATOR will print 'Alloy.Globals.LocalDB = false;'
				Alloy.Globals.LocalDB = true;
					
				//USER WILL BE ASKED: Install default data on MOBILE INSTALL?
					//IF SO, APPCREATOR will print 'Alloy.Globals.SyncAtInstall = true;'
					//ELSE, APPCREATOR will print 'Alloy.Globals.SyncAtInstall = false;'
					Alloy.Globals.SyncAtInstall = false;
					
				
				//USER WILL BE ASKED: should the app be able to sync automatically?
					//IF SO, APPCREATOR will print 'Alloy.Globals.AutoSync = true;'
					//ELSE, APPCREATOR will print 'Alloy.Globals.AutoSync = false;'
					Alloy.Globals.AutoSync = true;
					
					//USER WILL BE ASKED (if SO), At what frequency?  :: //options: RUNTIME, LOGOUT, LOGIN, TIME
						//AT RUNTIME:
								//APPCREATOR WILL PRINT: 'Alloy.Globals.SyncFreqOpt = 'RUNTIME';'
						//EVERY LOGOUT:
								//APPCREATOR WILL PRINT: 'Alloy.Globals.SyncFreqOpt = 'LOGOUT';'
						//IF EVERY LOGIN: 
								//APPCREATOR WILL PRINT: 'Alloy.Globals.SyncFreqOpt = 'LOGIN';'
						//EVERY # of MINUTES, SECONDS, HOURS, or DAYS:
								//APPCREATOR WILL PRINT: 'Alloy.Globals.SyncFreqOpt = 'TIME';'
								//APPCREATOR WILL PRINT: 'Alloy.Globals.SyncFreqTimeOpt = 'DAYS';'
								//APPCREATOR WILL PRINT: 'Alloy.Globals.SyncFreqTimeVar = '1';'
						Alloy.Globals.SyncFreqOpt = 'RUNTIME';
					
													
					//USER WILL BE ASKED: Do you want to let the Mobile User set the frequency?
						//IF SO, APPCREATOR will print 'Alloy.Globals.AllowDynAutoSync = true;' ......... AND ALL OPTIONS WITH IT!!
						//ELSE, APPCREATOR will print 'Alloy.Globals.AllowDynAutoSync = false;' 
						Alloy.Globals.AllowDynAutoSync = true;
						Alloy.Globals.DefaultSyncFreqOpt = Alloy.Globals.SyncFreqOpt;
												
													
				//APP WILL NOT SYNC AUTOMATICALLY!!!! APPCREATOR WILL PRINT: Alloy.Globals.AutoSync = false; Alloy.Globals.AllowDynSync = true;								
				
				//USER WILL BE ASKED: do you want to let the mobile user sync dynamically (on command)?
					//IF SO, APPCREATOR will print Alloy.Globals.AllowDynSync = true;'
					//ELSE, APPCREATOR will print 'Alloy.Globals.AllowDynSync = false;'
					Alloy.Globals.AllowDynSync = true;
					
			//APP DOES NOT HAVE AN ONBOARD DB!!!!  APPCREATOR WILL PRINT: Alloy.Globals.SyncFreqOpt = 'RUNTIME';	
			
					
			//:::::LOGIN:::::::::		
			//USER WILL BE ASKED: Do you want a login screen?
				//IF SO, APPCREATOR will print 'Alloy.Globals.configureLogin = true;'
				//ELSE, APPCREATOR will print 'Alloy.Globals.configureLogin = false;'
				Alloy.Globals.configureLogin = true;
			
			
			
			
			
			//Testing Globals
			Alloy.Globals.testchildren = 3;
			
			// Android api version
			if( OS_ANDROID ) {
				Alloy.Globals.Android = { 
					'Api' : Ti.Platform.Android.API_LEVEL
				};
			}
			
			// Styles
			Alloy.Globals.Styles = {
				'TableViewRow' : {
					'height' : 45
				}
			};
			
			//Global Post function
			function globalsave(theurl, thedata, modelname, thelocaldata){
				var sendit = Ti.Network.createHTTPClient({
					onerror : function(e) {
						Ti.API.debug(e.error);
						alert(e.error);
					},
					timeout : 1000,
				});
				sendit.onload = function() {
					var json = JSON.parse(this.responseText);
					Ti.API.info(this.responseText);
					if(json.message=='Saved!'){
						//save local data
						var model = Alloy.Collections[modelname].get(json.id);
						thelocaldata['id'] = json.id;
						var myModel = Alloy.createModel(modelname, thelocaldata);
						// save model
						myModel.set(thelocaldata).save();
						// force tables to update
						Alloy.Collections[modelname].fetch();
					   
					}else{
						alert('There was an error in saving the '+modelname+'record.');
					}
					//end new
				};
				sendit.open('POST', theurl);
				sendit.send(thedata);
				
			}
			
			function globalserverdelete(tblname, id){
				var sendit = Ti.Network.createHTTPClient({
					onerror : function(e) {
						Ti.API.debug(e.error);
						//globaldeleterecord( tblname, id);
						alert('There was an error during the connection.  Want to try again?');
					},
					timeout : 1000,
				});
				sendit.open('POST', Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+tblname+'/mobiledelete.json');
				Ti.API.info( Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+tblname+'/mobiledelete');
				//sendit.open('https://maps.googleapis.com/maps/api/place/nearbysearch/json?types=hospital&location=13.01883,80.266113&radius=1000&sensor=false&key=AIzaSyDStAQQtoqnewuLdFwiT-FO0vtkeVx8Sks');
				sendit.send({'id':id});
				// Function to be called upon a successful response
				sendit.onload = function() {
					var json = JSON.parse(this.responseText);
					Ti.API.info(json);
					var db = Titanium.Database.open('_alloy_');
					var rows = db.execute('DELETE FROM '+tblname+' WHERE id = ?',id);
					db.close();
				 };
			};
			
			function globaldelete(e, parentTab, modelname, singlename, dataId, manytomanyaddscreen, tblview){
				if(parentTab!=''){
					tblview.deleteRow(e.index);
					if (typeof Alloy.Globals.RELATIONSHIP[modelname][manytomanyaddscreen] != 'undefined') {
						//HM
						
						globalopenDetail(e, Alloy.Globals.RELATIONSHIP[modelname].sModelname, modelname);
					}else{
						
						var db = Titanium.Database.open('_alloy_');
						var mmtblname = Alloy.Globals.RELATIONSHIP[manytomanyaddscreen].related[modelname].manytomanytblname;
						var rows = db.execute('SELECT id FROM '+mmtblname+' WHERE '+Alloy.Globals.RELATIONSHIP[manytomanyaddscreen].singlename+'_id = ? AND '+ singlename + '_id = ?',dataId, e.rowData.dataId);
						Ti.API.info('SELECT id FROM '+mmtblname+' WHERE '+Alloy.Globals.RELATIONSHIP[manytomanyaddscreen].singlename+'_id = '+dataId+' AND '+ singlename + '_id = '+e.rowData.dataId);
						//var rows = db.execute('DELETE FROM '+mmtblname+' WHERE '+singlename+'_id = ? AND '+Alloy.Globals.RELATIONSHIP[manytomanyaddscreen].singlename+'_id = ?',e.rowData.dataId,dataId);
						
						if(rows.getRowCount() == 1){ 
							globalserverdelete(mmtblname, rows.fieldByName('id'));
						}else{
							alert('There is an error in your records. There are '+rows.getRowCount()+' records');
						}
						db.close();
					}	
				}else{
					//delete actual ingredient
					tblview.deleteRow(e.index);
					globalserverdelete( Alloy.Globals.RELATIONSHIP[modelname].tblname, e.rowData.dataId);
				}
			}
			
			function globalgetrecords(modelname, Modelname){
				if (!Ti.App.Properties.hasProperty(modelname+'seeded')) {
					
					var newthing = [];
					var data = [];
					var sendit = Ti.Network.createHTTPClient({
						onerror : function(e) {
							Ti.API.debug(e.error);
							//getrecords();
							alert('There was an error during the connection to get '+modelname+' records');
						},
						timeout : 1000,
					});
					// Here you have to change it for your local ip
					
					sendit.open('POST', Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+modelname+'/mobileindex.json');
					sendit.send({'token':Ti.App.Properties.getString('token')});
					sendit.onload = function() {
						Ti.API.info(this.responseText);
						var json = JSON.parse(this.responseText);
						if (json.length == 0) {
							$.table.headerTitle = 'The database row is empty';
							
						}
						var records = json;
						for ( var i = 0, iLen = records.length; i < iLen; i++) {
							newthing.push(records[i][Modelname]);
						}
						Alloy.Collections[Modelname].reset(newthing);
						Alloy.Collections[Modelname].each(function(_m) {
							_m.save();
						});
						var things = Alloy.Collections[Modelname];
						things.fetch();
						Ti.App.Properties.setString(modelname+'seeded', 'yuppers');
					};
				
				//end if	
				}else{
					//sync
					var has_added = false;
					if(has_added == false){
						//download all!
						
						var newthing = [];
						var data = [];
						var sendit = Ti.Network.createHTTPClient({
							onerror : function(e) {
								Ti.API.debug(e.error);
								//getrecords();
								alert('There was an error during the connection to get '+modelname+' records');
							},
							timeout : 1000,
						});
						// Here you have to change it for your local ip
						
						sendit.open('POST', Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+modelname+'/mobileindex.json');
						sendit.send({'token':Ti.App.Properties.getString('token')});
						sendit.onload = function() {
							Ti.API.info(this.responseText);
							var json = JSON.parse(this.responseText);
							if (json.length == 0) {
								$.table.headerTitle = 'The database row is empty';
								
							}
							var records = json;
							for ( var i = 0, iLen = records.length; i < iLen; i++) {
								newthing.push(records[i][Modelname]);
							}
							Alloy.Collections[Modelname].reset(newthing);
							Alloy.Collections[Modelname].each(function(_m) {
								_m.save();
							});
							var things = Alloy.Collections[Modelname];
							things.fetch();
							Ti.App.Properties.setString(modelname+'seeded', 'yuppers');
						};
					}
				}
				var things = Alloy.Collections[Modelname];
				//fech data
				things.fetch();	
			}
			
			function globalopenChild( e, ManyToManys, ManyToMany, hasmultimanytomany, modelname ){
					if(hasmultimanytomany == true){
						var opts = {
						  cancel: ManyToManys.length-1,
						  options: ManyToManys,
						  title: 'Which Sub Records?'
						};
							
						var dialog = Ti.UI.createOptionDialog(opts);
						
						dialog.addEventListener('click', function(evt)
						{
							//check if cancel
							if(evt.index != ManyToManys.length-1){
								var relationstr = 'related';
								var theController = '';
								var isrelated = false;
								if (ManyToManys[evt.index].indexOf(relationstr) >= 0){
									//HABTM!  Chop string!
									theController = ManyToManys[evt.index].replace('related ', '');
									isrelated = true;
								}else{
									//NOT HABTM
									theController = ManyToManys[evt.index];
								}
								
								var addController = Alloy.createController(theController, {
									parentTab: Alloy.Globals.tabGroup.getActiveTab(),
									dataId: e.rowData.dataId,
									manytomanyaddscreen: modelname,
									related:isrelated
								});
								var addview = addController.getView();
								if (OS_IOS) {
									//Alloy.Globals.navgroup.open(addview); 
									var tab = Alloy.Globals.tabGroup.getActiveTab();
									tab.open(addview);  
								} else if (OS_ANDROID) {
									addview.open();
								}
							  }
								
						});
						
						dialog.show();
						
					}else{
						//only one many to many
						//check if it's a HABTM relation
						var relationstr = 'related';
						var theController = '';
						var isrelated = false;
						if (ManyToMany.indexOf(relationstr) >= 0){
							//HABTM!  Chop string!
							theController = ManyToMany.replace('related ', '');
							isrelated = true;
						}else{
							//NOT HABTM
							theController = ManyToMany;
						}
						var addController = Alloy.createController(theController, {
							parentTab: Alloy.Globals.tabGroup.getActiveTab(),
							dataId: e.rowData.dataId,
							manytomanyaddscreen: modelname,
							related:isrelated
						});
						var addview = addController.getView();
						if (OS_IOS) {
							//Alloy.Globals.navgroup.open(addview); 
							var tab = Alloy.Globals.tabGroup.getActiveTab();
							tab.open(addview);  
						} else if (OS_ANDROID) {
							addview.open();
						}
					}
				};
			
			function globaledittable(e, tblview){
				if(OS_IOS){
					//leave IOS here incase we add Android multidelete functionality
					  if (e.source.title == 'Edit') {
						tblview.editable = false;//deactivate swipe-Delete button
						tblview.editing = true;//Edit:on
						tblview.editing = false;//Edit:off
						tblview.editing = true;//Edit:on again!
						tblview.moving = true;
						e.source.title = 'Done';
					} else { 
						tblview.editable = true;//reactivate swipe-Delete button!
						tblview.editing = false;
						tblview.moving = false;
						e.source.title = 'Edit';
				   }
				
				}
			}
			
			function globalopenAddItem(parentTab, related, modelname, singlename, manytomanyaddscreen, dataId){
				if(parentTab!=''){
					//add new other record
					if(related == true){
						Ti.App.addEventListener('changefield',function(e){ 
							var row = e;
							var db = Titanium.Database.open('_alloy_');
							//find many to many table name with manytomanyaddscreeen name
							var mmtblname = Alloy.Globals.RELATIONSHIP[modelname].related[manytomanyaddscreen]['manytomanytblname'];
							var rows = db.execute('INSERT INTO '+mmtblname+' ('+Alloy.Globals.RELATIONSHIP[manytomanyaddscreen].singlename+'_id, '+singlename+'_id) Values(?,?)', dataId, e.value);
							db.close();
						 });
							var win=Alloy.createController(modelname+'chooser').getView();
							win.open();
					}else{
							var win=Alloy.createController(modelname+'Add').getView();
							win.open();	 
					}
				}else{
						var win=Alloy.createController(modelname+'Add').getView();
						win.open();
				}
			}
			
			function globalopenDetail(_e, Modelname, tablename){
					var things = Alloy.Collections[Modelname];
					//Ti.API.info(things.get(_e.rowData.model));
					var addController = Alloy.createController(tablename+'detail', {
						parentTab: Alloy.Globals.tabGroup.getActiveTab(),
						dataId: _e.rowData.dataId,
						model: Modelname,
						tablename: tablename
					});
					
					var addview = addController.getView();
					if (OS_IOS) {
						//Alloy.Globals.navgroup.open(addview); 
						var tab = Alloy.Globals.tabGroup.getActiveTab();
						tab.open(addview);  
					} else if (OS_ANDROID) {
						addview.open();
					}
			};