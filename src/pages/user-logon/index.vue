<template>
  <view style="background: #F0F0F0;">
    <view style="height: 150px; width: 100%; margin: 0; background: #2ebeb8;">
      <image v-if="bannerSrc" :src="bannerSrc" mode="aspectFill" style="height: 150px; width: 100%;" />
    </view>

    <view style="background: white; margin: 0 0 6px 0;">
      <van-cell>
        <view slot="title" style="font-size: 10pt;">
          <span>本页信息用于</span>
          <span style="color: #2ebeb8;">《养老金测算报告》</span>
          <span>的签名档</span>
        </view>
      </van-cell>
    </view>

    <view style="background: white; margin: 6px 0;">
      <van-panel
      >
        <view slot="header">
          <van-cell>
            <view slot="title" style="font-size: 12pt;">
              <span style="color: #56bab7;">{{ '| ' }}</span>
              <span style="color: #479f99;">账号信息</span>
            </view>
          </van-cell>
        </view>
        <view>
          <van-field
            inputAlign="right"
            :value="userinfo.name"
            placeholder="请输入姓名"
            clearable
            center="true"
            @change="fieldChange($event, 'name')"
            :border="false"
          >
            <view slot="label">
              <span>{{ '姓名 ' }}</span>
              <span style="color: red;">*</span>
            </view>
          </van-field>
          <van-field
            inputAlign="right"
            :value="userinfo.phone"
            placeholder="请输入手机号"
            clearable
            center="true"
            @change="fieldChange($event, 'phone')"
            type="number"
            :border="false"
          >
            <view slot="label">
              <span>{{ '手机号 ' }}</span>
              <span style="color: red;">*</span>
            </view>
          </van-field>
          <van-field
            inputAlign="right"
            :value="userinfo.verificationCode"
            placeholder="请输入验证码"
            clearable
            center="true"
            @change="fieldChange($event, 'verificationCode')"
            type="number"
            use-button-slot
            :border="false"
          >
            <view slot="label">
              <span>{{ '验证码 ' }}</span>
              <span style="color: red;">*</span>
            </view>
            <van-button v-if="vcodeSent == false" slot="button" size="small" type="primary" plain="true" @click="sendVerificationCode">发送验证码</van-button>
            <van-button v-else slot="button" size="small" type="primary" plain="true" disabled>{{ '重新发送 ' + countDown + ' 秒' }}</van-button>
          </van-field>
        </view>
      </van-panel>
    </view>

    <view style="background: white; margin: 6px 0;">
      <van-panel
      >
        <view slot="header">
          <van-cell>
            <view slot="title" style="font-size: 12pt;">
              <span style="color: #56bab7;">{{ '| ' }}</span>
              <span style="color: #479f99;">职业信息</span>
            </view>
          </van-cell>
        </view>
        <view>
          <van-field
            inputAlign="right"
            :value="userinfo.location"
            placeholder="服务区域"
            clearable
            center="true"
            @change="fieldChange($event, 'location')"
            :border="false"
          >
            <view slot="label">
              <span>{{ '服务区域 ' }}</span>
              <span style="color: red;">*</span>
            </view>
          </van-field>
          <van-field
            inputAlign="right"
            :value="userinfo.institution"
            placeholder="如：XX人寿、XX银行"
            clearable
            center="true"
            @change="fieldChange($event, 'institution')"
            :border="false"
          >
            <view slot="label">
              <span>{{ '所在机构 ' }}</span>
              <span style="color: red;">*</span>
            </view>
          </van-field>
          <van-field
            inputAlign="right"
            :value="userinfo.branch"
            placeholder="如：XX分公司、XX分行"
            clearable
            center="true"
            @change="fieldChange($event, 'branch')"
            :border="false"
          >
            <view slot="label">
              <span>{{ '分支机构 ' }}</span>
              <span style="color: red;">*</span>
            </view>
          </van-field>
          <van-field
            inputAlign="right"
            :value="userinfo.position"
            placeholder="如：客户经理、理财经理"
            clearable
            center="true"
            @change="fieldChange($event, 'position')"
            :border="false"
          >
            <view slot="label">
              <span>{{ '职位名称 ' }}</span>
              <span style="color: red;">*</span>
            </view>
          </van-field>
        </view>
      </van-panel>
    </view>

    <view style="margin: 6px; font-size: 9pt;">
      <span>注：以上标注</span>
      <span style="color: red;">{{ ' * ' }}</span>
      <span>的信息只有</span>
      <span style="color: red;">{{ ' 全部填写完整 ' }}</span>
      <span>后才能生成专业版养老金报告。</span>
    </view>

    <view style="margin: 6px; font-size: 13pt; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
      <view style="font-size: 13pt; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;" @click="agreeToTerms">
        <van-icon v-if="userinfo.agreeToTermsOfService == true" name="checked" style="color: #2ebeb8; display: flex; flex-direction: row; justify-content: center; align-items: center;" />
        <van-icon v-else name="checked" style="color: #B8B8B8; display: flex; flex-direction: row; justify-content: center; align-items: center;" />
        <span style="font-size: 9pt; margin: 0 0 0 3px;">{{ '我已经阅读并同意' }}</span>
      </view>
      <span style="color: #0066FF;font-size: 9pt;" @click="navigateToTermsOfService">{{ '《用户协议》' }}</span>
    </view>

    <view style="margin: 6px 5px;">
      <van-button v-if="userinfo.agreeToTermsOfService == true" @click="register" size="large" type="primary">
        {{ '注 册' }}
      </van-button>
      <van-button v-else disabled size="large" type="primary">
        {{ '注 册' }}
      </van-button>
    </view>

    <view style="height: 6px; margin: 6px 0;"></view>
    <van-toast id="van-toast" />
  </view>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
import dataFormatter from '../../utils/dataFormatter'

export default {
  data () {
    return {
      userinfo: {
        name: String,
        phone: String,
        verificationCode: String,
        location: String,
        institution: String,
        branch: String,
        position: String,
        agreeToTermsOfService: false,
        vcode: '',
        vcodeTime: []
      },
      bannerSrc: '/static/images/banner-untitled.png',
      vcodeSent: false,
      countDown: 60,
      interval: null,
      proxy: null
    }
  },

  onLoad (options) {
    this.userinfo = {
      name: '',
      phone: '',
      verificationCode: '',
      location: '',
      institution: '',
      branch: '',
      position: '',
      agreeToTermsOfService: false,
      vcode: '',
      vcodeTime: ''
    }
    this.vcodeSent = false
    this.countDown = 60
    this.proxy = ''

    if (options.proxy != null && options.proxy !== '') {
      this.proxy = options.proxy
    }
    console.log(options)
  },

  methods: {
    checkPhoneNumber () {
      return true
    },

    sendVerificationCode () {
      if (this.checkPhoneNumber()) {
        var context = this
        wx.request({
          url: 'https://miniprogram.xluyun.com/user/sendSMSVerification',
          data: {
            phone: parseInt(this.userinfo.phone)
          },
          method: 'GET',
          success: function (res) {
            if (res.data.status === 'error') {
              wx.showModal({
                title: '温馨提示',
                showCancel: false,
                content: res.data.result + '！'
              })
            } else if (res.data.status === 'duplicate') {
              wx.showModal({
                title: '温馨提示',
                showCancel: false,
                content: '该手机号已注册！'
              })
            } else {
              Toast('验证码已发送')
              context.vcodeSent = true
              context.interval = setInterval(function () {
                let sec = context.countDown - 1
                if (sec === 0) {
                  context.countDown = 60
                  context.vcodeSent = false
                }
                context.countDown = context.countDown - 1
              }, 1000)
              context.userinfo.vcode = res.data.result
              let formatter = dataFormatter.formatTime(new Date()).split(':')
              context.userinfo.vcodeTime = [formatter[1], formatter[2]]
            }
          }
        })
      }
    },

    fieldChange (e, id) {
      let value = e.mp.detail
      if (id === 'name') {
        this.userinfo.name = value
      } else if (id === 'phone') {
        this.userinfo.phone = value
      } else if (id === 'verificationCode') {
        this.userinfo.verificationCode = value
      } else if (id === 'location') {
        this.userinfo.location = value
      } else if (id === 'institution') {
        this.userinfo.institution = value
      } else if (id === 'branch') {
        this.userinfo.branch = value
      } else if (id === 'position') {
        this.userinfo.position = value
      }
    },

    agreeToTerms () {
      this.userinfo.agreeToTermsOfService ^= true
    },

    navigateToTermsOfService () {
      wx.navigateTo({
        url: '../terms-of-service/main'
      })
    },

    register () {
      var context = this
      if (this.userinfo.name == null || this.userinfo.name === '') {
        Toast('请输入姓名！')
        return
      } else if (this.userinfo.phone == null || this.userinfo.phone === '') {
        Toast('请输入手机号！')
        return
      } else if (this.userinfo.verificationCode == null || this.userinfo.verificationCode === '') {
        Toast('请输入验证码！')
        return
      } else if (this.userinfo.location == null || this.userinfo.location === '') {
        Toast('请选择服务区域！')
        return
      } else if (this.userinfo.institution == null || this.userinfo.institution === '') {
        Toast('请输入所在机构！')
        return
      } else if (this.userinfo.branch == null || this.userinfo.branch === '') {
        Toast('请输入分支机构！')
        return
      } else if (this.userinfo.position == null || this.userinfo.position === '') {
        Toast('请输入职位名称！')
        return
      }

      if (this.userinfo.vcode != null && this.userinfo.vcode !== '' && (parseInt(this.userinfo.verificationCode) === parseInt(this.userinfo.vcode) || this.userinfo.verificationCode === this.userinfo.vcode)) {
        let formatter = dataFormatter.formatTime(new Date()).split(':')
        let minute = parseInt(formatter[1]) - parseInt(this.userinfo.vcodeTime[0])
        let second = parseInt(formatter[2]) - parseInt(this.userinfo.vcodeTime[1])
        if (minute < 0) {
          minute += 60
        }
        if (minute * 60 + second <= 180) {
          wx.request({
            url: 'https://miniprogram.xluyun.com/user/updateUserInfo',
            data: {
              user: {
                wechatId: this.globalData.userInfo.wechatId,
                name: this.userinfo.name,
                phone: this.userinfo.phone,
                serveRegion: this.userinfo.location,
                enterprise: this.userinfo.institution,
                enterpriseBranch: this.userinfo.branch,
                title: this.userinfo.position
              },
              code: parseInt(this.userinfo.verificationCode)
            },
            method: 'POST',
            success: function (res) {
              console.log(context.globalData.userInfo.wechatId + ' ' + context.userinfo.name + ' ' + context.userinfo.phone + ' ' + context.userinfo.location + ' ' + context.userinfo.institution + ' ' + context.userinfo.branch + ' ' + context.userinfo.position)
              console.log(res)
              if (context.proxy === 'info') {
                wx.showModal({
                  title: '温馨提示',
                  showCancel: false,
                  content: '注册成功！',
                  success: function (res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../user-center/main',
                        success: function () {
                          wx.navigateTo({
                            url: '../userinfo-setting/main'
                          })
                        }
                      })
                    }
                  }
                })
              } else if (context.proxy === 'report') {
                wx.showModal({
                  title: '温馨提示',
                  showCancel: false,
                  content: '注册成功！详细报告暂未开放，将转到用户中心页面！',
                  success: function (res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../user-center/main'
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            showCancel: false,
            content: '验证码过期，请重新获取！'
          })
        }
      } else {
        wx.showModal({
          title: '温馨提示',
          showCancel: false,
          content: '验证码错误！'
        })
      }
    }
  }
}
</script>

<style>
page {
  background: #F0F0F0;
  height: 100%;
  width: 100%;
}
</style>
