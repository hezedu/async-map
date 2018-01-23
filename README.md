# async-map
fallback
race
parallel
sequence
```js
var asyncMap = require('async-map');

function task(end){
    var t = setTimeout(end, 200);
    return function abort(){
      clearTimeout(t);
    };
}



function end(err, result){

}

asyncMap
  .sequence(['a', 'b', 'c'])
  .end((err, result) => {
    
  });

asyncMap
  .race({
    a: 'a',
    b: 'b',
    c: 'c'
  }, 2)
  .end((err, result) => {

  });


asyncMap.fallback({
  a: 'a',
  b: 'b',
  c: 'c'
});


asyncMap
  .parallel({
    a:'a',
    b: 'b',
    c: 'c',
    d: 'd',
    $group: [
      {
        keys: ['a', 'b'], 
      },
    ],
    $options : ['d']
  });

asyncMap
  .parallel({
    a:'a',
    b: 'b',
    c: 'c',
    d: 'd'
  })
  .group({
    keys: ['a', 'b'], 
    success(){

    }
  })
  .group({
    keys: ['b', 'c'],
    success(){

    }
  })
  .options(['d', 'a'])
  .transform2Task();

  // (cb){
  //   setTimeout(cb, 200);
  // }
  .end((err, result) => {

  });
function (cb){
  p.end(cb);
  return p.abort;
}
// .success(){
      
// }
// .error(){
  
// };


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