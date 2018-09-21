/**
 * todo:
 *  最终结果中，养老金缺口受基金定投收益率 和 通胀率影响较大
 *  建议 通胀率设置为 10-13% （正常为7-8%）
 */
/**
 * 计算退休时实际每月生活费，o
 * @param {} j 目前工资，元/月
 * @param {} e 平均通胀率
 * @param {} b 准备退休的年龄
 * @param {} c 目前年龄
 */
function money_per_month(j, e, b, c){
  return j * (1+e)**(b-c);
}

/**
* 退休时社保分担(能有多少社保)， p
* @param {} j 目前工资 元/月
* @param {} b 准备退休的年龄
* @param {} c 目前年龄
*/
function pension_when_retirement(j,b,c){
  return j*(1+0.08)**(b-c);
}

/**
* 退休时基金定投分担, q
* @param {} k 基金定投平均收益率
* @param {} b 准备退休的年龄
* @param {} c 目前年龄
* @param {} n 基金定投分担，元/月
* @param {} f 预期寿命
*/
function benefit_from_fund(k, b, c, n, f){
  var rate = k/12;
  var nper = (b-c)*12;
  var pmt = -n;
  
  // todo: f - b > 0
  var divisor = (f-b)*12;
  return FV(rate, nper, pmt, 0, 0)/divisor;
}

/**
* Future value 计算
* @param {*} rate 各期利率。
* @param {*} nper 年金的付款总期数。
* @param {*} pmt 各期所应支付的金额，在整个年金期间保持不变。 通常 pmt 包括本金和利息，但不包括其他费用或税款。 如果省略 pmt，则必须包括 pv 参数。
* @param {*} pv 可选。现值，或一系列未来付款的当前值的累积和。 如果省略 pv，则假定其值为 0（零），并且必须包括 pmt 参数。
* @param {*} type 可选。数字 0 或 1，用以指定各期的付款时间是在期初还是期末。 如果省略 type，则假定其值为 0。
*/
function FV(rate, nper, pmt, pv, type) {
  var pow = Math.pow(1 + rate, nper),
     fv;
  if (rate) {
   fv = (pmt*(1+rate*type)*(1-pow)/rate)-pv*pow;
  } else {
   fv = -1 * (pv + pmt * nper);
  }
  return fv.toFixed(2);
}

/**
* 养老金缺口, r
* @param {*} j 目前工资 元/月
* @param {*} e 平均通胀率
* @param {*} b 准备退休的年龄
* @param {*} c 目前年龄
* @param {*} k 基金定投平均收益率
* @param {*} n 基金定投分担，元/月
* @param {*} f 预期寿命
*/
export function pension_gap(j,e,b,c,k,n,f) {
  return money_per_month(j, e, b, c) - pension_when_retirement(j, b, c) - benefit_from_fund(k, b, c, n, f);
};

/*************************************** 第一块结束 */

/**
* 计发月数, M。未来年记账利率或投资收益率: i 默认为 4%
* @param {*} f 预期寿命
* @param {*} b 准备退休的年龄
*/
function plan_months(f, b){
  // 未来年记账利率或投资收益率: i 默认为 4%
  var i = 0.04;
  var t = 1 - (1+i)**(b-f);
  return Math.round(12 * t/i*(1+i));
}

/**
* todo: 不可用
* 本人指数化月平均缴费工资：Y 元
* @param {*} e 平均通胀率
* @param {*} j 目前工资 元/月
* @param {*} d 上年当地职工平均工资，取自json文件 元/月
* @param {*} g 上年当地职工工资平均增长率
* @param {*} months 已交社保月数
*/
function average_indexed_monthly_earnings(y_b1992, e, j, d, g, months){
  // 参保人基本养老保险平均缴费指数为：参保人退休时缴费年限的每月缴费指数之和÷缴费年限的月数。

  // 参保人退休时缴费年限的每月缴费指数之和
  var sum_point = 0;

  var years = Math.ceil(months/12);
  // 退休前一年的职工平均工资
  var c1 = d * (1+g)**(years);
  console.log("c1: ", c1);
  for(var i = 1; i <= years; i++){
      // 第i年的工资
      var x = j * ((1+e)**(i));
      console.log("x: ", x);
      // 第i年的当地工资
      var t = d * ((1+g)**(i));
      console.log("t: ", t);
      sum += x * c1 /t;
      console.log("sum: ", sum);
  }

  return sum / months;
}

/**
* 社保基础养老金: p1
* @param {*} w 参保人员退休时上一年度全省在岗职工月平均工资 元/月
* @param {*} y 本人指数化月平均缴费工资
* @param {*} N N为企业和职工应缴纳基本养老保险费的年限。
*/
function pension_basic_social_insurance(w, y, N){
  return (w + y)/2 * N
}

/**
* 退休首年养老金月领金额
* @param {*} p1 社保基础养老金
* @param {*} p2 社保个人账户养老金
* @param {*} p3 社保过渡性养老金
* @param {*} p4 企业年金
*/
export function pension_in_first_retirement_month(p1, p2, p3, p4){
  return p1+p2+p3+p4;
}

