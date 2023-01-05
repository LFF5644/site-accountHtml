
function callApi(args,data){
	fetch("/server/account/account.api",{
		method:"post",
		headers:{"Content-Type":"application/json"},
		credentials:"include",
		body:JSON.stringify(args),
	})
		.then(res=>res.text())
		.then(res=>HandleServerResponse(res,args.want,data))
}
function LogoutDevice(tokenCreated){
	this.onclick=null;
	callApi({
		want:"LogoutDevice",
		tokenCreated,
	},{
		removeElementById:"device_"+tokenCreated,
	});
}
function HandleServerResponse(serverResponse,clientAction,args){
	try{serverResponse=JSON.parse(serverResponse)}
	catch(e){
		alert("INTERNER SERVER FEHLER:\nBitte gebe Lando Bescheid das die variable serverResponse nicht in json umgewandelt werden konte!\n\nDie Action wird mit einem KRITISCHEN fehler abgebrochen\nDanke für ihr verständnis!\nGrüße vom Programmierer Lando!");
		throw new Error("json cant parse");
	}
	if(serverResponse.code=="ok"){
		if(clientAction=="LogoutDevice"){
			const e=document.getElementById(args.removeElementById);
			if(e.className.includes("thisDevice")){
				location.reload();
			}
			e.remove();
		}
	}else{
		if(serverResponse.errormsg){alert("Info vom Server:\n"+serverResponse.errormsg)};
	}
	console.log(serverResponse);
}