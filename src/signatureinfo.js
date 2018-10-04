/**
 * ESigLabs Common Utilities
 * Signature information.
 *
 * By Fotis Loukos <me@fotisl.com>
 */

/**
 * Single signature validation information.
 */
export class SignatureInfo {
  /**
   * Generate an empty SignatureInfo object.
   * @param {Object} id - The signature's identifier.
   * @constructor
   */
  constructor(id) {
    /**
     * @type {Object}
     * @description An identifier for the signature.
     */
    this.id = id;
    /**
     * @type {boolean}
     * @description Signed hash has been verified.
     */
    this.sigVerified = false;
    /**
     * @type {boolean}
     * @description The hash corresponds to the signed data.
     */
    this.hashVerified = false;
    /**
     * @type {string}
     * @description The algorithm that was used to hash the data.
     */
    this.hashAlgorithm = '';
    /**
     * @type {Array<TrustStoreStatus>}
     * @description Signer certificate chains to a trusted signing CA.
     */
    this.signerVerified = [];
    /**
     * @type {boolean}
     * @description A timestamped file.
     */
    this.hasTS = false;
    /**
     * @type {boolean}
     * @description The timestamp has been verified.
     */
    this.tsVerified = false;
    /**
     * @type {Array<TrustStoreStatus>}
     * @description The certificate of the timestamp chains to a trusted
     * timestamping CA.
     */
    this.tsCertVerified = [];
    /**
     * @type {pkijs.Certificate}
     * @description The signer's certificate.
     */
    this.cert = null;
    /**
     * @type {Array<pkijs.Certificate>}
     * @description A bundle of all certificates included in the signed object.
     */
    this.certBundle = [];
    /**
     * @type {pkijs.Certificate}
     * @description The timestamp authority's certificate.
     */
    this.tsCert = null;
    /**
     * @type {Array<pkijs.Certificate>}
     * @description A bundle of all certificates included in the timestamp.
     */
    this.tsCertBundle = [];
  }

  /**
   * Check if the file verified was a valid signed file whose signature and
   * signed hash have been verified.
   */
  get isValidSigned() {
    return this.isValid & this.isSigned & this.sigVerified & this.hashVerified;
  }

  /**
   * Check if the file verified was a valid signed and timestamped file whose
   * signature, signed hash and timestamp have been verified.
   */
  get isValidSignedTimestamped() {
    return this.isValid & this.isSigned & this.sigVerified &
      this.hashVerified & this.hasTS & this.tsVerified;
  }

  /**
   * Check if the signer has been verified against a truststore. If the file is
   * timestamped, then the timestamp signer will also be checked against another
   * truststore.
   * @param {string} signingTruststore - The name of the signing truststore.
   * @param {string} timestampingTruststore - The name of the timestamping
   * truststore.
   * @return {boolean} True if the file was verified against both truststores,
   * false otherwise.
   */
  isSignersVerified(signingTruststore, timestampingTruststore) {
    if(!this.isValid || !this.isSigned)
      return false;

    let verified = false;
    this.signerVerified.forEach(signer => {
      if(signer.name === signingTruststore)
        verified = signer.status;
    });
    if(verified === false)
      return false;

    if(this.hasTS) {
      verified = false;
      this.tsCertVerified.forEach(signer => {
        if(signer.name === timestampingTruststore)
          verified = signer.status;
      });
      if(verified === false)
        return false;
    }

    return true;
  }
};
