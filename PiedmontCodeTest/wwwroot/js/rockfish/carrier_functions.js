/*
 * Retrieves all carriers.
 * 
 * Sets the html for #carrier-list to a string containing HTML to display the carriers.
 */
function GetAllCarriers() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rockfishfortiswebapiprod.azurewebsites.net/api/Carriers",
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + auth_info.access_token
        }
    };//end settings

    $.ajax(settings).done(function (response) {
        $('#carrier-list').html(FormatCarriersForDisplay(response));
    });//end ajax
}//end GetAllCarriers()

/*
 * Retrieves only the carrier from the carrier_key passed in.
 * 
 * Sets the html for #carrier-list to a string containing HTML to display the carrier.
 */
function GetSpecificCarrier(carrier_key) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rockfishfortiswebapiprod.azurewebsites.net/api/Carriers/" + carrier_key,
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + auth_info.access_token
        }
    };//end settings

    $.ajax(settings).done(function (response) {
        $('#carrier-list').html(FormatSingleCarrierForDispaly(response));
    });//end ajax
}//end GetSpecificCarrier()

var add_error = '';

/*
 * Adds a new carrier.
 * 
 * Sets the html for #carrier-list to a string containing HTML to display the new carrier.
 */
function AddCarrier(new_carrier) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rockfishfortiswebapiprod.azurewebsites.net/api/Carriers",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + auth_info.access_token
        },
        "data": JSON.stringify({
            "accountId": new_carrier['accountId'],
            "carrierId": new_carrier['carrierId'],
            "isActive": new_carrier['isActive'],
            "isFreightCollectOnly": new_carrier['isFreightCollectOnly'],
            "isFreightForwarder": new_carrier['isFreightForwarder'],
            "name": new_carrier['name'],
            "scac": new_carrier['scac'],
            "vendorId": new_carrier['vendorId'],
            "vendorKey": new_carrier['vendorKey']
        }),
        "error": function (xhr, ajaxOptions, error) {
            alert(xhr.responseJSON['message']);
        }
    }
    
    $.ajax(settings).done(function (response) {
        $('#carrier-list').html(FormatSingleCarrierForDispaly(response));

        //if no error then display the new carrier and reset all the fields in the new carrier table
        //Hide #add-carrier-row
        $('#add-carrier-row').css("display", "none");

        //display #add-carrier-row and display the new carrier
        $('#view-carrier-row').css("display", "block");

        resetAddNewCarrierTable();
    });//end ajax
}//end AddCarrier()

/*
 * Formats the passed in json object into readable html to be displayed for the user.
 */
function FormatSingleCarrierForDispaly(carrier) {
    var carrierDisplay = '';

    carrierDisplay +=   '<div class="card">' +
                            '<div class="card-header" id="header-' + carrier['carrierKey'] + '">' +
                                '<h5 class="mb-0">' +
                                    '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-' + carrier['carrierKey'] + '" aria-expanded="true" aria-controls="collapse-' + carrier['carrierKey'] + '">';

    //set accordion header content
    carrierDisplay += carrier['name'] + ' - ' + (carrier['isActive'] ? 'Active' : 'Inactive');

    carrierDisplay +=               '</button>' +
                                '</h5>' +
                            '</div>' +
                            '<div id="collapse-' + carrier['carrierKey'] + '" class="collapse show" aria-labelledby="heading-' + carrier['carrierKey'] + '" data-parent="#carrier-list">' +
                                '<div class="card-body">';

    //set accordion body content
    carrierDisplay +=   '<table class="table table-borderless">' +
                            '<tbody>' +
                                '<tr>' +
                                    '<th>Carrier Key:</th>' +
                                    '<td>' + carrier['carrierKey'] + '</td>' +
                                    '<th>Name:</th>' +
                                    '<td>' + carrier['name'] + '</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                    '<th>Carrier ID:</th>' +
                                    '<td>' + carrier['carrierId'] + '</td>' +
                                    '<th>Active:</th>' +
                                    '<td>' + (carrier['isActive'] == '' || carrier['isActive'] == null ? 'N/A' : (carrier['isActive'] ? 'Yes' : 'No')) + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<th>Account ID:</th>' +
                                    '<td>' + (carrier['accountId'] == '' || carrier['accountId'] == null ? 'N/A' : carrier['accountId']) + '</td>' +
                                    '<th>Freight Forwarder:</th>' +
                                    '<td>' + (carrier['isFreightForwarder'] == '' || carrier['isFreightForwarder'] == null ? 'N/A' : (carrier['isFreightForwarder'] ? 'Yes' : 'No')) + '</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                    '<th>SCAC</th>' +
                                    '<td>' + (carrier['scac'] == '' || carrier['scac'] == null ? 'N/A' : carrier['scac']) + '</td>' +
                                    '<th>Freight Collect Only:</th>' +
                                    '<td>' + (carrier['isFreightCollectOnly'] == '' || carrier['isFreightCollectOnly'] == null ? 'N/A' : (carrier['isFreightCollectOnly'] ? 'Yes' : 'No')) + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<th>Vendor ID:</th>' +
                                    '<td>' + (carrier['vendorId'] == '' || carrier['vendorId'] == null ? 'N/A' : carrier['vendorId']) + '</td>' +
                                    '<th>Vendor Key:</th>' +
                                    '<td>' + (carrier['vendorKey'] == '' || carrier['vendorKey'] == null ? 'N/A' : carrier['vendorKey']) + '</td>' +
                                    '<td>&nbsp;</td>' +
                                    '<td>&nbsp;</td>' +
                                '</tr>' +
                            '</tbody>' +
                        '</table>';

    carrierDisplay +=       '</div>' +
                        '</div>' +
                    '</div>';

    return carrierDisplay;
}//end FormatSingleCarrierForDisplay()

/*
 * Formats the passed in array of objects into readable html to be displayed for the user.
 */
function FormatCarriersForDisplay(carriers) {
    var carrierDisplay = '';

    //cycle through the carriers passed in and prepare them for display
    $.each(carriers, function (index, value) {
        carrierDisplay += '<div class="card">' +
                             '<div class="card-header" id="header-' + value['carrierKey'] + '">' +
                                '<h5 class="mb-0">' +
                                    '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-' + value['carrierKey'] + '" aria-expanded="true" aria-controls="collapse-' + value['carrierKey'] + '">';

        //set accordion header content
        carrierDisplay += value['name'] + ' - ' + (value['isActive'] ? 'Active' : 'Inactive');

        carrierDisplay +=           '</button>' +
                                '</h5>' +
                             '</div>' +
                             '<div id="collapse-' + value['carrierKey'] + '" class="collapse" aria-labelledby="heading-' + value['carrierKey'] + '" data-parent="#carrier-list">' +
                                 '<div class="card-body">';

        //set accordion body content
        carrierDisplay +=   '<table class="table table-borderless">' +
                                '<tbody>' +
                                    '<tr>' +
                                        '<th>Carrier Key:</th>' +
                                        '<td>' + value['carrierKey'] + '</td>' +
                                        '<th>Name:</th>' +
                                        '<td>' + value['name'] + '</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                        '<th>Carrier ID:</th>' +
                                        '<td>' + value['carrierId'] + '</td>' +
                                        '<th>Active:</th>' +
                                        '<td>' + (value['isActive'] == '' || value['isActive'] == null ? 'N/A' : (value['isActive'] ? 'Yes' : 'No')) + '</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                        '<th>Account ID:</th>' +
                                        '<td>' + (value['accountId'] == '' || value['accountId'] == null ? 'N/A' : value['accountId']) + '</td>' +
                                        '<th>Freight Forwarder:</th>' +
                                        '<td>' + (value['isFreightForwarder'] == '' || value['isFreightForwarder'] == null ? 'N/A' : (value['isFreightForwarder'] ? 'Yes' : 'No')) + '</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                        '<th>SCAC</th>' +
                                        '<td>' + (value['scac'] == '' || value['scac'] == null ? 'N/A' : value['scac']) + '</td>' +
                                        '<th>Freight Collect Only:</th>' +
                                        '<td>' + (value['isFreightCollectOnly'] == '' || value['isFreightCollectOnly'] == null ? 'N/A' : (value['isFreightCollectOnly'] ? 'Yes' : 'No')) + '</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                        '<th>Vendor ID:</th>' +
                                        '<td>' + (value['vendorId'] == '' || value['vendorId'] == null ? 'N/A' : value['vendorId']) + '</td>' +
                                        '<th>Vendor Key:</th>' +
                                        '<td>' + (value['vendorKey'] == '' || value['vendorKey'] == null ? 'N/A' : value['vendorKey']) + '</td>' +
                                        '<td>&nbsp;</td>' +
                                        '<td>&nbsp;</td>' +
                                    '</tr>' +
                                '</tbody>' +
                            '</table>';

        carrierDisplay +=        '</div>' +
                             '</div>' +
                        '</div>';
    });//end .each()
    
                    
    return carrierDisplay;
}//end FormatCarriersForDisplay()