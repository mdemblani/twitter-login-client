
window.twitterInit = twitterInit;
function twitterInit() {
    twttr.init({
        api_key: 'TWITTER_CLIENT_ID',
        request_url: 'REQUEST-TOKEN-ENDPOINT'
    });
}

function displayAuthorizeSection(text) {
    document.getElementById('authorize').innerHTML = text;
    document.getElementById('access-section').style = null;
}

function displayProfileSection(text) {
    document.getElementById('profile-section').style = null;
    document.getElementById('access').innerHTML = text;
}

var request = {};

function twitter(event) {
    console.log("twitter is called");
    twttr.connect(function (response) {
        console.log('response');
        console.log(response);
        if (response.success) {
            request = response;
        } else {
            console.log("Twitter Login Error");
        }
        displayAuthorizeSection(JSON.stringify(response));
    })
}

function twitterAccess() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status === 0) {
                displayProfileSection('Internet Disconnected/Connection Timeout');
            }
            var info;
            try {
                info = this.response;
            } catch (error) {
                info = error.message;
            } finally {
                displayProfileSection(info);
            }
            return;
        }
    };
    xhr.open("POST", "/access_token", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(request));
}

function twitterProfile() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status === 0) {
                document.getElementById('profile').innerHTML = 'Internet Disconnected/Connection Timeout';
            }
            var info;
            try {
                info = this.response;
            } catch (error) {
                info = error.message;
            } finally {
                document.getElementById('profile').innerHTML = info;
            }
            return;
        }
    };
    xhr.open("GET", "/profile", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}