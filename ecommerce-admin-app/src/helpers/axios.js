import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';
import { authConstants } from '../actions/constants';

const token = window.localStorage.getItem('token'); //mỗi trang web có 1 localStorage khác nhau.

const axiosIntance = axios.create({
    baseURL: api, //api = "http://localhost:2000/api" là đường dẫn mặc định sau đó kết hợp với các đường dẫn tương đối để kết nôi với backend.
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

axiosIntance.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
})

axiosIntance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    const status = error.response ? error.response.status : 500;
    if(status && status === 500){
        localStorage.clear();
        store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
    //return error.response nếu thay thế cho return Promise.reject(error) thì res sinh ra bên action là 1 đối tượng mà res.data là đối tượng lỗi.
})

//trong interceptors có 2 callback (ở request không ghi vì nó khó xảy ra error). callback đầu tiên chứa biến là req và res, nếu không xảy ra lỗi tại client thì req được gọi và callback đầu tiên được thực hiện trước khi gửi request lên server, trường hợp response về nếu không xảy ra lỗi thì callback đầu tiên của axiosIntance.interceptors.response.use() được thực thi trước khi gửi response về client. callback thứ 2 chứa biến là các errors và hàm thực hiện khi xảy ra errors. Lưu ý rằng khi mà status code bên backend trả về là 400 hoặc 500 thì function thứ 2 được thực thi và không trả về res để thực hiện code bên action.

export default axiosIntance;
