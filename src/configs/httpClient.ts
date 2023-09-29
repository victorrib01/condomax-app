import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Define the types for the httpClient methods.
 */
interface HttpClient {
  get<T>(url: string, params?: Record<string, any>): Promise<T>;
  post<T>(url: string, body: Record<string, any>): Promise<T>;
  put<T>(url: string, body: Record<string, any>): Promise<T>;
  delete<T>(url: string, params?: Record<string, any>): Promise<T>;

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

// URL base definida no arquivo .env
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // Aqui é onde a URL base é definida
});

/**
 * httpClient - A wrapper around axios to abstract the HTTP client.
 *
 * @example
 * httpClient.get('/some-api-endpoint').then(data => console.log(data));
 *
 * @example
 * httpClient.post('/some-api-endpoint', { key: 'value' }).then(data => console.log(data));
 */
const httpClient: HttpClient = {
  /**
   * Performs a GET request.
   *
   * @param {string} url - The URL to send the GET request to.
   * @param {Record<string, any>} [params] - The URL parameters to include with the request.
   * @returns {Promise<T>} - A Promise that resolves with the response data.
   */
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response: AxiosResponse<T> = await axios.get(url, { params });
    return response.data;
  },

  /**
   * Performs a POST request.
   *
   * @param {string} url - The URL to send the POST request to.
   * @param {Record<string, any>} body - The request payload.
   * @returns {Promise<T>} - A Promise that resolves with the response data.
   */
  async post<T>(url: string, body: Record<string, any>): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.post(url, body);
    return response.data;
  },

  /**
   * Performs a PUT request.
   *
   * @param {string} url - The URL to send the PUT request to.
   * @param {Record<string, any>} body - The request payload.
   * @returns {Promise<T>} - A Promise that resolves with the response data.
   */
  async put<T>(url: string, body: Record<string, any>): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.put(url, body);
    return response.data;
  },

  /**
   * Performs a DELETE request.
   *
   * @param {string} url - The URL to send the DELETE request to.
   * @param {Record<string, any>} [params] - The URL parameters to include with the request.
   * @returns {Promise<T>} - A Promise that resolves with the response data.
   */
  async delete<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.delete(url, {
      params,
    });
    return response.data;
  },

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.patch(
      url,
      data,
      config
    );
    return response.data;
  },
  async options<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.options(url, config);
    return response.data;
  },
  async head<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.head(url, config);
    return response.data;
  },
};

export default httpClient;
