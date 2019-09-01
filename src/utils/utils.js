// 转换时间格式
function transTime(n) {
    // let str = ''
    let days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    // 距离天数的毫秒数
    let distMills = (24 * 60 * 60 * 1000) * n;
    // 当前时间
    let currDate = new Date().getTime()
    // 算出新闻具体时间
    let newsDate = new Date(currDate - distMills)
    // 年
    let year = newsDate.getFullYear()
    // 月
    let month = newsDate.getMonth() + 1
    // 日
    let date = newsDate.getDate()
    // 星期
    let day = days[newsDate.getDay()]
    if (n === 0) {
        return '今日热闻'
    }
    return `${year}年${month}月${date}日${day}`
}
// 获取当前时间
function transTimeMill(time) {
    let commTime = new Date(time)
    // 月
    let month = (commTime.getMonth() + 1).toString().padStart(2,'0')
    // 日
    let date = (commTime.getDate()).toString().padStart(2,'0')
    // 时
    let hours = commTime.getHours()
    // 分
    let minutes = commTime.getMinutes()
    return `${month}-${date} ${hours}:${minutes}`
}
export default {
    transTime,
    transTimeMill
}