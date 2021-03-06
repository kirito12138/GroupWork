# Alpha阶段项目展示

## 1、团队成员介绍

- **bsh**

  负责工作：前端开发及测试，前端负责人。

  [bsh的个人博客](https://www.cnblogs.com/baishihao/)

- **byw**

  负责工作：PM，各类文档、博客的撰写，总体计划及督促完成进度。

  [byw的个人博客](<https://www.cnblogs.com/kirito12138/>)

- **lqh**

  负责工作：后端开发及测试。

  [lqh的个人博客](https://home.cnblogs.com/u/Arsenalgooner/)

- **lw**

  负责工作：后端开发，后端负责人。

  [lw的个人博客](https://www.cnblogs.com/David-Liu-/)

- **szy**

  负责工作：暂定后端开发及测试。

  [szy的个人博客]()

- **wb**

  负责的工作：前端开发。

  [wb的个人博客](http://www.cnblogs.com/kingice/)

- **ycd**

  负责的工作：页面的优化与改进

  [ycd的个人博客](<https://www.cnblogs.com/chuizi000>)

##2、工程相关信息

### （1）我们的用户

- **需求**

  ​	我们团队之所以会想到做出这样一个项目，就是因为注意到了平时许多同学们的需求。进入本科高年级，大家的注意力越来越多的从学习，转向了实践。在系里的通知版、吐槽版中，也出现了越来越多的组队招募、项目招募信息。但是，由于吐槽版是大家闲聊的场所，每天的消息量十分庞大，这类重要的信息往往会被埋没在大量的聊天消息中。，需要长时间翻阅才能找到这一类信息。并且，在接收到有意者的申请时，也分散在各类社交平台。

  #吐槽版截图

  ​	因此，我们希望能为这类招募信息提供一个统一的，清晰的平台，集中发布这类招募信息，让同学们能方便、快捷的查阅所有招募，找到自己最心仪，最满意的项目加入。同时，也为发布招募的同学们，提供罗列清楚的申请者列表，以供其查阅申请者的简历，挑选最合适的队友。

- **典型用户**

  ​	我们预期的典型用户，主要是北航或其他学校的本科生，尤其是想要参加各类比赛，或想要加入各类项目丰富自身经验，但又不知去除的同学。

- **预期功能及用户数量**

  ​	通过产品进行招募的发布以及申请。能清晰明了的查看所有招募，并记录自己相关的所有招募以及申请。

  ​	由于alpha版本的功能仍较为有限，且限于时间因素，未能爬取学校中的各类招募信息，所以预期用户量较少，注册量预计50左右。

###（2）产品表现

- **功能实现**

  ​	Alpha版本我们实现了组队招募与申请有关的基本功能。其中，包含了重点的招募信息的发布、具体招募的申请，以及接受他人的申请。除此之外，我们还是实现了一些配套功能，如注册登录、自动登录、简历模板等，最低限度满足了用户的需求。

- **用户量**

  ​	因当前版本的功能仍然有较多限制，因此用户量较低，基本限于我们身边的各位同学。

# 用户量截图

### （3）团队分工

- **如何分工**

  ​	由于微信小程序的前后端完全分开工作，因此在确定好前后端开发人员后，分开进行工作，前后端各有一名成员，负责前后端的接口对接。在PM确定每日的任务后，开发部分的任务由前后端负责人与PM一起将任务进一步细化并分配给相应人员。出现不在计划中的临时任务时，优先分配给完成工作较少的团队成员。

- **经验教训**

  由于大三同学们各有各的安排，复习考研、参加比赛争取保研、为毕业工作进行实习准备等等等等，平时都比较繁忙，因此不可避免的工作主动积极性较低，需要分配工作的人员将任务尽量具体，只有详细、具体、具有明确DDL的任务，才能合格完成。

### （4）项目管理

- **[github](<https://github.com/kirito12138/GroupWork>)**

  ​	项目使用github进行管理，主分支主要进行文档的管理，分支`front_end`与分支`back_end`分别是前、后端的代码仓库，其他分支用于不同团队成员自己开发所使用。

  ​	在开发过程中，在完成一个小模块后都进行相应commit，以确保成果安全并便于统计没人完成的任务。截至4月20日晚，除去个人开发的各个分支，仅`master`、`front_end`、`back_end`三个主要分支，commit量就达到了200。

# commit图

- **任务管理**

  ​	每日任务都会新建相应的"issues"，每晚由PM统计各成员完成的任务，并关闭相应的issues。

  ​	在时间上，我们不要求各成员工作的具体时间，只要能在规定的DDL前，合格的完成任务即可。我们希望每个成员都能找到最适合自己的节奏，尽量达到个人最高的效率。

  ​	所谓万事开头难，Alpha阶段作为“从无到有”的阶段，如何利用有限的人力、时间资源，做出合格的产品是一大难题。因此，我们讨论后决定在第一阶段中，将主要精力放在功能的实现上，毕竟这些功能本身才是我们想要提供给用户的东西。并且，页面的具体设计本身就是一大难题，经过实践我们发现，从零开始设计一个好看的界面，其难度与花费其实远大于在实现一个原型，确定页面中各个元素所占的比例、重要程度后，再进行优化。

###（5）测试

- **前端**

  微信小程序的前端，由类似`html`的`wxml`，类似`css`的`wxss`与`js`代码组成。由于大部分都是页面的绘制，“所见即所得”，因此没有代码覆盖率一说，而测试也只能通过观察每个页面、每个功能在不同环境下的工作情况来进行。因此，我们在多种不同的环境下进行了相应的测试，也发现了许多bug，关于bug的解决情况等详情请见[Alpha版本测试报告](<https://www.cnblogs.com/Water-T/p/10742534.html>)。

<table>
  <tr>
    <th><span style="font-weight:bold">测试矩阵</span></th>
    <th colspan="13"><span style="font-weight:bold">功能测试</span></th>
    <th><span style="font-weight:bold">页面显示</span></th>
  </tr>
  <tr>
    <td>测试机型</td>
    <td>测试环境</td>
    <td>注册</td>
    <td>登录</td>
    <td>修改密码</td>
    <td>退出登录</td>
    <td>修改个人信息</td>
    <td>修改简历</td>
    <td>查看招募</td>
    <td>发布招募</td>
    <td>查看我的发布</td>
    <td>采纳申请</td>
    <td>申请招募</td>
    <td>查看我的申请</td>
    <td>页面排版</td>
  </tr>
  <tr>
    <td>Mi5</td>
    <td>Android 8.0 wifi</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
  </tr>
  <tr>
    <td>Mi9</td>
    <td>Android 9.0 wifi</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
  </tr>
  <tr>
    <td>iPhone8</td>
    <td>ios12.2 wifi</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>简历排版有问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>有一瞬间所需人数不对，无法复现</td>
    <td>查看申请者是两个空</td>
    <td>无问题</td>
    <td>简历变成空的了</td>
    <td>无问题</td>
  </tr>
  <tr>
    <td>iPhoneXR</td>
    <td>ios12.2 wifi</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>简历排版有问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>无问题</td>
    <td>查看申请者是两个空</td>
    <td>无问题</td>
    <td>简历变成空的了</td>
    <td>无问题</td>
  </tr>
    <tr>
    <td>小米8SE</td>
    <td>安卓</td>
    <td>刚开始无法注册</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
  </tr>
  <tr>
    <td>苹果XR</td>
    <td>ios</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
  </tr>
  <tr>
    <td>vivoIQOO</td>
    <td>安卓</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
  </tr>
  <tr>
    <td>苹果XR</td>
    <td>ios</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
  </tr>
  <tr>
    <td>苹果7plus</td>
    <td>ios</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
  </tr>
<tr>
    <td>小米6</td>
    <td>Android 8.0</td>
    <td>用户名的placeholder过长，后面不能显示</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>姓名，性别等在填简历时，要再输入一次</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>能申请自己的发布，进到简历界面后，没申请成功。查看自己的申请如果没有人申请则没有提示。</td>
    <td>一个人同意后再进简历页面还是有同意按钮，不能了解自己同意了那些人</td>
    <td>点申请没有提示，申请失败</td>
    <td>没问题</td>
    <td>没问题</td>
  </tr>
  <tr>
    <td>iphone8p</td>
    <td>ios 12.2</td>
    <td>第一次注册时出现了用户名已注册，但不能复现</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>简历的初始值为未填写，用户体验不好</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>查看不了别人的申请信息，也没有简历看</td>
    <td>申请时不显示申请成功</td>
    <td>没问题</td>
    <td>接受不了申请</td>
  </tr>
    <tr>
    <td>华为荣耀7x</td>
    <td>安卓8.0</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>性别可以为其他值</td>
    <td>不能保存简历</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
  </tr>
    <tr>
    <td>魅族16</td>
    <td>安卓8.1</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>没问题</td>
    <td>点申请没有提示，申请失败</td>
    <td>没问题</td>
    <td>没问题</td>
  </tr>
</table>

- **后端**

  我们的产品后端采用django实现。

### （6）文档

​	所有的文档都上传在github项目，主分支的docs文件夹下。

​	其中，页面相关的前端信息更新在[功能规格说明.md](<https://github.com/kirito12138/GroupWork/blob/master/docs/%E5%8A%9F%E8%83%BD%E8%A7%84%E6%A0%BC%E8%AF%B4%E6%98%8E.md>)中，主要包含页面的大致布局，页面中含有的主要元素，以及页面主要搭载了何种功能。是前端开发时的依据。在初期阶段，例会中大家在讨论时为了让其他成员理解自己的想法，也进行了一些粗糙的手绘示意图。

# 手稿

​	之后，在进行文档的撰写时，将当时的想法重新绘制成了原型图，进行了整理与重置。作为前端开发的参考。在下一阶段，我们将会再次重新设计我们的页面，大幅改善整体的审美表现。

#前段原型图

​	后端数据库的主要信息包含在[数据库设计.md](<https://github.com/kirito12138/GroupWork/blob/master/docs/%E6%95%B0%E6%8D%AE%E5%BA%93%E8%AE%BE%E8%AE%A1.md>)中，包含了各个数据库现在含有的内容。是后端开发的主要依据之一。

​	最重要的是接口设计信息，前后端都需要严格按照设计好的接口进行编程，才能确保对接后，最后的小程序能完成计划中的功能。这一部分设计包含在[技术规格说明.md](<https://github.com/kirito12138/GroupWork/blob/master/docs/%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E8%AF%B4%E6%98%8E.md>)中。这一部分的设计尽量详细，避免开发人员造成任何误解，导致可能的潜在BUG。

# 接口设计示例图

### （7）用户调研

​	我们的目标用户主要是学校的学生，据我们团队成员对周围同学的调研，对于招募发布的统一集成平台的需求是十分迫切的。在这一基础上，我们也制定了电子问卷对北航的部分同学们进行了调研。就结果而言，显然，一个招募信息的集中平台是同学们迫切需要的。

# 问卷图

## 3、项目信息

### （1）实际进展

​	在前期，团队成员们花费了较多的时间在学习微信小程序的开发上，后端的django，前端的html、css、js都需要一定的时间进行学习。在度过学习阶段后，我们在实际代码开发阶段的进展较为迅速，完成了alpha阶段的预期功能。燃尽图如下。

# 燃尽图

​	燃尽图中可以看到，项目前期的进展较快，成员们的工作积极性较高，在alpha阶段后期，尤其是知道实际展示时间比我们预期的晚一周这个消息后，大家的工作节奏缓了下来。这是燃尽图直观展现出的一大现象。燃尽图这一现象的另一原因是，这幅燃尽图直接根据issues数目生成，忽略了不同issues的权重。前期学习、准备工作相关issues数量较多，但是比重较小，而后期的issues往往都是占比较大的“重活”。这一特点也造成了燃尽图后期进度放缓的现象。

​	燃尽图最后所剩余的一小部分，是一些长期任务，比如[重新，详细设计各页面，尽量加入更多图片元素等](<https://github.com/kirito12138/GroupWork/issues/69>)。这些任务alpha阶段无法彻底完成，因此等待接下来的开发中完成后再关闭。

### （2）产品功能

Alpha阶段的功能如下：

|          [Alpha版本]功能说明          |
| :-----------------------------------: |
|           1、注册及登录功能           |
|            2、修改密码功能            |
|       3、自动登录、退出登录功能       |
|     4、个人资料修改及简历模板功能     |
|       5、查看、新建招募发布功能       |
|         6、查看自己的所有招募         |
| 7、查看所有申请者简历并接受申请者申请 |
|            8、上拉刷新功能            |
|            9、申请某一招募            |
|     10、查看自己的申请及申请状态      |

其中功能的详细介绍参见[Alpha阶段发布说明](<https://www.cnblogs.com/Water-T/p/10743083.html>)。

### （3）产品发布

​	我们的产品已经正式发布在了微信小程序平台上，打开微信点击右上角的“放大镜”，单击“小程序”，在搜索框搜索“小小易校园“，即可使用我们的产品。

#小程序搜索图

## 4、团队成员贡献

| 名字 | 分工               | 团队贡献分 | 具体贡献 |
| ---- | ------------------ | ---------- | -------- |
| bsh  | 前端负责人         |            |          |
| byw  | PM，前端开发       |            |          |
| lqh  | 后端开发           |            |          |
| lw   | 后端负责人         |            |          |
| wb   | 前端开发           |            |          |
| ycd  | 接口设计及前端优化 |            |          |

## 5、反馈及BUG

根据发布后一些同学使用后的反馈，我们的小程序主要存在以下问题：

- **在ios端较为不稳定**

  ​	这一点是我们没有想到的问题。由于微信小程序的开发与具体的手机操作系统无关，开发过程完全相同，因此我们没有想到在不同手机环境下的差异会如此之大。在ios端下，部分功能如下拉刷新等无法使用，简历修改页面的排版也与正常情况有一定区别。在下一阶段我们将会仔细研究为何个别页面会出现问题，寻找这些页面使用的组件、设置与其他页面有何不同，以定位ios端出现问题的原因。

- **服务器连接常常出现问题**

  ​	由于微信小程序后端使用的域名需要经过长时间，大概半个多月时间的审核，因此在alpha阶段我们来不及使用华为云服务的服务器，只能使用之前已经通过了审核的，团队成员自己的服务器。服务器的性能有限，尽管在校园网环境下还较为稳定，但是移动4G常常会出现连接不上服务器的问题。

- **缺乏操作反馈**

  ​	许多用户反应“点了一个按钮后毫无反应，也不知道是自己没点上还是小程序出了问题“。这一重要问题的原因是，我们在开发时更多的考虑了用户操作成功、用户非法操作时的提示，忽略了部分操作等待连接服务器的问题。所以在连接服务器时缺乏相应的提示，导致用户的迷惑。

## 6、alpha阶段小结

​	alpha阶段中，经过了3个星期的开发，踩了许多坑，绕了许多弯路，也从中吸取了许多经验。

- **前端设计的难度不亚于实现的难度**

  ​	作为6个没有任何美术基础的理科生，开始实际开发后才发现，设计出好看页面的难度，对于我们来说不亚于实现这一页面的难度。作为零基础的设计者，寻找现有的、相近的模板进行参考，可行性远大于自己设计。

- **一个明确的整体规划，是项目按时、合格完成的必要条件**

  ​	通过这一阶段的开发，我们发现，在多人合作的实际工程中，需要明确的，具体的分工，来保证每个人清楚自己在团队中的位置；同时，也需要详细的，清晰的分配每日任务，来保证每个人认识到自己肩上的责任。

- **在沟通时，只有把每个细节都阐述清楚，才能确保想法的传达**

  每个人的思想都各有不同，在讨论时，不能指望他人通过一个粗略的比喻，就完全理解自己心中的某个想法。在讨论过程中常常出现因为语言表达的不具体，而导致两人以为互相达成了共识，等到工作做完才意识到在细节上双方的想法仍截然不同。**借助纸笔，或者电子文档、画图来传达自己的想法，远比单纯的口头交流有效**。

### 在下一阶段的任务

经过讨论，在下一阶段我们的主要任务如下：

- **增加操作反馈，确保用户的每一下点击后都有相应的事件触发**

  ​	根据alpha阶段的反馈，我们意识到，必须为用户的每一下点击，都做出相应的反馈：若操作成功，则应跳转到相应的页面、实现相应的功能；若操作失败，则必须明确的提示用户为何操作失败，如何解决；若需要向后端索要或发送数据，则必须要提示用户正在链接服务器，并在超时后给出提示。如此才能避免用户在使用中出现“到底是我没点上还是卡了”的疑惑。

- **添加亮点功能，将目前的功能做精、做专**

  ​	我们意识到，贪心的实现多个不同类型的功能，最后做成一锅什么都涉及一些，什么都做的不好的大杂烩是绝对需要避免的。因此，我们团队经讨论决定，将当前的招募发布、申请功能做到极致，添加让人眼前一亮的独特功能，如在查看申请界面，根据用户的需求，将符合要求的简历排在最上方；在发布列表页面，根据用户的专业，推荐符合其专业技能的招募等等。

- **重新设计页面，大幅提升审美体验**

  优秀，好看的页面既能吸引新用户的增长，也能提升用户的使用体验。经过对比其他成熟的，使用人数极多的成功小程序，我们发现我们的UI主要有两大问题：

  - 颜色单一，控件样式单一，界面重复感强
  - 缺少图片，页面较为单调

  在下一阶段，我们会参考一些好看的设计模板，争取大幅提升我们的界面质量。

  #设计图

### 课程建议

经过alpha阶段的实际动手开发，我们发现管理这门大学问的难度与重要性都超乎我们的想象。软件开发的效率不仅仅取决于每个成员的个人能力，也取决于是否有好的管理制度和总体规划。而可惜的是课上由于老师要为每个组提供宝贵的建议，实际能够讲课的时间并不多。希望课上能留出更多的时间用于讲授软件工程中，关于管理与合作内容。