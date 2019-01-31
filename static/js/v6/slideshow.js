/**
 * SlideShow Script
 * 轮播翻页插件
 * v-slideshow="{}"
 */
v.Scrollbar || v.kit('SlideShow', function (self) {
    // 静态属性
    self.anchor = 'v-slideshow';
    // 公共属性
    //
    this.anchor = null; // 幻灯box
    this.handel = null; // 触发按钮
    this.numel = '.number'; // 触发按钮数字
    this.prevel = null; // 向前触发按钮
    this.nextel = null; // 向后触发按钮
    this.rollel = 'ul'; // 滚动的对象
    this.vertical = false; // 竖向，否
    this.autosec = 6; // 自动滚动时长，秒, 0|false不自动滚动
    this.speed = 200; // 速度，毫秒，数据越大越快
    this.fixpx = 0; // 容器修复像素

    // 事件定义
    this._events = {
    };

    // 私有属性
    //
    this._step = 0; // 每次滚动步长
    this._minOffset = 0; // 最小左边距
    this._index = 1; // 当前屏
    this._count = 1; // 共几屏
    this._aspect = null; // 方向left,top
    this._handTpl = null; // 触发按钮模板
    this._autoTimer = null; // 定动滚动定时器
    this._nextAspect = 1; // 向下滚动,自动滚动时使用

    // 私有方法
    //
    // 初始化数据
    var _initCount = function () {
        var extent = this.vertical ? Math.max(this.rollel.offsetHeight, this.rollel.scrollHeight) : Math.max(this.rollel.offsetWidth, this.rollel.scrollWidth);
        this._step = (this.vertical ? this.anchor.clientHeight : this.anchor.clientWidth) + this.fixpx;
        this._minOffset = this._step - extent;
        this._count = Math.ceil(extent / this._step);
        this._index = 1;
        this._aspect = this.vertical ? 'margin-top' : 'margin-left';
    };
    // 初始化触发按钮
    var _initHandel = function () {
        // 添加触发选择按钮
        if (this.handel && this._count > 0) {
            this._handTpl = v.$('a:first-child', this.handel);  // 取得模板
            var stimer;
            v.$(this.handel).empty().on('mouseover', 'a', function (event) {
                stimer = v.callst(v.bind(this.slideTo, this), stimer, [v.$(event.target).attr('index')]);
            }.bind(this));
            for (var i = 1; i <= this._count; i++) {
                this.handel.insertIn(v.$(this._handTpl.cloneNode(true)).attr({'index': i.toString()}));
            }
            v.$('a:first-child', this.handel).addClass('selected');
        }
    };
    // 初始化前后按钮
    var _initAspect = function () {
        var stimer;
        if (this.prevel) {
            v.$(this.prevel).on('click', function () {
                this._nextAspect = -1;
                stimer = v.callst(this.slideTo.bind(this), stimer, [--this._index]);
            }.bind(this));
            v.$(this.nextel).on('click', function () {
                this._nextAspect = 1;
                stimer = v.callst(this.slideTo.bind(this), stimer, [++this._index]);
            }.bind(this));
        }
    };
    // 自动滚动
    var _slideAuto = function () {
        if (this._count > 1 && this.autosec) {
            _stopAuto.call(this);
            this._autoTimer = setInterval(function () {
                this.slideTo(this._index + this._nextAspect);
            }.bind(this), this.autosec * 1000);
        }
    };
    // 停止自动动画
    var _stopAuto = function () {
        if (this._autoTimer) {
            clearInterval(this._autoTimer);
        }
    };

    // 共有方法
    //
    // 初始化
    this.construct = function (options) {
        this.parent();
        if (this.rollel)
            this.rollel = v.$(this.rollel, this.anchor);
        if (this.handel)
            this.handel = v.$(this.handel, this.anchor);
        if (this.prevel)
            this.prevel = v.$(this.prevel, this.anchor);
        if (this.nextel)
            this.nextel = v.$(this.nextel, this.anchor);

        _initCount.call(this);
        _initHandel.call(this);
        _initAspect.call(this);
        _slideAuto.call(this);

        v.$(this.tribox).on('mouseenter', v.bind(_stopAuto, this)) // 鼠标位于滚动内容时，停止自动滚动
                .on('mouseleave', v.bind(_slideAuto, this)); // 鼠标移除时，开始自动滚动
    };

    // 移动到某一屏
    this.slideTo = function (index) {
        _stopAuto.call(this);
        this._index = index > this._count ? 1 : index < 1 ? this._count : index;
        if (this.handel) {
            v.$('.selected', this.handel).rmvClass('selected');
            v.$('a:nth-child(' + (this._index) + ')', this.handel).addClass('selected');
        }

        var params = {};
        params[this._aspect] = Math.max(this._minOffset, 0 - (this._index - 1) * this._step)+'px';
        v.$(this.rollel).stop(true).animation(params, v.bind(_slideAuto, this));
        if (this.prevel) {
            this._index === 1 ? v.$(this.prevel).addClass('disabled') : v.$(this.prevel).rmvClass('disabled');
            this._index === this._count ? v.$(this.nextel).addClass('disabled') : v.$(this.nextel).rmvClass('disabled');
        }
    };

});