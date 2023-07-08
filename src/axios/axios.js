import axios from 'axios'


export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8001/",
  });
  

axiosInstance.interceptors.response.use(
    response => {
      return response
    },
    async (error) => {
        console.log(error)
      const originalRequest = error?.config
  
      if (error?.response?.status === 401 && !originalRequest?.sent) {
        originalRequest.sent = true
        await axios
              .post('http://127.0.0.1:8001/users/refresh/', {'refresh': 'refresh'}, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
              })
        return axios(originalRequest)

          
      }
      return Promise.reject(error)
    }
  )


export default axiosInstance