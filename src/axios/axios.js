import axios from 'axios'


export const axiosInstance = axios.create({
    baseURL: "https://ai-store-bba3f15938d4.herokuapp.com/",
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
              .post('https://ai-store-bba3f15938d4.herokuapp.com/users/refresh/', {'refresh': 'refresh'}, {
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