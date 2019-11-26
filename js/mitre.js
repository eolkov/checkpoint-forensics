var mitre_data = {};

function MitreData(data) {    

    this.tactics = ['Initial Access', 'Execution', 'Persistence', 'Privilege Escalation', 'Defense Evasion', 'Credential Access',
        'Discovery', 'Lateral Movement', 'Collection', 'Exfiltration', 'Command & Control', 'Impact' ];

    function getSigCssClass(signature) {
        if (signature.severity == null) {
            return '';
        } else if (signature.severity < 2) {
            return ' class=\'blue_line\'';
        } else if (signature.severity < 4) {
            return ' class=\'orange_line\'';            
        } else {
            return ' class=\'red_line\'';
        }
    }

    function addSigAttributes(cellValue) {
        var data_id=''
        if (cellValue.id != null) {
            data_id = ' data-id="'+cellValue.id+'"' + 'data-toggle="modal" data-target="#mitreModal" style="cursor: pointer"';
        }

        return getSigCssClass(cellValue) + data_id;       
    }

    // Builds the HTML Table out of myList.
    function buildHtmlTable(myList, selector) {
        var columns = addAllColumnHeaders(myList, selector);
        var tableBody$ = $('<tbody/>');
    
        for (var i = 0; i < myList.length; i++) {
            var row$ = $('<tr/>');
            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                var cellValue = myList[i][columns[colIndex]];
                if (cellValue == null) cellValue = "";
                row$.append($('<td' + addSigAttributes(cellValue) + '></td>').html(cellValue.name));
            }
            tableBody$.append(row$);
        }
        $(selector).append(tableBody$);
    }
    
    // Adds a header row to the table and returns the set of columns.
    // Need to do union of keys from all records as some records may not contain
    // all records.
    function addAllColumnHeaders(myList, selector) {
        var columnSet = [];
        var headerTr$ = $('<tr/>');
    
        for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
            for (var key in rowHash) {
                if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<td/>').html(key));
                }
            }
        }
        $(selector).append( $('<thead/>').append(headerTr$));
    
        return columnSet;
    }    

    this.init = (data) => {

		var tactics_names_mapping = new Map();
		tactics_names_mapping.set('initial_access', 'Initial Access');
		tactics_names_mapping.set('execution', 'Execution');
		tactics_names_mapping.set('persistence', 'Persistence');
		tactics_names_mapping.set('privilege_escalation', 'Privilege Escalation');
		tactics_names_mapping.set('defense_evasion', 'Defense Evasion');
		tactics_names_mapping.set('credential_access', 'Credential Access');
		tactics_names_mapping.set('discovery', 'Discovery');
		tactics_names_mapping.set('lateral_movement', 'Lateral Movement');
		tactics_names_mapping.set('collection', 'Collection');
		tactics_names_mapping.set('exfiltration', 'Exfiltration');
		tactics_names_mapping.set('command_control', 'Command & Control');
		tactics_names_mapping.set('impact', 'Impact');

        var tactics_map = {};
        this.tactics.forEach(element => {
            tactics_map[element] = []
        });   

        // place mitre sigs to bukets by tactic name 
        json_table = []
        for (var image in data) {         
            for (var sig_idx = 0; sig_idx < data[image].length; sig_idx++) {
                var sig = data[image][sig_idx];

                technique_id = sig["technique"].split('.')[1]
                technique_name = sig["technique"].split('.')[2].split('_').join(' ');

                sig["name"] = technique_name;
                mitre_data[technique_id] = sig;

                sig["nice_tactics"] = [];

                for (var tactic_idx = 0; tactic_idx < sig["tactic"].length; tactic_idx++) {
                    tactic = sig["tactic"][tactic_idx];

                    if (this.tactics.includes(tactic))
                    {
                        tactic_mapped = tactic
                    }
                    else
                    {
                        tactic_mapped = tactics_names_mapping.get(tactic)
                    }
                    sig["nice_tactics"].push(tactic_mapped);

                    if (! tactics_map[tactic_mapped].find( t => t.id === technique_id ))
                    {
                        tactics_map[tactic_mapped].push({
                            id: technique_id,
                            name: technique_name,
                            severity: sig["severity"]
                        })
                    }
                }
            }                               
        }
        
        // sort bucket by severity 
        for (var key in tactics_map) {
            tactics_map[key] = tactics_map[key].sort((a, b) => a.severity < b.severity ? 1 : -1);            
        }          
        
        // find max bucket size
        var max_bucket_size = 0;
        for (var key in tactics_map) {
            if (tactics_map[key].length > max_bucket_size)  {
                max_bucket_size = tactics_map[key].length;
            }       
        }

        // create template row
        var tactic_template = {};
        this.tactics.forEach(element => {
            tactic_template[element] = ''
        }); 

        json_table = []
        for (var i = 0; i < max_bucket_size; i++) {
            var tactic_obj = jQuery.extend(true, {}, tactic_template);
            for (var key in tactics_map) {
                if (tactics_map[key].length > i) {
                    tactic_obj[key] = tactics_map[key][i];
                }
            }
            json_table.push(tactic_obj);
        }

        return json_table;
    }

    this.json_table = this.init(data);
        
    this.buildTable = () => {
        buildHtmlTable(this.json_table, '#mitre_table')
    }

    $('#mitreModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var sig = mitre_data[id];

        var modal = $(this);
        modal.find('.modal-header-suffix').text(' Technique - ' + id + ' - ' + sig.name);
        modal.find('#mitre_modal_id').text(id);
        modal.find('#mitre_modal_tactics').text(sig.nice_tactics.join(', '));
        var source_link = 'https://attack.mitre.org/techniques/' + id;
        modal.find('#mitre_modal_source_link').text(source_link);
        modal.find('#mitre_modal_source_link').attr('href', source_link);
        modal.find('#mitre_modal_ioc').text(sig.ioc.join(', '));
        modal.find('#mitre_modal_description').text(sig.description);
      })
}


