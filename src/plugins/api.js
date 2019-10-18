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

}
export default API