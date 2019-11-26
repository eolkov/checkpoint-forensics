// Used as a class to load each of the sections in the report.
function LoadJSON() {

	/* The events for each image are saved in this object, in order to save data 
	   and share it with other sections (using their respective API) */
	this.eventsPerImage = {};

	this.fileMD5 = '';

	// An object to link between various file types (not extensions) to their image.
	var fileTypeImages = {
		Adobe: "images/file_types/Adobe.svg",
		Archive: "images/file_types/Archive.svg",
		Code: "images/file_types/Code.svg",
		Document: "images/file_types/Document.svg",
		Excel: "images/file_types/Excel.svg",
		Executable: "images/file_types/Executable.svg",
		Image: "images/file_types/Image.svg",
		Jar: "images/file_types/Jar.svg",
		Javascript: "images/file_types/Javascript.svg",
		None: "images/file_types/None.svg",
		Powerpoint: "images/file_types/Powerpoint.svg",
		Python: "images/file_types/Python.svg",
		Spreadsheet: "images/file_types/Spreadsheet.svg",
		Text: "images/file_types/Text.svg",
		Unknown: "images/file_types/Unknown.svg",
		Video: "images/file_types/Video.svg",
		Windows: "images/file_types/Windows.svg",
		Word: "images/file_types/Word.svg",
	};

	// An object to link between various file extensions to their file type.
	var fileTypes = {
		// Adobe
		pdf:	fileTypeImages["Adobe"],
		swf:	fileTypeImages["Adobe"],

		// Archive
		zip:		fileTypeImages["Archive"],
		"7z":		fileTypeImages["Archive"],
		rar:		fileTypeImages["Archive"],
		cab:		fileTypeImages["Archive"],
		tar:		fileTypeImages["Archive"],
		"tar.gz":	fileTypeImages["Archive"],
		tgz:		fileTypeImages["Archive"],
		iso:		fileTypeImages["Archive"],
		gz:			fileTypeImages["Archive"],
		bz2:		fileTypeImages["Archive"],
		tbz2:		fileTypeImages["Archive"],
		tb2:		fileTypeImages["Archive"],
		tbz:		fileTypeImages["Archive"],
		xz:		fileTypeImages["Archive"],
		txz:		fileTypeImages["Archive"],

		// Code
		htm:	fileTypeImages["Code"],
		html:	fileTypeImages["Code"],
		vbs:	fileTypeImages["Code"],
		vba:	fileTypeImages["Code"],
		vbe:	fileTypeImages["Code"],

		// Document
		hwp:	fileTypeImages["Document"],

		// Excel
		xls:	fileTypeImages["Excel"],
		xlsx:	fileTypeImages["Excel"],
		xlt:	fileTypeImages["Excel"],
		xlm:	fileTypeImages["Excel"],
		xltx:	fileTypeImages["Excel"],
		xlsm:	fileTypeImages["Excel"],
		xltm:	fileTypeImages["Excel"],
		xlsb:	fileTypeImages["Excel"],
		xla:	fileTypeImages["Excel"],
		xlam:	fileTypeImages["Excel"],
		xll:	fileTypeImages["Excel"],
		xlw:	fileTypeImages["Excel"],

		// Executable
		exe:	fileTypeImages["Executable"],
		com:	fileTypeImages["Executable"],

		// Image
		bmp:	fileTypeImages["Image"],

		// Jar
		jar:	fileTypeImages["Jar"],

		// Javascript
		js:		fileTypeImages["Javascript"],
		jse:	fileTypeImages["Javascript"],

		// None
		"":		fileTypeImages["None"],

		// Powerpoint
		ppt:	fileTypeImages["Powerpoint"],
		pptx:	fileTypeImages["Powerpoint"],
		pps:	fileTypeImages["Powerpoint"],
		pptm:	fileTypeImages["Powerpoint"],
		potx:	fileTypeImages["Powerpoint"],
		potm:	fileTypeImages["Powerpoint"],
		ppam:	fileTypeImages["Powerpoint"],
		ppsx:	fileTypeImages["Powerpoint"],
		ppsm:	fileTypeImages["Powerpoint"],
		sldx:	fileTypeImages["Powerpoint"],
		sldm:	fileTypeImages["Powerpoint"],

		// Python
		py:		fileTypeImages["Python"],
		py3:	fileTypeImages["Python"],
		pyc:	fileTypeImages["Python"],
		pyo:	fileTypeImages["Python"],
		pyw:	fileTypeImages["Python"],
		pyx:	fileTypeImages["Python"],
		pyd:	fileTypeImages["Python"],
		pxd:	fileTypeImages["Python"],
		pxi:	fileTypeImages["Python"],
		pyi:	fileTypeImages["Python"],
		pyz:	fileTypeImages["Python"],
		pywz:	fileTypeImages["Python"],

		// Spreadsheet
		csv: fileTypeImages["Spreadsheet"],

		// Text
		rtf: fileTypeImages["Text"],

		// Unknown
		unknown: fileTypeImages["Unknown"],

		// Video
		ra: fileTypeImages["Video"],
		ram: fileTypeImages["Video"],
		mov: fileTypeImages["Video"],
		qt: fileTypeImages["Video"],
		rm: fileTypeImages["Video"],

		// Windows
		scr: fileTypeImages["Windows"],
		pif: fileTypeImages["Windows"],
		wsf: fileTypeImages["Windows"],
		xap: fileTypeImages["Windows"],
		wsh: fileTypeImages["Windows"],
		ps1: fileTypeImages["Windows"],
		cpl: fileTypeImages["Windows"],

		// Word
		doc: fileTypeImages["Word"],
		docx: fileTypeImages["Word"],
		dot: fileTypeImages["Word"],
		docm: fileTypeImages["Word"],
		dotx: fileTypeImages["Word"],
		dotm: fileTypeImages["Word"],
	};

	// Just following the DRY priniple.
	var verdicts = {
		MALICIOUS: {
			img: "images/malicious.svg",
			text: "Malicious"
		},
		BENIGN: {
			img: "images/benign.svg",
			text: "Benign"
		},
		ERROR: {
			img: "images/benign.svg",
			text: "Error"
		}
	};

	/**
	 * Returns a human-readable file size.
	 *
	 * @param  {number}	a File size in bytes.
	 * @param  {number}	b Number of digits after floating point.
	 * @return {string}	  Human readable format of the file size.
	 */
	function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

	/**
	 * Appends a <script> tag to the HTML and calls a function when it's done loading.
	 *
	 * @param {function} func The function to call.
	 * @param {string}	 src  Path to the script file.
	 */
	var addScript = function(func, src) {
		var script = document.createElement('script');
		script.onload = func;
		script.src = src;
		document.body.appendChild(script);
	}

	// Stored globally in the class to avoid reading the same JSON twice (becuase it's data is being used in more than one section, as opposed to other JSON files)
	this.tech_details_json = getTechDetailsJSON();

	// All the images the file was emulated on
	this.images = this.tech_details_json.images;

	// Fix image names (add space after comma)
	for (image in this.images)
		this.images[image].name = this.images[image].name.replace(/,/g, ', ');

	/////////////////////
	// General Results //  (upper section)
	/////////////////////
	this.general_results = () => {
		var actions = {
			INACTIVE: {
				img: "",
				text: "Inactive"
			},
			DETECT: {
				img: "images/actions/detect.svg",
				text: "Detect"
			},
			PREVENT: {
				img: "images/actions/prevent.svg",
				text: "Prevent"
			},
			ASK: {
				img: "images/actions/ask.svg",
				text: "Ask"
			},
			ACCEPT: {
				img: "images/actions/accept.svg",
				text: "Allow"
			}
		};

		var confidenceLevels = {
			CONFIDENCE_HIGH: {
				img: "images/confidence/high.svg",
				text: "High"
			},
			CONFIDENCE_MEDIUM: {
				img: "images/confidence/medium.svg",
				text: "Medium"
			},
			CONFIDENCE_LOW: {
				img: "images/confidence/low.svg",
				text: "Low"
			},
			CONFIDENCE_NONE: {
				img: "images/confidence/none.svg",
				text: "None"
			}
		};

		var riskLevels = {
			INFO: {
				img: "images/risk/info.svg",
				text: "Info"
			},
			LOW: {
				img: "images/risk/low.svg",
				text: "Low"
			},
			MEDIUM: {
				img: "images/risk/medium.svg",
				text: "Medium"
			},
			HIGH: {
				img: "images/risk/high.svg",
				text: "High"
			},
			CRITICAL: {
				img: "images/risk/critical.svg",
				text: "Critical"
			}
		};

		var classifications = {
			ADWARE: {
				img: "images/attacks/Adware.svg",
				text: "Adware"
			},
			BACKDOOR: {
				img: "images/attacks/Backdoor.svg",
				text: "Backdoor"
			},
			BANKER: {
				img: "images/attacks/Banker.svg",
				text: "Banker"
			},
			BOT: {
				img: "images/attacks/Bot.svg",
				text: "Bot"
			},
			DOWNLOADER: {
				img: "images/attacks/Downloader.svg",
				text: "Downloader"
			},
			INFOSTEALER: {
				img: "images/attacks/Infostealer.svg",
				text: "Infostealer"
			},
			PHISHING: {
				img: "images/attacks/Phishing.svg",
				text: "Phishing"
			},
			RANSOMWARE: {
				img: "images/attacks/Ransomware.svg",
				text: "Ransomware"
			},
			ROOTKIT: {
				img: "images/attacks/Rootkit.svg",
				text: "Rootkit"
			},
			TROJAN: {
				img: "images/attacks/Trojan.svg",
				text: "Trojan"
			},
			VIRUS: {
				img: "images/attacks/Virus.svg",
				text: "Virus"
			},
			WORM: {
				img: "images/attacks/Worm.svg",
				text: "Worm"
			}
		};

		// Get "General Results" data
		var data = getGenResultsJSON();

		// Verdict
		var verdict = verdicts[data.Verdict.toUpperCase()];
		$('#verdict').text(verdict.text);
		$('#verdict_img').attr('src', verdict.img);

		// Action
		var action = actions[data.Action.toUpperCase()];
		$('#action').text(action.text);
		$('#action_img').attr('src', action.img);

		// Secure / Risk / Severity
		var risk = riskLevels[data.Severity.toUpperCase()];
		$('#risk').text(risk.text);
		$('#risk_img').attr('src', risk.img);

		// Confidence
		var confidence = confidenceLevels[data.Confidence.toUpperCase()];
		$('#confidence').text(confidence.text)
		$('#confidence_img').attr('src', confidence.img);

		/**
		 * Classification
		 *
		 * The classification JSON file is independant but really no reason for another function since it's in the same section in the report.
		 * Limiting the amount of classifications to 4.
		 * First, classifications that are not familiar (don't have a matching icon) are filtered out.
		 */
		var filteredClassifications = getClassificationJSON().filter(c => c.toUpperCase() in classifications);
		var _classifications = filteredClassifications.slice(0, 4).map(c => classifications[c.toUpperCase()]);
		
		// Dividing the classification text into 2 lines if it's too long
		if(_classifications.length > 2) {
			var classifications_txt_array = _classifications.map(c => c.text);
			$('#classification').append(classifications_txt_array.slice(0, classifications_txt_array.length/2).join(", ")
				+ ', <br/>' + classifications_txt_array.slice(classifications_txt_array.length/2).join(", "));
		}
		else {
			$('#classification').append(_classifications.map(c => c.text).join(', '));
		}

		$('#classification_images').append(_classifications.map(c => '<img src="' + c.img + '">').join(''));

		// Make the classification images layout look pretty
		if ($('#classification_images img').length == 3) {
			$('#classification_images img:nth-child(2)').before('<br>');
			$('#classification_images').addClass('small_classification');
		} else if ($('#classification_images img').length == 4) {
			$('#classification_images img:nth-child(3)').before('<br>');
			$('#classification_images').addClass('small_classification');
		}
		
		var briefImageHeight = parseInt($('.brief-item:first-child img').css('height'));
		var classificationImagesHeight =  parseInt($('#classification_images').css('height'));
		if(classificationImagesHeight > briefImageHeight) {
			var classificationImagesPadding = parseInt($('#classification_images').css('padding-top'));
			var paddingToAdd = classificationImagesHeight - briefImageHeight;
			$('#classification_images').css('padding-top', (classificationImagesPadding + paddingToAdd) + 'px');
		}
	};

	///////////////////////
	// Technical Details //
	///////////////////////
	this.tech_details = () => {
		var data = this.tech_details_json;

		document.title = data.file_name + ' - Threat Details Report'

		// ~~~ Meta Data ~~~
		$('#file_name').text(data.file_name);
		$('#file_size').text(formatBytes(data.file_size));

		var fileType = data.file_type.toLowerCase();
		$('#file_type').text(fileType);
		$('#file_img').attr('src', fileTypes.hasOwnProperty(fileType) ? fileTypes[fileType] : fileTypes["unknown"]);
		$('.download-file').attr('href', 'mal_file/' + data.sha1.toLowerCase() + '.' + fileType + '.tar.gz');

		// ~~~ Hash List ~~~
		if (data.md5) {
			$('#md5').find('.header_hash').text(data.md5.toUpperCase());
			this.fileMD5 =  data.md5;
		}
		else {
			$('#md5').remove();
			this.fileMD5 = '';
		}

		if (data.sha1) $('#sha1').find('.header_hash').text(data.sha1.toUpperCase());
		else $('#sha1').remove();

		if (data.sha256) $('#sha256').find('.header_hash').text(data.sha256.toUpperCase());
		else $('#sha256').remove();

		// ~~~ Live Counter ~~~
        // Get the gw id and set it as hidden html value
        gw_id.value = data.gw_id;

        // Generate this report browsing uuid and set it as hidden html value
        uuid.value = createUUID();

        // Get current time in milliseconds and set it as hidden html value
        startTimeId.value = Date.now();

        // Send to Threat-Cloud the counting service request during report open
        //console.log('call sendLiveCounterRequest() during report_open');
        //sendLiveCounterRequest(true);

        // Set timer to 10 seconds after which, another counting service will be sent to Threat-Cloud.
		//setTimeout(function () { sendLiveCounterRequest(false); }, 10000);
		
		// Sends Google Analytics indication that a TE report is being opened
		// (for statistics collection)
		sendPageViewToGoogleAnalytics(data.gw_id);

		// ~~~ File List ~~~
		var data = getFileListJSON();
		var fileList = $('#file_list');

		// Check whether there's data to show in the File Tree
		if (data.length) {
			var table = fileList.find('table tbody');

			// Sorting the file list so that files with Malicious verdict will appear before
			data.sort((file1, file2) => ((file1.verdict == "Malicious") ? -1 : 1));

			for (file in data) {
				var _file = data[file];
				var fileType = _file.file_type;
				var fileTypeImage = fileTypes.hasOwnProperty(fileType) ? fileTypes[fileType] : fileTypes["unknown"];
				var verdict = verdicts[_file.verdict.toUpperCase()];

				var row = $('<tr>\
					<td>' + (_file.path ? '<img class="no-print" src="images/external_link.svg">' : '') + _file.file_name + '</td>\
					<td>' + (fileType ? ('<img src="' + fileTypeImage + '"><span>.' + fileType + '</span>') : '') + '</td>\
					<td><img src="' + verdict.img + '" alt="' + verdict.text + '"></td>\
					<td class="no-print">' + formatBytes(_file.file_size) + '</td>\
					<td class="no-print">' + _file.context + '</td>\
				</tr>').appendTo(table);

				if (_file.path)
					row.attr('href', _file.path);
			}

			table.on('click', 'tr[href]', function() {
				window.open($(this).attr('href'));
			});
		}
		// If no data then remove the File Tree box
		else {
			// var row = fileList.parent();
			// if (row.children().length == 1)
			// 	row.remove();
			// else
			// 	fileList.remove();
			fileList.parents('.panel').remove();
			
		}
	};

	///////////////////
	// Attack Vector //
	///////////////////

	// Returns an image object for the status of the URL
	// (URL from where the file was downloaded - relevant only for HTTP)
	function getUrlStatusImageElem(urlStatus) {
		// For Benign status no image is added
		if ((urlStatus == "") || (urlStatus.toUpperCase() == "BENIGN") || (urlStatus.toUpperCase() == "UNKNOWN")) 
			return "";

		var statusImages = {
			MALICIOUS: {
				img: "images/Malicious_Badge.svg",
			},
			SUSPICIOUS: {
				img: "images/Suspicious_Badge.svg",
			}
		}
		return '<img src="' + statusImages[urlStatus.toUpperCase()].img + '" class="status">';
	};

	this.attack_vec = () => {
		var data = getAttackVectorJSON();

		if(data.protocol == "smtp") {
			$('<div class="stacked">\
				<img src="images/user.svg">\
				<span class="atk_vec_title">From:</span>\
				<span>' + data.from + '</span>\
				</div>\
			<img src="images/right_arrow.svg">\
			<div class="stacked">\
				<img src="images/email.svg">\
				<span class="atk_vec_title">Subject:</span>\
				<span>' + data.subject + '</span>\
				<span class="atk_vec_title">File Name:</span>\
				<span>' + data.file_name + '</span>\
			</div>\
			<img src="images/right_arrow.svg">\
			<div class="stacked">\
				<img src="images/user.svg">\
				<span class="atk_vec_title">To:</span>\
				<span>' + data.to + '</span>\
			</div>').appendTo('#atk_vec_inner');

			$('#atk_vec_inner').css("align-items", "center");
		}
		else if(data.protocol == "http") {
			$('<div class="stacked">\
				<div class="image_with_status">\
					<img src="images/globe.svg">'
					+ getUrlStatusImageElem (data.url_risk) +
				'</div>\
				<span>' + data.url + '</span>\
				<span>' + data.dst_ip + '</span>\
			</div>\
			<img src="images/right_arrow.svg">\
			<div class="stacked">\
				<div class="image_with_status">\
					<img src="' + $('#file_img').attr("src") + '">\
					<img src="images/Malicious_Badge.svg" class="status">\
				</div>\
				<span>' + data.file_name + '</span>\
			</div>\
			<img src="images/right_arrow.svg">\
			<div class="stacked">\
				<img src="images/user.svg">\
				<span>' + data.src_ip + '</span>\
			</div>').appendTo('#atk_vec_inner');
		}
		else {
			$('#atk_vec').remove();
		}

		$('#timestamp').text(data.time_stamp_local);
	}

	////////////////////////
	// Emulation Timeline //
	////////////////////////
	this.events = () => {
		/**
		 * Loads an external script, fetches some data using a function within that script and builds a table of the events.
		 * 
		 * @param {string} fileName Relative path to the script to load.
		 * @param {string} funcName Function to call from within the script.
		 * @param {object} div      Element to build the table in.
		 * @param {object} image    An object with some image-specific properties.
		 */
		this.loadEvents = (fileName, funcName, div, image) => {
			addScript(() => {
				var data = window[funcName]();
				(new EventsData(image)).buildTable(div, data);
				
				/* this.loadEvents() is called for each image showed in report and its data
 				   is saved in this.eventsPerImage */
				this.eventsPerImage[image.uid] = data;
				/* Once this.loadEvents() has been called for all images,
				   all the data is sent for a function related to the Malware Family section */ 
				if(Object.keys(this.eventsPerImage).length == this.images.length) {
					this.malware_family_obj.createSimilarCommunication(this.eventsPerImage);
				}
			}, fileName);
		}

		/** 
		 * Getting the pcaps data and preparing a dictionary that maps the prefix of an image uid to the uri
		 * of its corresponding pcap file (if exists).
		 * When a specific image pill (tab) is selected in the emulation timeline section, an icon for downloading
		 * its corresponding pcap file will be shown, if exists.
		 */
		var pcapsData = getPcaps();
		EventsData.pcaps = {};
		for(var i = 0; i < pcapsData.length; ++i) {
			var pcap = pcapsData[i];
			var pcapKey = pcap['image_uid'].split('-')[0]; // The key is the prefix of the uid
			EventsData.pcaps[pcapKey] = pcap['url'];
		}
		
		// Getting the Detailed Behavioral reports (Cuckoo reports) data and preparing them for download
		var detailedBehavioralReportsData = getDetailedBehavioralReports()
		EventsData.detailedBehavioralReports = {};
		for(var i = 0; i < detailedBehavioralReportsData.length; ++i) {
			var report = detailedBehavioralReportsData[i];
			var report_key = report['image_uid'].split('-')[0]; // The key is the prefix of the uid
			EventsData.detailedBehavioralReports[report_key] = report['url'];
		}

		// Getting the SBA report  data and preparing them for download
		var SBAReportData = getSBAReport()
		EventsData.SBAReport = {};
		if (SBAReportData.length > 0) {
			EventsData.SBAReport["path"] = SBAReportData[0]["path"];
		}

		// Listener for toggling between Timeline and Table views
		$('#timelines #timeline-toggle a[data-toggle="tab"]').on('shown.bs.tab', function() {
			$([this, $(this).siblings()]).toggleClass('active');
			updateTimeline();
		});

		// Create the Timeline
		buildTimeline();

		// Static counter so that EventsData class could know when it's working on the last image
		EventsData.imageCount = this.images.length;

		// Iterate over the images and load their events (into the Timeline and into the Table)
		for (var image in this.images) {
			var currImage = this.images[image];
			var imageUid = currImage.uid.split('-')[0];

			var fileName = 'json/events_' + imageUid + '.js';
			var funcName = "getEmulationEventsJSON_" + imageUid;

			var image = {
				uid: imageUid,
				name: currImage.name,
				verdict: verdicts[currImage.verdict.toUpperCase()].img
			};

			this.loadEvents(fileName, funcName, $('#events_table'), image);
		}
	};

	this.mitre = () => {
		var data = getMitreJson();
		try {
			(new MitreData(data)).buildTable();			
		} catch (ex) {
			$('#mitre').remove();
			console.debug(ex);
		}		
	}

	this.hideElements = () => {
		// mitre_data globally defined object
		if (jQuery.isEmptyObject(mitre_data)) {
            $('#mitre').remove();
        }
	}

	///////////////////////////
	// Suspicious Activities //
	///////////////////////////
	this.susp_actv = () => {
		// Get the "Suspicious Activities" data
		var data = getSuspActvJSON();

		/**
		 * This JSON splits the data into images, even though currently we don't really care about each image individually. (maybe will use in the future)
		 * Because of that, there's a nested for-loop which is responsible for adding the rows to the table.
		 * We're also using a 'count' to link between rows and their popups. (not to be mistaken with the 'count' of each 'behavior')
		 */
		var count = 0;
		for (var image in data.images) {
			var currImage = data.images[image];
			var behaviors = currImage.behaviors;

			if (behaviors) {
				var div = $('#susp_act .panel-body');
				var tableId = 'suspActvTable' + image;
				var imageName = currImage.image.replace(/,/g, ', ');

				// Create a tab for the current image
				$('<li' + (count == 0 ? ' class="active"' : '') + '>\
					<a data-toggle="tab" href="#' + tableId + '">' + imageName + '</a>\
				</li>').appendTo(div.find('.nav-tabs'));

				// Create a suspicious activities table for the current image
				var table = ($('<div id="' + tableId + '" class="tab-pane fade' + (count == 0 ? ' in active' : '') + '">\
					<h4 style="font-weight: bold;" class="only-in-print">' + imageName + '</h4>\
					<table class="table">\
						<thead>\
							<td>Category</td>\
							<td>Count</td>\
							<td>Description</td>\
						</thead>\
						<tbody></tbody>\
					</table>\
				</div>').appendTo(div.find('.tab-content'))).find('table');

				for (var behavior in behaviors) {
					var currBehavior = behaviors[behavior];
					var popupId = "susp_actv_popup_" + count;

					// Add the row to the table
					$('<tr popup="' + popupId + '">\
						<td>' + currBehavior.category + '</td>\
						<td>' + currBehavior.count + '</td>\
						<td>' + currBehavior.description + '</td>\
					</tr>').appendTo(table);

					// Create the popup
					var popupBuilder = new Popup('#popups');
					popupBuilder.id = popupId;
					popupBuilder.title = 'Suspicious Activity';
					popupBuilder.content = 
						'<h3>' + currBehavior.category + '</h3>\
						<h5>' + currBehavior.description + '</h5>\
						<div style="overflow: auto;"><table class="table">\
							<thead><tr><td>Type</td><td>Value</td></tr></thead>\
							<tbody>' +
								currBehavior.values.map(val => '<tr><td>' + val.type + '</td><td>' + val.value + '</td></tr>').join('') +
							'</tbody>\
						</table></div>';
					var popup = popupBuilder.addPopup();

					// Add to the table searching and sorting features if it's big enough
					var popupTable = popup.find('table');
					var rows_count = popupTable.find('tbody tr').length;
					if (rows_count > 15)
						addTableFeatures(popupTable, rows_count > 500 ? true : false);

					count++;
				}

				// Apply DataTables to the newly created table (if the size requires it)
				var rows_count = $(table).find('tbody tr').length;

				if (rows_count > 15)
					addTableFeatures(table, rows_count > 500 ? true : false);
			}
		}

		// We could add an if-else to check whether there's data but we already have the 'count' so better use it
		if (!count)
			$('#susp_act').remove();
	};

	// Suspicious Activities - Export CSV
	$('#susp_act_export_csv a').on('click', function(event) {
		event.preventDefault();

		var activePill = $(this).parents('.panel').find('.nav-pills .active a');
		var table = $('#timelines #events_table ' + activePill.attr('href') + ' table');
		var headers = ['Image', 'Category', 'Count', 'Description', 'Type', 'Value'];

		var csvContent = headers.join() + '\n';

		// Images (Image column)
		$('#susp_act .tab-content .tab-pane').each(function() {
			csvContent += getCSVString($(this).find('h4').text());
			csvContent += ','.repeat(headers.length - 1) + '\n';  // Blanks

			// Behaviors (Category, Count, Description columns)
			$(this).find('table tbody tr').each(function() {
				csvContent += ',';  // Blank
				csvContent += $(this).find('td').map(function() {
					return getCSVString(this.innerText);
				}).get().join();
				csvContent += ','.repeat(headers.length - 4) + '\n';  // Blanks

				// Values (Type, Value columns)
				$('#' + $(this).attr('popup') + ' table tbody tr').each(function() {
					csvContent += ','.repeat(headers.length - 2);  // Blanks
					csvContent += $(this).find('td').map(function() {
						return getCSVString(this.innerText);
					}).get().join() + '\n';
				});
			});
		});

		createCSV(csvContent, 'suspicious_activities.csv');
	});

	////////////////
	// Emulation Videos //
	////////////////
	this.emu_videos = () => {

		var imagesVideoData = getEmulationVideosJSON();

		// Inform the EmulationVideo class of the amount of images
		EmulationVideo.imageCount = imagesVideoData.length;

		if(EmulationVideo.imageCount > 0) {
			// Iterate over the images and create their video objects
			for (var i = 0; i < imagesVideoData.length; ++i) {
				EmulationVideo('#emu-videos', imagesVideoData[i]);
			}
		}
		else {
			// If there are no videos at all, from any image, then remove the section
			$('#emu-videos').parents('.panel').remove();
		}
	};

	/////////////////
	// Malware Family //
	/////////////////
    	this.malware_family = () => {
		this.malware_family_obj = new MalwareFamily();
		this.malware_family_service = new MalwareFamilyService(this.malware_family_obj);
	};
	
	this.false_positive = () => {
		if(this.fileMD5 && this.fileMD5.length == 32 /* MD5 length*/) {
			this.false_positive_service = new FalsePositiveService(this.fileMD5);
		}	
	}

	// Conveniently load all the setions without loading each one separately.
	this.loadAll = () => {
		this.tech_details();
		this.general_results();
		this.attack_vec();
		this.emu_videos();
		this.susp_actv();
		this.malware_family();
		/* The Events (Advanced Forensics) section should be initiallized AFTER the Malware Family
		section, since in the end of the Events section initiallization a function of
		the Malware Family section is called and the Malware Family section should have be initiallized
		already by then */
		this.events();
		this.mitre();
		this.false_positive();

		this.hideElements();
	};
}
