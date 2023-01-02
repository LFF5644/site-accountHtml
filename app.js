
function findActiveRadio(list){
	let radio="";
	for(radio of list){
		if(radio.checked){
			return radio.value;
		}
	}
	throw new Error("in radio list isn't an checked radio element");
}
function callApi(args){
	fetch("/server/account/account.api",{
		method:"post",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify(args),
	})
		.then(res=>res.text())
		.then(res=>HandleServerResponse(res,args.want))
}
function HandleServerResponse(serverResponse,clientAction){
	try{serverResponse=JSON.parse(serverResponse)}
	catch(e){
		alert("INTERNER SERVER FEHLER:\nBitte gebe Lando Bescheid das die variable serverResponse nicht in json umgewandelt werden konte!\n\nDie Action wird mit einem KRITISCHEN fehler abgebrochen\nDanke für ihr verständnis!\nGrüße vom Programmierer Lando!");
		throw new Error("json cant parse");
	}
	if(serverResponse.code=="ok"){
		if(!serverResponse.data.token){throw new Error("Kein Token empfangen!")}
		
		const token=escape(serverResponse.data.token);
		document.cookie="token="+token+";path=/;maxAge=9999999;";

		alert("Anmelden/Regestrieren Erfolgreich!\n\nSie werden auf die startseite Weitergeleitet");
		location.href="/";
		return true;
	}
	else if(serverResponse.errormsg){
		alert("Info vom Server:\n\n"+serverResponse.errormsg);
	}
}
function ActionSubmit(){
	const form=document.getElementById("form_main");
	const mode=findActiveRadio(form.radio_action)=="register"?"createAccount":"createToken";
	callApi({
		want:mode,
		username:form.username.value,
		nickname:mode=="register"?form.nickname.value:undefined,
		password:form.password.value,
		token:null,
		//debug:1,
	});
}
function ActionChangeMode(){
	const form=document.getElementById("form_main");
	const button_submit=document.getElementById("button_submit");
	const p_nickname=document.getElementById("p_nickname");
	const mode=findActiveRadio(form.radio_action);

	if(mode=="login"){
		button_submit.innerText="Anmelden";
		p_nickname.className="hidden";
	}
	else if(mode=="register"){
		button_submit.innerText="Regestrieren";
		p_nickname.className="";
	}
	else{throw new Error("mode not allowed!");}
}