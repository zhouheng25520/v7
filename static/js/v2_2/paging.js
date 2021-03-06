/**
 * Paging Script
 * 分页插件
 * v-paging="{row:12}"
 * 
 * 分页插件
 */
v.Paging || v.kit('Paging', function (self) {

    // 静态属性
    self.anchor = 'v-paging';

    // -----------------------------------
    // 公共属性
    // ------------------------------------
    this.anchor = null; // 插件区域
    this.toggle = null;  // 页码切换按钮样式，为空即没有切换按钮
    this.next = '.next';  // 下一个切换按钮样式
    this.prev = '.prev'; // 上一个切换按钮样式
    this.row = 12; // 每页12行

    // 事件定义
    this._events = {
    };

    // -----------------------------------
    // 私有属性
    // ------------------------------------
    this._page = 0; // 当前页码，从1开始


    // -----------------------------------
    // 私有方法
    // ------------------------------------



    // -----------------------------------
    // 公有方法
    // ------------------------------------

    /**
     * 初始化
     */
    this.construct = function () {
        this.parent();


    };

    /**
     * 切换到某一页
     * @param {Integer} index 从0开始计算
     */
    this.toPage = function (page/*, count*/) {

    };


});