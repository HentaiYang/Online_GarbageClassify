// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 初始化数据库
const points = cloud.database({
  env: 'cloud1-4gwqhiyk93044a46'
}).collection('points')
const userList = cloud.database({
  env: 'cloud1-4gwqhiyk93044a46'
}).collection('userList')
// 格式化时间
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('/')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 对比时间
function compareDate(nowDate, dbDate) {
  var nowDate = new Date(nowDate)
  var dbDate = new Date(dbDate)
  console.log("nowDate: " + nowDate);
  console.log("dbDate: " + dbDate);
  // 已经过期了
  if (nowDate > dbDate) {
    return true;
  }
  // 还没过期
  else if (nowDate < dbDate) {
    return false;
  }
}
// 判断是不是空时间
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime())
}

// 更新用户列表数据
function updataUserListInfo(openid, rank, score) {
  return new Promise((resolve, reject) => {
    userList.where({
        _openid: openid
      }).update({
        data: {
          rank: score == 0 ? 999 : rank,
          score: score
        }
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })

}
//utc时间转北京时间
function utc_beijing(utc_datetime) {
  // 转为正常的时间格式 年-月-日 时:分:秒
  var T_pos = utc_datetime.indexOf('T');
  var Z_pos = utc_datetime.indexOf('Z');
  var year_month_day = utc_datetime.substr(0, T_pos);
  var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
  var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

  // 处理成为时间戳
  timestamp = new Date(Date.parse(new_datetime));
  timestamp = timestamp.getTime();
  timestamp = timestamp / 1000;

  // 增加8个小时，北京时间比utc时间多八个时区
  var timestamp = timestamp + 8 * 60 * 60;

  // 时间戳转为时间
 // var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  var beijing_datetime = new Date(parseInt(timestamp) * 1000)
  return beijing_datetime; // 2017-03-31 16:02:06
} 

// 定时器
// "triggers": [
//   {
//     "name": "changeStatus",
//     "type": "timer",
//     "config": "0 0 24 * * * *"
//   }
// ]
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 获得当前时间
  
  const currentTime = new Date()

  // 获取所有数据
  let count = await points.count()
  count = count.total
  let all = []
  for (let i = 0; i < count; i += 100) {
    let list = await points.orderBy('points', 'desc').skip(i).get()
    all = all.concat(list.data)
  }

  for (let index = 0; index < all.length; index++) {
    var dbDate = new Date(Date.parse(all[index].date));
    // console.log(date);
    updataUserListInfo(all[index]._openid, index + 1, all[index].points)
    if (isValidDate(dbDate)) {
      if (compareDate(currentTime, dbDate)) {
        console.log('到这儿了')
        points.doc(all[index]._id).update({
          // data 传入需要局部更新的数据
          data: {
            // 表示将 overdue 字段置为 true
            answerNumber: 3
          },
          success: (res) => {},
          fail: (err) => {}
        })
      }
    }

  }
  // console.log('返回的结果：', all);

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    currentTime: currentTime,
  }
}