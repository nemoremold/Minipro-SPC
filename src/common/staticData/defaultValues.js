const LOCATIONS = [
  '北京市',
  '天津市',
  '河北省',
  '山西省',
  '内蒙古自治区',
  '辽宁省',
  '吉林省',
  '黑龙江省',
  '上海市',
  '江苏省',
  '浙江省',
  '安徽省',
  '福建省',
  '江西省',
  '山东省',
  '河南省',
  '湖北省',
  '湖南省',
  '广东省',
  '广西壮族自治区',
  '海南省',
  '重庆市',
  '四川省',
  '贵州省',
  '云南省',
  '西藏自治区',
  '陕西省',
  '甘肃省',
  '青海省',
  '宁夏回族自治区',
  '新疆维吾尔自治区'
]

const LOCATIONS_WAGES = [
  {
    location: '北京市',
    wage: 119928
  },
  {
    location: '天津市',
    wage: 86305
  },
  {
    location: '河北省',
    wage: 55334
  },
  {
    location: '山西省',
    wage: 53705
  },
  {
    location: '内蒙古自治区',
    wage: 61067
  },
  {
    location: '辽宁省',
    wage: 56015
  },
  {
    location: '吉林省',
    wage: 56098
  },
  {
    location: '黑龙江省',
    wage: 52435
  },
  {
    location: '上海市',
    wage: 119935
  },
  {
    location: '江苏省',
    wage: 71574
  },
  {
    location: '浙江省',
    wage: 73326
  },
  {
    location: '安徽省',
    wage: 59102
  },
  {
    location: '福建省',
    wage: 61973
  },
  {
    location: '江西省',
    wage: 56136
  },
  {
    location: '山东省',
    wage: 62539
  },
  {
    location: '河南省',
    wage: 49505
  },
  {
    location: '湖北省',
    wage: 59831
  },
  {
    location: '湖南省',
    wage: 58241
  },
  {
    location: '广东省',
    wage: 72326
  },
  {
    location: '广西壮族自治区',
    wage: 57878
  },
  {
    location: '海南省',
    wage: 61663
  },
  {
    location: '重庆市',
    wage: 65545
  },
  {
    location: '四川省',
    wage: 63926
  },
  {
    location: '贵州省',
    wage: 66279
  },
  {
    location: '云南省',
    wage: 60450
  },
  {
    location: '西藏自治区',
    wage: 103232
  },
  {
    location: '陕西省',
    wage: 59637
  },
  {
    location: '甘肃省',
    wage: 57575
  },
  {
    location: '青海省',
    wage: 66589
  },
  {
    location: '宁夏回族自治区',
    wage: 65570
  },
  {
    location: '新疆维吾尔自治区',
    wage: 63739
  }
]

const DEFAULT_CALCULATION_FACTORS = [
  {
    internalId: '0',
    id: 'gender',
    label: '本人性别',
    type: 'picklist',
    value: '男',
    picklistId: '0'
  }, {
    internalId: '1',
    id: 'social-security-location',
    label: '社保所在地',
    type: 'picklist',
    value: '北京市',
    picklistId: '1'
  }, {
    internalId: '2',
    id: 'company-type',
    label: '任职单位',
    type: 'picklist',
    value: '城镇单位',
    picklistId: '2'
  }, {
    internalId: '3',
    id: 'start-date',
    label: '参加工作时间',
    type: 'picklistDate',
    value: '2000年01月',
    picklistId: '3'
  }, {
    internalId: '4',
    id: 'time-for-participation',
    label: '参保年数',
    type: 'picklistMulti',
    value: '0年0月',
    picklistId: '4'
  }, {
    internalId: '5',
    id: 'successive-length-of-service-by-date',
    label: '1992年12月31日之前的连续工龄',
    type: 'picklistMulti',
    value: '0年0月',
    picklistId: '5',
    annotations: '一般来说：\r\n在非公有制单位(私企、外企、个体户、⾃由职业等)的工作年限，不计⼊国家认可的连续⼯龄。在公有制单位(政府机关、事业单位、国有企业等)的⼯作年限，计⼊国家认可的连续工龄。',
    annotationIcon: 'question'
  }, {
    internalId: '6',
    id: 'age',
    label: '现在年龄（周岁）',
    type: 'picklist',
    value: '40',
    picklistId: '6'
  }, {
    internalId: '7',
    id: 'mandatory-age-for-retirement',
    label: '法定退休年龄（周岁）',
    type: 'picklist',
    value: '60',
    picklistId: '7'
  }, {
    internalId: '8',
    id: 'expected-retirement-age',
    label: '预期退休年龄（周岁）',
    type: 'picklist',
    value: '60',
    picklistId: '8'
  }, {
    internalId: '9',
    id: 'life-expectancy',
    label: '预期寿命（年龄）',
    type: 'picklist',
    value: '80',
    picklistId: '9'
  }, {
    internalId: '10',
    id: 'personal-salary-before-tax',
    label: '个人税前月收入',
    type: 'numeric',
    value: '',
    unit: '元',
    hint: '请输入税前收入'
  }, {
    internalId: '11',
    id: 'monthly-taxable-wage',
    label: '月度缴费工资',
    type: 'numeric',
    value: '',
    unit: '元',
    hint: '请输入缴费工资',
    annotations: '月缴费工资是指可以纳入缴纳社会保险费范围的工资性收入，按照现行行政策规定，缴费工资就是按国家统计部门规定列入工资总额统计范围内发放的⼯资。',
    annotationIcon: 'question'
  }, {
    internalId: '12',
    id: 'local-average-salary-last-year',
    label: '当地上年社会平均工资',
    type: 'constant',
    value: '',
    hint: '根据社保所在地自动获取',
    unit: '元/月'
  }, {
    internalId: '13',
    id: 'social-security-pension-account-balance',
    label: '社保养老个人帐户余额',
    type: 'numeric',
    value: '',
    hint: '请输入账户余额',
    unit: '元',
    annotations: '指您在社保局的个人账户余额，就像银行存款账户那样。\r\n查询⽅式：\r\n方式一：\r\n进⼊当地⼈社局官方，注册并查询养老金个人账户余额。\r\n⽅式二：\r\n安装社保查询类APP，从APP中查询社保养老金个人账户余额。\r\n方式三：\r\n估算,请点击本⾏下⾯的“估算”按钮即可。',
    annotationIcon: 'question'
  }, {
    internalId: '14',
    id: 'estimate',
    label: '估算',
    type: 'button',
    value: '生成“社保养老个人帐户余额”'
  }, {
    internalId: '15',
    id: 'company-will-provide-supplementary-pension',
    label: '单位是否提供企业年金',
    type: 'picklist',
    value: '是',
    picklistId: '10'
  }, {
    internalId: '16',
    id: 'target-pension-replacement-rate',
    label: '养老金替代率目标',
    type: 'numeric',
    value: '70',
    unit: '%'
  }, {
    internalId: '17',
    id: 'current-prepared-pension',
    label: '目前已准备的养老金',
    type: 'numeric',
    value: '0',
    unit: '万元'
  }, {
    internalId: '18',
    id: 'pension-investment-rate-of-return',
    label: '养老金投资收益率',
    type: 'numeric',
    value: '4.50',
    unit: '%'
  }, {
    internalId: '19',
    id: 'target-name',
    label: '填表人',
    type: 'string',
    value: '',
    hint: '姓名（呈现在测算报告中）'
  }
]

const PICKLIST_TYPES = [
  {
    internalId: '0',
    id: 'gender',
    options: [
      '男',
      '女'
    ]
  }, {
    internalId: '1',
    id: 'social-security-location',
    options: LOCATIONS
  }, {
    internalId: '2',
    id: 'company-type',
    options: [
      '城镇企业',
      '机关单位',
      '事业单位'
    ]
  }, {
    internalId: '3',
    id: 'start-date',
    startDate: '1900-1',
    endDate: '2100-12'
  }, {
    internalId: '4',
    id: 'time-for-participation',
    options: [Array.from(Array(51), (v, k) => (k + '年')), Array.from(Array(12), (v, k) => (k + '月'))]
  }, {
    internalId: '5',
    id: 'successive-length-of-service-by-date',
    options: [Array.from(Array(51), (v, k) => (k + '年')), Array.from(Array(12), (v, k) => (k + '月'))]
  }, {
    internalId: '6',
    id: 'age',
    options: Array.from(Array(49), (v, k) => k + 16)
  }, {
    internalId: '7',
    id: 'mandatory-age-for-retirement',
    options: Array.from(Array(31), (v, k) => k + 40)
  }, {
    internalId: '8',
    id: 'expected-retirement-age',
    options: Array.from(Array(26), (v, k) => k + 35)
  }, {
    internalId: '9',
    id: 'life-expectancy',
    options: Array.from(Array(51), (v, k) => k + 70)
  }, {
    internalId: '10',
    id: 'company-will-provide-supplementary-pension',
    options: [
      '是',
      '否'
    ]
  }
]

function getLocationWage (e) {
  for (var i = 0; i < e.length; i++) {
    if (e[i].value === LOCATIONS_WAGES[i].location) {
      return LOCATIONS_WAGES[i].wage
    }
  }
}

export default {
  DEFAULT_CALCULATION_FACTORS,
  PICKLIST_TYPES,
  getLocationWage
}
