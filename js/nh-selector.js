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
    };
    this.$element = ele;      // 当前元素
    this.$window = $(window);   // 当前 window
    this.$body = $('body');    // body 标签
    this.$nhSelector = $('<div class="nh-selector"></div>');   // 初始的元素
    this.locationData = {};    // 保存当前所需的位置数据
    this.options = $.extend({}, defaultOption, option);
  };

  selector.prototype = {
    init: function(){
      var self = this;

      // 初始化所需的位置数据
      self.initLocationData();

      // 设置下拉选择列表位置
      self.bind(self.$element, 'click', function(){
        self.setDomPosition();
      })

      return self.$element;
    },
    initLocationData: function(){
      this.locationData = {
        window: {
          width: this.$window.outerWidth(true),
          height: this.$window.outerHeight(true)
        },
        dom: this.$element[0].getBoundingClientRect()
      }
    },
    setDomPosition: function(){
      this.$nhSelector.css({
        position: 'absolute',
        top: this.locationData.dom.bottom + 'px',
        left: this.locationData.dom.left + 'px'
      });
    },
    bind: function(ele, event, fn){
      $(ele).off().on(event, fn);
    },
    unbind: function(ele){
      $(ele).off();
    },
    show: function(){

    }
  };

  $.fn.nhSelector = function(option){
    var mySelector = new selector(this, option);
    return mySelector.init();
  };
}(jQuery);