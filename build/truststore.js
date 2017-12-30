"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ESigLabs Common Utilities
 * Trust store helpers.
 *
 * By Fotis Loukos <me@fotisl.com>
 */

/**
  * A trust store.
  * @typedef {Object} TrustStore
  * @property {string} name - The name of the trust store.
  * @property {Array<pkijs.Certificate>} certificates - All the certificates
  * contained in the trust store.
  */

/**
 * Trust store verification status.
 * @typedef {Object} TrustStoreStatus
 * @property {string} name - The name of the trust store.
 * @property {boolean} status - True if the certificate chains to this trust
 * store, false otherwise.
 */

/**
 * A trust store list.
 */
var TrustStoreList = exports.TrustStoreList = function () {
  /**
   * Generate an empty TrustStoreList object.
   * @constructor
   */
  function TrustStoreList() {
    _classCallCheck(this, TrustStoreList);

    /**
     * @type {Array<TrustStore>}
     * @description An array holding all trust stores.
     */
    this.tsList = [];
  }

  /**
   * Add a new trust store to the list.
   * @param {TrustStore} truststore - The new trust store.
   */


  _createClass(TrustStoreList, [{
    key: "addTrustStore",
    value: function addTrustStore(truststore) {
      this.tsList.push(truststore);
    }

    /**
     * Remove a trust store from the list.
     * @param {string} name - The name of the trust store.
     */

  }, {
    key: "removeTrustStore",
    value: function removeTrustStore(name) {
      for (var i = 0; i < this.tsList.length; i++) {
        if (this.tsList[i].name === name) {
          this.tsList.splice(i, 1);
          i--;
        }
      }
    }

    /**
     * Call a callback function for every truststore. Arguments are the same
     * as with Array.prototype.forEach.
     * @param {function} cb - The callback.
     */

  }, {
    key: "forEach",
    value: function forEach(cb) {
      for (var i = 0; i < this.tsList.length; i++) {
        cb(this.tsList[i], i, this.tsList);
      }
    }

    /**
     * Implement Iterable protocol
     */

  }, {
    key: Symbol.iterator,
    value: function value() {
      var i = 0;
      var tsCopy = this.tsList.slice();

      return {
        next: function next() {
          return {
            value: tsCopy[i++],
            done: i > tsCopy.length
          };
        }
      };
    }
  }]);

  return TrustStoreList;
}();
//# sourceMappingURL=truststore.js.map