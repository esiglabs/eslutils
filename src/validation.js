/**
 * ESigLabs Common Utilities
 * Certificate validation.
 *
 * By Fotis Loukos <me@fotisl.com>
 */
import * as pkijs from 'pkijs';

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
export function verifyChain(certificate, chain, trustedCAs) {
  if(certificate === null)
    return Promise.resolve(false);

  return Promise.resolve().then(() => {
    const certificateChainEngine = new pkijs.CertificateChainValidationEngine({
      certs: chain,
      trustedCerts: trustedCAs.filter(cert => typeof cert !== 'undefined')
    });
    certificateChainEngine.certs.push(certificate);

    return certificateChainEngine.verify();
  }).then(result => {
    return result.result;
  }, result => {
    return false;
  });
}
