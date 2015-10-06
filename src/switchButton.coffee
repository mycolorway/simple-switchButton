
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

  _render: ->
    @el = $(@opts.el).hide()
    @el.data('switchButton')?.destroy()

    @switchButton = $(SwitchButton._tpl.switch)
      .addClass(@opts.cls)
      .insertBefore @el
    $switchToggle = @switchButton.find '.switch-toggle'
    $switchToggle.width($switchToggle.height()) if $switchToggle.width() <= 0
    
    @switch(true) if @checked = @el.is(':checked')
    @el.data 'switchButton', @
    @switchButton.data 'switchButton', @

  _bind: ->
    @switchButton.on 'click.switchButton' , =>
      @el.click()

    @el.on 'change.switchButton', =>
      if @el.is(':checked') then @switch(true) else @switch(false)

  switch: (flag = !@el.is(':checked')) ->
    @el.prop 'checked', flag
    @switchButton.toggleClass 'checked', flag
    @checked = flag
    @triggerHandler 'switch', [@checked]

  destroy: ->
    @switchButton.remove()
    @el.show()
      .removeData 'switchButton'
      .off '.switchButton'

switchButton = (opts) ->
  new SwitchButton(opts)
