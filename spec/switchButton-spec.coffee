$checkEl = null

beforeEach ->
  $checkEl = $("""
    <input type="checkbox" value="1" id="check-box">
    """)

afterEach ->
  $(".simple-switchButton").each () ->
    $(@).data("switchButton").destroy()
  $("input").remove()

describe 'Simple switchButton', ->

  it 'should inherit from SimpleModule', ->
    $checkEl.appendTo("body")
    switchButton = simple.switchButton
      el: $("#check-box")
    expect(switchButton instanceof SimpleModule).toBe(true)

  it "should show switch button", ->
    $checkEl.appendTo("body")
    switchButton = simple.switchButton
      el: $("#check-box")
    expect($("body .simple-switchButton").length).toBe(1)

  it "should see throw error if no el", ->
    expect(simple.switchButton).toThrow()

  it "should render correct default checkbox value", ->
    $checkEl.appendTo("body")
    switchButton = simple.switchButton
      el: $("#check-box")
    expect($("body .simple-switchButton.checked").length).toBe(0)
    switchButton.destroy()

    $checkEl.prop 'checked', true
    switchButton = simple.switchButton
      el: $("#check-box")
    expect($("body .simple-switchButton.checked").length).toBe(1)

  it "should switch correctly", ->
    $checkEl.appendTo("body")
    switchButton = simple.switchButton
      el: $("#check-box")

    $("body .simple-switchButton").click()
    expect($("body .simple-switchButton.checked").length).toBe(1)
    expect($checkEl.is(':checked')).toBe(true)

    $("body .simple-switchButton").click()
    expect($("body .simple-switchButton.checked").length).toBe(0)
    expect($checkEl.is(':checked')).toBe(false)

    switchButton.switch()
    expect($checkEl.is(':checked')).toBe(true)

    switchButton.switch(true)
    expect($checkEl.is(':checked')).toBe(true)

    switchButton.switch(false)
    expect($checkEl.is(':checked')).toBe(false)

  it "should add class correctly", ->
    $checkEl.appendTo("body")
    switchButton = simple.switchButton
      el: $("#check-box")
      cls: "test"
    expect($("body .simple-switchButton.test").length).toBe(1)

  it "should destroy correctly", ->
    $checkEl.appendTo("body")
    switchButton = simple.switchButton
      el: $("#check-box")
    switchButton.destroy()
    expect($("body .simple-switchButton").length).toBe(0)
    expect($checkEl.data 'switchButton').toBe(undefined)
