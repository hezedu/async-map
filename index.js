var parallel = function(tasks){

  var keys = Object.keys(tasks);
  var len = keys.length;
   count  = 0;
  var result = {}

  for(let i = 0; i <len; i++){
    var k = keys[i];
    var task = tasks[k];
    var abort = task(function(err, result){
      count = count + 1;
      if(count === len){
        if(result.end){
          result.end();
        }
      }
    });

    tasks[k].abort = abort;
  }
  result.abort = function(){
    for(let i = 0; i <len; i++){
      var k = keys[i];

    }
  }
  result.task = function(cb){

  }
  return result
}