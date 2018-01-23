# async-map

```js
var asyncMap = require('async-map');
asyncMap.parallel({
  a:'a',
  b: 'b',
  c: 'c'
}).group({
  keys: ['a', 'b'],
  success(){
    
  }
}).group({
  keys: ['b', 'c'],
  success(){

  }
})
.success(){
      
};


var task = asyncMap({
  groupKey : 'String:key',
  next: 'asyncMapTask: task',
  //mode: 'String', //race fallback,success
  //timeout: 'Number: 5000',
  start: function(end){
    setTimeout(end, 200);
    return abort();
  }
})
{
  a: 'taska',
  b: 'taskb',
  c: 'taskc',
  $GROUP: [
    {
      keys: ['a', 'b'],
    },
    {
      keys: ['c', 'b'],
    }
  ]
}
{
  b: 'task'
  b1: {
    a: 'a'
    c: 'c'
  }
}
// var task = asyncMap.success({
//   group : 'String:key',
//   next: 'asyncMapTask: task',
//   //mode: 'String', //race fallback,success
//   //timeout: 'Number: 5000',
//   start: function(end){
//     setTimeout(end, 200);
//     return abort();
//   }
// })

// var task = asyncMap.fallback({
//   next: 'asyncMapTask: task',
//   //mode: 'String', //race fallback,success
//   //timeout: 'Number: 5000',
//   start: function(end){
//     setTimeout(end, 200);
//     return abort();
//   }
// })
```