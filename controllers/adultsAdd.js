
		var singlename = 'adult';
		var modelname = 'adults';
		var Modelname = 'Adult';
		var tblname = 'adults';
		
		var args = arguments[0] || {};
		
		$.savebtn.addEventListener('click', function(_e) {
		
			globalsave( Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+tblname+'/mobileadd/',
			 {
				 "name":$.name.value
			 },
			 Modelname,
			 {		
					name:$.name.value
			  }
			 );
			
				// close window
				$.AddWindow.close();
		
		});
		//this is for when you have a button that correspsonds to a has many 
		//if has a BT relation add an event listener and a click function for buttons
		
		
		
		
		$.cancelbtn.addEventListener('click', function(e) {
		//var send = things.get(e.rowData.model);
			$.AddWindow.close();
			//Alloy.Globals.testchildren = Alloy.Globals.testchildren - 1;
		});
		