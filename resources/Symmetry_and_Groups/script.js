// Symmetry and Groups
// (c) Mathigon


scripts.Symmetry_and_Groups = function(){

    $('#RefBox1').click( function(){
        $('#RefBox1 .AnimationBar').addClass('off');
        setTimeout( function(){ $('#Ref1b').addClass('on'); },  200);
    });

    $('#RefBox2').click( function(){
        $('#RefBox2 .AnimationBar').addClass('off');
        setTimeout( function(){ $('#Ref2b').addClass('on'); },  200);
    });

    $('#RotBox1').click( function(){
        $('#RotBox1 .AnimationBar').addClass('off');
        setTimeout( function(){
            $('#Rot1b').addClass('on1');
            $('#Rot1c').addClass('on1');
        },  200);
        setTimeout( function(){
            $('#Rot1c').addClass('on2');
        },  2200);
    });

    $('#RotBox2').click( function(){
        $('#RotBox2 .AnimationBar').addClass('off');
        setTimeout( function(){ $('#Rot2b').addClass('on'); },  200);
    });

    $('#TransBox1').click( function(){
        $('#TransBox1 .AnimationBar').addClass('off');
        setTimeout( function(){ $('#SymTrans1').addClass('on1'); },  200);
        setTimeout( function(){ $('#SymTrans1').addClass('on2'); }, 1000);
        setTimeout( function(){ $('#SymTrans1').addClass('on3'); }, 1800);
    });

    $('#TransBox2').click( function(){
        $('#TransBox2 .AnimationBar').addClass('off');
        setTimeout( function(){ $('#SymTrans2').addClass('on1'); },  200);
        setTimeout( function(){ $('#SymTrans2').addClass('on2'); }, 1000);
        setTimeout( function(){ $('#SymTrans2').addClass('on3'); }, 1800);
    });

    // ------------------------------------------------------------------------------------------

    scripts.require( "scripts/jqueryUI-110.js", function(){

        $( "#Iso1Slider" ).slider({
            value: 0,
            min: 0,
            max: 80,
            step: 1,
            slide: function( event, ui ) {

                var x =   (ui.value/80) * 36/440 * 100;
                var y = - (ui.value/80) * 21/300 * 100;

                $('#Iso1').css('transform','translate('+x+'%,'+y+'%)')
            }
        });

        $( "#Iso2Slider" ).slider({
            value: 0,
            min: 0,
            max: 80,
            step: 1,
            slide: function( event, ui ) {
                var r = (ui.value/80) * 120;
                $('#Iso2').css('transform','rotate(-'+r+'deg)')
            }
        });

        $( "#Iso3Slider" ).slider({
            value: 0,
            min: 0,
            max: 80,
            step: 1,
            slide: function( event, ui ) {
                var r = 1-(ui.value/40);
                $('#Iso3').css('transform','scaleX('+r+')')
            }
        });

        $( "#Iso4Slider" ).slider({
            value: 0,
            min: 0,
            max: 80,
            step: 1,
            slide: function( event, ui ) {
                var r = 1-(ui.value/40);
                var y = (ui.value/80)*15;
                $('#Iso4').css('transform','scaleX('+r+') translate(0,-'+y+'%)')
            }
        });

        $('.ui-slider-handle').append('<div></div>');

    });

    // ------------------------------------------------------------------------------------------

    var sym_add = function(a,b) {
    var s = 0;
    var p = 0;
    var q = 0;

    if      ( a == 1         ) { s = b                        }
    else if ( b == 1         ) { s = a                        }
    else if ( a < 5 && b < 5 ) { s = (a+b-1)%4; if(s==0){s=4} }
    else if ( a == b         ) { s = 1                        }
    else {
        p = 8-a; if(p==0){p=4};
        q = b-7; if(q==0){q=4};

        if      ( a > 4 && b > 4 ) { s = (p+q  )%4;     if(s<=0){s=s+4} }
        else if ( a > b          ) { s = (a+b-1)%4 + 4; if(s<=4){s=s+4} }
        else                       { s = (5-a+b)%4 + 4; if(s<=4){s=s+4} }
    };

    return s
    };

    var sym = 1;

    $('.sym_button').click( function() {
        var add = $(this).attr('id');
        sym = sym_add(Number(sym),Number(add));

        $('#sym_left').append(' + <img src="resources/Symmetry_and_Groups/square'+add+'.png" width="48" height="48">');
        $('#sym_right').attr('src', 'resources/Symmetry_and_Groups/square'+sym+'@2x.png');
    });

    $('#sym_clear').click( function() {
        sym = 1;
        $('#sym_left').empty();
        $('#sym_left').append('<img src="resources/Symmetry_and_Groups/square1.png" width="48" height="48">');
        $('#sym_right').attr('src', 'resources/Symmetry_and_Groups/square1@2x.png');
    });

};
