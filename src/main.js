import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router/router';
import infoCardStore from './store/infoCardStore/infoCardStore';


  
const app = createApp(App);
app.use(router);
app.use(infoCardStore);
app.mount('#app');

//  #e6e6e6  border
//  #f5f5f5d8  backgrounв-color task-panel
//  #b3b3b3  svg
//  #d4d4d4d8 shadow
//  #888686 gray-text