
class SwitchButton extends SimpleModule

  opts:
    el: null
    cls: ""
    animTime: 400

  @_tpl:
    switch:'''
      <div class="simple-switchButton">
        <div class="switch-toggle"></div>
      </div>
    '''

  _init: ->
    unless $(@opts.el).is(':checkbox')
      throw new Error "[SwitchButton] - el should be a checkbox"
    @_render()
    @_bind()
    @el.data 'switchButton', @
    @switch.data 'switchButton', @

  _render: ->
    @el = $(@opts.el).hide()
    @switch = $(SwitchButton._tpl.switch)
      .addClass(@opts.cls)
      .insertBefore @el
    @switchToggle = @switch.find '.switch-toggle'
    @switchToggle.width(@switchToggle.height()) if @switchToggle.width() <= 0
    @switchOn(0) if @el.is(':checked')

  _bind: ->
    @switch.on 'click.switchButton' , (e) =>
      @el.click()

    @el.on 'change.switchButton', (e) =>
      if @el.is(':checked') then @switchOn() else @switchOff()
      @.trigger 'switch'

  switchOn: (t) ->
    @el.prop 'checked', true
    @switch.addClass 'checked'

  switchOff: (t) ->
    @el.prop 'checked', false
    @switch.removeClass 'checked'

  destroy: ->
    @switch.remove()
    @el.show()
      .removeData 'switchButton'
      .off '.switchButton'

switchButton = (opts) ->
  new SwitchButton(opts)
