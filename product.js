import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      // 將 api 連結與路徑存起來，方便後續使用。
      // products
      // tempProduct
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'peihanwang-hexschool',
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    // 確認是否為登入狀態的方法
    checkAdmin() {
      // 先將 check 的 api url 儲存成變數
      // api 的 url 搭配先前儲存的 apiUrl 並以樣板字面值的方式帶入變數儲存
      // 這邊的 this 是指 proxy 上的資料
      // axios post ckeck api 的 url
      const url = `${this.apiUrl}/api/user/check`;
      // 使用 axiox 提出 post 請求，並帶入 url
      axios
        .post(url)
        // 成功狀態:
        // 執行 proxy 上的 get.Data 方法，獲取後端產品資料
        .then(() => {
          this.getData();
        })
        // 失敗狀態:
        // 將 err.response.data 的錯誤訊息透過彈跳視窗顯示
        // 並將視窗跳回登入頁面
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'login.html';
        });
    },
    // 獲取後端產品資料的方法
    getData() {
      // 儲存 api get products 的 url
      // api 的 url 搭配先前儲存的 apiUrl 與 apiPath 以樣板字面值的方式帶入變數儲存
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      // 使用 axiox 提出 get 請求，並帶入 url
      axios
        .get(url)
        // 成功狀態:
        // 將 response 內 data.products 產品資料，賦予值給 proxy 的 products 空陣列資料中
        .then((res) => {
          this.products = res.data.products;
        })
        // 失敗狀態:
        // 將 err.response.data 的錯誤訊息透過彈跳視窗顯示
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 點擊產品頁面，查看細節的 button 時
    // 會在右側區塊呈現單一產品的細節
    openProduct(item) {
      // 會將點選的產品資料 item 回傳回 proxy 中的 tempProduct 空物件中
      // 每次點選都會重新賦予值
      this.tempProduct = item;
    },
  },
  // 開啟後第一執行
  // 1.取出 cookie 上儲存的 token
  // 2.執行 proxy 上的 ckeckAdmin 方法，確認是否為登入成功的狀態
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexPeihanWangToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
}).mount('#app');
