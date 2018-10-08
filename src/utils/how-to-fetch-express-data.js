// 简单的call的用法
var data = {
	"personal-salary-before-tax" : 3000, 
	"expected-retirement-age" : 60, 
	"age" : 30, 
	"pension-investment-rate-of-return" : 0.03, 
	"life-expectancy" : 80, 
	"successive-length-of-service-by-date" : 0, 
	"start-date" : 1989, 
	"local-average-salary-last-year" : 7130, 
	"time-for-participation" : 31, 
	"monthly-taxable-wage" : 2000, 
	"social-security-pension-account-balance" : 4000
}

wx.request({
  url: 'https://miniprogram.xluyun.com/getExpressReportData', //仅为示例，并非真实的接口地址
  header: {
  	'content-type': 'application/json' // 默认值
  },
  success: function(res) {
    console.log(res)
  },
  method: 'POST',
  data: data,
  dataType: 'json'
})