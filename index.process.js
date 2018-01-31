function noop(){};

function parallel(opts){
  var tasks = opts.tasks,
    groups = opts.groups || [],
    end = opts.end || noop,
    onProcess = opts.onProcess || noop;

  
  var keys = Object.keys(tasks);
  if(!keys.length){
    return;
  }
  var len = keys.length,
    count = 0,
    runingTasks = {},
    isAbortAll = false;

  var limit = opts.limit || len;
  if(limit > len){
    limit = len;
  }
  
  keys.forEach(k => {
    runingTasks[k] = {
      eventOnEnd: []
    };
  })


  var abortAll = function(){
    Object.keys(runingTasks).forEach(k => {
      runingTasks[k].abort();
    })
    isAbortAll = false;
  };

  var i = 0;
  
  function loop(){
    onProcess({
      total: len,
      started: i,
      ended: count,
      limit
    })
    //console.log('loop', i, i - count, count);
    // if(i - count >= limit || i === len){
    //   console.log('return', i)
    //   return;
    // }
    

    var k = keys[i];

    //console.log('loop', i, i - count, limit, k);

    var task = tasks[k];
    var _task = runingTasks[k];

    _task.abort = task(function(err, result){
      if(isAbortAll){
        return;
      }
      if(err){
        runingTasks[k] = null;
        delete(runingTasks[k]);
        end(err);
        return abortAll();
      }
      _task.result = result;
      _task.eventOnEnd.forEach(cb => {
        cb();
      })
      count = count + 1;

      //console.log('count', count);
      if(count === len){
        
        const results = {};
        keys.forEach(k => {
          results[k] = runingTasks[k].result;
        })
        end(null, results);

      }else{
        if(i < len){
          loop();
        }
      }
    }) || noop;

    i = i + 1;
  }
  for(let _i = 0 ; _i < limit; _i ++){
    loop();
  }
  
  // keys.forEach(function(k){
  //   var task = tasks[k];
  //   var _task = runingTasks[k] = {
  //     eventOnEnd: []
  //   };

  //   _task.abort = task(function(err, result){
  //     if(isAbortAll){
  //       return;
  //     }
  //     if(err){
  //       runingTasks[k] = null;
  //       delete(runingTasks[k]);
  //       end(err);
  //       return abortAll();
  //     }
  //     _task.result = result;
  //     _task.eventOnEnd.forEach(cb => {
  //       cb();
  //     })
  //     count = count + 1;
  //     console.log('count', count);
  //     if(count === len){

  //       const results = {};
  //       keys.forEach(k => {
  //         results[k] = runingTasks[k].result;
  //       })
  //       end(null, results);

  //     }
  //   }) || noop;
  // })

  groups.forEach(group => {
    var keys = group.keys;
    var len = keys.length;
    var count = 0;
    var end = group.end || noop;

    function done(){
      count = count + 1;
      if(count === len){
        end();
      }
    }
    keys.forEach(k => {
      var runingTask = runingTasks[k];
      if(runingTask){
        runingTask.eventOnEnd.push(done);
      }
    })
  });

  return {
    abortAll
  };
}

var tasks2 = {};
for(let i = 0; i < 30; i++){
  tasks2[i] = function(end){
    setTimeout(function(){
      console.log('task', i);
      end();
    }, 100 * i)
  }
}
// arr.forEach((v, i) => {
//   console.log('i', i);

// })
console.time('parallel')
//====== test ======
parallel({
  tasks: tasks2,
  // tasks: {
  //   fast(end){
  //     setTimeout(function(){
  //       console.log('fast');
  //       end();
  //     }, 100)
  //   },
  //   medium(end){
  //     setTimeout(function(){
  //       console.log('medium');
  //       end();
  //     }, 500)
  //   },
  //   slow(end){
  //     setTimeout(function(){
  //       console.log('slow');
  //       end();
  //     }, 1000)
  //   }
  // },
  limit: 10,
  groups: [
    {
      keys: ['fast', 'medium'],
      end(){
        console.log('fast emdium end');
      }
    },
    {
      keys: ['fast', 'slow'],
      end(){
        console.log('fast slow end');
      }
    }
  ],
  end(){
    console.timeEnd('parallel')
    console.log('all end');
  }
});

// var parallel = function(tasks){

//   var keys = Object.keys(tasks);
//   var len = keys.length;
//    count  = 0;
//   var result = {}

//   for(let i = 0; i <len; i++){
//     var k = keys[i];
//     var task = tasks[k];
//     var abort = task(function(err, result){
//       count = count + 1;
//       if(count === len){
//         if(result.end){
//           result.end();
//         }
//       }
//     });

//     tasks[k].abort = abort;
//   }
//   result.abort = function(){
//     for(let i = 0; i <len; i++){
//       var k = keys[i];

//     }
//   }
//   result.task = function(cb){

//   }
//   return result
// }