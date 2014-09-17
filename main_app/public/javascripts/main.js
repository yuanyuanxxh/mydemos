$(function() {
    $(".panel").css({"height":$(window).height()});
    $.scrollify({
        section:".panel"
    });


    $(".scroll").click(function(e) {
        //e.preventDefault();
        $.scrollify("move",$(this).attr("href"));
    });
});

(function($) {
    $.fn.typewriter = function() {
        this.each(function() {
            var $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            var timer = setInterval(function() {
                var current = str.substr(progress, 1);
                if (current == '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                }
            }, 75);
        });
        return this;
    };
})(jQuery);



$("#scroll").hide(0,0,function(){
    $("#code").typewriter();
});



setTimeout(function(){
    $("#scroll").show();
}, 13 * 1000);


