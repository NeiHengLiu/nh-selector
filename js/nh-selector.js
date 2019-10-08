/**
 * ===========================================
 *  下拉选择器  nh-selector
 * ===========================================
 */
;!function($){
  'use strict';
  function selector(ele, option){
    var defaultOption = {
      data: [],     // 数据
      autoHeight: false,      // 高度是否自适应，false：不自适应，true：自适应
      callback: function(){   // 回调方法

      }
    };
    this.$element = ele;      // 当前元素
    this.$window = $(window);   // 当前 window
    this.$body = $('body');    // body 标签
    this.$selector = $('<div class="nh-selector"></div>');   // 初始的元素
    this.locationData = {};    // 保存当前所需的位置数据
    this.callData = [];     // 回显数据
    this.options = $.extend({}, defaultOption, option);
  };

  selector.prototype = {
    init: function(){
      var self = this;

      // 初始化所需的位置数据
      self.initLocationData();

      // 列表框位置
      self.setDomPosition();

      // 设置下拉选择列表位置
      self.bind(self.$element, 'click', function(){
        self.dataProcessing(self.options.data)

        // self.setDomPosition();

        self.show();

        // 临时用一下
        console.log(self.options.data);
        //self.$body.append(self.dataProcessing(self.options.data));
      })

      return self.$element;
    },
    // 初始化位置信息
    initLocationData: function(){
      this.locationData = {
        window: {
          width: this.$window.outerWidth(true),
          height: this.$window.outerHeight(true)
        },
        dom: this.$element[0].getBoundingClientRect()
      }
    },
    // 渲染下拉选择列表
    dataProcessing: function(data){
      var self = this;
      var $selectorMenu = $('<ul class="nh-selector-menu"></ul>');
      var dataLength = data.length;
      for(var i = 0; i < dataLength; i++){
        !function(index){
          var $li = $('<li class="nh-selector-menu__item">'+ data[index].label +'</li>');
          
          self.bind($li, 'click', function(){
            
            var $this = $(this),
                index = $this.index(),
                parentIndex = $this.parent().index();

            $this.parent().nextAll().remove();

            if(data[index].children !== undefined){ //  还有下一级
              self.callData[parentIndex] = self.dataScreening(data[index]);
              self.dataProcessing(data[index].children);
            } else {  // 没有下一级
              self.callData[parentIndex] = self.dataScreening(data[index]);
              self.options.callback(self.callData);
            }
          });
          $selectorMenu.append($li);
        }(i);
      }
      return $selectorMenu;
    },
    // 克隆数据
    dataScreening: function(data){
      var dataObject = {};
      for(var k in data){
        if(k !== 'children'){
          dataObject[k] = data[k]
        }
      }
      return dataObject;
    },
    // 设置下拉列表定位
    setDomPosition: function(){
      this.$selector.css({
        position: 'absolute',
        top: this.locationData.dom.bottom + 'px',
        left: this.locationData.dom.left + 'px'
      });
    },
    // 事件绑定
    bind: function(ele, event, fn){
      $(ele).off().on(event, fn);
    },
    // 事件解绑
    unbind: function(ele){
      $(ele).off();
    },
    // 显示下拉列表
    show: function(){
      if($('.nh-selector').length > 0){
        this.$selector.show();
      } else {
        this.$body.append(this.$selector);
        this.$selector.show();
      }
    }
  };

  $.fn.nhSelector = function(option){
    var mySelector = new selector(this, option);
    return mySelector.init();
  };
}(jQuery);