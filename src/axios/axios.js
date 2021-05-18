import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://budget-calculator-dadf9-default-rtdb.firebaseio.com/'
});

export default Axios;