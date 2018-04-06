// JavaScript Document
var App = angular.module('App', ['ngSanitize'] );

App.controller('CenterCTRL', function ($scope,$http,todoServicez,$sce) {
 $scope.stuffs = [];
  $scope.nposts=[];
$scope.video=false;	
$scope.audio=false;	
$scope.panel="pages/panel.left.html";
$scope.progrshow=true;
$scope.loadshow=false;
$scope.wopen = function(links) {
 window.open(links, '_system', '');
};
//////////////////////////////////////////// show film	
 $http.get("http://namiadownload.ir/reg/manage/api.php?film").then(function(response) {
	$scope.film = response.data.items;
	document.getElementById('film_flag').value=1;
	var version=document.getElementById('version').value;
	if(version<response.data.version){
		 new $.nd2Toast({  
   message : "نسخه جدید از برنامه منتشر شده",  
   action : {title : "دریافت",  
  
    fn : function() {   window.open("http://app.namiadownload.ir/apk/97-1/namiadl.apk", '_system', '');
     },  
	 color : "red" },ttl : 8000
    });
	}
});	
 
//////////////////////////////////////////// show mobile	
setTimeout(function(){ $http.get("http://namiadownload.ir/reg/manage/api.php?mobile").then(function(response) {
	$scope.mobile = response.data.items;
	document.getElementById('mobile_flag').value=1;

});	
}, 1000);
//////////////////////////////////////////// show blog	
setTimeout(function(){ $http.get("http://namiadownload.ir/reg/manage/api.php?blog").then(function(response) {
	$scope.blog = response.data.items;
	document.getElementById('blog_flag').value=1;

});	
}, 1500);
///////////////////////////////////////////search 
setTimeout(function(){
  $http.get("http://namiadownload.ir/reg/manage/search.json").then(function(response) { 
  	$scope.progrshow=false;
	$scope.loadshow=true;
 var dsdf=response.data; 
new $.nd2Search({
	  placeholder : "جستجو ...",   // Placeholder in the search field
  defaultIcon : "globe-alt",  // optional: icon | null
source : dsdf,
  fn : function(result) { // this function will be executed when a valid result item is selected
   $scope.post(result);
  }
});
	
});  
}, 2000);
//////////////////////////////////////////// show music	
setTimeout(function(){
 $http.get("http://namiadownload.ir/reg/manage/api.php?music").then(function(response) {
	$scope.music = response.data.items;
	document.getElementById('music_flag').value=1;
});	
}, 2000);
//////////////////////////////////////////// show slider	
setTimeout(function(){
 $http.get("http://namiadownload.ir/reg/manage/api.php?slider").then(function(response) {
	$scope.slider = response.data.items;
	document.getElementById('slider_flag').value=1;
});	
}, 1000);
//////////////////////show n load post
$scope.npost = function (ides,news) {
	var relback=document.getElementById('page_rel').value;
	document.getElementById('page_back').value=relback;
	document.getElementById('page_rel').value='page3';	
	$scope.progrshow3=true;//alert(ides);
	if(news==1){$scope.nposts=[];
	$.mobile.changePage( "#page3", { transition: "fade"} );
	$scope.listviee='list.html';showmori();}

	 var vgh=document.getElementById('numload').value;

	
 $http.get("http://namiadownload.ir/reg/manage/api.php?cat="+ides+"&numb="+vgh).then(function(response) {
	 for( var r=0;r<10;r++){ 
	$scope.nposts.push({title:response.data.items[r].title,id:response.data.items[r].id,type:response.data.items[r].type,pic:response.data.items[r].pic});
	 }
	document.getElementById('catload').value=ides;
	 //$scope.stuffs.push({title: File_Name, id: ids});
       $scope.progrshow3=false;
      document.getElementById('numload').value=parseInt(vgh)+10;
	
});	
};

////////////////////////////////////////// show post
$scope.post = function (ides,type) {
	$scope.vide480="";
	$scope.progrshow2=true;
	$scope.loadshow2=false;
	var relback=document.getElementById('page_rel').value;
	document.getElementById('page_back').value=relback;
	document.getElementById('page_rel').value='page2';
	
	//document.getElementById('rele_flag').value=0;
	$.mobile.changePage( "#page2", { transition: "slideup"} );
 $scope.relet ={};
	$http.get("http://namiadownload.ir/reg/manage/api.php?post="+ides+"&type="+type).then(function(response) {
	$scope.posto = response.data.items[0];

	for (var i = 0; i < response.data.items[0].link.length; i++) { 		
	todoServicez.selfile(response.data.items[0].id,response.data.items[0].link[i].name,i).then(function(iol)
{if(iol!=9){
	if($scope.posto.type==9){ var strrd=response.data.items[0].link[i].linko;
		njj=strrd.search("480p");
	if(njj!=-1){$scope.vide480=response.data.items[0].link[i].linko;}}
	  if($scope.posto.type==953){$scope.postaudio="file:///storage/sdcard0/Namiadl/"+response.data.items[0].link[0].name;
	  
		  $scope.audio=true;document.getElementById(response.data.items[0].id+response.data.items[0].link[iol].name).style.display="none";
		  var myaudio = document.getElementById("audion");
		   //alert(myaudio);
 myaudio.load();}else{$scope.audio=false;}
	document.getElementById(response.data.items[0].id+response.data.items[0].link[iol].name).innerHTML=' اجرای '+response.data.items[0].link[iol].text;
}else if($scope.posto.type!=953){$scope.audio=false;}
});
	}
	 if($scope.posto.type==9){if($scope.vide480==""){$scope.vide480=response.data.items[0].link[0].linko;} }
	
	 if($scope.posto.type==9){$scope.video=true;
	 	 console.log($scope.vide480);
	   var myVideo = document.getElementById("videon"); 
 myVideo.load();myVideo.play();}else{$scope.video=false;}
 
////////////////////////////////////////// show relet post	

$http.get("http://namiadownload.ir/reg/manage/api.php?cat="+$scope.posto.type+"&numb="+0).then(function(response) {
	
	 $scope.progrshow2=false;
	$scope.loadshow2=true;
	var dflaf=document.getElementById('rele_flag').value;
	if(dflaf==0 ){
		
		//document.getElementById('relid').innerHTML="";
		//$scope.relet2 ={};
		 $scope.htmltemp='onde.html';
		$scope.relet = response.data.items;
		  document.getElementById('rele_flag').value=1; 
		   rele();
		 }else if(dflaf==1){
			//$scope.relet ={};
		//	 document.getElementById('relid').innerHTML=""; 
		//document.getElementById('rele_flag').value=0;
			 $scope.htmltemp='two.html';
			//document.getElementById('relid').innerHTML="";
			//$scope.relet = response.data.items;
		$scope.relet2 = response.data.items;
		// document.getElementById('relid').classList.remove("ow5");
		 //document.getElementById('relid').classList.add("owl5");
		  rele();
		
		// setTimeout(function(){ document.getElementById('rele_flag').value=1; }, 500);
		setTimeout(function(){ document.getElementById('rele_flag').value=0; }, 1000);
		 }
	
	});  
});	
//end post		
};

$scope.page4 = function(){
var relback=document.getElementById('page_rel').value;
	document.getElementById('page_back').value=relback;
	document.getElementById('page_rel').value='page4';	
$.mobile.changePage( "#page4", { transition: "fade"} );
};
$scope.openb = function(links){
window.open(links, '_system', ''); 
};
$scope.inappb = function(links){ 
 cordova.InAppBrowser.open(links, '_blank', 'location=yes');
};
$scope.abouts = function(){ 
$.mobile.changePage( "#about", { transition: "fade"} );
};
////////////////////////////////////////////////////////// لیست دانلود
$scope.list_dl = function () {
	var relback=document.getElementById('page_rel').value;
	document.getElementById('page_back').value=relback;
	document.getElementById('page_rel').value='page5';	
$.mobile.changePage( "#page5", { transition: "fade"} );
todoServicez.list_dl().then(function(items)
{//alert(items[0].ids);
	$scope.listdl = items;
});
};

/////////////////////////////////// download mohadad voice
$scope.download = function (URL,File_Name,ids,title,pic) 
{ 
var File_Name = File_Name.replace('&amp;','&');
$scope.progr=true;
todoServicez.selfile(ids,File_Name,1).then(function(items)
{ //alert(items);
if(items!==9){
 var store = "file:///storage/sdcard0/Namiadl/";
  window.resolveLocalFileSystemURL(store + File_Name, onSuccesfs, onFaidl);
function onSuccesfs() {
 	window.open("file:///storage/sdcard0/Namiadl/"+File_Name, '_system', '');  
}
 
function onFaidl() {
 todoServicez.dlfile(ids,File_Name,0,title,pic);
 new $.nd2Toast({   message : "مجدد تلاش کنید!",ttl : 4000});	  
}

}else{
var Onlins=document.getElementById('online').value;
if(Onlins==0){
	new $.nd2Toast({   message :"اتصال شما به اینترنت برقرار نیست !!",ttl : 6000});
return 0;
}	
document.getElementById(ids+File_Name).style.display="none";
 $scope.stuffs.push({title: File_Name, id: ids});
 $scope.evoice="file:///storage/sdcard0/Namiadl/"+File_Name;
 new $.nd2Toast({  
   message : "دریافت فایل آغاز شد",  
   action : {title : "مشاهده",  
     fn : function() {  
       $.mobile.changePage( "#page4", { transition: "fade"} );
     },color : "red" },ttl : 10000
    });
//Toast_Material({ content : "دریافت فایل آغاز شد", updown:"bottom", position:"center", align:"center" });	

//todoServicez.dlfile(ids,File_Name,1,title,pic);
var urls = URL.replace('&amp;','&');
//alert(urls);
var fileTransfer = new FileTransfer();
var uri = encodeURI(urls);
fileTransfer.download(
uri,
"file:///storage/sdcard0/namiadl/"+File_Name,
function(entt) {
},
function(error) {
	todoServicez.dlfile(ids,File_Name,0);

  console.log("upload error code" + error.message);
},
false,
{
  headers: {
	  "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
  }
}
);
	fileTransfer.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			//alert('pr'+ids+File_Name);
			document.getElementById('pr'+File_Name+ids).style.width=perc+'%';
			document.getElementById('nd'+File_Name+ids).innerHTML=perc+'%';
			if(perc==100){
todoServicez.dlfile(ids,File_Name,1,title,pic);			
document.getElementById(ids+File_Name).style.display="block";
new $.nd2Toast({   message : "دانلود فایل کامل شد",ttl : 4000});
				//alert(perc);
				}
			//statusDom.innerHTML = perc + "% loaded...";
		} else {
			
		}
	};
}
});
};

////////////////////end controler
});	

App.service('todoServicez', function($q) 
{
this.dlfile = function(idss,links,fave,title,pic) 
    {//alert(idss+fave);
		var db = window.openDatabase("Database", "1.0", "Cordova Namiadl", 200000);
        db.transaction(function(tx) 
        {tx.executeSql("SELECT id_file FROM downloads where id_file='"+idss+"' and links='"+links+"'", [], function(tx, res) 
	  { //alert(res.rows.length);
	  if(res.rows.length==0){result=0;
  return tx.executeSql("INSERT into downloads(flag,id_file,links,title,pic) values("+fave+","+idss+",'"+links+"','"+title+"','"+pic+"')" , [], function(tx, res) 
            {
                return true;
            });
	  }else{ return tx.executeSql("DELETE FROM `downloads` WHERE id_file="+idss+" and links='"+links+"'" , [], function(tx, res) 
            {
                return true;
            });
			}
          
        });
		});
		return false;
    },
	this.selfile = function(para,links,iio)
  {    
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova Namiadl", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("SELECT id_file FROM downloads where id_file='"+para+"' and links='"+links+"'", [], function(tx, res) 
	  { //alert(res.rows.length);
	  if(res.rows.length==0){result=9;

	  }else{//result=res.rows.item(0).id_file;
	  result=iio;}
	    
	  //alert(iio);
	  deferred.resolve(result);
	  
	  });
	  });
	  return deferred.promise;
    },
	this.list_dl = function()
  {   
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova Namiadl", 200000);
	  db.transaction(function(tx) 
	  {
	   tx.executeSql("select * from downloads where flag=1", [], function(tx, res) 
		  {//alert(res.rows.length);
		for(var i = 0; i < res.rows.length; i++)
		{
		  result.push({ids : res.rows.item(i).id_file, title : res.rows.item(i).title, pic: res.rows.item(i).pic });
		}
		  deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    }
} );