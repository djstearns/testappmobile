
		var singlename = 'toyskid';
		var modelname = 'toysKids';
		var Modelname = 'ToysKid';
		var tblname = 'toys_kids';
		
		var args = arguments[0] || {};
		
		$.savebtn.addEventListener('click', function(_e) {
		
			globalsave( Alloy.Globals.BASEURL+Alloy.Globals.PLUGIN+tblname+'/mobileadd/',
			 {
				 "kid_id":$.kid_id.value,"toy_id":$.toy_id.value
			 },
			 Modelname,
			 {		
					kid_id:$.kid_id.value,toy_id:$.toy_id.value
			  }
			 );
			
				// close window
				$.AddWindow.close();
		
		});
		//this is for when you have a button that correspsonds to a has many 
		//if has a BT relation add an event listener and a click function for buttons
		Ti.App.addEventListener('changekidfield',function(e){ 
											$.kid_id.value = e.value;
											$.kid.value = e.title;
										 });Ti.App.addEventListener('changetoyfield',function(e){ 
											$.toy_id.value = e.value;
											$.toy.value = e.title;
										 });
		
		$.pickkid.addEventListener('click', function(_e) {
								var win=Alloy.createController('kidschooser').getView();
								win.open();
								});$.picktoy.addEventListener('click', function(_e) {
								var win=Alloy.createController('toyschooser').getView();
								win.open();
								});
		
		$.cancelbtn.addEventListener('click', function(e) {
		//var send = things.get(e.rowData.model);
			$.AddWindow.close();
			//Alloy.Globals.testchildren = Alloy.Globals.testchildren - 1;
		});
		