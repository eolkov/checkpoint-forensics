///////////////
//  Globals  //
///////////////

// Global Consts
const COUNTER_OPENED_URL = 'https://te-stg.checkpoint.com/te_reports_counter/te_reports/live/opened';
const COUNTER_CLOSED_URL = 'https://te-stg.checkpoint.com/te_reports_counter/te_reports/live/closed';

// The 2 lines below should be commented out in CheckPoint development environment, in order for services to be reachable
const MALWARE_FAMILY_URL= 'https://malware-family-map.iaas.checkpoint.com/malware-family-map';
const FALSE_POSITIVE_URL_PREFIX = 'https://indicator-metadata.iaas.checkpoint.com/indicator-metadata';

// Uncomment the 2 lines below in CheckPoint development environment, in order for services to be reachable
// const MALWARE_FAMILY_URL = 'https://threatcloud-dev-malware-family-map.kube1.iaas.checkpoint.com/malware-family-map';
// const FALSE_POSITIVE_URL_PREFIX = 'https://threatcloud-dev-indicator-metadata.kube1.iaas.checkpoint.com/indicator-metadata';

const MALWARE_FAMILY_KEY = 'malware_family';
const FALSE_POSITIVE_KEY = 'is_fp';
const MAX_FAILED_SERVICE_RETRIES = 3
const uuidStorageKey = 'uuid';

if(!localStorage.getItem(uuidStorageKey)) {
    var new_uuid = createUUID();
    console.log('Creating local storage entry with key: ' + uuidStorageKey + ' and value: ' + new_uuid);
    localStorage.setItem(uuidStorageKey, new_uuid);
}

var clientUuid = localStorage.getItem(uuidStorageKey);
console.log('Uuid has value: ' + clientUuid);

///////////////////////
// createHttpRequest //
///////////////////////
/**
 * Creates the Http Request
 * 
 * @param method The http request method
 * @param url The http request url
 * 
 * @returns the created http request object
 */
function createHttpRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

///////////////////////////////////
// sendPageViewToGoogleAnalytics //
///////////////////////////////////
/**
 * Sends a request to Google Anylytics in order for it to accumulate statistics of report usage.
 * The requst is just an indication that the report is being opened.
 * This replaces the old counter service (for which request used to be sent with sendLiveCounterRequest())
 */
function sendPageViewToGoogleAnalytics(userId) {
    ga('create', {
        trackingId: 'UA-142846391-2',
        storage: 'none'
      });
    ga('set', 'checkProtocolTask', function(){ }); 
    ga('set', 'userId', userId)
    ga('set', 'dimension1', userId); 
    ga('set', 'page', 'http://www.checkpoint-te-report-fake-url.com');
    ga('send', {
        hitType: 'pageview'
      });
}

//////////////////////////////
//  sendLiveCounterRequest  //
//////////////////////////////
/**
 * Send to Threat-Cloud the counting service request.
 * 
 * @param isOnOpen true: calling during report open, otherwise (false) : calling after predefined time since the report was opened.
 * 
 * NOTE: THIS SHOULDN'T BE USED. THE COUNTER SERVICE IS NO LONGER AVAILABLE.
 *       USE sendPageViewToGoogleAnalytics() INSTEAD.
 */
function sendLiveCounterRequest(isOnOpen) {
    var url = (isOnOpen) ? COUNTER_OPENED_URL : COUNTER_CLOSED_URL;
    var xhr = createHttpRequest('POST', url);
    if (!xhr) {
        console.log('Counter service is not supported');
        return;
    }

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-TOKEN', 'da318322-e5b0-11e8-9f32-f2801f1b9fd1');

    //Build the request body
    var $items = $('#gw_id, #uuid ');
    var reqBodyObj = {}
    $items.each(function () {
        reqBodyObj[this.id] = $(this).val();
    })
    var typeObj = { type: 'report_opened' };
    $.extend(reqBodyObj, typeObj);

    // during non window open call add the total time passed in milliseconds since the report was opened
    if (!isOnOpen) {
        reqBodyObj['type'] = 'report_closed';
        var totalTimeObj = { total_time_in_report: 0 };
        totalTimeObj['total_time_in_report'] = Date.now() - startTimeId.value;
        $.extend(reqBodyObj, totalTimeObj);
    }

    var reqBodyStr = JSON.stringify(reqBodyObj);
    console.log('sendLiveCounterRequest sending: ' + reqBodyStr);
 
    // success response case handler
    xhr.onload = function () {
        console.log('sendLiveCounterRequest succeeded');
    };

    // failure response case handler 
    xhr.onerror = function () {
        console.log('sendLiveCounterRequest failed');
    };

    xhr.send(reqBodyStr);
}


/////////////////////////
//  handleLiveService  //
/////////////////////////
/**
 * A general function to handle any kind of live report sevice, hose data is displayed in its own report section.
 * 
 * @param serviceObj :  the handled live service object
 * @param callbackFunc : the handled live service callback function
 * 
 */
function handleLiveService(serviceObj, callbackFunc) {
    var url;
    var emptyObj;

    serviceObj.retryCounter++;
    console.log('Handling service : ' + serviceObj.name + ', retry number=' + serviceObj.retryCounter);

    // Create the http request
    var xhr = createHttpRequest(serviceObj.requestType, serviceObj.url);
    if (!xhr) {
        console.log('Service: ' + serviceObj.name + ' is not supported');
        callbackFunc(false, emptyObj);
        return;
    }

    if(serviceObj.requestType == 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/json');
    }
    xhr.setRequestHeader('X-TOKEN', 'da318322-e5b0-11e8-9f32-f2801f1b9fd1');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('X-UUID', clientUuid);
    xhr.timeout = 4000;

    // Success response case handler
    xhr.onload = function () {
        console.log('handleLiveService request for service ' + serviceObj.name + ' succeeded');

        if(xhr.responseText.length == 0) {
            console.log('No data In response body');
            callbackFunc(false, emptyObj);
            return;
        }
        //Get the response into JS object
        var responseDataObj = JSON.parse(xhr.responseText);

        var firstKey = Object.keys(responseDataObj)[0];

        // The required service name exists as the first key
        if (firstKey == serviceObj.name) {
            console.log('Data exsits for handleLiveService request for service ' + serviceObj.name);
            callbackFunc(true, responseDataObj[firstKey]);
        }
        // Failure response: the required service name does not exist as the first key => indicate empty data in the callback function
        else {
            console.log('Improper handleLiveService response for service ' + serviceObj.name + '.  The service name is not the first key in the response');
            callbackFunc(false, emptyObj);
        }
    };

    xhr.ontimeout = function() {
        console.log('HTTP request timeout');
        callbackFunc(false, emptyObj);
    }

    // Failure response case handler 
    xhr.onerror = function () {
        // Either retry ot indicate a failure (empty data) in the callback function
        console.log('handleLiveService request for service ' + serviceObj.name + ' failed, retry number=' + serviceObj.retryCounter);
        if (RetrySendRequest(serviceObj, callbackFunc) == false) {
            callbackFunc(false, emptyObj);
        }
    };

    //Sending the request
    if(serviceObj.requestType == 'POST') {
        xhr.send(serviceObj.getLiveServiceRequestBody());
    }
    else {
        xhr.send();
    }
}


////////////////////////
//  RetrySendRequest  //
////////////////////////
/**
 * 
 * Called when last service request failed.  If not reaching the maximum retries then trying to send the request again for handled live service after 500ms.
 * 
 * @param serviceObj :  the handled live service object
 * @param callbackFunc : the handled live service callback function
 * 
 * @returns true - retrying again, false - otherwise
 * 
 */
function RetrySendRequest(serviceObj, callbackFunc) {
    if (serviceObj.retryCounter >= MAX_FAILED_SERVICE_RETRIES) {
        return false;
    }

    setTimeout(function () { handleLiveService(serviceObj, callbackFunc); }, 500);
    return true;
}


////////////////////////////
//  MalwareFamilyService  //
////////////////////////////
/**
 * 
 * The function, used as object, to handle the malware family service request and response
 * 
 */
function MalwareFamilyService(malwareFamilySectionObj) {
    if(malwareFamilySectionObj.disabled) {
        return;
    }
    this.name = MALWARE_FAMILY_KEY;
    this.url = MALWARE_FAMILY_URL;
    this.retryCounter = 0;                      // default init
    this.requestType = 'POST';

    this.malwareFamilySectionObj = malwareFamilySectionObj;

    this.addDataToSection = (dataExists, dataObj) => {
        malwareFamilySectionObj.setData(dataExists, dataObj);
    }
    this.getLiveServiceRequestBody = () => {
        return JSON.stringify({ request: [{"malware_family": this.malwareFamilySectionObj.primaryFamilyName }] });
    }
    handleLiveService(this, this.addDataToSection);
}

function FalsePositiveService(md5) {
    this.name = FALSE_POSITIVE_KEY;
    this.url = FALSE_POSITIVE_URL_PREFIX + '/' + md5;
    this.retryCounter = 0;
    this.requestType = 'GET';

    this.setFPStatus = (dataExists, dataObj) => {
        if(dataExists) {
            if(dataObj == true) {
	    	console.log('FP service returned true. Showing FP header to user');
                addFalsePositiveHeader();
            }        
        }
    }
    handleLiveService(this, this.setFPStatus);
}
