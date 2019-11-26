/**
 * Class for creating emulation video objects.
 *
 * @param {string} div      Container to hold the items of the carousel.
 * @param {object} jsonData JSON data that contains the video path.
 */
function EmulationVideo(div, jsonData) {
	this.div = div;
	this.video = jsonData.url;

	// Fix image names (add space after comma)
	jsonData.image_name = jsonData.image_name.replace(/,/g, ', ');

	// Builds the carousel.
	var buildCarousel = () => {
		// Wait for the images to load
		$(this.div + ' video').ready(() => {
			// Hide the left or right arrow of the carousel if the first or last items are active (=present), respectively.
			var checkIfEdge = function() {
				$('#carousel_left').css('display',
					$('#emu-videos .owl-item:first-child').hasClass('active') ? 'none' : '');
				$('#carousel_right').css('display',
					$('#emu-videos .owl-item:last-child').hasClass('active') ? 'none' : '');
			}

			// Build the carousel
			$(this.div).owlCarousel({
				dots: false,
				margin: 10,
				items: 3,
				onInitialized: checkIfEdge,
				onTranslated: checkIfEdge,
				touchDrag: false
			});
		});
	}

	/*
	* Adds to container a thumbnail of the last frame of the video.
	* container should be a DOM object, not a JQuery object.
	*/	
	var addVideoThumbnail = (container) => {
		var video = $('<video src="' + this.video + '"/>');
		video.on("loadedmetadata", function() {
		  this.currentTime = this.duration;
		});
		video.on("seeked", function(e) {
		  // In order to create overlay on the video thumbnail, a wrapper div is needed for canvas
		  var canvasWrapper =  document.createElement('div');
		  canvasWrapper.classList.add("video-canvas-wrapper")

		  var canvas = document.createElement('canvas');
		  canvasWrapper.appendChild(canvas);
		  canvas.height = this.videoHeight;
		  canvas.width = this.videoWidth;
		  var ctx = canvas.getContext('2d');
		  ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

		 container.appendChild(canvasWrapper);
		});
	}

	// The id for the upcoming popup
	var id = 'emu_video_popup_' + $('[id^=emu_video_popup_]').length;

	// Build and add the popup
	var popupBuilder = new Popup('#popups');
	popupBuilder.id = id;
	popupBuilder.title = jsonData.image_name;
	popupBuilder.content = 
		'<div class="emu-video"> \
			<video> \
				<source src="' + this.video + '" type="video/mp4"> \
			</video> \
			<div class="emu-video-replay"></div> \
			<div class="indicator"></div> \
		</div>'

	var popup = popupBuilder.addPopup();

	// Playing the video on click
	$('.emu-video').on('click', function() {
		var video = $(this).find('video');
		video.get(0).play();

		/* The replay layer will appear at the end of the video to indicate that a click will
			result in the video being replayed */
		var replayLayer = $(this).find('.emu-video-replay');
		replayLayer.css('opacity', 0);

		var indicator = $(this).find('.indicator');
		// Determine and set width of indicator/progress bar 
		indicator.css('width', 'calc(100% / ' + Math.floor(video.get(0).duration) + ')');
	});

	$('video').on('timeupdate', function() {
		var indicator = $(this).siblings('.indicator');

		// Setting the position of the indicator according to the elapsed time of the video
		if(Math.floor($(this).get(0).currentTime) < Math.floor($(this).get(0).duration))
			indicator.css('left', 'calc((100% / ' +  Math.floor($(this).get(0).duration) + ') * ' + Math.floor($(this).get(0).currentTime) + ')');

		/* If user has quitted showing video, it is being reloaded and the indicator is moved back to the beginning, 
		  in order for it to be played from the beginning next time it's clicked */
		if ($(this).parents('.popup').css('display') == 'none') {
			$(this).get(0).load();
			indicator.css('left', 0);
		}
	});

	// Once the video has ended, the replay layer will appear
	$('video').on('ended', function() {
		var replayLayer = $(this).siblings('.emu-video-replay');
		replayLayer.css('opacity', 1);
	});

	// Add a thumbnail to the carousel
	var el = $('<div class="emu-videos-thumbnail" popup="' + id + '"></div>').appendTo(this.div);
	$('<div class="emu-video-name">' + jsonData.image_name + '</div>').appendTo(el);
	var videoThumbnail = $('<div class="emu-video-screenshot">' + '</div>').appendTo(el);
	addVideoThumbnail(videoThumbnail.get(0));

	/**
	 * The following part is being executed when the last (potential [1]) emulation video object is being added.
	 * EmulationVideo.imageCount is being set in load_jsons.js.
	 *
	 */
	if (--EmulationVideo.imageCount == 0) {
		// If there's at least one video then bulid the carousel,
		if ($(this.div).children().length)
			buildCarousel();
		else
			// If there are no videos at all, from any image, then remove the section
			$(this.div).parents('.panel').remove();
	}
}
