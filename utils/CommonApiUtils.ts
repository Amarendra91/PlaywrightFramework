import { APIRequestContext } from '@playwright/test';
import apiPathData from '../test-data/api-data/api-path-data.json';
import CommonUtils from './CommonUtils';

export default class GenerateAuthTokenUtil {
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async generateAuthToken() {
    const commonUtilsObj = new CommonUtils();
    const generateTokenResp = await this.request.post(
      `${process.env.API_BASE_URL}/${apiPathData.auth_path}`,
      {
        data: {
          username: commonUtilsObj.decryptData(
            process.env.AUTH_TOKEN_USER_NAME!
          ),
          password: commonUtilsObj.decryptData(
            process.env.AUTH_TOKEN_PASSWORD!
          ),
        },
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const generateTokenJsonResp = await generateTokenResp.json();
    return generateTokenJsonResp.token;
  }
}
