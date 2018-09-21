import CALCULATE_FACTORS from '@/utils/factors'

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
function pension_gap(j,e,b,c,k,n,f) {
  return money_per_month(j, e, b, c) - pension_when_retirement(j, b, c) - benefit_from_fund(k, b, c, n, f);
};

export function get_pension_gap (j, b, c, f) {
  return pension_gap(j, CALCULATE_FACTORS.e, b, c, CALCULATE_FACTORS.k, CALCULATE_FACTORS.n, f)
}

/*************************************** 第一块结束 */

/**
 * todo  社保养老个人账户余额 怎么算 4108.03 * 参保年数
 */

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
 * 计算参保人退休时缴费年限的每月缴费指数之和
 * @param {*} join 参加工作时间
 * @param {*} b 准备退休的年龄
 * @param {*} c 目前年龄
 * @param {*} e 平均通胀率
 * @param {*} d 上年当地职工平均工资，取自json文件 元/月
 * @param {*} g 上年当地职工工资平均增长率
 * @param {*} salary 每月缴费工资
 * @param {*} years_b1992 1992年之前的连续工龄 年
 */
function sum_point(join, b, c, e, d, g, salary, years_b1992){
    /**
     * point: 与 工作年份n有关
     *    1.  = 1,  n 早于1992年
     *    2.  = 1.8 , n 位于 1992 - 2018
     *    3.  = salary * (1+e)^(i) / (d * (1+g)^(i) ), n晚于2018
     * 
     */
    // 参保人退休时缴费年限的每月缴费指数之和
    var sum_point = 0;

    sum_point += (join <= 1992)? (Math.ceil(years_b1992) + (2018 - 1992)*1.8) : 0;
    sum_point += (join > 1992)? (2018 - join)*1.8 : 0;

    for(var i = 1; i <= b - c; i++){
      var a = salary * (1+e)**i / (d * (1+g)**(i))
      sum_point += salary * (1+e)**i / (d * (1+g)**(i))
    }

    return sum_point;
}

/**
 * todo: 缴费年限月数到底是什么 
 * 计算本人指数化月平均缴费工资 Y
 * @param {*} years_b1992 1992年之前的连续工龄 年
 * @param {*} join 参加工作时间
 * @param {*} e 平均通胀率
 * @param {*} d 上年当地职工平均工资，取自json文件 元/月
 * @param {*} g 上年当地职工工资平均增长率
 * @param {*} b 准备退休的年龄
 * @param {*} c 目前年龄
 * @param {*} years_join_insure 参保年数 理论上等于 2018-join
 * @param {*} salary 每月缴费工资
 */
function average_indexed_monthly_earnings(years_b1992, join, e, d, g, b, c, years_join_insure, salary){
  /**
   * 本人指数化月平均缴费工资的计算办法为：参保人基本养老保险平均缴费指数×参保人退休时上年度本市在岗职工月平均工资。
   * 参保人基本养老保险平均缴费指数为：参保人退休时缴费年限的每月缴费指数之和÷缴费年限的月数。
   * 参保人基本养老保险每月缴费指数为：参保人每月缴费工资÷缴费时上年度本市在岗职工月平均工资。
   * 
   * to calculate:
   *  指数化月平均缴费工资: Y 元/月
   *  参保人基本养老保险平均缴费指数: point_average
   *  每月缴费指数: point
   *  每月缴费工资: salary 元/月
   *  参保人退休时上年度本市在岗职工月平均工资: salary_retirement 元/月
   * 
   * Y = point_average * salary_retirement
   * point_average = sum(point)/(y*12)
   * point: 与 工作年份n有关
   *        1.  = 1,  n 早于1992年
   *        2.  = 1.8 , n 位于 1992 - 2018
   *        3.  = salary * (1+e)^(i) / (d * (1+g)^(i) ), n晚于2018
   * salary_retirement = d * (1+g)^(i)
   */

  var point_average = sum_point(join, b, c, e, d, g, salary, years_b1992) / (years_join_insure*12)
  // 退休前一年的职工平均工资
  var salary_retirement = d * (1+g)**(b-c);

  return point_average * salary_retirement;
}

/**
 * 社保基础养老金: P1
 * @param {*} years_b1992 1992年之前的连续工龄 年
 * @param {*} join 参加工作时间
 * @param {*} e 平均通胀率
 * @param {*} d 上年当地职工平均工资，取自json文件 元/月
 * @param {*} g 上年当地职工工资平均增长率
 * @param {*} b 准备退休的年龄
 * @param {*} c 目前年龄
 * @param {*} years_join_insure 参保年数 理论上等于 2018-join
 * @param {*} salary 每月缴费工资
 */
function pension_basic_social_insurance(years_b1992, join, e, d, g, b, c, years_join_insure, salary){
  /**
   *  w 参保人员退休时上一年度全省在岗职工月平均工资 元/月
   *  y 本人指数化月平均缴费工资
   *  N N为企业和职工应缴纳基本养老保险费的年限。
   */
  
  var w = d * (1+g)**(b-c);
  var y = average_indexed_monthly_earnings(years_b1992, join, e, d, g, b, c, years_join_insure, salary);
  var N = b - c + 2018-join;

  return (w + y)/2 * N * 0.01;
}

function get_pension_basic_social_insurance (years_b1992, join, d, b, c, years_join_insure, salary) {
  return pension_basic_social_insurance(years_b1992, join, CALCULATE_FACTORS.e, d, CALCULATE_FACTORS.g, b, c, years_join_insure, salary)
}

/**
 * 保个人账户养老金 P2
 * @param {*} remaining_of_personal_account 个人账户养老金存额
 * @param {*} c 目前年龄
 * @param {*} b 准备退休的年龄
 * @param {*} f 预期寿命
 */
function pension_personal_account(remaining_of_personal_account, c, b, f){
  var t = plan_months(f, b);
  return (4108.03 * (b - c) + remaining_of_personal_account)/t;
}

function get_pension_personal_account (remaining_of_personal_account, c, b, f) {
  return pension_personal_account(remaining_of_personal_account, c, b, f)
}

/**
 * 社保过渡性养老金: P3
 * todo 算法有问题
 */
function pension_transition(years_b1992, join, e, d, g, b, c, years_join_insure, salary){
  var rate = 0.3 + (Math.floor(Math.random()*10) + Math.floor(Math.random()*5))*0.01;
  return average_indexed_monthly_earnings(years_b1992, join, e, d, g, b, c, years_join_insure, salary) * rate;
}

function get_pension_transition (years_b1992, join, d, b, c, years_join_insure, salary) {
  return pension_transition(years_b1992, join, CALCULATE_FACTORS.e, d, CALCULATE_FACTORS.g, b, c, years_join_insure, salary)
}

/**
 * 退休首年养老金月领金额
 * @param {*} years_b1992 1992年之前的连续工龄 年
 * @param {*} join 参加工作时间
 * @param {*} e 平均通胀率
 * @param {*} d 上年当地职工平均工资，取自json文件 元/月
 * @param {*} g 上年当地职工工资平均增长率
 * @param {*} b 准备退休的年龄
 * @param {*} c 目前年龄
 * @param {*} years_join_insure 参保年数 理论上等于 2018-join
 * @param {*} salary 每月缴费工资
 * @param {*} remaining_of_personal_account 个人账户养老金存额
 * @param {*} f 预期寿命
 * @param {*} company_annuity 企业年金
 */
function pension_in_first_retirement_month(years_b1992, join, e, d, g, b, c, years_join_insure, salary, remaining_of_personal_account, f, company_annuity){
  /** 
   * @param {*} p1 社保基础养老金
   * @param {*} p2 社保个人账户养老金
   * @param {*} p3 社保过渡性养老金
   * @param {*} company_annuity 企业年金
   */
  var p1 = pension_basic_social_insurance(years_b1992, join, e, d, g, b, c, years_join_insure, salary);
  var p2 = pension_personal_account(remaining_of_personal_account, c, b, f);
  var p3 = pension_transition(years_b1992, join, e, d, g, b, c, years_join_insure, salary);
  return p1+p2+p3+company_annuity;
}

function get_pension_in_first_retirement_month (years_b1992, join, d, b, c, years_join_insure, salary, remaining_of_personal_account, f) {
  return pension_in_first_retirement_month(years_b1992, join, CALCULATE_FACTORS.e, d, CALCULATE_FACTORS.g, b, c, years_join_insure, salary, remaining_of_personal_account, f, CALCULATE_FACTORS.company_annuity)
}

function getExpressReportData (years_b1992, join, d, j, b, c, years_join_insure, salary, remaining_of_personal_account, f) {
  return {
    pensionGap: get_pension_gap(j, b, c, f),
    pensionInFirstRetirementMonth: get_pension_in_first_retirement_month(years_b1992, join, d, b, c, years_join_insure, salary, remaining_of_personal_account, f),
    pensionBasicSocialInsurance: get_pension_basic_social_insurance(years_b1992, join, d, b, c, years_join_insure, salary),
    pensionPersonalAccount: get_pension_personal_account(remaining_of_personal_account, c, b, f),
    pensionTransition: get_pension_transition(years_b1992, join, d, b, c, years_join_insure, salary),
    companyAnnuity: CALCULATE_FACTORS.company_annuity
  }
}

export default getExpressReportData
