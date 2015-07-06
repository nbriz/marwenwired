	
	function projObj( id ){ // create class site list
		var list = document.getElementById(id).innerHTML.split(",");
		var host = "http://"+window.location.hostname;
		var urls = [];
		for (var i = 0; i < list.length; i++) {
			urls.push( host + "/" + list[i] );
		};
		return { items:list, urls:urls, count:list.length };
	}

	// $(document).ready(function(){
	$(window).bind("load", function() {	

		// fade out loader
		$('.loader').fadeOut();



		// hljs.initHighlightingOnLoad();
		// highlight js code
		$('pre code').each(function(i, block) {
			hljs.highlightBlock(block);
		});




		// create class site list 
		if( document.getElementById('projects')){
			var projs = projObj('projects');
			$('#projects').html('');
			
			for (var i = 0; i < projs.count; i++) {
				if(projs.items[i]!='admin'){
					var ele = '<li><a href="'+projs.urls[i]+'">'+projs.items[i]+'</a></li>';
					$('#projects').append(ele);
				}					
			};	
		}



		// convert text to html in header 
		var header = document.getElementById('header');
		if(header){
			var content = header.textContent;
			header.innerHTML = content;			
		}




		// toggle cheat sheet && color picker

		var showingCheat = false;
		var showingPicker = false;

		$('#sheet').on({
			click: function(){

				showingCheat = (showingCheat) ? false : true;
				showingPicker = false;
				
				if(showingCheat){
					$('#main').css('marginLeft','-820px');
					$('#cheatsheet').css('right','0px');
					$('#colorpicker').css('right','-410px');
				} else {
					$('#main').css('marginLeft','0px');
					$('#cheatsheet').css('right','-410px');
					$('#colorpicker').css('right','-410px');
				}
			}
		});
		$('#picker').on({
			click: function(){
				
				showingPicker = (showingPicker) ? false : true;
				showingCheat = false;
				
				if(showingPicker){
					$('#main').css('marginLeft','-820px');
					$('#cheatsheet').css('right','-410px');
					$('#colorpicker').css('right','0px');
				} else {
					$('#main').css('marginLeft','0px');
					$('#cheatsheet').css('right','-410px');
					$('#colorpicker').css('right','-410px');
				}
			}
		});

		function openFullEditor( src ){
			var ele = document.createElement('div');
			ele.className = "etab";
			ele.innerHTML = '<a href="'+src+'" target="_blank"> view full screen </a>';
			return ele;
		}

		function restartEle( id, src ){
			var ele = document.createElement('div');
			ele.className = "etab";
			ele.innerHTML = "restart";
			$(ele).on({
				click:function(){ $('#'+id).attr('src',src); }
			});
			return ele;
		}

		$('.restart').each(function( i ) {
			
			var src = $(this).attr('src');
			var id = $(this).attr('id');
			var restart = restartEle( id, src );

			$(this).after( restart );
			
		});
		
		$('.eframe').each(function( i ) {
			
			var src = $(this).attr('src');
			var link = openFullEditor( src );

			$(this).after( link );
		});



		// submit "big idea" answer
		// via http://stackoverflow.com/a/8624994/1104148

		// $("form").submit(function(e) {
		//     e.preventDefault(); // Prevents the page from refreshing
		//     var $this = $(this); // `this` refers to the current form element
		//     $.post(
		//         $this.attr("action"), // Gets the URL to sent the post to
		//         //$this.serialize(), // Serializes form data in standard format
		//         function(data) { /** code to handle response **/  console.log(data); },
		//         "json" // The format the response should be in
		//     );
		// });


	});