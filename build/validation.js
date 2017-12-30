'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyChain = verifyChain;

var _pkijs = require('pkijs');

var pkijs = _interopRequireWildcard(_pkijs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Verify if a certificate chains to some trusted CAs.
 * @param {pkijs.Certificate} certificate - The certificate that will be
 * checked.
 * @param {Array<pkijs.Certificate>} chain - Additional certificates in the
 * chain.
 * @param {Array<pkijs.Certificate>} trustedCAs - The trusted CAs
 * @return {Promise<boolean>} A promise that is resolved with a boolean value
 * stating if the certificate was verified or not.
 */
function verifyChain(certificate, chain, trustedCAs) {
  if (certificate === null) return Promise.resolve(false);

  return Promise.resolve().then(function () {
    var certificateChainEngine = new pkijs.CertificateChainValidationEngine({
      certs: chain,
      trustedCerts: trustedCAs.filter(function (cert) {
        return typeof cert !== 'undefined';
      })
    });
    certificateChainEngine.certs.push(certificate);

    return certificateChainEngine.verify();
  }).then(function (result) {
    return result.result;
  }, function (result) {
    return false;
  });
} /**
   * ESigLabs Common Utilities
   * Certificate validation.
   *
   * By Fotis Loukos <me@fotisl.com>
   */
//# sourceMappingURL=validation.js.map