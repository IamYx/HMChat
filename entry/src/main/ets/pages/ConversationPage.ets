import {
  V2NIMConversation,
  V2NIMConversationResult,
  V2NIMConversationType,
  V2NIMConversationOption,
  V2NIMTeamType,
  V2NIMP2PMessageMuteMode,
  V2NIMLocalConversationResult,
  V2NIMLocalConversationOption,
  V2NIMLocalConversation,
} from '@nimsdk/base/Index';
import { NimRepository } from '../model/NimRepository'
import { router, Router } from '@kit.ArkUI';

@Entry
@Component
export default struct MinePage {

  @State recentSessions: Array<V2NIMLocalConversation> = []
  @State recentSessionNames: Map<String, Map<String, String>> = new Map()
  private nimRepository: NimRepository = NimRepository.getInstance(getContext(this).getApplicationContext())

  build() {

    Column() {
      Text('会话页面')
        .fontSize(20)
        .margin({bottom: 20})
        .height('5%')
      Stack() {
        Text(this.recentSessions.length > 0 ? "" : "无会话")
        List() {
          ForEach(this.recentSessions, (item: V2NIMLocalConversation) => {
            ListItem() {
              Column() {
                Row() {
                  Image(`${this.getUserAvatar(item.conversationId)}`)
                    .width(60)
                    .height(60)
                    .borderRadius(10)
                    .margin({left: 15})
                  Text(`${this.getUserName(item.conversationId)}`)
                    // Text(`${item.name}`)
                    .margin({ left: 15, right: 15 })
                    .textAlign(TextAlign.Start)
                }
                .width('80%')
                Row() {
                  Text(`会话id：${item.conversationId}`)
                    .margin({ left: 15, right: 15 })
                    .textAlign(TextAlign.Start)
                }
                .width('80%')
                Row() {
                  Text(this.getShortMessageText(item))
                    .margin({ left: 15 })
                    .textAlign(TextAlign.Start)
                    .foregroundColor(Color.Orange)

                  Text(this.getLastMsgStute(item))
                    .margin({ left: 15 })
                    .textAlign(TextAlign.Start)
                    .foregroundColor(Color.Orange)
                }
                .width('80%')
              }.height(80)
            }
            .margin({bottom: 40})
            .onClick(async () => {
              router.pushUrl({
                url: 'pages/ChatPage',
                params: {
                  'conversationId': item.conversationId
                }
              }, router.RouterMode.Single)
              console.log(`点击了会话`)

            })
          })
        }.alignListItem(ListItemAlign.Start).height('100%')
      }
      .height('90%')
    }.onAppear(() => {
        this.doGetConversationListByOption()

        //监听
        this.nimRepository.nim.localConversationService!.on("onConversationCreated", (conversation: V2NIMLocalConversation) => {
            console.info(`=== 会话新增了`)
            this.doGetConversationListByOption()
        })

        this.nimRepository.nim.localConversationService!.on("onConversationChanged", (conversationList: V2NIMLocalConversation[]) => {
            console.info(`=== 会话更新了`)
            for (let  i = 0; i < conversationList.length; i++) {
              let recent = conversationList[i]
              console.info(`===会话最后一条消息状态 ${recent.lastMessage?.messageRefer.messageClientId} ${recent.lastMessage?.sendingState}`)
            }
            this.doGetConversationListByOption()
        })

        this.nimRepository.nim.localConversationService!.on("onSyncFinished", () => {
            console.info(`=== 会话同步完成`)
            this.doGetConversationListByOption()
        })
    })

  }

  getShortMessageText(recent?: V2NIMLocalConversation): string {
    let content = ''
    if(recent) {
      if (recent.lastMessage?.text) {
        if (recent.lastMessage?.text.length > 20) {
          content = recent.lastMessage?.text.substring(0, 15) + '...'
        } else {
          content = recent.lastMessage.text
        }
      }
    }
    console.info(`=== 最后一条消息内容 ${content}`)
    return content
  }

  getLastMsgStute(recent?: V2NIMLocalConversation): string {

    if(recent) {
      if (recent.lastMessage?.sendingState == 0) {
        return '状态未知'
      } else if (recent.lastMessage?.sendingState == 1) {
        return '发送成功'
      } else if (recent.lastMessage?.sendingState == 2) {
        return '发送失败'
      } else if (recent.lastMessage?.sendingState == 3) {
        return '发送中'
      }
    }

    return '状态未知'
  }

  getUserName(id: String) : String {
    const dic = this.recentSessionNames.get(id)
    let name: String = String('无名')
    if (dic) {
      if (dic.get('name')) {
        name = dic.get('name')!
      }
    }
    return name
  }

  getUserAvatar(id: String) : String {
    const dic = this.recentSessionNames.get(id)
    let avatar: String = String('')
    if (dic) {
      if (dic.get('avatar')) {
        avatar = dic.get('avatar')!
      }
    }
    if (avatar.toString().length <= 0) {
      avatar = 'icon.png'
    }
    console.info(`=== ${avatar}`)
    return avatar
  }

  async doGetConversationName() {

    let  count = this.recentSessions.length
    const userIds: string[] = []
    const teamIds: string[] = []
    for (let  i = 0; i < count; i++) {
      let session = this.recentSessions[i]
      const id = this.nimRepository.nim.conversationIdUtil.parseConversationTargetId(session.conversationId)
      if (session.type == V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P) {
        userIds.push(id)
      } else if (session.type == V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM) {
        teamIds.push(id)
      }
    }
    try {
      const users = await this.nimRepository.nim.userService!.getUserList(userIds)

      let  count1 = users.length
      for (let i = 0; i < count1; i++) {
          const user = users[i]
          console.info(`===用户名 ${user.name}`)
          const id = this.nimRepository.nim.conversationIdUtil.p2pConversationId(user.accountId)
          const userDic: Map<String, String> = new Map()
          userDic.set('name', user.name)
          userDic.set('avatar', user.avatar!)
          this.recentSessionNames.set(id, userDic)
      }

    } catch (error) {
      console.info(`===用户名获取失败 ${error}`)
    }

    try {
      const teams = await this.nimRepository.nim.teamService!.getTeamInfoByIds(teamIds, V2NIMTeamType.V2NIM_TEAM_TYPE_NORMAL)
      let  count2 = teams.length
      for (let i = 0; i < count2; i++) {
        const team = teams[i]
        console.info(`===群名 ${team.name}`)
        const id = this.nimRepository.nim.conversationIdUtil.p2pConversationId(team.teamId)
        const userDic: Map<String, String> = new Map()
        userDic.set('name', team.name)
        userDic.set('avatar', team.avatar)
        this.recentSessionNames.set(id, userDic)
      }
    } catch (error) {
      console.info(`===群名获取失败 ${error}`)
    }

  }

  async doGetConversationListByOption() {
    let offset: number = 0;
    let limit: number = 100;
    let option: V2NIMLocalConversationOption = {
      conversationTypes: []
    }

    let TAG: string = "getConversationListByOption(" + offset + ", " + limit + ", " + JSON.stringify(option) + ")";
    try {
      console.info('Button onClick, ' + TAG)

      let result: V2NIMLocalConversationResult = await this.nimRepository.nim.localConversationService!.getConversationListByOption(offset, limit, option)
      this.recentSessions = result.conversationList

      // console.log(`===list ${result.conversationList}`)

      // if (result.conversationList.length <= 0) {
      //   const sessionId = this.nimRepository.nim.conversationIdUtil.p2pConversationId('ceshi3')
      //
      //   console.log(`=== ${sessionId}`)
      //
      //   let ression: V2NIMConversation = await this.nimRepository.nim.conversationService!.createConversation(sessionId)
      //
      //   this.recentSessions.push(ression)
      // } else {
      //   console.log(`=== ${result.conversationList.length}`)
      // }

      // let  count = result.conversationList.length
      // console.log(`=== 会话个数 ${count}`)
      // for (let  i = 0; i < count; i++) {
      //   console.info(`=== 会话 ${i}`)
      //   this.recentSessions.push(result.conversationList[i])
      // }
      this.doGetConversationName()

    } catch (e) {
      console.log(`=== ${e}`)
    }

  }

}