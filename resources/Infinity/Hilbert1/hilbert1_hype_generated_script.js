//	HYPE.documents["Hilbert1"]

(function HYPE_DocumentLoader() {
	var resourcesFolderName = "Hilbert1_Resources";
	var documentName = "Hilbert1";
	var documentLoaderFilename = "hilbert1_hype_generated_script.js";

	// find the URL for this script's absolute path and set as the resourceFolderName
	try {
		var scripts = document.getElementsByTagName('script');
		for(var i = 0; i < scripts.length; i++) {
			var scriptSrc = scripts[i].src;
			if(scriptSrc != null && scriptSrc.indexOf(documentLoaderFilename) != -1) {
				resourcesFolderName = scriptSrc.substr(0, scriptSrc.lastIndexOf("/"));
				break;
			}
		}
	} catch(err) {	}

	// Legacy support
	if (typeof window.HYPE_DocumentsToLoad == "undefined") {
		window.HYPE_DocumentsToLoad = new Array();
	}
 
	// load HYPE.js if it hasn't been loaded yet
	if(typeof HYPE_108 == "undefined") {
		if(typeof window.HYPE_108_DocumentsToLoad == "undefined") {
			window.HYPE_108_DocumentsToLoad = new Array();
			window.HYPE_108_DocumentsToLoad.push(HYPE_DocumentLoader);

			var headElement = document.getElementsByTagName('head')[0];
			var scriptElement = document.createElement('script');
			scriptElement.type= 'text/javascript';
			scriptElement.src = resourcesFolderName + '/' + 'HYPE.js?hype_version=108';
			headElement.appendChild(scriptElement);
		} else {
			window.HYPE_108_DocumentsToLoad.push(HYPE_DocumentLoader);
		}
		return;
	}
	
	// guard against loading multiple times
	if(HYPE.documents[documentName] != null) {
		return;
	}
	
	var hypeDoc = new HYPE_108();
	
	var attributeTransformerMapping = {b:"i",c:"i",bC:"i",d:"i",aS:"i",M:"i",e:"f",N:"i",f:"d",aT:"i",O:"i",g:"c",aU:"i",P:"i",Q:"i",aV:"i",R:"c",aW:"f",aI:"i",S:"i",T:"i",l:"d",aX:"i",aJ:"i",m:"c",n:"c",aK:"i",X:"i",aL:"i",A:"c",aZ:"i",Y:"i",B:"c",C:"c",D:"c",t:"i",E:"i",G:"c",bA:"c",a:"i",bB:"i"};

var scenes = [{timelines:{"6_hover":{framesPerSecond:30,animations:[{f:"2",t:0,d:1,i:"h",e:"new_over.png",r:1,s:"new_button.png",o:"6"}],identifier:"6_hover",name:"6_hover",duration:1},"6_pressed":{framesPerSecond:30,animations:[{f:"2",t:0,d:1,i:"h",e:"new_down.png",r:1,s:"new_button.png",o:"6"}],identifier:"6_pressed",name:"6_pressed",duration:1},kTimelineDefaultIdentifier:{framesPerSecond:30,animations:[],identifier:"kTimelineDefaultIdentifier",name:"Main Timeline",duration:0}},sceneIndex:0,perspective:"600px",oid:"1",initialValues:{"6":{b:175,z:"5",K:"None",c:88,L:"None",d:23,aS:6,M:0,bD:"none",aT:6,N:0,O:0,aU:6,P:0,h:"new_button.png",Q:0,aV:6,R:"#000000",j:"absolute",S:0,k:"div",T:0,p:"no-repeat",A:"#A0A0A0",q:"100% 100%",B:"#A0A0A0",aM:"6_hover",r:"inline",Z:"break-word",C:"#A0A0A0",aN:"6_pressed",D:"#A0A0A0",t:13,aA:{type:1,transition:1,sceneOid:"7"},F:"center",G:"#000000",aP:"pointer",w:"<br>",x:"visible",I:"None",a:15,y:"preserve",J:"None"},"41":{o:"content-box",h:"hotel.png",x:"visible",a:0,q:"100% 100%",b:0,j:"absolute",r:"inline",c:920,z:"4",k:"div",d:191}},backgroundColor:"#FFFFFF",name:"Intro"},{onSceneLoadAction:{type:4,javascriptOid:"40"},initialValues:{"32":{o:"content-box",h:"first_3.jpg",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:60,z:"20",k:"div",d:113,e:"0.000000"},"25":{o:"content-box",h:"doors_end.png",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:776,z:"5",k:"div",d:119,e:"0.000000"},"18":{o:"content-box",h:"doors_3.jpg",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:776,z:"10",k:"div",d:113,e:"0.000000"},"10":{o:"content-box",h:"new_button.png",x:"visible",a:15,q:"100% 100%",b:175,j:"absolute",r:"inline",c:100,z:"23",k:"div",d:35,e:"1.000000"},"33":{o:"content-box",h:"first_4.jpg",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:60,z:"21",k:"div",d:115,e:"0.000000"},"26":{o:"content-box",h:"first_empty.jpg",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:60,z:"13",k:"div",d:117,e:"0.000000"},"19":{o:"content-box",h:"doors_4.jpg",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:776,z:"11",k:"div",d:115,e:"0.000000"},"34":{o:"content-box",h:"first_5.jpg",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:60,z:"22",k:"div",d:117,e:"0.000000"},"27":{o:"content-box",h:"first_end.png",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:60,z:"14",k:"div",d:117,e:"0.000000"},"42":{o:"content-box",h:"hotel.png",x:"visible",a:0,q:"100% 100%",b:0,j:"absolute",r:"inline",c:920,z:"2",k:"div",d:191},"28":{o:"content-box",h:"arrow_in.png",x:"visible",a:45,q:"100% 100%",b:169,j:"absolute",r:"inline",c:86,z:"15",k:"div",d:44,e:"0.000000"},"20":{o:"content-box",h:"doors_5.jpg",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:776,z:"12",k:"div",d:117,e:"0.000000"},"29":{o:"content-box",h:"first_end.png",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:60,z:"17",k:"div",d:117,e:"0.000000"},"21":{o:"content-box",h:"doors_end.png",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:776,z:"7",k:"div",d:119,e:"0.000000"},"14":{o:"content-box",h:"guest_new.png",x:"visible",a:-37,q:"100% 100%",b:113,j:"absolute",r:"inline",c:43,z:"16",k:"div",d:101,e:"0.000000"},"15":{o:"content-box",h:"arrows.png",x:"visible",a:135,q:"100% 100%",b:162,j:"absolute",r:"inline",c:777,z:"3",k:"div",d:30,e:"0.000000"},"30":{o:"content-box",h:"first_1.jpg",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:60,z:"18",k:"div",d:108,e:"0.000000"},"23":{o:"content-box",h:"doors_empty.jpg",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:776,z:"4",k:"div",d:117,e:"0.000000"},"16":{o:"content-box",h:"doors_1.jpg",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:776,z:"8",k:"div",d:108,e:"0.000000"},"31":{o:"content-box",h:"first_2.jpg",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:60,z:"19",k:"div",d:110,e:"0.000000"},"24":{o:"content-box",h:"guests.png",x:"visible",a:103,q:"100% 100%",b:61,j:"absolute",r:"inline",c:771,z:"6",k:"div",d:101,e:"0.000000"},"17":{o:"content-box",h:"doors_2.jpg",x:"visible",a:103,q:"100% 100%",b:48,j:"absolute",r:"inline",c:776,z:"9",k:"div",d:110,e:"0.000000"}},timelines:{"9_pressed":{framesPerSecond:30,animations:[],identifier:"9_pressed",name:"9_pressed",duration:0},kTimelineDefaultIdentifier:{framesPerSecond:30,animations:[{f:"2",t:0,d:1,i:"e",e:"0.000000",r:1,s:"1.000000",o:"10"},{f:"2",t:0,d:1.5,i:"b",e:74,r:1,s:113,o:"14"},{f:"2",t:0,d:1.5,i:"a",e:57,r:1,s:-37,o:"14"},{f:"2",t:0,d:1,i:"e",e:"1.000000",r:1,s:"0.000000",o:"14"},{f:"2",t:1,d:17.266666,i:"e",e:"1.000000",s:"1.000000",o:"14"},{f:"2",t:1.5,d:2,i:"e",e:"1.000000",r:1,s:"0.000000",o:"15"},{f:"2",t:1.5,d:14,i:"b",e:74,s:74,o:"14"},{f:"2",t:1.5,d:14,i:"a",e:57,s:57,o:"14"},{f:"2",t:3.5,d:0.29999995,i:"e",e:"1.000000",r:1,s:"0.000000",o:"16"},{f:"2",t:3.8,d:1.1666667,i:"e",e:"1.000000",s:"1.000000",o:"16"},{f:"2",t:3.8,d:0.29999995,i:"e",e:"1.000000",r:1,s:"0.000000",o:"17"},{f:"2",t:4.0999999,d:0.30000019,i:"e",e:"1.000000",r:1,s:"0.000000",o:"18"},{f:"2",t:4.0999999,d:0.86666679,i:"e",e:"1.000000",s:"1.000000",o:"17"},{f:"2",t:4.4000001,d:0.5666666,i:"e",e:"1.000000",s:"1.000000",o:"18"},{f:"2",t:4.4000001,d:0.29999971,i:"e",e:"1.000000",r:1,s:"0.000000",o:"19"},{f:"2",t:4.6999998,d:0.26666689,i:"e",e:"1.000000",s:"1.000000",o:"19"},{f:"2",t:4.6999998,d:0.30000019,i:"e",e:"1.000000",r:1,s:"0.000000",o:"20"},{f:"2",t:4.9666667,d:0.033333302,i:"e",e:"1.000000",r:1,s:"0.000000",o:"23"},{f:"2",t:4.9666667,d:0.033333302,i:"e",e:"1.000000",r:1,s:"0.000000",o:"21"},{f:"2",t:4.9666667,d:0.033333302,i:"e",e:"0.000000",s:"1.000000",o:"16"},{f:"2",t:4.9666667,d:0.033333302,i:"e",e:"0.000000",s:"1.000000",o:"19"},{f:"2",t:4.9666667,d:0.033333302,i:"e",e:"0.000000",s:"1.000000",o:"18"},{f:"2",t:4.9666667,d:0.033333302,i:"e",e:"0.000000",s:"1.000000",o:"17"},{f:"2",t:5,d:0.30000019,i:"e",e:"0.000000",s:"1.000000",o:"20"},{f:"2",t:5,d:8.2666664,i:"e",e:"0.000000",s:"0.000000",o:"19"},{f:"2",t:5,d:8.2666664,i:"e",e:"0.000000",s:"0.000000",o:"18"},{f:"2",t:5,d:8.2666664,i:"e",e:"0.000000",s:"0.000000",o:"17"},{f:"2",t:5,d:8.2666664,i:"e",e:"0.000000",s:"0.000000",o:"16"},{f:"2",t:5,d:2.0666666,i:"e",e:"1.000000",s:"1.000000",o:"21"},{f:"2",t:5,d:8.2666664,i:"e",e:"1.000000",s:"1.000000",o:"23"},{f:"2",t:5.3000002,d:7.6999998,i:"e",e:"0.000000",s:"0.000000",o:"20"},{f:"2",t:5.3000002,d:0.4333334,i:"e",e:"1.000000",r:1,s:"0.000000",o:"24"},{f:"2",t:5.5,d:3.5,i:"a",e:196,r:1,s:103,o:"24"},{f:"2",t:5.5,d:3.5,i:"b",e:82,r:1,s:61,o:"24"},{f:"2",t:5.7333336,d:5.7666664,i:"e",e:"1.000000",s:"1.000000",o:"24"},{f:"2",t:7.0666666,d:0.033333302,i:"e",e:"1.000000",r:1,s:"0.000000",o:"25"},{f:"2",t:7.0666666,d:0.033333302,i:"e",e:"0.000000",s:"1.000000",o:"21"},{f:"2",t:7.0999999,d:6.1666665,i:"e",e:"1.000000",s:"1.000000",o:"25"},{f:"2",t:7.0999999,d:3.3333335,i:"e",e:"0.000000",s:"0.000000",o:"21"},{f:"2",t:9,d:1.5,i:"a",e:224,s:196,o:"24"},{f:"2",t:9,d:1.5,i:"b",e:66,s:82,o:"24"},{f:"2",t:10.433333,d:0.033332825,i:"e",e:"1.000000",s:"0.000000",o:"21"},{f:"2",t:10.466666,d:2.8000002,i:"e",e:"1.000000",s:"1.000000",o:"21"},{f:"2",t:10.5,d:1.5,i:"a",e:190,s:224,o:"24"},{f:"2",t:10.5,d:1.5,i:"b",e:60,s:66,o:"24"},{f:"2",t:11.5,d:1,i:"e",e:"0.000000",s:"1.000000",o:"24"},{f:"2",t:12.866667,d:0.033332825,i:"e",e:"1.000000",r:1,s:"0.000000",o:"27"},{f:"2",t:12.866667,d:0.033332825,i:"e",e:"1.000000",r:1,s:"0.000000",o:"26"},{f:"2",t:12.9,d:5.3666668,i:"e",e:"1.000000",s:"1.000000",o:"27"},{f:"2",t:12.9,d:5.3666668,i:"e",e:"1.000000",s:"1.000000",o:"26"},{f:"2",t:13,d:0.30000019,i:"e",e:"1.000000",s:"0.000000",o:"20"},{f:"2",t:13.266666,d:0.033333778,i:"e",e:"1.000000",s:"0.000000",o:"16"},{f:"2",t:13.266666,d:0.033333778,i:"e",e:"0.000000",s:"1.000000",o:"23"},{f:"2",t:13.266666,d:0.033333778,i:"e",e:"0.000000",s:"1.000000",o:"21"},{f:"2",t:13.266666,d:0.033333778,i:"e",e:"0.000000",s:"1.000000",o:"25"},{f:"2",t:13.266666,d:0.033333778,i:"e",e:"1.000000",s:"0.000000",o:"17"},{f:"2",t:13.266666,d:0.033333778,i:"e",e:"1.000000",s:"0.000000",o:"18"},{f:"2",t:13.266666,d:0.033333778,i:"e",e:"1.000000",s:"0.000000",o:"19"},{f:"2",t:13.3,d:0.30000019,i:"e",e:"0.000000",s:"1.000000",o:"20"},{f:"2",t:13.3,d:0.30000019,i:"e",e:"1.000000",s:"1.000000",o:"19"},{f:"2",t:13.3,d:0.59999943,i:"e",e:"1.000000",s:"1.000000",o:"18"},{f:"2",t:13.3,d:0.89999962,i:"e",e:"1.000000",s:"1.000000",o:"17"},{f:"2",t:13.3,d:1.1999998,i:"e",e:"1.000000",s:"1.000000",o:"16"},{f:"2",t:13.6,d:0.29999924,i:"e",e:"0.000000",s:"1.000000",o:"19"},{f:"2",t:13.9,d:0.30000019,i:"e",e:"0.000000",s:"1.000000",o:"18"},{f:"2",t:14.2,d:0.30000019,i:"e",e:"0.000000",s:"1.000000",o:"17"},{f:"2",t:14.5,d:0.30000019,i:"e",e:"0.000000",s:"1.000000",o:"16"},{f:"2",t:15,d:1,i:"e",e:"1.000000",r:1,s:"0.000000",o:"28"},{f:"2",t:15.5,d:1,i:"a",e:142,s:57,o:"14"},{f:"2",t:15.5,d:1,i:"b",e:90,s:74,o:"14"},{f:"2",t:16.433332,d:0.066667557,i:"e",e:"1.000000",r:1,s:"0.000000",o:"29"},{f:"2",t:16.5,d:1,i:"a",e:111,s:142,o:"14"},{f:"2",t:16.5,d:1,i:"b",e:65,s:90,o:"14"},{f:"2",t:16.5,d:1.7666664,i:"e",e:"1.000000",s:"1.000000",o:"29"},{f:"2",t:18,d:0.29999924,i:"e",e:"1.000000",r:1,s:"0.000000",o:"34"},{f:"2",t:18.266666,d:0.033332825,i:"e",e:"0.000000",s:"1.000000",o:"26"},{f:"2",t:18.266666,d:0.033332825,i:"e",e:"0.000000",s:"1.000000",o:"14"},{f:"2",t:18.266666,d:0.033332825,i:"e",e:"0.000000",s:"1.000000",o:"27"},{f:"2",t:18.266666,d:0.033332825,i:"e",e:"0.000000",s:"1.000000",o:"29"},{f:"2",t:18.266666,d:0.033332825,i:"e",e:"1.000000",r:1,s:"0.000000",o:"31"},{f:"2",t:18.266666,d:0.033332825,i:"e",e:"1.000000",r:1,s:"0.000000",o:"33"},{f:"2",t:18.266666,d:0.033332825,i:"e",e:"1.000000",r:1,s:"0.000000",o:"32"},{f:"2",t:18.266666,d:0.033332825,i:"e",e:"1.000000",r:1,s:"0.000000",o:"30"},{f:"2",t:18.299999,d:1.2000008,i:"e",e:"1.000000",s:"1.000000",o:"30"},{f:"2",t:18.299999,d:0.90000153,i:"e",e:"1.000000",s:"1.000000",o:"31"},{f:"2",t:18.299999,d:0.60000038,i:"e",e:"1.000000",s:"1.000000",o:"32"},{f:"2",t:18.299999,d:0.30000114,i:"e",e:"0.000000",s:"1.000000",o:"34"},{f:"2",t:18.299999,d:-0.12000012,i:"e",e:"1.000000",s:"1.000000",o:"33"},{f:"2",t:18.6,d:0.29999924,i:"e",e:"0.000000",s:"1.000000",o:"33"},{f:"2",t:18.9,d:0.30000114,i:"e",e:"0.000000",s:"1.000000",o:"32"},{f:"2",t:19.200001,d:0.29999924,i:"e",e:"0.000000",s:"1.000000",o:"31"},{f:"2",t:19.5,d:0.46666718,i:"e",e:"0.000000",s:"1.000000",o:"30"}],identifier:"kTimelineDefaultIdentifier",name:"Main Timeline",duration:19.966667}},sceneIndex:1,perspective:"600px",oid:"7",onSceneAnimationCompleteAction:{type:1,transition:2,sceneOid:"1"},backgroundColor:"#FFFFFF",name:"Animation"}];


	
	var javascripts = [{name:"Audio",source:"function(hypeDocument, element, event) {\n\tvar audio = new Audio(\"http://www.mathigon.com/world/resources/Infinity/Hilbert1.mp4\");\n\taudio.play();\n}",identifier:"40"}];


	
	var Custom = {};
	var javascriptMapping = {};
	for(var i = 0; i < javascripts.length; i++) {
		try {
			javascriptMapping[javascripts[i].identifier] = javascripts[i].name;
			eval("Custom." + javascripts[i].name + " = " + javascripts[i].source);
		} catch (e) {
			hypeDoc.log(e);
			Custom[javascripts[i].name] = (function () {});
		}
	}
	
	hypeDoc.setAttributeTransformerMapping(attributeTransformerMapping);
	hypeDoc.setScenes(scenes);
	hypeDoc.setJavascriptMapping(javascriptMapping);
	hypeDoc.Custom = Custom;
	hypeDoc.setCurrentSceneIndex(0);
	hypeDoc.setMainContentContainerID("hilbert1_hype_container");
	hypeDoc.setResourcesFolderName(resourcesFolderName);
	hypeDoc.setShowHypeBuiltWatermark(0);
	hypeDoc.setShowLoadingPage(false);
	hypeDoc.setDrawSceneBackgrounds(false);
	hypeDoc.setDocumentName(documentName);

	HYPE.documents[documentName] = hypeDoc.API;

	hypeDoc.documentLoad(this.body);
}());

