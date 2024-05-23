// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const url = event.url;
  try {
      const response = await axios.get(url);
      const data = response.data;
      callback(null, {
          statusCode: 200,
          body: JSON.stringify(data)
      });
  } catch (error) {
      callback(null, {
          statusCode: error.response ? error.response.status : 500,
          body: JSON.stringify({ error: 'Request failed' })
      });
  }
}
