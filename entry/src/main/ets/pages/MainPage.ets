import CoversationPage from './ConversationPage'
import MinePage from './MinePage'
import ContactPage from './ContactPage'
import ChatroomPage from './ChatroomPage'

@Entry
@Component
struct MainPage {

  private tabController: TabsController = new TabsController()

  build() {

    Tabs({barPosition: BarPosition.End, controller: this.tabController}) {
      TabContent() {
        CoversationPage()
      }.tabBar('最近会话')
      TabContent() {
        ContactPage()
      }.tabBar('通讯录页面')
      TabContent() {
        ChatroomPage()
      }.tabBar('聊天室')
      TabContent() {
          MinePage()
      }.tabBar('个人页面')
    }

  }

}