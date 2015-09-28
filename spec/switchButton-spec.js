(function() {
  var $checkEl;

  $checkEl = null;

  beforeEach(function() {
    return $checkEl = $("<input type=\"checkbox\" value=\"1\" id=\"check-box\">");
  });

  afterEach(function() {
    $(".simple-switchButton").each(function() {
      return $(this).data("switchButton").destroy();
    });
    return $("input").remove();
  });

  describe('Simple switchButton', function() {
    it('should inherit from SimpleModule', function() {
      var switchButton;
      $checkEl.appendTo("body");
      switchButton = simple.switchButton({
        el: $("#check-box")
      });
      return expect(switchButton instanceof SimpleModule).toBe(true);
    });
    it("should show switch button", function() {
      var switchButton;
      $checkEl.appendTo("body");
      switchButton = simple.switchButton({
        el: $("#check-box")
      });
      return expect($("body .simple-switchButton").length).toBe(1);
    });
    it("should see throw error if no el", function() {
      return expect(simple.switchButton).toThrow();
    });
    it("should render correct default checkbox value", function() {
      var switchButton;
      $checkEl.appendTo("body");
      switchButton = simple.switchButton({
        el: $("#check-box")
      });
      expect($("body .simple-switchButton.checked").length).toBe(0);
      switchButton.destroy();
      $checkEl.prop('checked', true);
      switchButton = simple.switchButton({
        el: $("#check-box")
      });
      return expect($("body .simple-switchButton.checked").length).toBe(1);
    });
    it("should switch correctly", function() {
      var switchButton;
      $checkEl.appendTo("body");
      switchButton = simple.switchButton({
        el: $("#check-box")
      });
      $("body .simple-switchButton").click();
      expect($("body .simple-switchButton.checked").length).toBe(1);
      expect($checkEl.is(':checked')).toBe(true);
      $("body .simple-switchButton").click();
      expect($("body .simple-switchButton.checked").length).toBe(0);
      expect($checkEl.is(':checked')).toBe(false);
      switchButton["switch"]();
      expect($checkEl.is(':checked')).toBe(true);
      switchButton["switch"](true);
      expect($checkEl.is(':checked')).toBe(true);
      switchButton["switch"](false);
      return expect($checkEl.is(':checked')).toBe(false);
    });
    it("should add class correctly", function() {
      var switchButton;
      $checkEl.appendTo("body");
      switchButton = simple.switchButton({
        el: $("#check-box"),
        cls: "test"
      });
      return expect($("body .simple-switchButton.test").length).toBe(1);
    });
    return it("should destroy correctly", function() {
      var switchButton;
      $checkEl.appendTo("body");
      switchButton = simple.switchButton({
        el: $("#check-box")
      });
      switchButton.destroy();
      expect($("body .simple-switchButton").length).toBe(0);
      return expect($checkEl.data('switchButton')).toBe(void 0);
    });
  });

}).call(this);
