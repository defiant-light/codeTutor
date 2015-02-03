## Google Translate Implementation

Google Translate is used to translate incoming chat messages from the language partner into the user's native language. For example:
```
You: 您好
You (translated): Hello
```

The translate.js file contains a function which calls the Google Translate API via a GET request. The following parameters are passed to Google Translate:
* API Key (required) - Browser API key obtained from Google. You can specify daily limits on the number of characters translated and only allow translation requests from specific URLs.
* String to translate (required) - the string that you want to translate
* Target Language (required) - the language to translate the string to
* Source Language (optional) - the language of the string to translate. When this value is not passed to Google, Google will auto-detect the language of the string to translate.

Google will return the translated text in a JSON object of the format:
```
{
    "data": {
        "translations": [
            {
                "translatedText": "Hello"
            }
        ]
    }
}
```