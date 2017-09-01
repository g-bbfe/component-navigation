export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
export function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

export function toggleClass($el, className) {
  var separator = ' ',
    prevclassNames = $el.getAttribute('class'),
    nextclassNames = '',
    classNamesArr = prevclassNames.split(separator),
    index = classNamesArr.indexOf(className);
  if (index < 0) {
    // addclassName
    nextclassNames = `${prevclassNames}${separator}${className}`;
  } else {
    // removeclassName
    nextclassNames = classNamesArr.reduce(function(accumulator, currValue) { return `${accumulator}${separator}` + (currValue === className ? '' : currValue) });
  }
  $el.setAttribute('class', nextclassNames);
}

export function isInContainer(node, parentNodeName) {
  if (node.nodeName === parentNodeName) return true;
  if (node.parentNode.nodeName === parentNodeName) {
    return true;
  } else {
    return false;
  }
}