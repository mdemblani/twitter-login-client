# Javascript Client for Login with Twitter
**Implements a Client-Side flow for login with twitter, similar to one provided by Facebook and Google.**
**To read the Flow of implementing Login with Twitter, [Read here](https://dev.twitter.com/web/sign-in/implementing)**

Installation:
============

* Clone as a Git repository
    ```sh
    git clone https://github.com/mdemblani/twitter-login-client.git
    ```
* Install as a node_module
    ```sh
    npm i twitter-login-client --save

    OR

    npm install twitter-login-client --save
    ```

Getting Started:
===============

1. To Include the Script, add the following:
    ```html
        <script src="link to twitter-client code"></script>
    ```

2. The following snippet is used to initalize the twitter-client library
    ```js
        window.twitterInit =  = function () {
            twttr.init({
                api_key: 'TWITTER_CLIENT_ID',
                request_url: 'REQUEST-TOKEN-ENDPOINT'
            });
        };
    ```

    * `api_key`: Your twitter consumer id
    * `request_url`: This is an endpoint in your application, that twitter-client.js would call, to receive a request_token that your application generated when communicating with twitter. The twitter-client depends on the response it receives from the application for request_token. This endpoint should implement STEP 1 in Login with Twitter.
        The response should have the following:
            - `success`: *[Boolean]* : True on Success, False on Failure
            - `oauth_token`: *[String]* : REQUEST_TOKEN received from twitter
            - `message`: *[String]* : If success is False, then contains a error message indicating the error, ignored when success is true.
            
        Note: The following tokens are mutually exclusive
            a. `message`
            b. `oauth_token`

3. Create a file, that would be retrvied when Twitter would redirect the user to the callback url. In the file, add the following snippet in the head.
    ```html
    <!DOCTYPE html>
    <html>
    	<head>
    		<script type="text/javascript">window.close();</script>
    		<title>Callback Title</title>
    		<meta charset="UTF-8">
    		<meta name="viewport" content="width=device-width, initial-scale=1.0">
    	</head>
    	<body></body>
    </html>
    ```
API Reference:
==============

- `twttr.init`:
This function is called to initalize the twitter-client library.
**Parameters:**
    - `Options`: *[Object]*
        - `api_key`: Twitter Consumer Key
        - `request_url`: Application Endpoint to obtain a request token.

- `twttr.connect`:
This function is used allow the user to login and authorize the application.
**Parameters:**
    - `Callback`: *[Function]*
        - The callback function accepts a single parameter, i.e. response as its arguments
        The parameter would contain the following keys:
            - `success`: *[Boolean]* : True on Success, False on Failure
            - `message`: *[String]* : If success is False, then contains a error message indicating the error, ignored when success is true.
            - `oauth_token`: *[String]* : Contains the oauth-token, similar to the one obtained by communicating with the request_url
            - `oauth_verifier`: *[String]* : Contains the oauth-verifier, This token would be used by your application to obtain a user access token.

        Note: The following tokens are mutually exclusive
            a. `message`
            b. `oauth_token`, `oauth_verifier`
            Either *a* or *b* would be present at a time, not both.
