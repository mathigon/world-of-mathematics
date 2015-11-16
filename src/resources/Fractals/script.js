// Fractals
// (c) Mathigon


scripts.Fractals = function(){

    $('#fracPascalButoon').click( function(){
        $('#fracPascal2').css('opacity','1');
        $('#fracPascalButoon').fadeOut(1000);
        setTimeout( function(){
            $('#fracPascalDesc').fadeIn(1000);
        }, 1010);
    });

    // ========================================

    $('.fracAutoRule').click( function(){
        $(this).toggleClass('on');
        fracAuto();
    });

    var fracAutoTableString="";

    for( var i=0; i<15; i++) {
        fracAutoTableString += "<tr id='fracTableRow"+i+"'>";
        for( var j=0; j<23; j++) {
            fracAutoTableString += "<td id='fracTableCell"+j+"'></td>";
        };
        fracAutoTableString += "</tr>";
    };

    $('#fracAutoTable').html(fracAutoTableString);
    $('#fracTableRow0 #fracTableCell11').addClass('on');

    function fracAuto() {

        for( var i=1; i<15; i++) {
            for( var j=0; j<23; j++) {

                var temp = ($('#fracTableRow'+(i-1)+' #fracTableCell'+(j-1)).hasClass('on')?"1":"0") +
                           ($('#fracTableRow'+(i-1)+' #fracTableCell'+(j  )).hasClass('on')?"1":"0") +
                           ($('#fracTableRow'+(i-1)+' #fracTableCell'+(j+1)).hasClass('on')?"1":"0");

                     if( temp == "000" ) { var colour = $('#fracRule1').hasClass('on')?1:0 }
                else if( temp == "001" ) { var colour = $('#fracRule2').hasClass('on')?1:0 }
                else if( temp == "010" ) { var colour = $('#fracRule3').hasClass('on')?1:0 }
                else if( temp == "011" ) { var colour = $('#fracRule4').hasClass('on')?1:0 }
                else if( temp == "100" ) { var colour = $('#fracRule5').hasClass('on')?1:0 }
                else if( temp == "101" ) { var colour = $('#fracRule6').hasClass('on')?1:0 }
                else if( temp == "110" ) { var colour = $('#fracRule7').hasClass('on')?1:0 }
                else if( temp == "111" ) { var colour = $('#fracRule8').hasClass('on')?1:0 }
                else { var colour = 0 };

                if( colour ) { $('#fracTableRow'+i+' #fracTableCell'+j).addClass('on') } else { $('#fracTableRow'+i+' #fracTableCell'+j).removeClass('on') };

            };
        };
    };


    // ========================================

    var mandelOn   = 1;
    var mandelMove = 1;

    for( i=1; i<20; i++ ) {
        $('#mandelWrap').append('<div class="mandelImg" id="mandel'+i+'" style="background-image: url(resources/Fractals/mandel/mandel'+i+'.jpg)"></div>')
    }

    $('#mandelWrap').append('<div id="mandelScale" class="sansSerif">&times 1</div><div id="mandelPlus"></div><div id="mandelMinus"></div>');

    $('#mandel1').addClass('mandelOn')
    $('#mandel2').addClass('mandelNext')
    $('#mandel3').addClass('mandelNext2')

    $('#mandelPlus').click( function(){
        if( mandelOn<19 && mandelMove ) {
            mandelMove = 0;
            mandelOn++;
            $('#mandelScale').html('&times '+Math.pow(4,mandelOn-1));

            $('#mandel'+(mandelOn-2)).removeClass('mandelPrev').addClass('mandelPrev2');
            $('#mandel'+(mandelOn-1)).removeClass('mandelOn').addClass('mandelPrev');
            $('#mandel'+(mandelOn  )).removeClass('mandelNext').addClass('mandelOn');
            $('#mandel'+(mandelOn+1)).removeClass('mandelNext2').addClass('mandelNext');
            $('#mandel'+(mandelOn+2)).addClass('mandelNext2');

            setTimeout( function(){ mandelMove = 1; }, 800);
        };
    });

    $('#mandelMinus').click( function(){
        if( mandelOn>1 && mandelMove ) {
            mandelMove = 0;
            mandelOn--;
            $('#mandelScale').html('&times '+Math.pow(4,mandelOn-1));

            $('#mandel'+(mandelOn-2)).addClass('mandelPrev2');
            $('#mandel'+(mandelOn-1)).removeClass('mandelPrev2').addClass('mandelPrev');
            $('#mandel'+(mandelOn  )).removeClass('mandelPrev').addClass('mandelOn');
            $('#mandel'+(mandelOn+1)).removeClass('mandelOn').addClass('mandelNext');
            $('#mandel'+(mandelOn+2)).removeClass('mandelNext').addClass('mandelNext2');
            $('#mandel'+(mandelOn+3)).removeClass('mandelNext2');

            setTimeout( function(){ mandelMove = 1; }, 800);
        };
    });

    function inMandel(x,y) {

        var x1 = 10*x + 15;
        var x2 = 10*y + 10;

        var array = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]
        ];

        return array[[x2]][[x1]]
    };

    /* MATHEMATICA CODE:

    MandelComp = Compile[
       {{c, _Complex}},
       Module[{num = 1},
        FixedPoint[(num++; #^2 + c) &, 0, 999,
         SameTest -> (Re[#]^2 + Im[#]^2 >= 4 &)];
        num],
       CompilationTarget -> "C"
       ];
    Table[If[MandelComp[x/10 + y I/10] == 1000, 1, 0], {y, -10,
      10}, {x, -15, 11}]

    */

    function mandelComplex(b,x,y) {

        var x1 = Math.round(x*100) / 100;
        var y1 = Math.round(y*100) / 100;

        if (!y1) {
            if(x1 < 0){
                return '&#8211;'+String(-x1);
            } else {
                return String(x1);
            }
        } else if(!x1) {
            if(y1 < 0){
                return '&#8211;'+String(-y1)+'<em>i</em>';
            } else {
                return String(y1)+'<em>i</em>';
            }
        } else if ( y1 < 0){
            return (b?'(':'')+(x1<0?('&#8211;'+String(-x1)):String(x1))+' &#8211; '+(-y1)+'<em>i</em>'+(b?')':'');
        } else {
            return  (b?'(':'')+(x1<0?('&#8211;'+String(-x1)):String(x1))+' + '+y1+'<em>i</em>'+(b?')':'');
        };
    };

    scripts.require( "scripts/jqueryUI-110.js", function(){

        $( "#mandelTarget" ).draggable({
            containment: "#mandelMove",
            scroll: false,
            drag: function() {
                var x = Math.round((          ($('#mandelTarget').position().left)/$('#mandelMove').width()  * 2.915 - 1.648 )*10)/10;
                var y = Math.round((  1.113 - ($('#mandelTarget').position().top )/$('#mandelMove').height() * 2.203         )*10)/10;

                $('#mandelCalculation .red'   ).html(mandelComplex( 0, x, y ));
                $('#mandelCalculation #green1').html(mandelComplex( 0, x, y ));
                $('#mandelCalculation #green2').html(mandelComplex( 1, x, y ));
                $('#mandelCalculation #cyan1' ).html(mandelComplex( 0, ( x*x - y*y + x ), ( y*(1+2*x) ) ));
                $('#mandelCalculation #cyan2' ).html(mandelComplex( 1, ( x*x - y*y + x ), ( y*(1+2*x) ) ));
                $('#mandelCalculation #blue1' ).html(mandelComplex( 0, ( x*(1+x*(1+2*x+x*x)) + y*y*(y*y-(1+6*x*(1+x))) ), ( y*(1+2*x*(1+3*x+2*x*x) - 2*y*y*(1+2*x)) ) ));
                $('#mandelCalculation #blue2' ).html(mandelComplex( 1, ( x*(1+x*(1+2*x+x*x)) + y*y*(y*y-(1+6*x*(1+x))) ), ( y*(1+2*x*(1+3*x+2*x*x) - 2*y*y*(1+2*x)) ) ));
                $('#fracTargetFinal'          ).html(mandelComplex( 0, ( x*(1+x)*(1+x*x*(1+x)*(2+x)*(1+x*x))-(1+2*x*(3+x*(15+x*(30+x*(45+14*x*(3+x))))))*y*y+y*y*y*y*(5*(1+2*x*(3+x*(9+7*x*(2+x))))-2*(3+14*x*(1+x))*y*y+y*y*y*y) ), ( y*(1+2*x*(1+x*(1+2*x+x*x))*(1+2*x*(1+x)*(1+2*x))-2*y*y*(1+2*x*(5+x*(15+x*(30+7*x*(5+2*x))))-y*y*(3+2*x*(9+7*x*(3+2*x)))+2*y*y*y*y*(1+2*x))) ) ));

                if( inMandel(x,y) ) {
                    $('#MandelIn').css('display','none');
                    $('#MandelNo').css('display','block');
                } else {
                    $('#MandelIn').css('display','block');
                    $('#MandelNo').css('display','none');
                }

            }
        });

    });

}
