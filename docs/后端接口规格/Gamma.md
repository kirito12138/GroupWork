## Gamma阶段接口设计

### mcm/moddify/info/
参数： 类型：内容
返回：无

### mcm/get/info/

参数：无
返回：美赛个人信息

### mcm/search/user/
参数：用户姓名
返回：搜索结果（用户list，包含美赛个人信息）

### mcm/team/
参数：无
返回：美赛信息是否完整，该用户的队伍（用户list），分数最近的15个？用户

### mcm/quit/
参数：无
返回：无（退出当前队伍）

### mcm/match/
**暂时不用**
参数：无
返回：分数最近的15个？用户

### mcm/score/
参数：分数
返回：无

### mcm/invite/<user_id>/
参数：
返回：无

### mcm/invitations/send/
参数：无
返回：该用户的所有邀请

### mcm/decline/invitation_id/
参数：无
返回：无

### mcm/accept/invation_id/
参数：无
返回：发出方是否队伍已满

#### mcm/invitations/received/
参数：无
返回：邀请列表、本用户是否已组队
