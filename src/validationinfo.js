/**
 * ESigLabs Common Utilities
 * Validation information.
 *
 * By Fotis Loukos <me@fotisl.com>
 */

/**
 * Object validation information.
 */
export class ValidationInfo {
  /**
   * Generate an empty ValidationInfo object.
   * @constructor
   */
  constructor() {
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
  get sigVerified() {
    let verified = true;

    this.signatures.forEach(sigInfo => {
      verified &= sigInfo.sigVerified;
    });

    return verified;
  }

  /**
   * Check if all hashes correspond to the signed data.
   */
  get hashVerified() {
    let verified = true;

    this.signatures.forEach(sigInfo => {
      verified &= sigInfo.hashVerified;
    });

    return verified;
  }

  /**
   * Check if all signers have been verified against a truststore.
   * @param {string} signingTruststore - The name of the signing truststore.
   * @param {string} timestampingTruststore - The name of the timestamping
   * truststore.
   * @return {boolean} True if the file was verified against both truststores,
   * false otherwise.
   */
  isSignersVerified(signingTruststore, timestampingTruststore) {
    let verified = true;

    this.signatures.forEach(sigInfo => {
      verified &= sigInfo.isSignersVerified(signingTruststore,
        timestampingTruststore);
    });

    return verified;
  }
}
