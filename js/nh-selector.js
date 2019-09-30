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
    this.options = $.extend({}, defaultOption, option);
  };

  selector.prototype = {
    init: function(){
      var self = this;

      // 初始化所需的位置数据
      self.initLocationData();

      // 设置下拉选择列表位置
      self.bind(self.$element, 'click', function(){
        self.dataProcessing(self.options.data)

        self.setDomPosition();

        self.show();

        console.log(self.options.data);
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
    dataProcessing: function(data){
      var self = this;
      var $selectorMenu = $('<ul class="nh-selector-menu"></ul>');
      var dataLength = data.length;
      for(var i = 0; i < dataLength; i++){
        !function(index){
          var $li = $('<li class="nh-selector-menu__item">'+ data[index].label +'</li>');
          console.log(data[index]);
          self.bind($li, 'click', function(){
            console.log($(this).index());
            if(data[index].children !== undefined){
              self.dataProcessing(data[index].children);
            } else {
              self.options.callback();
            }
          });
          $selectorMenu.append($li);
        }(i);
      }
      return $selectorMenu;
    },
    setDomPosition: function(){
      this.$selector.css({
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