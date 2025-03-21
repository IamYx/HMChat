import { NimRepository } from '../model/NimRepository'
import {
  V2NIMError, V2NIMFriend, V2NIMFriendAddMode, V2NIMFriendAddParams,
  V2NIMTeam,
  V2NIMTeamType,
} from '@nimsdk/base/Index';
import { router } from '@kit.ArkUI';

@Entry
@Component
export default struct ContactPage {

  private nimRepository: NimRepository = NimRepository.getInstance(getContext(this).getApplicationContext())
  @State friends: Array<V2NIMFriend> = []
  @State teams: Array<V2NIMTeam> = []

  build() {
    Column() {
      Text('通讯录页面')
        .fontSize(20)
        .margin({bottom: 20})
        .height('5%')
      Row() {
        Column() {
          Column() {
            Text("我的好友")
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
          }.margin({bottom: 8, left: 20})
          .alignItems(HorizontalAlign.Start)
          .width('100%')
          List() {
            ForEach(this.friends, (item: V2NIMFriend) => {
              ListItem() {
                Row() {
                  Image(item.userProfile?.avatar ? item.userProfile?.avatar:'icon.png')
                    .width(50)
                    .height(50)
                    .margin({right:10})
                    .borderRadius(10)
                  Text(`${item.alias ? item.alias : item.accountId}`)
                }
              }.margin({left:10, right:10, top:10, bottom:10})
              .onClick(()=>{
                router.pushUrl({
                  url: 'pages/ChatPage',
                  params: {
                    'conversationId': `${this.nimRepository.nim.loginService.getLoginUser()}|1|${item.accountId}`
                  }
                }, router.RouterMode.Single)
              })
            })
          }
        }.width('50%')

        Column() {
          Column() {
            Text("我的群聊")
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
          }.margin({bottom: 8, left: 20})
          .alignItems(HorizontalAlign.Start)
          .width('100%')
          List() {

            ForEach(this.teams, (item: V2NIMTeam) => {
              ListItem() {
                Row() {
                  Image(item?.avatar ? item?.avatar:'icon.png')
                    .width(50)
                    .height(50)
                    .margin({right:10})
                    .borderRadius(10)
                  Text(`${item.teamId}`)
                }
              }.margin({left:10, right:10, top:10, bottom:10})
              .onClick(()=> {
                router.pushUrl({
                  url: 'pages/ChatPage',
                  params: {
                    'conversationId':`${this.nimRepository.nim.loginService.getLoginUser()}|1|${item.teamId}`
                  }
                }, router.RouterMode.Single)
              })
            })

          }
        }.width('50%')
      }
      .height('90%')
    }.onAppear(async () => {

      this.doGetFriendListByOption()
      this.doGetTeamListByOption()

    })

  }

  async doGetFriendListByOption() {

    try {
      const friendService = this.nimRepository.nim.friendService! // Demo启用friend模块，friendService不为空
      const res = await friendService.getFriendList()
      this.friends = res
    } catch (error) {
      console.log(`=== ${error}`)
    }

  }

  async doGetTeamListByOption() {

    try {
      const teamService = this.nimRepository.nim.teamService!
      const res = await teamService.getJoinedTeamList([V2NIMTeamType.V2NIM_TEAM_TYPE_NORMAL])
      console.log(`=== 获取群聊列表成功`)
      this.teams = res
    } catch (error) {
      console.log(`=== ${error}`)
    }

  }

}