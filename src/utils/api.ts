import axios, {AxiosResponse} from 'axios';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface RequestConfig {
  method: HttpMethod;
  url: string;
  params?;
  data?;
  setPath(...path: string[]): RequestConfig;
  setQuery(query: object): RequestConfig;
  setData(data: object): RequestConfig;
}

export const getRedirectObject = (url: string) => ({
  redirect: {
    permanent: false,
    destination: url,
  },
});

const API_URL_BASE = 'https://uostime.herokuapp.com/api';


const makeConfig = (method: HttpMethod, url: string) => (
  initialData = {}
): RequestConfig => {
  const config: RequestConfig = {
    method,
    url,
    params: undefined,
    data: undefined,

    setPath: (...path) => {
      config.url += ['', ...path].join('/');
      return config;
    },

    setQuery: query => {
      config.params = query;
      return config;
    },

    setData: data => {
      if (method === HttpMethod.GET) {
        config.setQuery(data);
      } else {
        config.data = data;
      }
      return config;
    },
  };

  return config.setData(initialData);
};

// API CONFIG LIST
export const API_GET_ALL_LECTURES = makeConfig(HttpMethod.GET, '/lectures');

const axiosInstance = axios.create({
  baseURL: API_URL_BASE,
  timeout: 20000,
});

export const requestAPI = async (
  config: RequestConfig,
  onSuccess?: (response: AxiosResponse) => unknown, // status >= 200 && status < 300
  onFailure?: (error) => unknown
) => {
  try {
    // request API
    const response = await axiosInstance.request(config);

    console.log(response); // for test
    onSuccess && onSuccess(response);

    return response;
  } catch (error) {
    console.error(error); // for test
    onFailure && onFailure(error);

    return null;
  }
};
