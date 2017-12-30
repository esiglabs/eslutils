"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ESigLabs Common Utilities
 * Validation information.
 *
 * By Fotis Loukos <me@fotisl.com>
 */

/**
 * Object validation information.
 */
var ValidationInfo = exports.ValidationInfo = function () {
  /**
   * Generate an empty ValidationInfo object.
   * @constructor
   */
  function ValidationInfo() {
    _classCallCheck(this, ValidationInfo);

    /**
     * @type {boolean}
     * @description A valid file.
     */
    this.isValid = false;
    /**
     * @type {boolean}
     * @description A signed file.
     */
    this.isSigned = false;
    /**
     * @type {Array<SignatureInfo>}
     * @description Validation information for all signatures.
     */
    this.signatures = [];
  }

  /**
   * Check if all signatures have been verified.
   */


  _createClass(ValidationInfo, [{
    key: "isSignersVerified",


    /**
     * Check if all signers have been verified against a truststore.
     * @param {string} signingTruststore - The name of the signing truststore.
     * @param {string} timestampingTruststore - The name of the timestamping
     * truststore.
     * @return {boolean} True if the file was verified against both truststores,
     * false otherwise.
     */
    value: function isSignersVerified(signingTruststore, timestampingTruststore) {
      var verified = true;

      this.signatures.forEach(function (sigInfo) {
        verified &= sigInfo.isSignersVerified(signingTruststore, timestampingTruststore);
      });

      return verified;
    }
  }, {
    key: "sigVerified",
    get: function get() {
      var verified = true;

      this.signatures.forEach(function (sigInfo) {
        verified &= sigInfo.sigVerified;
      });

      return verified;
    }

    /**
     * Check if all hashes correspond to the signed data.
     */

  }, {
    key: "hashVerified",
    get: function get() {
      var verified = true;

      this.signatures.forEach(function (sigInfo) {
        verified &= sigInfo.hashVerified;
      });

      return verified;
    }
  }]);

  return ValidationInfo;
}();
//# sourceMappingURL=validationinfo.js.map