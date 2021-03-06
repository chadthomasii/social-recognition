
String.prototype.format = function() {
	var str = this;
	for (var i = 0; i < arguments.length; i++) {       
		var reg = new RegExp("\\{" + i + "\\}", "gm");             
	str = str.replace(reg, arguments[i]);
	}
	return str;
}

function sendResults(resultsObj) {
	console.log("THIS RAN");
	console.log(resultsObj.length);
	console.log(resultsObj["results"].length);
	for (var i = 0; i < resultsObj["results"].length; i++) {
		console.log(resultsObj["results"][i]);
		scoreTemp = resultsObj["results"][i]["score"];
		scoreTemp = 1 - scoreTemp;
		scoreTemp = Math.round(scoreTemp * 100);

		var image = resultsObj["results"][i]["pic_url"];
		var name = "Name: " + resultsObj["results"][i]["name"];
		var score = "Confidence: " + scoreTemp + "%";
		var socialUrl = "Social media account: " + resultsObj["results"][i]["link"];
		displayResult(image, name, score, socialUrl);
	}
}

function displayResult(image, name, match, socialUrl) {
	selector = $("#main");
	html = '<div class="results-flex-container"><div class="result results-flex-container"><img src={0} class="result-box"><ul class="result-list"><li class="result-item">{1}</li><li class="result-item">{2}</li><li class="result-item">{3}</li></ul></div></div>'.format(image, name, match, socialUrl);
	selector.delay(2000).append(html);
	setTimeout(function() {
		$('.result').addClass("add-result");
	}, 2000);
}

function _removeInput() {
	$(".box").addClass("remove-input");
	$(".preview-flex-container").addClass("remove-input");
	setTimeout(function() {
		$(".box").remove();
		$(".preview-flex-container").remove();
	}, 2000);
}

function processPics(responseText){
	var picsArray = JSON.parse(responseText);
	// console.log(picsArray);
	_removeInput();
	sendResults(picsArray);
}

function upload() {
	var formData = new FormData();
	formData.append("file", document.getElementById("file").files[0]);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	    	responseJSON = xhr.responseText;
	        // alert(responseJSON);
	        processPics(responseJSON);
	    }
	}
	xhr.open("POST", "./upload");
	xhr.send(formData);
}
