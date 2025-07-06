import cryptoJs from 'crypto-js';

export default class CryptoUtil {
  private secretKey: string;

  /**
   *Initilizing secret key
   */
  constructor() {
    if (process.env.SECRET_KEY) {
      this.secretKey = process.env.SECRET_KEY;
    } else {
      throw new Error('Please provide Secret key while starting execution.');
    }
  }

  /**
   * Create encrypted data from normal sting data and convert it to string
   * @param data
   * @returns encryptedData
   */
  public encryptData(data: string) {
    const encryptedData = cryptoJs.AES.encrypt(data, this.secretKey).toString();
    return encryptedData;
  }

  /**
   * Create decrypted data from encrypted sting data and convert it to string
   * @param encData
   * @returns decryptedData
   */
  public decryptData(encData: string) {
    const decryptedData = cryptoJs.AES.decrypt(
      encData,
      this.secretKey
    ).toString(cryptoJs.enc.Utf8);
    return decryptedData;
  }
}
