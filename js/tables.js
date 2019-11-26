/**
 * Adds search and sort features to a table using DataTables.
 *
 * @param {string}  table      The table to add the features above to.
 * @param {boolean} isMuchData Specifies whether the table contains a large amount of data.
 */
function addTableFeatures(table, isMuchData) {
	// Apply DataTables to the table
	var dataTable = $(table).DataTable({
		paging: false,
		info: false
	});

	// Remove the 3rd (and last) row which is created by DataTables. (it's meant to hold elements for pagination, and since we don't want pagination we have no use in it)
	$(table).parents('.dataTables_wrapper').find('.row:nth-child(3)').remove();

	// Create custom search field
	$(table).parents('.dataTables_wrapper').find('.row:first-child input[type="search"]').remove();
	var search = ($(table).parents('.dataTables_wrapper').find('.row:first-child').prepend('<input type="search" class="form-control input-sm" placeholder="Search">')).find('input[type="search"]');

	// Setup the listener on the search field to filter results
	$(search).on('keyup search input paste cut', function() {
		if (isMuchData) {
			// Using a timing method to increase performance and reduce amount of searches

			var typingHandler;

			if (typingHandler)
				clearTimeout(typingHandler);

			typingHandler = setTimeout(() => {
				dataTable.search(this.value).draw();
			}, 100);
		} else {
			dataTable.search(this.value).draw();
		}
	});
}