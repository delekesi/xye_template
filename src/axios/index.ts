import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { h } from 'vue'
import { ElMessage } from 'element-plus'
const api: AxiosInstance = axios.create({
    timeout: 5000
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

api.interceptors.response.use(
    (response: AxiosResponse | any) => {
        if (response.status === 200) {
            return response;
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        ElMessage({
            message: h('p', null, [
                h('span', null, `${error.message}`)
            ]),
            duration: 0,
            showClose: true,
            customClass:'custom_class_error'
        })
        return Promise.reject();
    }
);

export default api;