/**
 * This script is used to dynamically adapt "sticky" headers according to scrolling position
 * and it binds callbacks for events that have to do with the headers.
 * 
 * There are 3 sticky headers in the report:
 * 
 * 1. The main header with Check Point logo
 * 2. False Positive warning header (appears only if status of file has indeed changed to FP)
 * 2. Header with file name, file type icon, hashes list, etc...
 * */
var stickyHeader = $('#sticky-header');
var brief = $('#brief');
var headerInStickyState = false;

const paddingInStickyState = 10;

var stickyHeaderTop;
var stickyHeaderPaddingTop;
var briefTop;

function bindClickableEvents() {
    $('.hashes-dropdown').on('click', function(event) {
        event.preventDefault(event);

        $('.hashes-content').toggleClass("hidden");
        $('.hashes-content-container').toggleClass("hidden");
    });
    $('.hashes-content-container').on('click', function(event) {
        if($(event.target).attr('class') != 'hashes-content') {
            $('.hashes-content').addClass("hidden");
            $('.hashes-content-container').addClass("hidden");
        }
    });
    $('.hashes-content a').on('click', function() {
        // Obtaining the element containing the to-be-copied hash
        var hashElem = $(this).parent().find('.header_hash').get(0);
        // Copying the hash to Clipboard
        copyTxtToClipboard(hashElem.innerText);
    });
}

/**
 * Should be called only after document has been loaded
 */
function initHeaders() {
    stickyHeaderTop = stickyHeader.offset().top;
    stickyHeaderPaddingTop = parseInt(stickyHeader.css('padding-top')) + paddingInStickyState;
    briefTop = brief.offset().top;

    $(window).scroll(handleStickyHeaderOnScroll);
    handleStickyHeaderOnScroll();

    bindClickableEvents();
}

function handleStickyHeaderOnScroll() {
    if(!headerInStickyState && ($(document).scrollTop() > (stickyHeaderTop - paddingInStickyState))) {
        stickyHeader.css('position', 'fixed');
        stickyHeader.css('margin-top', 0);
        stickyHeader.css('padding-top', stickyHeaderPaddingTop);
        brief.css('padding-top', briefTop);
        headerInStickyState = true;
    } else if(headerInStickyState && ($(document).scrollTop() <= (stickyHeaderTop - paddingInStickyState))) {
        stickyHeader.css('position', '');
        stickyHeader.css('margin-top', '');
        stickyHeader.css('padding-top', '');
        brief.css('padding-top', '');
        headerInStickyState = false;
    }
};

function addFalsePositiveHeader() {
    $('#fp_header').show();
    $('#sticky-header').addClass('fp_true');
    var headerHeight = parseInt($('#fp_header').css('height'));
    stickyHeaderPaddingTop += headerHeight;
    briefTop += headerHeight;
    stickyHeader.css('padding-top', stickyHeaderPaddingTop);
    if(($(document).scrollTop() > (stickyHeaderTop - paddingInStickyState))) {
        brief.css('padding-top', briefTop);
        headerInStickyState = true;
    }
}