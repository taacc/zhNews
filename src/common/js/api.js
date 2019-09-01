const basiUrl = 'https://news-at.zhihu.com/api/4/'

// 接口
const news = basiUrl + '/news'
// 最新消息
const latest = news+'/latest'
// 消息内容获取与离线下载

// 过往消息 before后的数字应为id 
const before = news+'/before/'

// 新闻额外消息 #号跟id
const storyExttra = basiUrl + '/story-extra/'

// 长评论
function longComments(id){
    return `${basiUrl}/story/${id}/long-comments`
}
// 短评论
function shortComments(id){
    return `${basiUrl}/story/${id}/short-comments`
}
export default{
    news,
    latest,
    before,
    storyExttra,
    longComments,
    shortComments
}