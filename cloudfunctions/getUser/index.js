// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-4gwqhiyk93044a46'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()

  return {
    event,
    openid: OPENID,
    appid: APPID,
    unionid: UNIONID,
  }
}