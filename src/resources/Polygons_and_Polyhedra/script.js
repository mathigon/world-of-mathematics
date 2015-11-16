// Polygons and Polyhedra
// (c) Mathigon


scripts.Polygons_and_Polyhedra = function(){

    $('#AnglesBox').click( function(){

    $('#AnglesBox .AnimationBar').addClass('off');

    setTimeout( function(){ $('#PolyAngle2').addClass('on'); },  200);
    setTimeout( function(){ $('#PolyAngle4').addClass('on'); }, 1200);
    setTimeout( function(){ $('#PolyAngle6').addClass('on'); }, 2200);
    setTimeout( function(){ $('#PolyAngle5').addClass('on'); }, 3200);
    setTimeout( function(){ $('#PolyAngle3').addClass('on'); }, 4200);

    });

    // =====

    $('#penroseOverlay').click( function(){
        $(this).toggleClass('on');
    });

    // =====

    $('html').append('<div class="preload" style="background-image: url(resources/Polygons_and_Polyhedra/Dual/dual1-2'+browser.imgExt+'.png)"></div>')
             .append('<div class="preload" style="background-image: url(resources/Polygons_and_Polyhedra/Dual/dual1-3'+browser.imgExt+'.png)"></div>')
             .append('<div class="preload" style="background-image: url(resources/Polygons_and_Polyhedra/Dual/dual1-4'+browser.imgExt+'.png)"></div>')
             .append('<div class="preload" style="background-image: url(resources/Polygons_and_Polyhedra/Dual/dual2-2'+browser.imgExt+'.png)"></div>')
             .append('<div class="preload" style="background-image: url(resources/Polygons_and_Polyhedra/Dual/dual2-3'+browser.imgExt+'.png)"></div>')
             .append('<div class="preload" style="background-image: url(resources/Polygons_and_Polyhedra/Dual/dual2-4'+browser.imgExt+'.png)"></div>')

    scripts.require( "scripts/jqueryUI-110.js", function(){

        var rotID = 0;

        var rotating = function( poly ) {
    var rot = Number( poly.attr('data-rot') ) + 15;
    poly.attr('data-rot', rot);
    poly.css('transform', 'rotate('+rot+'deg)');
        };

        $('#draw_frame div').draggable({ containment: "parent" });
        $('#draw_frame div').click( function(ev) {
            if (ev.shiftKey) { $(this).remove(); } else { rotating( $(this) ); }
        });

        $('.draw_icons img').click( function() {
            rotID++
            $('#draw_frame').append('<div id="rotID'+rotID+'" class="draw d_' + $(this).attr('id') + '" data-rot="0"></div>')
            $('#rotID'+rotID).draggable({ containment: "parent" })
                             .click( function(ev) { if (ev.shiftKey) { $(this).remove(); } else { rotating( $(this) ); } });
            });

        // =====

        $( "#dual1slider" ).slider({
            value: 0,
            min: 0,
            max: 23,
            step: 1,
            slide: function( event, ui ) {
                var img = Math.floor( ui.value /  6) + 1;
                var num = (ui.value % 6)*100;
                $( "#dual1" ).css({'background-image':'url(resources/Polygons_and_Polyhedra/Dual/dual1-'+img+browser.imgExt+'.png)',
                                   'background-position': '-'+num+'% 0'})
            }
        });

        $( "#dual2slider" ).slider({
            value: 0,
            min: 0,
            max: 23,
            step: 1,
            slide: function( event, ui ) {
                var img = Math.floor( ui.value /  6) + 1;
                var num = (ui.value % 6)*100;
                $( "#dual2" ).css({'background-image':'url(resources/Polygons_and_Polyhedra/Dual/dual2-'+img+browser.imgExt+'.png)',
                                   'background-position': '-'+num+'% 0'})
            }
        });

        $('.ui-slider-handle').append('<div></div>');
    });

};
