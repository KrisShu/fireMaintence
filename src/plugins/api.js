const API ={
    //登录注册
    USER_LOGIN: "/api/services/app/SafeUnit/UserLogin", //用户登录
    USER_REGIST:"/api/services/app/SafeUnit/UserRegist",//用户注册
    USER_LOGOUT:"/api/services/app/SafeUnit/UserLogout",//用户注销
    GetSelectSafeUnits:"/api/services/app/SafeUnit/GetSelectSafeUnits",//获取单位名称

    // 
    GetSafeUnitUserEvent:"/api/services/app/SafeUnit/GetSafeUnitUserEvent",//查询维保事务列表
    //故障处理
    GetBreakDownlist:"/api/services/app/BreakDownService/GetBreakDownlist",//获取设施故障列表
    GetBreakDownInfo:"/api/services/app/BreakDownService/GetBreakDownInfo",//获取设施故障详情
    UpdateBreakDownInfo:"/api/services/app/BreakDownService/UpdateBreakDownInfo",//更新设施故障详情

    //
    GetPatrollist:'/api/services/app/DutyAndPatrolService/GetPatrollist',//获取巡查记录列表
    GetPatrolTrackList:'/api/services/app/DutyAndPatrolService/GetPatrolTrackList',//获取巡查记录轨迹
    //
    GetFireUnitlSystem:'/api/services/app/DutyAndPatrolService/GetFireUnitlSystem',//获取防火单位消防系统

    // 
    GetEquipmentNoList:'/api/services/app/AppGuideSet/GetEquipmentNoList',//获取绑定设施编码列表
    // 添加
    GetAddAllow:'/api/services/app/DutyAndPatrolService/GetAddAllow',//是否可以添加
    AddPatrolTrack:'api/services/app/DutyAndPatrolService/AddPatrolTrack',//添加巡查记录
    AddPatrolTrackDetail:'/api/services/app/DutyAndPatrolService/AddPatrolTrackDetail',//添加巡查记录轨迹

    //设置
    ChangePassword: "/api/services/app/SafeUnit/ChangePassword", //修改密码
    Addadvice:'/api/services/app/Version/Add',//添加建议
    GetAllFireUnitOfSafe:'/api/services/app/SafeUnit/GetAllFireUnitOfSafe',//获取所有
    AddSafeUserFireUnit:'/api/services/app/SafeUnit/AddSafeUserFireUnit',//新增防火单位
   //绑定设施编码
    AddEquipmentNo:'/api/services/app/AppGuideSet/AddEquipmentNo',//绑定设施编码
    UpdateEquipmentNoInfo:'/api/services/app/AppGuideSet/UpdateEquipmentNoInfo',//修改设施编码
    DelEquipmentNo:'/api/services/app/AppGuideSet/DelEquipmentNo',//删除
    //
    DelSafeUserFireUnit:'/api/services/app/SafeUnit/DelSafeUserFireUnit',//删除维保人员要维保的防火单位
}
export default API