function updateElementIndexSH(el, prefix, ndx) {
    var id_regex = new RegExp('(' + prefix + '-\\d+)');
    var replacement = prefix + '-' + ndx;
    if ($(el).attr("for")) $(el).attr("for", $(el).attr("for").replace(id_regex, replacement));
    if (el.id) el.id = el.id.replace(id_regex, replacement);
    if (el.name) el.name = el.name.replace(id_regex, replacement);
}

function cloneMoreSH(selector, prefix) {
    var newElement = $(selector).clone(true);
    var total = $('#id_' + prefix + '-TOTAL_FORMS').val();

    newElement.find(':input:not([type=button]):not([type=submit]):not([type=reset])').each(function() {
    //newElement.find('select').each(function() {
    	var name = $(this).attr('name').replace('-' + (total-1) + '-', '-' + total + '-');
    	var id = 'id_' + name;
    	$(this).attr({'name': name, 'id': id}).val('').removeAttr('checked');
    });
    newElement.find('label').each(function() {
    	var forValue = $(this).attr('for');
    	if (forValue) {
    	  forValue = forValue.replace('-' + (total-1) + '-', '-' + total + '-');
    	  $(this).attr({'for': forValue});
    	}
    });
    total++;
    $('#id_' + prefix + '-TOTAL_FORMS').val(total);
    $(selector).after(newElement);
    var conditionRow = $('.form-rowSH:not(:last)');
    conditionRow.find('.add-form-rowSH')
    //.removeClass('btn-success').addClass('btn-danger')
    .removeClass('add-form-rowSH').addClass('remove-form-rowSH')
    //.html('<i class="fa fa-minus-circle fa-2x" style="color:yellow" aria-hidden="true"></i>');
    .html('<i style="margin-left:5px; color:gray" class="fa fa-minus-circle fa-2x" aria-hidden="true"></i>');
    return false;
}
function deleteFormSH(prefix, btn) {
    var total = parseInt($('#id_' + prefix + '-TOTAL_FORMS').val());
    if (total > 1){
        btn.closest('.form-rowSH').remove();
        var forms = $('.form-rowSH');
        $('#id_' + prefix + '-TOTAL_FORMS').val(forms.length);
        for (var i=0, formCount=forms.length; i<formCount; i++) {
            $(forms.get(i)).find(':input').each(function() {
                updateElementIndexSH(this, prefix, i);
            });
        }
    }
    return false;
}
$(document).on('click', '.add-form-rowSH', function(e){
    e.preventDefault();
    cloneMoreSH('.form-rowSH:last', 'Senior');

    return false;
});
$(document).on('click', '.remove-form-rowSH', function(e){
    e.preventDefault();
    deleteFormSH('Senior', $(this));

    return false;
});





