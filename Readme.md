# LINE Parser

interpret Message or Operation event from LINE (messaging service) and fire events by event types.

```
var LineParser = require("line-parser");

var parser = LineParser();
parser.on("friendship", function (result) {
	doSomething(result.from, result.content.params[0]);
});

parser.parse(JSON.parse(requestBody));
```

[API reference for BOT API](https://developers.line.me/bot-api/api-reference)