var chart;

// A dictionary which will contain generated Timeline data per image
var timelineData = {};

// Create the timeline
function buildTimeline() {
	nv.addGraph(() => {
		chart = nv.models.multiBarChart()
			.reduceXTicks(true)		// If 'false', every single x-axis tick label will be rendered.
			.rotateLabels(0)		// Angle to rotate x-axis labels.
			.showControls(false)	// Allow user to switch between 'Grouped' and 'Stacked' mode.
			.stacked(true)
			.groupSpacing(0.1)		// Distance between each group of bars.
			.options({
				duration: 500
			})
			.legendPosition('bottom')
			.color(["#ffd546", "#ffb72d", "#ff9126", "#f24e4e", "#00ff00"]);

		chart.legend.maxKeyLength(100);
		chart.legend.rightAlign(false);

		chart.xAxis
			.axisLabel('Time (sec.)')
			.showMaxMin(false)
			.tickFormat(d3.format(',f'));	// Integer format

		chart.yAxis
			.axisLabel('# Events')
			.axisLabelDistance(-20)
			.tickFormat(d3.format(',f'));

		return chart;
	});

		// Listening to switching pills (tabs) and updating Timeline & Table data accordingly
	$('#timelines .nav-pills').on('shown.bs.tab', 'a[data-toggle="tab"]', function() {
		var tryd = timelineData[$(this).attr('href').substr(1)];
		updateTimeline(timelineData[$(this).attr('href').substr(1)]);
		updateDownloadIcons();
	});

	// Export CSV
	$('#timeline_export_csv').on('click', function(event) {
		event.preventDefault();

		var activePill = $(this).parents('.panel').find('.nav-pills .active a');
		var table = $('#timelines #tables ' + activePill.attr('href') + ' table');

		var csvContent = table.find('thead tr td').map(function() {
			return getCSVString(this.innerText);
		}).get().join() + '\n';

		table.find('tbody tr').each(function() {
			csvContent += $(this).find('td').map(function() {
				return getCSVString(this.innerText);
			}).get().join() + '\n';
		});

		createCSV(csvContent, activePill.text() + '_events.csv');
	});

	// Downloading the pcap file (according to the selected pill) upon click on the corresponding icon
	$('#pcap_download').on('click', function(event) {
		event.preventDefault();

		var activePill = $(this).parents('.panel').find('.nav-pills .active a');
		createDownloadOfFileUri(EventsData.pcaps[activePill.attr('href').substr(1)], activePill.text() + '_capture.pcap');

	});
}

function updateTimeline(data) {
	/* There are 2 variations of this function:
		1. w/ 'data' arg:
			The 'data' arg IS PASSED when the data is switched, i.e, switching pills.
		2. w/o 'data' arg:
			The 'data' arg is NOT PASSED when were toggling between Timeline and Table views.
	*/

	// If 'data' arg is passed then update the graph.
	if (data)
		d3.select('#timeline svg').datum(data).call(chart);

	/**
	 * If the Timeline contains no data then add a 'no-data' class to it, otherwise - remove it.
	 * It's just some messy (and working!) logic to show the same "No Data Available." in both Timeline and Table views.
	 */
	if (d3.select('#timeline svg').datum().length) {
		$('#timeline').removeClass('no-data');
		$('#timeline-toggle').css('opacity', 1);
		$('#timeline_actions').css('opacity', '');
	} else {
		$('#timeline').addClass('no-data');
		$('#timeline-toggle').css('opacity', 0);
		$('#timeline_actions').css('opacity', 0);
	}

	// Fix any resizing problems with the Timeline.
	nv.utils.windowResize(chart.update);
	window.dispatchEvent(new Event('resize'));
}

function EventsData(image) {
	function getAllActivitiesKeys(activities) {
		var keys = new Set();

		activities.forEach(el => keys.add(el.Type));

        return Array.from(keys);
	}

	function getKeyValues(activities, keyName) {
		var keyObj = {
			key: keyName,
			values: []
		};
		var valueList = [];
		var lastMatchedTime = 0;
		var foundInLastSec = false;
		var matchedCounter = 0;
		var currentTime = 0;

		activities.forEach(elem => {
			currentTime = elem.Time;
			// match on same sec
			if (currentTime == lastMatchedTime && elem.Type == keyName) {
				foundInLastSec = true;
				matchedCounter++;
			}
			// new sec - should check if there was a match
			else if (currentTime != lastMatchedTime) {
				if (foundInLastSec)
					valueList.push({
							x: lastMatchedTime,
							y: matchedCounter
						}
					);
				else
					valueList.push({
						x: lastMatchedTime,
						y: 0
					});

				// initialization for new sec
				foundInLastSec = false;
				matchedCounter = 0;
				lastMatchedTime = currentTime;

				// if there is a match in the current sec
				if (elem.Type == keyName) {
					foundInLastSec = true;
					matchedCounter++;
				}
			}
		});

		// handle last sec
		if (foundInLastSec)
			valueList.push({
					x: lastMatchedTime,
					y: matchedCounter
				}
			);
		else
			valueList.push({
				x: lastMatchedTime,
				y: 0
			});

		keyObj['values'] = valueList;

		return keyObj;
	}

	this.generateData = activities => {
		var data = [];
		var keyList = getAllActivitiesKeys(activities);

		keyList.forEach(elem => {
			var tempObj = getKeyValues(activities, elem);
			if (tempObj.values.length > 0)
				data.push(tempObj);
		});

		return data;
	}

	this.uid = image['uid'];
	this.name = image['name'];
	this.verdict = image['verdict'];

	this.buildTable = (div, data) => {
		// Store data for updating the Timeline when switching between pills
		timelineData[this.uid] = this.generateData(data);

		// Check if the pill to be created is supposed to be active, meaning that THERE IS DATA for it and THERE IS NO active pill
		var shouldBeActive = ($('#timelines .nav-pills li.active').length ? false : true) && data.length > 0;

		// Create pill (class="active" if it's the first one with data; opacity: .5 if there's no data)
		$('<li' + (shouldBeActive ? ' class="active"' : (data.length == 0 ? ' style="opacity:.5"' : '')) + '><a data-toggle="tab" href="#' + this.uid + '"><img src="images/timeline_malicious.svg">' + this.name + '</a></li>').appendTo('#timelines .nav-pills');

		// Populate the Timeline with an initial data (since there was no data before)
		if (shouldBeActive)
			$('#timelines .nav-pills li:last-child a').trigger('shown.bs.tab');

		// Container for the table
		var div = $('<div id="' + this.uid + '" class="tab-pane' + (shouldBeActive ? ' active' : '') + '"></div>').appendTo(div);

		// Check if there's data to display
		if (data.length > 0) {
			// Heading for printable version
			$('<h4 style="font-weight: bold;" class="only-in-print">' + this.name + '</h4>').appendTo(div);
			// Creating the table
			$('<table class="table">\
					<thead>\
						<td>Time (sec.)</td>\
						<td>Type</td>\
						<td>Action</td>\
						<td>Source</td>\
						<td>Destination</td>\
					</thead>\
					<tbody>' +
						data.map(event => '<tr>\
							<td>' + event.Time + '</td>\
							<td>' + event.Type.replace(/([A-Z])/g, " $1").slice(1) + '</td>\
							<td>' + event.Action + '</td>\
							<td>' + event.Src + '</td>\
							<td>' + event.Dst + '</td>\
						</tr>').join('') +
					'</tbody>\
				</table>').appendTo(div);

			// Always apply DataTables to the newly created table (regardless the size)
			addTableFeatures($('#' + this.uid + ' .table'), data.length > 500 ? true : false);
		} else if (--EventsData.imageCount == 0) {
			var haveData = false;

			for (var key in timelineData) {
				if (timelineData.hasOwnProperty(key)) {
					if (timelineData[key].length) {
						haveData = true;
						break;
					}
				}
			}

			if (!haveData)
				$('#timelines').remove();
			else
				updateDownloadIcons();
		}
	};
}


/**
 * Hides/Shows the pcap/Detailed Behavioral report download icon when pills (tabs) are switched, according
 * to whether there's a pcap file available for download for the selected (active) image
 */
function updateDownloadIcons() {
	var activePill = $('#timelines').find('.nav-pills .active a');
	// Getting the uid of the image currently selected (from pills)
	var imageUid = activePill.attr('href').substr(1);
	
	//pcaps
	if (imageUid in EventsData.pcaps)
		$('#pcap_download').css('display', 'initial');
	else
		$('#pcap_download').css('display', 'none');
	
	//Detailed Behavioral reports (Cuckoo reports)
	if (imageUid in EventsData.detailedBehavioralReports)
		$('#detailed_behavioral_report_download').css('display', 'initial');
	else
		$('#detailed_behavioral_report_download').css('display', 'none');
	
	//SBA report
	if ('path' in EventsData.SBAReport)
		$('#sba_report_download').css('display', 'initial');
	else
		$('#sba_report_download').css('display', 'none');
}

// Downloading Detailed Behavioral report (according to the selected pill) upon click on the corresponding icon
$('#detailed_behavioral_report_download').on('click', function(event) {
	event.preventDefault();

	var activePill = $(this).parents('.panel').find('.nav-pills .active a');
	createDownloadOfFileUri(EventsData.detailedBehavioralReports[activePill.attr('href').substr(1)], activePill.text());

});

// Downloading SBA report (according to the selected pill) upon click on the corresponding icon
$('#sba_report_download').on('click', function(event) {
	event.preventDefault();

	var activePill = $(this).parents('.panel').find('.nav-pills .active a');
	createDownloadOfFileUri(EventsData.SBAReport['path']);

});
