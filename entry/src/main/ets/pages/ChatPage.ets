import { display, promptAction, router, window } from '@kit.ArkUI'
import { V2NIMConversation, V2NIMMessage,
    V2NIMMessageImageAttachment,
    V2NIMMessageListOption,
    V2NIMMessageSendingState,
    V2NIMMessageType,
    V2NIMSendMessageParams,
    V2NIMSendMessageResult } from '@nimsdk/base'
import { NimRepository } from '../model/NimRepository'
import picker from '@ohos.file.picker'
import { data } from '@kit.TelephonyKit'
import { ErrorCode } from '@ohos.ability.errorCode'
import { print } from '@kit.BasicServicesKit'
import { it } from '@ohos/hypium'
import { abilityAccessCtrl, common } from '@kit.AbilityKit'
import { photoAccessHelper } from '@kit.MediaLibraryKit'
import fs from '@ohos.file.fs'
import { http } from '@kit.NetworkKit'
import inputMethod from '@ohos.inputMethod';
import { KeyboardAvoidMode } from '@ohos.arkui.UIContext';

@Entry
@Component
export default struct ChatPage {
    @State userInput: string = ''  // 新增输入框绑定变量
    private inputMethodController = inputMethod.getController()

    @State paramsFromIndex: object = router.getParams()
    @State messages: Array<V2NIMMessage> = []
    private nimRepository: NimRepository = NimRepository.getInstance(getContext(this).getApplicationContext())
    private conversationIdT?: string
    private sending: boolean = false
    private numText = 0
    private lastMsg?: V2NIMMessage

    private appContext: common.Context = getContext(this);
    private atManager = abilityAccessCtrl.createAtManager();
    private scroller: Scroller = new Scroller();
    @State keyboardHeight: number = 0


    getUserName(a: String) : String {

        let name = a

        const conversationId: string = this.paramsFromIndex['conversationId']
        if (conversationId) {
            name = conversationId
            this.conversationIdT = conversationId
        }

        return name
    }

    build() {

        Column() {
            Row() {

                Text('返回')
                    .fontSize(18)
                    .width('20%')
                    .height('100%')
                    .margin({left: 10, bottom:10})
                    .onClick(() => {
                        router.back()
                    })

                Text(`${this.getUserName('默认值')}`)
                    .fontWeight(FontWeight.Bold)
                    .fontSize(20)
                    .margin({ bottom: 20 })
                    .textAlign(TextAlign.Center)
                    .align(Alignment.Center)
                    .width('60%')
                    .height('100%')
            }
            .width('100%')
            .height('8%')

            List({ scroller: this.scroller }) {
                ForEach(this.messages, (item: V2NIMMessage) => {
                    ListItem() {
                        Column() {
                            Text(`发送者：{${item.senderId}}`)
                                .margin({left: 10, right: 10})
                                .foregroundColor(Color.Pink)
                            if (item.messageType == V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT) {
                                Row() {
                                    Text(`${item.localExtension ?? item.text ?? '没有text'}`)
                                        .margin({top: 5, left: 10, right: 10})
                                }
                            } else if (item.messageType == V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE) {
                                Image(`${this.getImageUrl(item)}`)
                                    .width(300)
                                    .height(300)
                                    .margin({left: 10, right: 10, top:5, bottom:5})
                                    .borderRadius(10)
                            } else if (item.messageType == V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO) {
                                Text(`[语音消息]`)
                                    .margin({left:10, right:10, top:5, bottom:5})
                            } else if (item.messageType == V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO) {
                                Text(`[视频消息]`)
                                    .margin({left:10, right:10, top:5, bottom:5})
                            } else if (item.messageType == V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE) {
                                Text(`[文件消息]`)
                                    .margin({left:10, right:10, top:5, bottom:5})
                            } else if (item.messageType == V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM) {
                                Text(`[自定义消息]`)
                                    .margin({left:10, right:10, top:5, bottom:5})
                            } else if (item.messageType == V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL) {
                                Text(`[话单消息]`)
                                    .margin({left:10, right:10, top:5, bottom:5})
                            } else {
                                Text(`[其他消息]`)
                                    .margin({left:10, right:10, top:5, bottom:5})
                            }

                            Text(this.getMessageSendingStatus(item.sendingState))
                                .margin({left: 10, right: 10, top: 5})
                                .foregroundColor(Color.Green)
                        }.width('100%')
                        .alignItems(item.isSelf ? HorizontalAlign.End : HorizontalAlign.Start)
                        .onClick(async ()=> {
                            this.inputMethodController.hideTextInput()
                            try {
                                //更新消息
                                // const newMessage = await this.nimRepository.nim.messageService?.updateMessageLocalExtension(item, "123")
                                // console.log(`=== 更新成功`)
                                //
                                // this.getMessages()
                                //删除消息
                                // this.nimRepository.nim.messageService?.deleteMessage(item, '', false)
                                // this.getMessages()
                                //转发消息
                                // const newMessage = this.nimRepository.nim.messageCreator.createForwardMessage(item)
                                // const conversationId: string = this.paramsFromIndex['conversationId']
                                // const res = await this.nimRepository.nim.messageService?.sendMessage(newMessage, conversationId)
                                // this.getMessages()

                                //保存图片消息图片
                                if (item.messageType == V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE) {
                                    // 申请权限并保存图片到图库
                                    try {
                                        // 申请相册管理模块权限'ohos.permission.WRITE_IMAGEVIDEO'
                                        this.atManager.requestPermissionsFromUser(this.appContext, (["ohos.permission.WRITE_IMAGEVIDEO"])).then(async () => {
                                            // 权限申请成功，保存到图库
                                            let context = getContext();
                                            // 获取相册管理模块的实例，用于访问和修改相册中的媒体文件
                                            let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);
                                            // onClick触发后10秒内通过createAsset接口创建图片文件，10秒后createAsset权限收回
                                            let uri = await phAccessHelper.createAsset(photoAccessHelper.PhotoType.IMAGE, 'jpg');
                                            // 创建媒体文件
                                            console.info('createAsset successfully, uri: ' + uri);
                                            let file = fs.openSync(uri, fs.OpenMode.READ_WRITE || fs.OpenMode.CREATE)
                                            let totalSize = 0;
                                            let httpRequest = http.createHttp();
                                            httpRequest.on("dataReceive", (data: ArrayBuffer) => {
                                                let writeLen = fs.writeSync(file.fd, data);
                                                totalSize = totalSize + writeLen;
                                            });
                                            httpRequest.requestInStream('https://developer.huawei.com/allianceCmsResource/resource/HUAWEI_Developer_VUE/images/homeNew/next-pc.png', {
                                                method: http.RequestMethod.GET,
                                                connectTimeout: 3000,
                                            }, httpCode => {
                                                console.info('requestInStream HTTP CODE is', httpCode)
                                            })
                                            httpRequest.on("dataEnd", () => {
                                                fs.close(file);
                                                promptAction.showDialog({
                                                    title: "下载图片结束，并保存至相册",
                                                    message: `图片大小:${totalSize}字节`
                                                })
                                            })
                                        })
                                    } catch (err) {
                                        console.error(`requestPermissionsFromUser call Failed! error: ${err.code}`);
                                    }
                                }

                            } catch (error) {
                                console.log(`=== ${error}`)
                            }
                        })
                    }
                    .margin({bottom: 40})
                })
            }
            .height(`82%`)
            .onClick(() => {
                this.inputMethodController.hideTextInput()
            })

            Row() {
                TextInput({ placeholder: '输入消息内容', text: `${this.userInput}` })  // 将placeholder移至构造函数
                    .height(40)
                    .width('70%')
                    .margin({ right: 10 })
                    .enterKeyType(EnterKeyType.Send)
                    .onChange((value: string) => {
                        this.userInput = value
                    })
                    .onSubmit(() => {  // 添加回车事件监听
                        this.sendTextMessage()
                    })

                Text(`发送消息`)
                    .width('20%')
                    .onClick(()=> {
                        if (this.sending == false && this.userInput) {
                            this.sendTextMessage()
                        }
                    })
            }.height('8%')

        }.height(`${100 - 0}%`)
        .onClick(() => {
            this.inputMethodController.hideTextInput()
        })
        .onAppear(() => {

            // 监听键盘高度变化
            window.getLastWindow(getContext(this)).then(currentWindow => {
                if (!currentWindow) return;

                const uiContext = currentWindow.getUIContext();
                uiContext.setKeyboardAvoidMode(KeyboardAvoidMode.RESIZE);

                currentWindow.on('avoidAreaChange', data => {
                    if (data.type === window.AvoidAreaType.TYPE_KEYBOARD) {
                        const displayObj: display.Display = display.getDefaultDisplaySync(); // [1](@ref)
                        const screenHeight: number = displayObj.height;
                        this.keyboardHeight = (data.area.bottomRect.height / displayObj.height) * 100
                        console.log(`=== 键盘弹出 ${this.keyboardHeight}`)// 获取键盘高度[3,5](@ref)
                    }
                    this.scroller.scrollEdge(Edge.Bottom)
                })
            })

            this.getMessages()
            this.nimRepository.nim.messageService?.on("onReceiveMessages",  (messages: V2NIMMessage[])=> {
                for (let index = 0; index < messages.length; index++) {
                    const element = messages[index]
                    this.messages.push(element)
                }
                this.scroller.scrollEdge(Edge.Bottom)
            })
            this.nimRepository.nim.messageService?.on("onSendMessage", (message: V2NIMMessage)=> {
                if (message.sendingState == 3) {
                    this.messages.push(message)
                    this.userInput = ''  // 清空输入框
                    setTimeout(() => {
                        this.scroller.scrollEdge(Edge.Bottom)
                    }, 1000)
                    this.scroller.scrollEdge(Edge.Bottom)
                } else {
                    for (let index = 0; index < this.messages.length; index++) {
                        let element = this.messages[index];
                        if (element.messageClientId == message.messageClientId) {
                            this.messages.splice(index, index, message)
                        }
                    }
                }
            })
        })
        .onDisAppear(() => {

        })

    }

    async getMessages1() {

        try {
            const msgService = this.nimRepository.nim.messageService! // Demo启用message模块，messageService不为空
            const conversationId: string = this.paramsFromIndex['conversationId']
            const option: V2NIMMessageListOption = {
                conversationId: conversationId,
                onlyQueryLocal: true,
                limit:20,
                anchorMessage: this.lastMsg,
                direction: 0
            }
            const messageList: V2NIMMessage[] = await msgService.getMessageList(option)

            if (messageList.length > 0) {
                this.lastMsg = messageList[messageList.length - 1]
            } else  {
                console.log(`=== 获取到的消息个数不足20`)
            }

            setTimeout(() => {
                this.scroller.scrollEdge(Edge.Bottom);
            }, 1000)

        } catch (error) {
            console.info(`=== 获取消息历史失败 ${error}}`)
        }
    }

    async getMessages() {

        try {
            const msgService = this.nimRepository.nim.messageService! // Demo启用message模块，messageService不为空
            const conversationId: string = this.paramsFromIndex['conversationId']
            console.log(`===会话id ${conversationId}`)
            const option: V2NIMMessageListOption = {
                conversationId: conversationId,
                onlyQueryLocal: true,
                limit:20,
            }
            const messageList: V2NIMMessage[] = await msgService.getMessageList(option)

            this.messages = messageList.reverse()

            if (messageList.length > 0) {
                this.lastMsg = messageList[messageList.length - 1]
            }

            setTimeout(() => {
                this.scroller.scrollEdge(Edge.Bottom);
            }, 200)

        } catch (error) {
            console.info(`=== 获取消息历史失败 ${error}}`)
        }
    }

    getImageUrl(message: V2NIMMessage): String {
        const attach: V2NIMMessageImageAttachment = message.attachment as V2NIMMessageImageAttachment

        return attach.url!

    }

    async sendTextMessage() {
        console.log(`=== 发送开始`)
        this.sending = true
        try {
            const message = this.nimRepository.nim.messageCreator.createTextMessage(this.userInput)  // 使用输入框内容
            const params: V2NIMSendMessageParams = {
                messageConfig: {
                    unreadEnabled: false
                },
                pushConfig: {
                    pushEnabled: true
                },
            }
            const res: V2NIMSendMessageResult = await this.nimRepository.nim.messageService!.sendMessage(message, this.conversationIdT, params)
            this.sending = false
        } catch(err) {
            // todo error
            console.log(`=== 发送失败`)
            this.sending = false
        }
    }

    pickPhotos() {
        //初始化一个photopicker
        let photoPicker = new picker.PhotoViewPicker()

        //maxSelectNumber最多选择多少张（默认值为50，最大值为500）
        //MIMEType 选择文件的类型
        try {
            photoPicker.select({maxSelectNumber:1,MIMEType:picker.PhotoViewMIMETypes.IMAGE_TYPE}).then(val => {
                //通过val.photoUris就可以拿到图片的Uri数组了
                //val.photoUris

            })
        } catch (error) {
            console.info(`=== 打开相册失败 ${error}}`)
        }


    }

    getMessageSendingStatus(status: V2NIMMessageSendingState): string {
        let str = ""
        switch (status) {
            case 0:
                str = "未知"
                break;
            case 1:
                str = "发送成功"
                break;
            case 2:
                str = "发送失败"
                break;
            case 3:
                str = "发送中"
                break;
            default:
                break;
        }
        return str
    }

}