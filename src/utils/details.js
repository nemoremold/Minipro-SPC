export default class Deatils{
  constructor(inputs){
      var AVERAGE_INFLATION_RATE = 0.13 // 平均通胀率
      var LOCAL_WAGE_GROWTH_RATE = 0.04 // 上年当地职工工资平均增长率
      var COMPANY_ANNUITY = 0// 企业年金

      this.current_wage = inputs['personal-salary-before-tax']; // @property 目前工资，元/月
      this.expected_retirement_age = inputs['expected-retirement-age']; // @property 准备退休的年龄
      this.age = inputs['age']; // @property 目前年龄
      this.average_benefit_fund_rate = inputs['pension-investment-rate-of-return']; // @property 基金定投平均收益率
      this.expected_age = inputs['life-expectancy']; // @property 预期寿命
      this.years_b1992 = inputs['successive-length-of-service-by-date']; // @property 1992年之前的连续工龄 年 可以为小数
      this.join = inputs['start-date']; // @property 参加工作的年份
      this.local_average_salary = inputs['local-average-salary-last-year']; // @property 上年当地职工平均工资，取自json文件 元/月
      this.years_join_insure = inputs['time-for-participation']; // @property 参保年数 理论上等于 2018-start-date
      this.salary = inputs['monthly-taxable-wage']; // @property 每月缴费工资
      this.remaining_of_personal_account = inputs['social-security-pension-account-balance']; // @property 个人账户养老金存额
      this.average_inflation_rate = AVERAGE_INFLATION_RATE; // @property 平均通胀率
      this.local_wage_growth_rate = LOCAL_WAGE_GROWTH_RATE; // @property 上年当地职工工资平均增长率
      this.company_annuity = COMPANY_ANNUITY; // @property 企业年金
      this.pension_replacement_rate = inputs['target-pension-replacement-rate']; // @property 养老金替代率目标
      // @property 基金定投分担，元/月
      this.fund_benefit_per_month = (inputs['social-security-pension-account-balance'] > 5000)? 
      inputs['social-security-pension-account-balance'] * 0.3 : inputs['social-security-pension-account-balance']*0.34;
  }

  getExpressReportData(){
      // 养老金总缺口
      var pensionGap = this.pension_gap();
      var pensionInFirstRetirementMonth = this.pension_in_first_retirement_month();
      var pensionBasicSocialInsurance = this.pension_basic_social_insurance();
      var pensionPersonalAccount = this.pension_personal_account();
      var pensionTransition = this.pension_transition();
      var companyAnnuity = this.get_company_annuity();
      var pensionGapPerMonth = this.pension_gap_per_month();
      
      return {
          pensionGap,
          pensionInFirstRetirementMonth,
          pensionBasicSocialInsurance,
          pensionPersonalAccount,
          pensionTransition,
          companyAnnuity,
          pensionGapPerMonth
      };
  }

  getDetailedReportData(){
      return {
          "sectionSecondInfo": details.section_second_info,
          "sectionThirdInfo": details.section_third_info,
          "sectionFourthInfo": details.section_fourth_info
      }
  }

  /**
   * todo:
   *  最终结果中，养老金缺口受基金定投收益率 和 通胀率影响较大
   *  建议 通胀率设置为 10-13% （正常为7-8%）
   */
  /**
   * 计算退休时实际每月生活费，o
   * @param {} this.current_wage 目前工资，元/月
   * @param {} this.average_inflation_rate 平均通胀率
   * @param {} this.expected_retirement_age 准备退休的年龄
   * @param {} this.age 目前年龄
   */
  money_per_month(){
      return this.current_wage * (1+this.average_inflation_rate)**(this.expected_retirement_age-this.age);
  }

  /**
   * 退休时社保分担(能有多少社保)， p
   * @param {} this.current_wage 目前工资 元/月
   * @param {} this.expected_retirement_age 准备退休的年龄
   * @param {} this.age 目前年龄
   */
  pension_when_retirement(){
      return this.current_wage*(1+0.03)**(this.expected_retirement_age-this.age);
  }

  /**
   * 退休时基金定投分担, q
   * @param {} this.average_benefit_fund_rate 基金定投平均收益率
   * @param {} this.expected_retirement_age 准备退休的年龄
   * @param {} this.age 目前年龄
   * @param {} this.fund_benefit_per_month 基金定投分担，元/月
   * @param {} this.expected_age 预期寿命
   */
  benefit_from_fund(){
      var rate = this.average_benefit_fund_rate/12;
      var nper = (this.expected_retirement_age-this.age)*12;
      var pmt = -this.fund_benefit_per_month;
      
      // todo: this.expected_age - this.expected_retirement_age > 0
      var divisor = (this.expected_age-this.expected_retirement_age)*12;
      return this.FV(rate, nper, pmt, 0, 0)/divisor;
  }

  /**
   * Future value 计算
   * @param {*} rate 各期利率。
   * @param {*} nper 年金的付款总期数。
   * @param {*} pmt 各期所应支付的金额，在整个年金期间保持不变。 通常 pmt 包括本金和利息，但不包括其他费用或税款。 如果省略 pmt，则必须包括 pv 参数。
   * @param {*} pv 可选。现值，或一系列未来付款的当前值的累积和。 如果省略 pv，则假定其值为 0（零），并且必须包括 pmt 参数。
   * @param {*} type 可选。数字 0 或 1，用以指定各期的付款时间是在期初还是期末。 如果省略 type，则假定其值为 0。
   */
  FV(rate, nper, pmt, pv, type) {
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
   * @param {*} this.current_wage 目前工资 元/月
   * @param {*} this.average_inflation_rate 平均通胀率
   * @param {*} this.expected_retirement_age 准备退休的年龄
   * @param {*} this.age 目前年龄
   * @param {*} this.average_benefit_fund_rate 基金定投平均收益率
   * @param {*} this.fund_benefit_per_month 基金定投分担，元/月
   * @param {*} this.expected_age 预期寿命
   */
  pension_gap() {
      return this.money_per_month() - this.pension_when_retirement() - this.benefit_from_fund();
  };

  /*************************************** 第一块结束 */

  /**
   * todo  社保养老个人账户余额 怎么算 4108.03 * 参保年数
   */

  /**
   * 计发月数, M。未来年记账利率或投资收益率: i 默认为 4%
   * @param {*} this.expected_age 预期寿命
   * @param {*} this.expected_retirement_age 准备退休的年龄
   */
  plan_months(){
      // 未来年记账利率或投资收益率: i 默认为 4%
      var i = 0.04;
      var t = 1 - (1+i)**(this.expected_retirement_age-this.expected_age);
      return Math.round(12 * t/i*(1+i));
  }


  /**
   * 计算参保人退休时缴费年限的每月缴费指数之和
   * @param {*} this.join 参加工作时间
   * @param {*} this.expected_retirement_age 准备退休的年龄
   * @param {*} this.age 目前年龄
   * @param {*} this.average_inflation_rate 平均通胀率
   * @param {*} this.local_average_salary 上年当地职工平均工资，取自json文件 元/月
   * @param {*} this.local_wage_growth_rate 上年当地职工工资平均增长率
   * @param {*} this.salary 每月缴费工资
   * @param {*} this.years_b1992 1992年之前的连续工龄 年
   */
  sum_point(){
      /**
       * point: 与 工作年份n有关
       *    1.  = 1,  this.fund_benefit_per_month 早于1992年
       *    2.  = 1.8 , this.fund_benefit_per_month 位于 1992 - 2018
       *    3.  = this.salary * (1+this.average_inflation_rate)^(i) / (this.local_average_salary * (1+this.local_wage_growth_rate)^(i) ), n晚于2018
       * 
       */
      // 参保人退休时缴费年限的每月缴费指数之和
      var sum_point = 0;

      sum_point += (this.join <= 1992)? (Math.ceil(this.years_b1992) + (2018 - 1992)*1.8) : 0;
      sum_point += (this.join > 1992)? (2018 - this.join)*1.1 : 0;

      for(var i = 1; i <= this.expected_retirement_age - this.age; i++){
          var a = this.salary * (1+this.average_inflation_rate)**i / (this.local_average_salary * (1+this.local_wage_growth_rate)**(i))
          sum_point += this.salary * (1+this.average_inflation_rate)**i / (this.local_average_salary * (1+this.local_wage_growth_rate)**(i))
      }
      return sum_point;
  }

  /**
   * 计算参保人退休时缴费年限的平均缴费指数
   * @param {*} this.join 参加工作时间
   * @param {*} this.expected_retirement_age 准备退休的年龄
   * @param {*} this.age 目前年龄
   * @param {*} this.average_inflation_rate 平均通胀率
   * @param {*} this.local_average_salary 上年当地职工平均工资，取自json文件 元/月
   * @param {*} this.local_wage_growth_rate 上年当地职工工资平均增长率
   * @param {*} this.salary 每月缴费工资
   * @param {*} this.years_b1992 1992年之前的连续工龄 年
   * @param {*} this.years_join_insure 
   */
  point_average(){
      return this.sum_point() / (this.years_join_insure);
  }

  /**
   * todo: 缴费年限月数到底是什么 
   * 计算本人指数化月平均缴费工资 Y
   * @param {*} this.years_b1992 1992年之前的连续工龄 年
   * @param {*} this.join 参加工作时间
   * @param {*} this.average_inflation_rate 平均通胀率
   * @param {*} this.local_average_salary 上年当地职工平均工资，取自json文件 元/月
   * @param {*} this.local_wage_growth_rate 上年当地职工工资平均增长率
   * @param {*} this.expected_retirement_age 准备退休的年龄
   * @param {*} this.age 目前年龄
   * @param {*} this.years_join_insure 参保年数 理论上等于 2018-this.join
   * @param {*} this.salary 每月缴费工资
   */
  average_indexed_monthly_earnings(){
      /**
       * 本人指数化月平均缴费工资的计算办法为：参保人基本养老保险平均缴费指数×参保人退休时上年度本市在岗职工月平均工资。
       * 参保人基本养老保险平均缴费指数为：参保人退休时缴费年限的每月缴费指数之和÷缴费年限的月数。
       * 参保人基本养老保险每月缴费指数为：参保人每月缴费工资÷缴费时上年度本市在岗职工月平均工资。
       * 
       * to calculate:
       *  指数化月平均缴费工资: Y 元/月
       *  参保人基本养老保险平均缴费指数: point_average
       *  每月缴费指数: point
       *  每月缴费工资: this.salary 元/月
       *  参保人退休时上年度本市在岗职工月平均工资: salary_retirement 元/月
       * 
       * Y = point_average * salary_retirement
       * point_average = sum(point)/(y*12)
       * point: 与 工作年份n有关
       *        1.  = 1,  this.fund_benefit_per_month 早于1992年
       *        2.  = 1.8 , this.fund_benefit_per_month 位于 1992 - 2018
       *        3.  = this.salary * (1+this.average_inflation_rate)^(i) / (this.local_average_salary * (1+this.local_wage_growth_rate)^(i) ), n晚于2018
       * salary_retirement = this.local_average_salary * (1+this.local_wage_growth_rate)^(i)
       */

      var point_average = this.point_average();
      // 退休前一年的职工平均工资
      var salary_retirement = this.local_average_salary * (1+this.local_wage_growth_rate)**(this.expected_retirement_age-this.age);

      return point_average * salary_retirement;
  }

  /**
   * 社保基础养老金: P1
   * @param {*} this.years_b1992 1992年之前的连续工龄 年
   * @param {*} this.join 参加工作时间
   * @param {*} this.average_inflation_rate 平均通胀率
   * @param {*} this.local_average_salary 上年当地职工平均工资，取自json文件 元/月
   * @param {*} this.local_wage_growth_rate 上年当地职工工资平均增长率
   * @param {*} this.expected_retirement_age 准备退休的年龄
   * @param {*} this.age 目前年龄
   * @param {*} this.years_join_insure 参保年数 理论上等于 2018-this.join
   * @param {*} this.salary 每月缴费工资
   */
  pension_basic_social_insurance(){
      /**
       *  w 参保人员退休时上一年度全省在岗职工月平均工资 元/月
       *  y 本人指数化月平均缴费工资
       *  N N为企业和职工应缴纳基本养老保险费的年限。
       */
      
      var w = this.local_average_salary * (1+this.local_wage_growth_rate)**(this.expected_retirement_age-this.age);
      var y = this.average_indexed_monthly_earnings();
      var N = this.expected_retirement_age - this.age + 2018-this.join;

      return (w + y)/2 * N * 0.01;
  }

  /**
   * 保个人账户养老金 P2
   * @param {*} this.remaining_of_personal_account 个人账户养老金存额
   * @param {*} this.age 目前年龄
   * @param {*} this.expected_retirement_age 准备退休的年龄
   * @param {*} this.expected_age 预期寿命
   */
  pension_personal_account(){
      var t = this.plan_months(this.expected_age, this.expected_retirement_age);
      return (4108.03 * (this.expected_retirement_age - this.age) + this.remaining_of_personal_account)/t;
  }

  /**
   * 社保过渡性养老金: P3
   * todo 算法有问题
   */
  pension_transition(){
      var rate = 0.3 + (Math.floor(Math.random()*10) + Math.floor(Math.random()*5))*0.01;
      return this.average_indexed_monthly_earnings() * rate;
  }

  /**
   * 退休首年养老金月领金额
   * @param {*} this.years_b1992 1992年之前的连续工龄 年
   * @param {*} this.join 参加工作时间
   * @param {*} this.average_inflation_rate 平均通胀率
   * @param {*} this.local_average_salary 上年当地职工平均工资，取自json文件 元/月
   * @param {*} this.local_wage_growth_rate 上年当地职工工资平均增长率
   * @param {*} this.expected_retirement_age 准备退休的年龄
   * @param {*} this.age 目前年龄
   * @param {*} this.years_join_insure 参保年数 理论上等于 2018-this.join
   * @param {*} this.salary 每月缴费工资
   * @param {*} this.remaining_of_personal_account 个人账户养老金存额
   * @param {*} this.expected_age 预期寿命
   * @param {*} this.company_annuity 企业年金
   */
  pension_in_first_retirement_month(){
      /** 
       * @param {*} p1 社保基础养老金
       * @param {*} p2 社保个人账户养老金
       * @param {*} p3 社保过渡性养老金
       * @param {*} this.company_annuity 企业年金
       */
      var p1 = this.pension_basic_social_insurance();
      var p2 = this.pension_personal_account();
      var p3 = this.pension_transition();
      return p1+p2+p3+this.company_annuity;
  }

  /**
   * 企业年金
   */
  get_company_annuity(){
      return this.company_annuity;
  }

  /**
   * 基础养老金领取比例
   * @param {*} pension_basic_social_insurance 社保基础养老金: P1
   * @param {*} money_per_month 计算退休时实际每月生活费
   */
  ratio_of_basic_receive_pension(){
      return this.pension_basic_social_insurance() / this.retirement_salary_per_month_expand();
  }

  /**
   * 养老金的月缺口
   */
  pension_gap_per_month(){
      return this.pension_gap() / (this.expected_age - this.expected_retirement_age)
  }

  /**
   * 退休前一年的工资，按当地工资增长率
   */
  retirement_salary_per_month(){
      return this.current_wage * (1+this.local_wage_growth_rate)**(this.expected_retirement_age-this.age);
  }

  /**
   * 退休前一年的工资，按通货膨胀率
   */
  retirement_salary_per_month_expand(){
      return this.current_wage * (1+this.average_inflation_rate)**(this.expected_retirement_age-this.age);
  }

  /**
   * 养老金替代率缺口值
   */
  gap_of_pension_replacement_rate_value(){
      return this.pension_gap_per_month() / (this.current_wage * (1+this.average_inflation_rate)**(this.expected_retirement_age-this.age));
  }

  get section_second_info(){
      return {
          "ratioOfBasicReceivePension": this.ratio_of_basic_receive_pension(),
          "pointAverage": this.point_average(),
          "planMonths": this.plan_months(),
          "retirementSalaryPerMonth": this.retirement_salary_per_month(),
          "pensionBasicSocialInsurance": this.pension_basic_social_insurance(),
          "pensionPersonalAccount": this.pension_personal_account(),
          "pensionTransition": this.pension_transition(),
          "companyAnnuity": this.get_company_annuity(),
          "pensionInFirstRetirementMonth": this.pension_in_first_retirement_month()
      }
  }

  get section_third_info(){
      var t = this.gap_of_pension_replacement_rate_value()
      return {
          "pensionReplacementRate": this.pension_replacement_rate,
          "rateOfSocialInsurancePlusAnnuity": this.pension_replacement_rate - t,
          "gapOfPensionReplacementRateValue": t,
          "pensionGapPerMonth": this.pension_gap_per_month()
      }
  }

  salaries_per_year_until_retire(){
      var salaries = [];
      for(var i = 0; i < this.expected_retirement_age - this.age; i++){
          salaries.push(this.current_wage*(1+this.local_wage_growth_rate)**(i));
      }
      return salaries;
  }

  pensions_per_year_until_died(){
      var pensions = [];
      for(var i = 0; i < this.expected_age - this.expected_retirement_age; i++){
          pensions.push(this.pension_in_first_retirement_month()*(1+this.local_wage_growth_rate)**(i));
      }
      return pensions;
  }

  gaps_per_year_until_died(){
      var gaps = [];
      var gap = this.pension_gap_per_month();

      for(var i = 0; i < this.expected_age - this.expected_retirement_age; i++){
          gaps.push(gap*(1+this.local_wage_growth_rate)**(i));
      }

      return gaps;
  }

  get section_fourth_info(){
      return {
          'salaries': this.salaries_per_year_until_retire(),
          'pensions': this.pensions_per_year_until_died(),
          "gaps": this.gaps_per_year_until_died()
      }        
  }
}