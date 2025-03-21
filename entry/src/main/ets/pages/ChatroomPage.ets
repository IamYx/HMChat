import { V2NIMError } from '@nimsdk/base'
import { NimRepository } from '../model/NimRepository'
import { router } from '@kit.ArkUI'
import { V2NIMChatroomEnterParams,
  V2NIMChatroomInfo,
  V2NIMChatroomKickedInfo,
  V2NIMChatroomMessage,
  V2NIMChatroomStatus,
  V2NIMChatroomClient,
  V2NIMSendChatroomMessageResult,
  V2NIMSendChatroomMessageParams} from '@nimsdk/chatroom'
import { print } from '@kit.BasicServicesKit'

@Entry
@Component
export default struct ChatroomPage {

  private nimRepository: NimRepository = NimRepository.getInstance(getContext(this).getApplicationContext())
  private  chatroom: V2NIMChatroomClient = V2NIMChatroomClient.newInstance(getContext(this), {
    appkey: "4727023efa991d31d61b3b32e819bd5b",
    // appkey: "437189f11a42eb8a5b0b56cba9e20fe4",
    customClientType: 10
  })

  @State chatroomName: string = "聊天室名称"
  @State chatroomAnnouncement: string = "聊天室公告"
  @State chatroomExt: string = "聊天室扩展字段"

  build() {

    Column() {
      Text('聊天室')
        .fontWeight(FontWeight.Bold)
        .fontSize(20)
        .margin({bottom: 20})

      Column() {
        Text(this.chatroomName)
        Text(this.chatroomAnnouncement)
          .margin({left: 5})
        Text(this.chatroomExt)
          .margin({left: 5})
      }.margin({ bottom: 20 })

      Button('加入聊天室')
        .width(200)
        .height(50)
        .onClick(async () => {
          try {
            const address = await this.nimRepository.nim.loginService.getChatroomLinkAddress('9601730547')
            console.log(`=== ${address}`)
            const enterParams: V2NIMChatroomEnterParams = {
              accountId: 'ceshi8',
              token: '123456',
              linkProvider: () => {
                return Promise.resolve(address);
              }
            }
            await this.chatroom.enter('9601730547', enterParams)
            console.log(`=== 加入成功`)
            const info = this.chatroom.getChatroomInfo()
            this.chatroomName = info?.roomName ?? "无"
            this.chatroomAnnouncement = info?.announcement ?? "无"
            this.chatroomExt = info?.serverExtension ?? "无"
          } catch (error) {
            console.log(`=== ${error}`)
          }
        })

      Button('获取聊天室信息')
        .margin({top:10})
        .width(200)
        .height(50)
        .onClick(async () => {
          const info = this.chatroom.getChatroomInfo()
          this.chatroomName = info?.roomName ?? "无"
          this.chatroomAnnouncement = info?.announcement ?? "无"
          this.chatroomExt = info?.serverExtension ?? "无"
        })

      Button('发送聊天室消息')
        .margin({top:10})
        .width(200)
        .height(50)
        .onClick(async () => {

          try {
            const msg: V2NIMChatroomMessage = this.chatroom.messageCreator.createTextMessage('hello world')
            const params: V2NIMSendChatroomMessageParams  = {

            }
            // 发送进度回调，如上传附件时由该 cb 回调
            const progressCb = (percentage: number)  => {
              console.info(`onUploadProgress: ${JSON.stringify(percentage)}`)
            }
            // send
            const msgRes: V2NIMSendChatroomMessageResult = await this.chatroom.chatroomService.sendMessage(msg, params, progressCb)
            console.log(`=== 消息发送成功`)
          } catch (error) {
            console.log(`=== 消息发送失败 ${error}`)
          }

        })

      Button('退出聊天室')
        .margin({top:10})
        .width(200)
        .height(50)
        .onClick(async () => {
          this.chatroom.exit()
        })

      Button('销毁聊天室')
        .margin({top:10})
        .width(200)
        .height(50)
        .onClick(async () => {
           V2NIMChatroomClient.destroyInstance(this.chatroom.id)
        })

    }.onAppear(() => {

      this.chatroom.on("onChatroomStatus",  (status: V2NIMChatroomStatus, err?: V2NIMError) => {
        console.log(`=== 聊天室链接状态 ${status}`)
      })
      this.chatroom.on("onChatroomEntered",  ()=> {
        console.log(`=== 聊天室加入成功`)
      })
      this.chatroom.on("onChatroomExited", (err?: V2NIMError) => {
        console.log(`=== 聊天室退出 ${err}`)
      })
      this.chatroom.on("onChatroomKicked", (kickedInfo: V2NIMChatroomKickedInfo)=> {
        console.log(`=== 聊天室被踢出 ${kickedInfo}`)
      })
      this.chatroom.chatroomService.on('onReceiveMessages', (messages: V2NIMChatroomMessage[]) => {
        for (let i = 0; i < messages.length; i++) {
          let message = messages[i]
          console.log(`=== 聊天室收到消息 ${message.text}`)

        }

        const info = this.chatroom.getChatroomInfo()
        console.log(`=== ${info?.serverExtension}`)

      })

      this.chatroom.chatroomService.on('onChatroomInfoUpdated', (chatroomInfo: V2NIMChatroomInfo) => {
        const info = this.chatroom.getChatroomInfo()
        this.chatroomName = info?.roomName ?? "无"
        this.chatroomAnnouncement = info?.announcement ?? "无"
        this.chatroomExt = info?.serverExtension ?? "无"
      })

    })

  }

}