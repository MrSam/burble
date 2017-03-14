// http://paletton.com/#uid=33S110kllllD0n3s0mceFku80jC
var net = require('net');
var $ = require('jQuery');

setupWindow();

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

$( window ).resize(function() {
	doResize();
});

// FUNCTIONS
function setupWindow() {
	doResize();
	newWindow("vpn-ix");
	newWindow("irchelp");
}

var channels = {};

function newWindow(tab_id) {
	
	// create window
	$("<div style='display:none'><div>New window for "+ tab_id + "</div></div>").attr("id", "messagelist_" + tab_id).addClass("messagelist").appendTo($("#mainChatDiv"));
	
	// tab
	var label = $('<label><label>').attr('id', "tab_" + tab_id).addClass("tab-bar__item tab-bar--material__item");
	$("<input type='radio'>").addClass("channelbutton").data("window",tab_id).attr("name", "tab-bar-material-a").appendTo(label);
	$('<button>').addClass("tab-bar__button tab-bar--material__button").text(tab_id).appendTo(label);
	
	$(label).appendTo($(tabnavbar));
} 

function doResize() {
	var newheight = $( window ).height();
	newheight = newheight - 150;
	$("#mainChatDiv").height(newheight);
}

function appendTextLine(elem, text) {
	var textline = $("<div></div>").text(text);
	$(elem).append(textline);
	$(elem).scrollTop($(elem)[0].scrollHeight);
}

// EVENTS
$( "input").click(function() {
	var window = "#messagelist_" + $(this).data('window').toString();
	$(".messagelist").hide(0, function() { $(window).show(); })
	console.log("Showing: " + window);
});