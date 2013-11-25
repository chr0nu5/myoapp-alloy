var args = arguments[0] || {};
$.eventRow.modelId = $model.id;
$.eventRow.enableSwitch = $.enableSwitch;
$.enableSwitch.visible = args.editMode;
$.enableSwitch.value = $model.get('enabled') == 1 ? true : false;

function onEnabledClicked(e) {
	e.cancelBubble = true;
}

function onEnabledChanged(e) {
	$model.set('enabled', $model.get('enabled') == 1 ? 0 : 1);
	$model.save();
}
