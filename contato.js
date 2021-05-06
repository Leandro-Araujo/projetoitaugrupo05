
var returnToFieldId = false;

function checarCampos() {
	const fields = ["field_name", "field_email", "field_subject", "field_content"];
	for(let index in fields) {
		let id = fields[index];
		let field = document.getElementById(id);
		if(field.value.length == 0){
			returnToFieldId = id;
			document.getElementById("form").hidden = true;
			document.getElementById("form-msg-required-field").hidden = false;
			document.getElementById("form-display-label").innerHTML = field.previousElementSibling.innerText;
			return false;
		}
	}
	return true;
}

function capturarCampos(){
	const fields = ["field_to", "field_name", "field_phone", "field_email", "field_subject", "field_content"];
var message = {};

	for(let index in fields) {
		let id = fields[index];
		let field = document.getElementById(id);
		message[id] = formatarCampoParaTransporte(field.value);
	}
	return message;
}

function formatarCampoParaTransporte(input){
	var buffer = '';
	for (let i = 0; i < input.length; i++){
		if(input.charAt(i) == '\\')
			buffer += "#b";
		else if(input.charAt(i) == '"')
			buffer += "#q";
		else if(input.charAt(i) == '#')
			buffer += "#c";
		else if(input.charAt(i) == "\n")
			buffer += "#n";
		else if(input.charAt(i) == "\r")
			null;
		else
			buffer += input.charAt(i);
	}
	return buffer;
}

function enviar() {
	if(!checarCampos())
		return;

	const message = capturarCampos();
	const url = 'https://itau05.ecolabore.net/-endpoints/angelo-mailer';

	const request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState != 4 || this.status != 200) 
			return;
		
		document.getElementById("form").hidden = true;
		document.getElementById("form-display-name").innerHTML = document.getElementById("field_name").value;
		var select = document.getElementById("field_to");
		document.getElementById("form-display-to").innerHTML = select.options[select.selectedIndex].text;
		document.getElementById("form-display-error").innerHTML = this.responseText;
		
		if(this.responseText == "ok")
			document.getElementById("form-msg-ok").hidden = false;
		else
			document.getElementById("form-msg-fail").hidden = false;
	};
	request.open("POST", url, true);
	request.send(JSON.stringify (message));
}

function retornar() {
	document.getElementById("form").hidden = false;
	document.getElementById("form-msg-ok").hidden = true;
	document.getElementById("form-msg-fail").hidden = true;
}

function corrigir() {
	document.getElementById("form").hidden = false;
	document.getElementById("form-msg-required-field").hidden = true;
	document.getElementById(returnToFieldId).focus();
}
