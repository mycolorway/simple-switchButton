(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simple-switchButton', ["jquery","simple-module"], function (a0,b1) {
      return (root['switchButton'] = factory(a0,b1));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simple-module"));
  } else {
    root.simple = root.simple || {};
    root.simple['switchButton'] = factory(jQuery,SimpleModule);
  }
}(this, function ($, SimpleModule) {

var SwitchButton, switchButton,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SwitchButton = (function(superClass) {
  extend(SwitchButton, superClass);

  function SwitchButton() {
    return SwitchButton.__super__.constructor.apply(this, arguments);
  }

  SwitchButton.prototype.opts = {
    el: null,
    cls: "",
    animTime: 400
  };

  SwitchButton._tpl = {
    "switch": '<div class="simple-switchButton">\n  <div class="switch-toggle"></div>\n</div>'
  };

  SwitchButton.prototype._init = function() {
    if (!$(this.opts.el).is(':checkbox')) {
      throw new Error("[SwitchButton] - el should be a checkbox");
    }
    this._render();
    return this._bind();
  };

  SwitchButton.prototype._render = function() {
    var $switchToggle, ref;
    this.el = $(this.opts.el).hide();
    if ((ref = this.el.data('switchButton')) != null) {
      ref.destroy();
    }
    this.switchButton = $(SwitchButton._tpl["switch"]).addClass(this.opts.cls).insertBefore(this.el);
    $switchToggle = this.switchButton.find('.switch-toggle');
    if ($switchToggle.width() <= 0) {
      $switchToggle.width($switchToggle.height());
    }
    if (this.checked = this.el.is(':checked')) {
      this["switch"](true);
    }
    this.el.data('switchButton', this);
    return this.switchButton.data('switchButton', this);
  };

  SwitchButton.prototype._bind = function() {
    return this.switchButton.on('click.switchButton', (function(_this) {
      return function() {
        return _this["switch"]();
      };
    })(this));
  };

  SwitchButton.prototype["switch"] = function(flag) {
    if (flag == null) {
      flag = !this.el.is(':checked');
    }
    this.el.prop('checked', flag);
    this.switchButton.toggleClass('checked', flag);
    this.checked = flag;
    this.el.trigger('change');
    return this.triggerHandler('switch', [this.checked]);
  };

  SwitchButton.prototype.destroy = function() {
    this.switchButton.remove();
    return this.el.show().removeData('switchButton').off('.switchButton');
  };

  return SwitchButton;

})(SimpleModule);

switchButton = function(opts) {
  return new SwitchButton(opts);
};

return switchButton;

}));
