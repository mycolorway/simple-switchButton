
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
    if @opts.el is null
      throw new Error "[SwitchButton] - el is required"
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
      time = @opts.animTime
      if @el.is(':checked') then @switchOff(time) else @switchOn(time)
      @.trigger 'switch'

  switchOn: (t) ->
    @el.prop 'checked', true
    @switch.addClass 'checked'
    @switchToggle.animate
      left: @switch.width() - @switchToggle.outerWidth()
    ,t

  switchOff: (t) ->
    @el.prop 'checked', false
    @switch.removeClass 'checked'
    @switchToggle.animate
      left: 0
    ,t

  destroy: ->
    @switch.remove()
    @el.show()
    @el.removeData 'switchButton'

switchButton = (opts) ->
  new SwitchButton(opts)
