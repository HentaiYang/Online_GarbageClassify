// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-4gwqhiyk93044a46'
})
const _ = cloud.database().command
// 云函数入口函数
exports.main = async (event, context) => {
  let resData = {
    'num': 123
  }
  let userID = event.userID
  let testAuth = event.testAuth
  let points = event.points
  await cloud.database().collection('points')
    .where({
      _openid: userID
    }).update({
      data: {
        testAuth: testAuth,
        date: new Date(),
        points: _.inc(points)
      },
      success: (res)=> {
        console.log("updatePoints success:",res)
        resData['success']= 'success'
        resData['res'] = res
      },
      fail: (err) =>{
        console.log(err)
        resData['err']= 'error'
        resData['err'] = err
      }
    })

  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    wxContext: wxContext,
    resData: resData 
  }
}