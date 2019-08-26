

var range = function(start, end) {
  var arr = [];
  for (var i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}


var arrayToList = function(arr) {
  var list = {};
  var cursor = list;

  /*
  We loop throught the array, and simultaneously assign values the our
  created list using a cursor, if we reached the end value of the array,
  then the final reference of our list becomes null, otherwise, in each
  iteration of our array we create a value property of the current location
  in the list based on the current value of our index, and AT THE END of each
  iteration the cursor jumps to the next reference of the list
  */

  for (var i = 0; i < arr.length; i++) {
    cursor.value = arr[i];
    if (i == arr.length - 1) {
      cursor.rest = null;
      break;
    }
    cursor.rest = {};
    cursor = cursor.rest;
  }

  return list;
}


var listToArray = function(list) {
  var cursor = list;
  var arr = [];

  // We loop through the list using a cursor, and on every iteration, if
  // the cursor is NOT null, we push the value of the current location of
  // the list onto the array, as soon as cursor.rest becomes null, then the
  // loop stops automatically

  while (cursor !== null) {
    arr.push(cursor.value);
    cursor = cursor.rest;
  }

  return arr;
}

var prepend = function(elt, list) {
  // We want to add the element elt to the FRONT of the listToArray
  /*
  We can do that by:
  * Convert the list given to an array using listToArray
  * Add the element elt to the front of the array using unshift
  * Turn the new array (that had the element elt prepended) into a list uisng arrayToList
  * Return the new list
  */

  var arr = listToArray(list);
  arr.unshift(elt);
  var newList = arrayToList(arr);
  return newList;
}



/*
This function, nth, takes in a list and a number as input, and returns the element in the
given position of the list, or 'undefined' if no such element exists
*/
var nth = function(position, list) {
  idx = 0;

  cursor = list;
  while (cursor != null) {
    if (idx == position) {
      return cursor.value;
    }
    cursor = cursor.rest;
    idx++;
  }
  return undefined;
}


/*
This is the recursive version of the 'nth' function, the same functionality, but this time using
recursion instead of loops like the previous function
*/

function nthRecursive(position, list, idx) {
	if (idx == null)
		idx = 0;
  if (position == idx)
    return list.value;
  else {
    list=list.rest;
    idx++;
    return nthRecursive(position, list, idx);
  }
}

/*
This is the deepEqual function, which performs deep comparisons with the 2 values that are passed in
as arguemnts
*/
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (a == null || typeof a != 'object' ||
      b == null || typeof b != 'object') return false;

  var keysA = Object.keys(a), keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (var key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}
