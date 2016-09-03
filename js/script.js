(function($) {
    $.fn.accordionapp = function() {
        
        var clone = this.clone();
        //console.log(clone);
        clone.find('h2').each(function(){
            var titleGroup = $(this),
                descGroup = $(this).next(),
                content = descGroup[0].tagName.toLowerCase() === 'p' ? titleGroup.nextUntil('h3') : null;
            console.log(content);
        })
    };
})(jQuery);
$(document).ready(function(){
    $('#blockContent').accordionapp();
});
