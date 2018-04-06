
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		  FastClick.attach(body);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
	 
        var parentElement = document.getElementById(id);
        console.log('Received Event: ' + id);
    }
};

document.addEventListener('deviceready', onDeviceBase, false);
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);
  function onOffline() {
document.getElementById('online').value=0;
}	
  function onOnline() {
document.getElementById('online').value=1;
}	
////////////////////////////////////
function onDeviceBase() {

var db = window.openDatabase("Database", "1.0", "Cordova Namiadl", 200000);
db.transaction(table, errorCB, successCB);
}
// end onDeviceBase
function table(tx){    
//tx.executeSql('DROP TABLE IF EXISTS yadavari');
//tx.executeSql('DROP TABLE IF EXISTS downloads');
tx.executeSql('CREATE TABLE IF NOT EXISTS settings(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title text,valuem text)');
tx.executeSql('CREATE TABLE IF NOT EXISTS downloads(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, id_file INTEGER,links text,pic text,title text,flag INTEGER)');
//alert('dd');
}
///////////////////////////////////////error db
function errorCB(err) {
	console.log("Error processing SQLm: "+err.message);
}
///////////////////////////////////// هرچیزی که می خواهد در ابتدا استارت بخورد در این قسمت قرار بگیرد
function successCB() {
//var db = window.openDatabase("Database", "1.0", "Cordova borna", 200000);
//db.transaction(flag_one, errorSE);
//alert('iu');
}

/////////////////////////////////////////////////////////////back button
document.addEventListener("backbutton", function(e){
	//alert($.mobile.activePage.attr('id'));
       if($.mobile.activePage.is('#one')){
		       
           e.preventDefault();
           navigator.app.exitApp();
       }
       else if($.mobile.activePage.is('#page2')){
  var rel=document.getElementById('page_rel').value;
  var backs=document.getElementById('page_back').value;
  //console.log(rel);
  //console.log(backs);
  if(rel==backs){$.mobile.changePage( "#one", { transition: "slideup"} );}else{
	 $.mobile.changePage( "#"+backs, { transition: "slideup"} ); 
	 }
  //$.mobile.changePage( "#one", { transition: "fade"} );
        }else if($.mobile.activePage.is('#page4')){
  $.mobile.changePage( "#page2", { transition: "slideup"} );
  //$.mobile.changePage( "#one", { transition: "fade"} );
       }else if($.mobile.activePage.is('#page3')){
  $.mobile.changePage( "#one", { transition: "slideup"} );
         }else if($.mobile.activePage.is('#page5')){
  $.mobile.changePage( "#one", { transition: "slideup"} );
       }else if($.mobile.activePage.is('#about')){
  $.mobile.changePage( "#one", { transition: "slideup"} );
       }
       else {
	
		 e.preventDefault();
          navigator.app.backHistory();
       }
    }, false);

function exitFromApp()
{
  navigator.app.exitApp();
}
////////////////////////////////////////////////////// scroll down

function showmori(){$('#limore').bind('scroll', function()
{
  if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight){
 var ides=document.getElementById('catload').value;
// console.log("Notice");
 angular.element($("#CenterCTRL")).scope().npost(ides,0);
 return 0;
}
});}

function showser(nsers){
	//alert(nsers);
 angular.element($("#CenterCTRL")).scope().nsersearch(nsers);	
}
///////////////////
