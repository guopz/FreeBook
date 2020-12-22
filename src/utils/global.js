export function debounce (callback, time) {
  var last;
  return function() {
      var args = arguments;
      clearTimeout(last);
      last = setTimeout(function() {
          callback.apply(this, args);
      }, time);
  }
};
