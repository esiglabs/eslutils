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
export class TrustStoreList {
  /**
   * Generate an empty TrustStoreList object.
   * @constructor
   */
  constructor() {
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
  addTrustStore(truststore) {
    this.tsList.push(truststore);
  }

  /**
   * Remove a trust store from the list.
   * @param {string} name - The name of the trust store.
   */
  removeTrustStore(name) {
    for(let i = 0; i < this.tsList.length; i++) {
      if(this.tsList[i].name === name) {
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
  forEach(cb) {
    for(let i = 0; i < this.tsList.length; i++)
      cb(this.tsList[i], i, this.tsList);
  }

  /**
   * Implement Iterable protocol
   */
  [Symbol.iterator]() {
    let i = 0;
    let tsCopy = this.tsList.slice();

    return {
      next: function() {
        return {
          value: tsCopy[i++],
          done: i > tsCopy.length
        };
      }
    };
  }
}
