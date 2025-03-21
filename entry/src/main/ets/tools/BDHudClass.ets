
export enum BDHudType{
  msg,      //单提示语
  loading,  //加载框
  success,  //成功提示
  error     //错误提示
}

export  class BDHudClass {
  public show: boolean;   //是否显示
  public displayType: BDHudType; //显示类型
  public msgStr: string = '';  //提示语
  public iconSrc:string = '';
  public hudStatus:boolean = false;

  public showHud(displayType: BDHudType,msgStr?: string){

    this.hudStatus = true;
    this.show = true;
    this.displayType = displayType;

    if(displayType == BDHudType.loading){
      this.iconSrc = '/components/BDHud/loading_hud.gif'
      this.msgStr = msgStr == undefined ? '加载中':msgStr;

    }

    if(displayType == BDHudType.success){
      this.iconSrc = '/components/BDHud/success_hud.png'
      this.msgStr = msgStr == undefined ? '成功':msgStr;
    }

    if(displayType == BDHudType.error){
      this.iconSrc = '/components/BDHud/error_hud.png'
      this.msgStr = msgStr == undefined ? '错误/失败':msgStr;
    }

    if(displayType == BDHudType.msg){
      this.iconSrc = ''
      this.msgStr = msgStr == undefined ? '提示语':msgStr;
    }

  }

  // 外部调用手动销毁
  public close(){
    this.hudStatus = false;
    this.show = false;
  }

  // 构造函数
  constructor(show:boolean = false, displayType:BDHudType = BDHudType.msg,msgStr: string = '',iconSrc:string = '') {
    this.show = show;
    this.displayType = displayType;
    this.msgStr = msgStr;
    this.iconSrc = iconSrc;
  }


}

@Component
export default struct BDHud{
  // @Link @Watch('itemChange') hudItem:BDHudClass
  @State ZIndex:number = 1
  @State boxShow:boolean = true
  @State iconShow:boolean = false
  @State textShow:boolean = true

  build(){
    Stack(){

      Column(){
        Image(``)
          .iconImg()
          .visibility(this.iconShow ? Visibility.Visible : Visibility.None)

        Text(`登录中。。。`)
          .lineHeight(28)
          .padding({top:this.iconShow ? 15:0})
          .msgText()
          .visibility(this.textShow ? Visibility.Visible : Visibility.None)

      }
      .padding({top:this.iconShow ? 18:10,bottom:15,left:15,right:15})
      .box()

    }
    .overlay().backgroundColor(Color.Gray).height('100%').width('100%')
    .visibility(this.boxShow == true ? Visibility.Visible:Visibility.None)

  }
}

@Extend(Text) function msgText(){
  .fontColor(Color.White)
  .fontSize(15)
}

@Extend(Image) function iconImg(){
  .width(60)
  .height(60)
}

@Extend(Column) function box() {
  .constraintSize({minWidth:135,maxWidth:300})
  .backgroundColor('rgba(0,0,0,0.5)')
  .borderRadius(5)
}