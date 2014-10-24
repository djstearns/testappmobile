
		var singlename = 'kid';
		var modelname = 'kids';
		var Modelname = 'Kid';
		var tblname = 'kids';
		
		var args = arguments[0] || {};
		
		$.savebtn.addEventListener('click', function(_e) {
		
			globalsave( Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+tblname+'/mobileadd/',
			 {
				 "name":$.name.value,"age":$.age.value,"adult_id":$.adult_id.value,"mom":$.mom.value
			 },
			 Modelname,
			 {		
					name:$.name.value,age:$.age.value,adult_id:$.adult_id.value,mom:$.mom.value
			  }
			 );
			
				// close window
				$.AddWindow.close();
		
		});
		//this is for when you have a button that correspsonds to a has many 
		//if has a BT relation add an event listener and a click function for buttons
		Ti.App.addEventListener('changeadultfield',function(e){ 
											$.adult_id.value = e.value;
											$.adult.value = e.title;
										 });
		
		$.pickadult.addEventListener('click', function(_e) {
								var win=Alloy.createController('adultschooser').getView();
								win.open();
								});
		
		$.cancelbtn.addEventListener('click', function(e) {
		//var send = things.get(e.rowData.model);
			$.AddWindow.close();
			//Alloy.Globals.testchildren = Alloy.Globals.testchildren - 1;
		});
		