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
    if (this.opts.el === null) {
      throw new Error("[SwitchButton] - el is required");
    }
    this._render();
    this._bind();
    this.el.data('switchButton', this);
    return this["switch"].data('switchButton', this);
  };

  SwitchButton.prototype._render = function() {
    this.el = $(this.opts.el).hide();
    this["switch"] = $(SwitchButton._tpl["switch"]).addClass(this.opts.cls).insertBefore(this.el);
    this.switchToggle = this["switch"].find('.switch-toggle');
    if (this.switchToggle.width() <= 0) {
      this.switchToggle.width(this.switchToggle.height());
    }
    if (this.el.is(':checked')) {
      return this.switchOn(0);
    }
  };

  SwitchButton.prototype._bind = function() {
    return this["switch"].on('click.switchButton', (function(_this) {
      return function(e) {
        var time;
        time = _this.opts.animTime;
        if (_this.el.is(':checked')) {
          _this.switchOff(time);
        } else {
          _this.switchOn(time);
        }
        return _this.trigger('switch');
      };
    })(this));
  };

  SwitchButton.prototype.switchOn = function(t) {
    this.el.prop('checked', true);
    this["switch"].addClass('checked');
    return this.switchToggle.animate({
      left: this["switch"].width() - this.switchToggle.outerWidth()
    }, t);
  };

  SwitchButton.prototype.switchOff = function(t) {
    this.el.prop('checked', false);
    this["switch"].removeClass('checked');
    return this.switchToggle.animate({
      left: 0
    }, t);
  };

  SwitchButton.prototype.destroy = function() {
    this["switch"].remove();
    this.el.show();
    return this.el.removeData('switchButton');
  };

  return SwitchButton;

})(SimpleModule);

switchButton = function(opts) {
  return new SwitchButton(opts);
};

return switchButton;

}));
