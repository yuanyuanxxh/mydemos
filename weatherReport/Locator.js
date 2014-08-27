Locator = new Object();
Locator.coords = undefined;
Locator.showArea = undefined;
Locator.getLocationCallback = undefined;
Locator.getLocation = function(div){
    Locator.showArea = div;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(Locator.locationSuccess, Locator.locationError);
    }
}

Locator.locationSuccess = function(position) {
    Locator.coords = position.coords;
    if(Locator.getLocationCallback)
        Locator.getLocationCallback(Locator.coords);
    // coord.lat = position.coords.latitude;
    // coord.lon = position.coords.longitude;
}

Locator.locationError = function(error){
    switch(error.code) {
        case error.TIMEOUT:
        Locator.showError("A timeout occured! Please try again!");
        break;
        case error.POSITION_UNAVAILABLE:
        Locator.showError('We can\'t detect your location. Sorry!');
        break;
        case error.PERMISSION_DENIED:
        Locator.showError('Please allow geolocation access for this to work.');
        break;
        case error.UNKNOWN_ERROR:
        Locator.showError('An unknown error occured!');
        break;
    }

}

Locator.showError = function(msg){
    if(Locator.showArea)
        Locator.showArea.innerHTML = msg;
}