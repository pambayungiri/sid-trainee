import axios, { AxiosRequestConfig, AxiosResponse } from 'axios-miniprogram';
import env from "../../../../env.json";

const globalData: any = getApp()
const token: String = globalData.data.token
const baseUrl: string = env.MOCK_BASE_URL


export async function getAxios(url: string): Promise<AxiosResponse> {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return new Promise((resolve, reject) => {
    axios(baseUrl + url, config)
      .then((response: AxiosResponse) => {
        resolve(response);
      })
      .catch((error: any) => {
        console.log('Error dari custom Axios', error.message)
        reject(error);
      });
  });

}