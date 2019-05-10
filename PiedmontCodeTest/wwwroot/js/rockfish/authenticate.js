var auth_info = new Object();

/*
 * Passes the user name and password passed in to the API authorization end point. 
 * If successful the auth_info object is filled out with the token information.
 * If unsuccessful then the error message is passed into auth_info.
 */
function authenticate_user(username, password) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rockfishfortiswebapiprod.azurewebsites.net/token",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache"
        },
        "data": {
            "grant_type": "password",
            "username": username,
            "password": password
        },
        "error": function (xhr, ajaxOptions, error) {
            alert(xhr.responseJSON['error']);
        }
    };//end settings

    $.ajax(settings).done(function (response) {
        //set the token information in auth_info
        auth_info.access_token = response['access_token'];
        auth_info.token_type = response['token_type'];
        auth_info.expires_in = response['expires_in'];
        
        $('#login-row').html('<p>Welcome, ' + $('#username').val() + '</p>');
        $('#view-logged-out').css("display", "none");
        $('#view-logged-in').css("display", "block");
    });//end ajax call
}//end authenticate_user