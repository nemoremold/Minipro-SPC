var LOCATIONS = [
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

var LOCATIONS_WAGES = [
  {
    location: '北京市',
    wage: 8467 * 12
  },
  {
    location: '天津市',
    wage: 5607 * 12
  },
  {
    location: '河北省',
    wage: 5438.83 * 12
  },
  {
    location: '山西省',
    wage: 5129 * 12
  },
  {
    location: '内蒙古自治区',
    wage: 4645 * 12
  },
  {
    location: '辽宁省',
    wage: 5096.08 * 12
  },
  {
    location: '吉林省',
    wage: 4860.9 * 12
  },
  {
    location: '黑龙江省',
    wage: 4645 * 12
  },
  {
    location: '上海市',
    wage: 7132 * 12
  },
  {
    location: '江苏省',
    wage: 6645 * 12
  },
  {
    location: '浙江省',
    wage: 5084 * 12
  },
  {
    location: '安徽省',
    wage: 5661 * 12
  },
  {
    location: '福建省',
    wage: 5752 * 12
  },
  {
    location: '江西省',
    wage: 5256 * 12
  },
  {
    location: '山东省',
    wage: 5775.41 * 12
  },
  {
    location: '河南省',
    wage: 5438.83 * 12
  },
  {
    location: '湖北省',
    wage: 4658.58 * 12
  },
  {
    location: '湖南省',
    wage: 5500 * 12
  },
  {
    location: '广东省',
    wage: 6668 * 12
  },
  {
    location: '广西壮族自治区',
    wage: 5538 * 12
  },
  {
    location: '海南省',
    wage: 5755 * 12
  },
  {
    location: '重庆市',
    wage: 6106 * 12
  },
  {
    location: '四川省',
    wage: 5969 * 12
  },
  {
    location: '贵州省',
    wage: 5379 * 12
  },
  {
    location: '云南省',
    wage: 6126 * 12
  },
  {
    location: '西藏自治区',
    wage: 7587 * 12
  },
  {
    location: '陕西省',
    wage: 5619 * 12
  },
  {
    location: '甘肃省',
    wage: 5281.17 * 12
  },
  {
    location: '青海省',
    wage: 6377 * 12
  },
  {
    location: '宁夏回族自治区',
    wage: 6064.9 * 12
  },
  {
    location: '新疆维吾尔自治区',
    wage: 5032 * 12
  }
]

function getLocationWage (location) {
  for (var i = 0; i < LOCATIONS_WAGES.length; i++) {
    if (location === LOCATIONS_WAGES[i].location) {
      return parseInt(LOCATIONS_WAGES[i].wage / 12)
    }
  }
}

function setLocationWages (wages) {
  LOCATIONS_WAGES = wages
  LOCATIONS = []
  for (var i = 0; i < wages.length; ++i) {
    LOCATIONS[i] = wages[i].location
  }
}

function getLocations () {
  return LOCATIONS
}

function getLocation (index) {
  return LOCATIONS[index]
}

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
    value: '城镇企业',
    picklistId: '2',
    annotations: '机关单位：国家为行使其职能而设立的各种机构，是专司国家权力和国家管理职能的组织。\r\n事业单位：由政府利用国有资产设立的，从事教育、科技、文化、卫生等活动的社会服务组织。\r\n城镇企业：城镇私营企业是指注册地点在城镇（而非农村）设立的私营企业,除乡村集体企业之外的各种行业、各种组织形式的集体企业均为城镇集体企业。\r\n其中，机关单位和事业单位从2014年10月1号起实行企事业单位养老金并轨改革，与企业员工使用同样的标准缴费，用同样的标准计发养老金。'
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
    value: '0年0个月',
    picklistId: '4'
  }, {
    internalId: '5',
    id: 'successive-length-of-service-by-date',
    label: '1992年12月31日之前的连续工龄',
    type: 'picklistMulti',
    value: '0年0个月',
    picklistId: '5',
    annotations: '一般来说：\r\n在非公有制单位(私企、外企、个体户、⾃由职业等)的工作年限，不计⼊国家认可的连续⼯龄。在公有制单位(政府机关、事业单位、国有企业等)的⼯作年限，计⼊国家认可的连续工龄。',
    annotationIcon: 'question'
  }, {
    internalId: '6',
    id: 'age',
    label: '现在年龄',
    type: 'picklist',
    value: '40',
    picklistId: '6'
  }, {
    internalId: '7',
    id: 'mandatory-age-for-retirement',
    label: '法定退休年龄',
    type: 'picklist',
    value: '60',
    picklistId: '7'
  }, {
    internalId: '8',
    id: 'expected-retirement-age',
    label: '预期退休年龄',
    type: 'picklist',
    value: '60',
    picklistId: '8'
  }, {
    internalId: '9',
    id: 'life-expectancy',
    label: '预期寿命',
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
    annotations: '月缴费工资是指可以纳入缴纳社会保险费范围的工资性收入，按照现行行政策规定，缴费工资就是按国家统计部门规定列入工资总额统计范围内发放的⼯资。缴费基数可在支付宝等APP上查询。',
    annotationIcon: 'question'
  }, {
    internalId: '12',
    id: 'local-average-salary-last-year',
    label: '当地上年社会平均工资',
    type: 'constant',
    value: getLocationWage('北京市'),
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
    annotations: '指您在社保局的个人账户余额，就像银行存款账户那样。\r\n查询⽅式：\r\n方式一：\r\n进⼊当地⼈社局官方，注册并查询养老金个人账户余额。\r\n⽅式二：\r\n打开支付宝APP—城市服务—社保—社保查询—输入社保编号及身份证号即可查询。\r\n方式三：\r\n估算,请点击下方右侧的“估算”按钮即可（参保年数需大于0）。',
    annotationIcon: 'question'
  }, {
    internalId: '14',
    id: 'estimate',
    label: '估算',
    type: 'button',
    value: '4108.03',
    notifications: '请输入参保年数及月度缴费工资'
  }, {
    internalId: '15',
    id: 'company-will-provide-supplementary-pension',
    label: '单位是否提供企业年金',
    type: 'picklist',
    value: '否',
    picklistId: '10'
  }, {
    internalId: '16',
    id: 'target-pension-replacement-rate',
    label: '养老金替代率目标',
    type: 'numeric',
    value: '70',
    hint: '请输入目标替代率',
    unit: '%'
  }, {
    internalId: '17',
    id: 'current-prepared-pension',
    label: '目前已准备的养老金',
    type: 'numeric',
    value: '0',
    hint: '请输入已准备的养老金',
    unit: '元'
  }, {
    internalId: '18',
    id: 'pension-investment-rate-of-return',
    label: '养老金投资收益率',
    type: 'numeric',
    value: '3',
    hint: '请输入投资收益率',
    unit: '%'
  }, {
    internalId: '19',
    id: 'target-name',
    label: '填表人',
    type: 'string',
    value: '',
    hint: '姓名（呈现在测算报告中）'
  }, {
    internalId: '20',
    id: 'supplementary-pension',
    label: '企业年金',
    type: 'numeric',
    hint: '请输入企业年金',
    unit: '元'
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
    options: [Array.from(Array(51), (v, k) => (k + '年')), Array.from(Array(12), (v, k) => (k + '个月'))]
  }, {
    internalId: '5',
    id: 'successive-length-of-service-by-date',
    options: [Array.from(Array(51), (v, k) => (k + '年')), Array.from(Array(12), (v, k) => (k + '个月'))]
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

export default {
  DEFAULT_CALCULATION_FACTORS,
  PICKLIST_TYPES,
  getLocationWage,
  setLocationWages,
  getLocation,
  getLocations
}
