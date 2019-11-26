/**
 * Creates a CSV file to download.
 * 
 * @param {string} data     String containing the data in CSV format (without headers).
 * @param {string} filename Name for the new CSV file.
 */
function createCSV(data, filename) {
	var headers = 'data:text/csv;charset=utf-8,';

	if (!data.startsWith(headers))
		data = headers + data;

	var encodedUri = encodeURI(data);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", filename);
	document.body.appendChild(link);

	link.click();
}

/**
 * Creates a download for user.
 * 
 * @param {string} uri					The path (URI) of the file to be downloaded.
 * @param {string} filenameInDownload	The name of the file in the download.
 */

function createDownloadOfFileUri(uri, filenameInDownload) {
	var link = document.createElement("a");
	link.setAttribute("href", uri);
	link.setAttribute("download", filenameInDownload);
	document.body.appendChild(link);

	link.click();
}

/**
 * Returns a string applicable for CSV format.
 * 
 * @param {string} str The string to be formated.
 * @returns {string} String in CSV format.
 */
function getCSVString(str) {
	return '\"' + str.replace('\"', '\"\"') + '\"';
}

/**
 * Copies given text to clipboard.
 * The text can then be pasted where user desires
 * 
 * @param {string} textToCopy The text to be copied to clipboard
 */
function copyTxtToClipboard(textToCopy) {
   var textarea = document.createElement('textarea');
   textarea.id = 'text_copy';
   // Avoid making noise on the page
   textarea.style.height = 0;
   // Appending the element to the document body
   document.body.appendChild(textarea);
   // Give the textarea a value of whatever inside textToCopy
   textarea.value = textToCopy;
   // Copying the content of the textarea element to clipboard
   var selector = document.querySelector('#text_copy');
   selector.select();
   document.execCommand('copy');
   // Remove the textarea element
   document.body.removeChild(textarea);
}



/////////////////
// create UUID //
/////////////////
/**
 * Generates a UUID.
 * 
 * @returns the new generated UUID
 * 
 */
function createUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

/**
 * 
 * @param {string} rgbColor Color in rgb format
 * @param {string} alpha Opacity value
 * @returns {string} Rgba color composed of rgbColor and alpha
 */
function rgbColorToRgba(rgbColor, alpha) {
    var ret = rgbColor.replace('rgb', 'rgba');
    return ret.substring(0, ret.length - 1) + ', ' + alpha + ')';

}

