/**
 * ShareUtils
 * @class
 * @classdesc A nice set of utilities.
 */
class ShareUtils {
  /**
   * @method _hide
   * @description Change element's display to 'none'
   * @private
   *
   * @param {DOMNode} el
   */
  _hide(el) {
    el.style.display = "none";
  }

  /**
   * @method _show
   * @description Change element's display to 'block'
   * @private
   *
   * @param {DOMNode} el
   */
  _show(el) {
    el.style.display = "block";
  }

  /**
   * @method _hasClass
   * @description Wrapper to see if an element contains a class.
   * @private
   *
   * @param {DOMNode} el
   * @param {String}  className
   * @returns {Boolean}
   */
  _hasClass(el, className) {
    return el.classList.contains(className);
  }

  /**
   * @method addClass
   * @description Wrapper to add class to element.
   * @private
   *
   * @param {DOMNode} el
   * @param {String}  className
   */
  _addClass(el, className) {
    el.classList.add(className);
  }

  /**
   * @method removeClass
   * @description Wrapper to remove class from element.
   * @private
   *
   * @param {DOMNode} el
   * @param {String}  className
   */
  _removeClass(el, className) {
    el.classList.remove(className);
  }

  /**
   * @method _isEncoded
   * @description Wrapper to check if the string is encoded.
   * @private
   *
   * @param {String}  str
   * @param {Boolean}
   */
  _isEncoded(str) {
    this.str = str.toRFC3986();
    return decodeURIComponent(str) !== str;
  }

  /**
   * @method _encode
   * @description Wrapper to _encode a string if the string isn't already encoded.
   * @private
   *
   * @param {DOMNode} el
   * @param {String}  className
   */
  _encode(str) {
    if (typeof str === 'undefined' || str === null || this._isEncoded(str))
      return str;
    else
      return str.toRFC3986();
  }

  /**
   * @method popup
   * @description Create a window for specified network
   *
   * @param {String}  url
   * @param {Object}  params
   */
  popup(url, params={}) {
    let popup = {
      width: 500,
      height: 350
    };

    popup.top = (screen.height / 2) - (popup.height / 2);
    popup.left = (screen.width / 2)  - (popup.width / 2);

    let qs = (() => {
      let results = [];
      for (let k of Object.keys(params)) {
        let v = params[k];
        results.push(`${k}=${this._encode(v)}`);
      }
      return results.join('&');
    })();

    if (qs) qs = `?${qs}`;

    // This does work even though it contains \n once converted.
    window.open(
      url+qs,
      'targetWindow', `
        toolbar=no,
        location=no,
        status=no,
        menubar=no,
        scrollbars=yes,
        resizable=yes,
        left=${popup.left},
        top=${popup.top},
        width=${popup.width},
        height=${popup.height}
      `
    );
  }

  /**
   * @method _merge
   * @description Combines two (or more) objects, giving the last one precedence
   * @author svlasov-gists
   * [Original Gist]{@link https://gist.github.com/svlasov-gists/2383751}
   *
   * @param {Object}  target
   * @param {Object}  source
   * @return {Object} target
   */
  _merge(target, source) {
    if (typeof target !== 'object') target = {};

    for (let property in source) {
      if (source.hasOwnProperty(property)) {
        let sourceProperty = source[property];

        if (typeof sourceProperty === 'object') {
          target[property] = this._merge(target[property], sourceProperty);
          continue;
        }

        target[property] = sourceProperty;
      }
    }

    for (let a = 2, l = arguments.length; a < l; a++)
      _merge(target, arguments[a]);

    return target;
  }

  /**
   * @method _objectToArray
   * @description Takes an Object and converts it into an array of Objects. This is used when converting a list of DOMNodes into an array.
   *
   * @param {Object} obj
   * @returns {Array} arr
   */
  _objToArray(obj) {
    let arr = [];

    for (let k in obj)
      if (typeof obj[k] === 'object') arr.push(obj[k]);

    return arr;
  }
}

/**
 * @method toRFC3986
 * @description Encodes the string in RFC3986
 * @memberof String
 *
 * @return {String}
 */
String.prototype.toRFC3986 = function() {
  let tmp = encodeURIComponent(this);
  tmp.replace(/[!'()*]/g, function(c) {
    return `%${c.charCodeAt(0).toString(16)}`;
  });
};

/**
 * @method capitalizeFirstLetter
 * @description Does exactly what the method name states
 * @memberof String
 *
 * @return {String}
 */
String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
