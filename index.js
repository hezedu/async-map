var parallel = function(tasks){

  var keys = Object.keys(tasks);
  var len = keys.length;
  var count  = 0;
  var result = {};
  var tasksRuning = {};

  for(let i = 0; i <len; i++){
    var k = keys[i];
    var task = tasks[k];
    var taskWrap = {};

    var abort = task(function(err, result){

      delete(tasksRuning[k]);

      if(err){
        return result.abort();
      }
      
      count = count + 1;

      if(count === len){
        if(result.end){
          result.end();
        }
      }
    });
    taskWrap.abort = abort;
    tasksRuning[k] = taskWrap;
  }

  result.abort = function(){
    for(let i = 0; i <len; i++){
      var k = keys[i];
      if(tasksRuning[k]){
        tasksRuning[k].abort();
      }
    }
  }

  result.task = function(cb){

  }

  return result
}