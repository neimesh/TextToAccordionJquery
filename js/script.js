(function($) {
    $.fn.accordionapp = function(options) {
        var defaults = {
            titleGroup: 'h2',
            nodeDescGroup: 'p',
            titleItem: 'h3',
            nodeDescItem: 'p'
        },
        settings = {};
        settings = $.extend({}, defaults, options);
        var container = this,
            clone = container.clone(),
            arrayGroups = [];
        container.empty();
        clone.find(settings.titleGroup).each(function(){
            var group = $(this),
                nextObj = group.next(),
                desc = group.nextUntil(settings.titleItem),
                items = nextObj[0].nodeName.toLowerCase() === settings.nodeDescItem ? $(desc[desc.length-1]).nextUntil(settings.titleGroup) : group.nextUntil(settings.titleGroup),
                arrayItems = [];
            var wrapper = $('<div />', {
                html : items
            });
            wrapper.find(settings.titleItem).each(function(){
                var item = $(this),
                    content = item.nextUntil(settings.titleItem);
                arrayItems.push({question: item.text(), answer: content});
            });
            arrayGroups.push({title: group.text(), desc: desc, content: arrayItems});
        });
        for(var i = 0; i < arrayGroups.length; i++){
            var groupText = $('<div class="block-article-content-text panel-group-content-'+i+'"><h2>'+arrayGroups[i].title+'</h2></div>'),
                panelgroup = $('<div class="panel-group" id="accordion_' + i + '" role="tablist" aria-multiselectable="true" />');
            groupText = groupText.append(arrayGroups[i].desc);
            for(var j = 0; j < arrayGroups[i].content.length; j++){
                var panel = $('<div class="panel panel-default" />'),
                    item = arrayGroups[i].content[j],
                    question = item.question,
                    answer = item.answer,
                objQ = $('<div class="panel-heading" role="tab" id="heading_' + i + '_' + j + '">'+
                                '<h4 class="panel-title">'+
                                    '<a role="button" data-toggle="collapse" data-parent="#accordion_' + i + '" href="#collapse_' + i + '_' + j + '" aria-expanded="false" aria-controls="collapse_' + i + '_' + j + '">' + question + '</a>'+
                                '</h4>'+
                            '</div>'),
                objA = $('<div id="collapse_' + i + '_' + j + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading_' + i + '_' + j + '"><div class="block-article-content-text panel-body"></div></div>');
                objA.find('div').append(answer);
                panel = panel.append(objQ, objA);
                panelgroup.append(panel);
            }
            container.append(groupText, panelgroup);
        }
    };
})(jQuery);
$(document).ready(function(){
    $('#blockContent').accordionapp({
        titleGroup: 'h2',
        nodeDescGroup: 'p',
        titleItem: 'h3',
        nodeDescItem: 'p'
    });
});
