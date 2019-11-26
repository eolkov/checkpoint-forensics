/**
 * Convenient class to create popups.
 *
 * @param {string} div Container to contain the new popup.
 */
function Popup(div) {
	this.container = div;

	// Some defaults
	this.id = '';
	this.title = "Popup Title";
	this.content = "Popup content.";

	/**
	 * Simply creates the popup and adds it to the specified (above) container.
	 *
	 * @returns {object} A jQuery object of the popup.
	 */
	this.addPopup = () => {
		return $('<div id="' + this.id + '" class="popup">\
			<div class="popup-content">\
				<div class="popup-header">\
					<span class="popup-title">' + this.title + '</span>\
					<img class="popup-close" src="images/close.svg" alt="Close">\
				</div>\
				<div class="popup-body">' + this.content + '</div>\
			</div>\
		</div>').appendTo(this.container);
	};
}

// For elements that are associated with a popup - open that popup
$(document).on('click', '[popup]', function() {
	$('#' + $(this).attr('popup')).toggleClass('popup-active');

	/* If the popup contains an emulation video then start it automatically 
	(didn't find a way to do this from emulation_video.js, you're welcome to try) */
	if ($(this).attr('popup').startsWith('emu_video_popup_'))
		$('#' + $(this).attr('popup')).find('.emu-video').click();
});

// Close the popup when clicking the X or outside the popup
$(document).on('click', '.popup', function(event) {
	if (event.target === this || $(event.target).attr('class') == 'popup-close')
		$('.popup-active').toggleClass('popup-active');
});