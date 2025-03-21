import { router } from '@kit.ArkUI';
import { V2NIMError, V2NIMLoginOption, V2NIMLoginStatus } from '@nimsdk/base';
// import isNil from 'vendor/src/main/ets/vendor/lodash-es/isNil';
import { NimRepository } from '../model/NimRepository';
import { preferences } from '@kit.ArkData';
import BDHud, { BDHudClass, BDHudType } from '../tools/BDHudClass';

@Entry
@Component
struct Index {
  private loginCachePreferences: preferences.Preferences = preferences.getPreferencesSync(getContext(this).getApplicationContext(), {'name': 'loginCache'})
  @State userName: string = 'ywsd21004';
  @State password: string = '1e5b473930965d5c1cb8a7d07684abbf';
  @State hideHub: boolean = true
  @State loginOptionValue: string = '{"retryCount":3,"timeout":60000,"forceMode":false,"authType":0,"syncLevel":0}';
  private nimRepository: NimRepository = NimRepository.getInstance(getContext(this).getApplicationContext())

  build() {
    Stack() {
      Column() {
          Text('网易云信')
            .fontSize(22)
            .fontWeight(FontWeight.Bold)
            .margin({bottom: 60})
          TextInput({placeholder: '请输入账号', text: this.userName})
            .margin({bottom: 10, left: 15, right:15})
            .onChange((value) => {
                this.userName = value
            })
            .onAppear(async () => {
                this.userName = await this.loginCachePreferences.get("lastAccid", "") as string
            })
          TextInput({placeholder: '请输入密码', text: this.password})
            .margin({bottom: 25, left: 15, right:15})
            .onChange((value) => {
                this.password = value
            })
            .onAppear(async () => {
              this.password = await this.loginCachePreferences.get("lastToken", "") as string
            })

          Button('登录')
            .width(200)
            .height(50)
            .onClick(() => {

              this.loginAction()
            })
      }
      .width('100%')
      BDHud()
        .visibility(this.hideHub == false ? Visibility.Visible:Visibility.None)
    }
    .height('100%')
  }

  aboutToAppear(): void {

    this.nimRepository.nim.loginService.on("onLoginStatus", (status: V2NIMLoginStatus) => {

      if (status == V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINING) {
        console.log(`=== 登录中`)
      }

      if (status == V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGOUT) {
        console.log(`=== 未登录`)
      }

      if (status == V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED) {
        console.log(`=== 已登录`)
      }

      if (status == V2NIMLoginStatus.V2NIM_LOGIN_STATUS_UNLOGIN) {
        console.log(`=== 等待中`)
      }

    })

    this.nimRepository.nim.loginService.on("onAccountReady", (accountId: string) => {
        console.log(`=== ${accountId} 的数据库已经打开`)
    })

    setTimeout(() => {
      if (this.userName) {
        this.loginAction()
      }
    }, 80)

  }

  async loginAction() {
    this.hideHub = false
    try {

      let loginOption = JSON.parse(this.loginOptionValue) as V2NIMLoginOption

      await this.nimRepository.nim.loginService.login(this.userName, this.password, loginOption)
      const accid = this.nimRepository.nim.loginService.getLoginUser()
      console.log(`=== ${accid} 登录成功 ===`)
      this.hideHub = true
      this.loginCachePreferences.put("lastAccid", accid)
      this.loginCachePreferences.put("lastToken", this.password)
      this.loginCachePreferences.flush()
      router.pushUrl({
        url: 'pages/MainPage'
      })
    } catch (error) {
      this.hideHub = true
      console.log(`=== ${error}}`)
      AlertDialog.show(
        {
          title: '登录失败',
          message: processV2ErrorForPrint(error),
          autoCancel: true,
          alignment: DialogAlignment.Bottom,
          offset: { dx: 0, dy: -20 },
          gridCount: 3,
          confirm: {
            value: 'OK',
            action: () => {
              console.info('Button-clicking callback')
            }
          },
          cancel: () => {
            console.info('Closed callbacks')
          }
        }
      )
    }
  }
}

function processV2ErrorForPrint(err: V2NIMError): string {
  if (err instanceof Error) {
    let desc = `\n${err.name}\n code: ${err.code}\n message: "${err.message}"\n detail: ${err.detail ? JSON.stringify(err.detail) : ''}`
    if (err?.detail?.rawError) {
      desc += `\n rawError: ${err.detail.rawError.message}`
    }
    return desc
  } else {
    return `Caught an exception: ${err}`
  }
}