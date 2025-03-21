import { V2NIMError } from '@nimsdk/base'
import { NimRepository } from '../model/NimRepository'
import { router } from '@kit.ArkUI'

@Entry
@Component
export default struct MinePage {

  @State userName: String = '无'
  @State userAvatar: String = ''
  private nimRepository: NimRepository = NimRepository.getInstance(getContext(this).getApplicationContext())

  build() {

    Column() {
      Text('个人页面')
        .fontWeight(FontWeight.Bold)
        .fontSize(20)
        .margin({bottom: 20})

      Row() {
        Image(`${this.userAvatar}`)
          .width(60)
          .height(60)
          .margin({right: 10})
          .borderRadius(10)

        Text(`用户名：${this.userName}`)
      }.margin({ bottom: 20 })

      Button('登出')
        .width(200)
        .height(50)
        .onClick(() => {
            this.logOut()
        })
    }.onAppear(() => {
      console.log(`=== 123`)
      this.getUserInfo()
    })

  }

  async getUserInfo()  {

    try {
      const userService = this.nimRepository.nim.userService!// Demo启用user模块，userService不为空
      let accid = this.nimRepository.nim.loginService.getLoginUser()
      const users = await userService.getUserList([accid])
      let user = users[0]
      console.log(`=== ${user.name}`)
      this.userName = user.name ?? user.accountId
      this.userAvatar = user.avatar ?? ''
    } catch (error) {
      console.log(`=== ${processV2ErrorForPrint(error)}`)
    }

  }

  logOut() {
    try {

      this.nimRepository.nim.loginService.logout()

      router.back()

    } catch (error) {

      AlertDialog.show(
        {
          title: '登出失败',
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