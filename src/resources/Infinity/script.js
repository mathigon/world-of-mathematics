// Infinity
// (c) Mathigon


scripts.Infinity = function(){

    jQuery.getScript( "resources/Infinity/Hilbert1/hilbert1.js" );
    jQuery.getScript( "resources/Infinity/Hilbert2/hilbert2.js" );

    scripts.require( "resources/Infinity/dragdealer.js", function() {

            new Dragdealer('cantor2slider', {
                steps: 11,
                snap: true,
                animationCallback: function(x,y){
                    $('#cantor2box').css("background-position","0 -" + x*1200 + "px");
                }
            });

            new Dragdealer('cantor4slider', {
                steps: 12,
                snap: true,
                animationCallback: function(x,y){
                    $('#cantor4box').css("background-position", "-" + x*180*11 + "px 0");
                }
            });

    });

};
