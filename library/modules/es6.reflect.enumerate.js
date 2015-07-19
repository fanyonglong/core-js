// 26.1.5 Reflect.enumerate(target)
var $        = require('./$')
  , $def     = require('./$.def')
  , ITERATOR = require('./$.wks')('iterator')
  , ITER     = require('./$.uid').safe('iter')
  , anObject = require('./$.an-object')
  , $Reflect = $.g.Reflect
  // IE Edge has broken Reflect.enumerate
  , BUGGY        = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));

function Enumerate(iterated){
  $.set(this, ITER, {o: iterated, k: undefined, i: 0});
}
require('./$.iter-create')(Enumerate, 'Object', function(){
  var iter = this[ITER]
    , keys = iter.k
    , key;
  if(keys == undefined){
    iter.k = keys = [];
    for(key in iter.o)keys.push(key);
  }
  do {
    if(iter.i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[iter.i++]) in iter.o));
  return {value: key, done: false};
});

$def($def.S + $def.F * BUGGY, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(anObject(target));
  }
});