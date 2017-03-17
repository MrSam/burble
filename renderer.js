// http://paletton.com/#uid=33S110kllllD0n3s0mceFku80jC
var $ = require('jQuery');
var WebSocketClient = require('websocket').client;

setupWindow();

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});
 
client.connect('ws://localhost:8887/');




$( window ).resize(function() {
	doResize();
});

// FUNCTIONS
function setupWindow() {
	doResize();
//	newWindow("vpn-ix");
//	newWindow("irchelp");
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