var Services = {};

Services.getJson = function(url, callback, errorCallback)
{
	Services.getHttp(url, function(content){
			callback(JSON.parse(content));
		},
		errorCallback);
};

Services.getHttp = function(url, callback, errorCallback)
{
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
			callback(this.responseText)
	    },
	    onerror: function(e) {
			if(errorCallback != undefined){
				errorCallback(e.error);
			}
	    },
	    timeout:10000 
	});
	xhr.open("GET", url);
	xhr.send(); 
}

Services.isOnline = function()
{
	return Ti.Network.online;
}

Services.error = function(message)
{
	Ti.API.error(message);
	alert("Unexpected error: " + message)
}

Services.getDateString = function(date) {
	if(!Services.isDate(date)){
		date = Services.getDate(date);
	}
	
	var returnValue = "";
	if(date != null) {
		returnValue = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
	}
	
	return returnValue;
}

Services.getDate = function(date) {
	var regex = /(\d\d\d\d)-(\d?\d)-(\d?\d)/
	var result = regex.exec(date);
	var returnValue = null;
	if(result != null) {
	 returnValue = new Date(result[1], result[2] - 1, result[3]);	
	}
	return returnValue;
}

Services.getTechDate = function(date) {
	return   date.getFullYear().toString() + "-" +( date.getMonth() + 1).toString() + "-" + date.getDate().toString();
}

Services.isIOS = function() {
	return ['ipad', 'iphone'].indexOf( Ti.Platform.osname) != -1;
}

Services.isDate = function(value) {
	return Object.prototype.toString.call(value) == '[object Date]';
}

Services.isFunction = function(functionToCheck) {
 return functionToCheck && Object.prototype.toString.call(functionToCheck) == '[object Function]';
}

Services.getToday = function() {
	var today = new Date();
	return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

Services.merge = function(obj1, obj2) {
	var obj = {};
	for(var i in obj1) {
		obj[i] = obj1[i];
	}
	
	for(var i in obj2) {
		obj[i] = obj2[i];
	}
	
	return obj;
}

Services.combine = function(str1, str2) {
	
	if(!(Services.isNullOrEmpty( str1)) && !(Services.isNullOrEmpty(str2))) {
		str1 += ", ";
	}
	
	return str1 + str2;
}

Services.isNullOrEmpty = function(str) {
	return str == null || str == undefined || Services.trim(str) == "";
}

Services.trim = function(str) {
	return str.toString().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

module.exports = Services;

