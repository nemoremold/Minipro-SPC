const EXPRESS_REPORT_FIELDS_DEFINITION = {
  sections: [
    [
      {
        label: '名字',
        value: ''
      }
    ],
    [
      {
        label: '退休养老金总缺口',
        value: ''
      },
      {
        label: '补充养老金计划准备年数',
        value: '10',
        options: [1, 3, 5, 10, 15, 20, 25, 30]
      },
      {
        label: '每年准备补充养老金所需金额',
        value: ''
      }
    ],
    [
      {
        label: '退休首年养老金月领金额',
        value: ''
      },
      {
        label: '社保基础养老金',
        value: ''
      },
      {
        label: '社保个人帐户养老金',
        value: ''
      },
      {
        label: '社保过渡性养老金',
        value: ''
      },
      {
        label: '企业年金',
        value: ''
      },
      {
        label: '养老金构成',
        value: []
      }
    ]
  ]
}

const CHART_OPTIONS = {
  backgroundColor: '#fff',
  color: ['#5e65e3', '#f36837', '#5e98e3', '#f9df94', '#0f0'],
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: '50%',
    right: '10px',
    y: 'middle',
    data: ['社保基础养老金', '社保个人帐户养老金', '社保过渡性养老金', '企业年金'],
    textStyle: {
      color: '#666',
      fontWeight: 'normal'
    }
  },
  series: [{
    // left: '10px',
    // right: '50%',
    label: {
      show: false
    },
    type: 'pie',
    // roseType: 'angle',
    radius: '40%',
    center: ['25%', '50%'],
    data: [
      {
        value: 1,
        name: '社保基础养老金'
      }, {
        value: 1,
        name: '社保个人帐户养老金'
      }, {
        value: 1,
        name: '社保过渡性养老金'
      }, {
        value: 1,
        name: '企业年金'
      }
    ],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 2, 2, 0.3)'
      }
    }
  }]
}

export default {
  EXPRESS_REPORT_FIELDS_DEFINITION,
  CHART_OPTIONS
}
