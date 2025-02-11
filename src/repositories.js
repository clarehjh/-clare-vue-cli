// ./src/repositories.js
// 模板仓库映射
require("dotenv").config();

module.exports = {
  Vue3_Ts_ElementPlus: {
    xsy_admin: process.env.XSY_ADMIN_URL,
  },
  H5: {
    Vue3_H5_Vant4: process.env.VUE3_H5_VANT4_URL,
  },
  uniapp_vue3_vite: {
    uniapp_vue3_vite: process.env.UNIAPP_VUE3_VITE_URL,
  },
};
