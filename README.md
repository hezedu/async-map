# async-map

```js
var asyncMap = require('async-map');
var task = asyncMap({
  group : 'String:key',
  next: 'asyncMapTask: task',
  //mode: 'String', //race fallback,success
  //timeout: 'Number: 5000',
  start: function(end){
    setTimeout(end, 200);
    return abort();
  }
})
```