// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

	var net = require('net');
    var $ = require('jQuery');

	
	var client = new net.Socket();
	client.connect(6667, 'irc.krey.net', function() {
		$("#messagelist_console").text("Connected");
		
		client.write('NICK Melk\r\n');
		client.write('USER melk 8 * :Make IRC Great Again \r\n');
	});
	
	client.on('data', function(buffer) {
		
		// data is a chunk of data; now split it 
		var data = buffer.toString().split("\r\n");
		
		console.log(data);
		
		$.each(data, function(index, value) {
			appendTextLine("#messagelist_console", value);
		}); 
	});

	client.on('close', function() {
		$("#messagelist_console").text("Connection closed");
		console.log('Connection closed');
	});

	
	function appendTextLine(elem, text) {
		var textline = $("<div></div>").text(text);
		$(elem).append(textline);
		$(elem).scrollTop($(elem)[0].scrollHeight);
	}
	
	// channel switcher
	$( ".chanlink").click(function() {
		
		var window = "#messagelist_" + $(this).data('window').toString();
  		$(".messagelist").hide(0, function() {
  			$(window).show();
  		})
  		console.log("Showing: " + window);
	});