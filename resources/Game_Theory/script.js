// Game Theory
// (c) Mathigon


scripts.Game_Theory = function(){


    // CHOCOLATE GAME ====================================

    var Choc1 = {

        running: 1,
        userBox: 0,
        userCount: 0,
        chocTotal: 0,

        userEat: function(td){

            var available = 1 - td.hasClass('off');
            var whichBox = Number(td.parents('.choc_box').attr('id').charAt(7));

            if( Choc1.userBox == 0 ) {
                Choc1.userBox = whichBox;
                $('#choc_1_'+(3-whichBox)).removeClass('on');
                $('#chocButton').addClass('on');
            }

            if( available && whichBox == Choc1.userBox ) {
                Choc1.userCount++;
                Choc1.chocTotal++;
                td.addClass('off');
            } else if ( available ) {
                alert('You can only take chocolates from one box.');
            }
        },

        nextTurn: function(){

            Choc1.running = 0;
            $('#chocButton').removeClass('on').addClass('off');

            setTimeout( function() {
                var set1 = 0;
                for( i=1; i<=9; i++ ) {
                    var myChoc = $('#choc_1_'+(3-Choc1.userBox)+' .ch_'+i);
                    if ( !(myChoc.hasClass('off')) && set1 < Choc1.userCount ) {
                        myChoc.addClass('off');
                        set1++;
                    }
                };
            }, 500 );

            setTimeout( function() {
                Choc1.chocTotal += Choc1.userCount;
                Choc1.userCount = 0;
                Choc1.userBox = 0;

                if( Choc1.chocTotal < 18 ) {
                    Choc1.running = 1;
                    $('.choc_box').addClass('on');
                    $('#chocButton').removeClass('off');
                } else {
                    $('.choc_box').removeClass('on');
                    $('#chocButton').html('You lost! Click to start over.').removeClass('off').addClass('on').addClass('ended');
                }

                Choc1.running = 1;
            }, 1000 );

        },

        resetBox: function(){
            Choc1.running = 1;
            Choc1.chocTotal = 0;
            $('.choc_box').addClass('on');
            $('#choc_1_wrap td').removeClass('off');
            $('#chocButton').addClass('off').removeClass('ended');

            setTimeout( function(){
                $('#chocButton').html('Click to end your turn').removeClass('off');
            }, 550);
        }

    };

    $('#choc_1_wrap td').click( function(e){
        if( Choc1.running ) {
            Choc1.userEat( $(this) );
        }
    });

    $('#chocButton').click( function(e) {
        if( $(this).hasClass('ended') ) {
            Choc1.resetBox();
        } else if( Choc1.userCount > 0 ) {
            Choc1.nextTurn();
        } else {
            alert('You need to take at least one chocolate!');
        }
    });



    // GENERAL SLIDESHOWS ====================================

    function SlideshowGoTo( wrap, n ) {

        var $old = wrap.find('p.on');
        var $new = wrap.find('p:eq('+n+')');

        wrap.height( wrap.height() ).addClass('changing');
        $old.removeClass('on');

        setTimeout( function(){
            wrap.addClass('animateHeight').height( $new.height() );
        }, 150);

        setTimeout( function(){
            $new.addClass('on');
        }, 300);

        setTimeout( function(){
            wrap.removeClass('animateHeight changing').css('height','auto');
        }, 600);
    };



    // FIRST SLIDESHOW ====================================

    var s1count = 1;

    $('#GamesSlide1 .slideshowLeft').click( function() {
        if( s1count  > 1 ) {
            $('#c_1_'+s1count).css('opacity','0');
            s1count--;
            SlideshowGoTo( $('#GamesSlide1 .slideshowText'), s1count-1 );
        }
        if( s1count == 1  ) { $('#c_1_0' ).css('opacity','1'); }
        if( s1count == 7  ) { $('#c_1_7' ).css('opacity','1'); }
        if( s1count == 10 ) { $('#c_1_10').css('opacity','1'); }
        if( s1count == 12 ) { $('#c_1_12').css('opacity','1'); }

        if( s1count == 1  ) { $('#GamesSlide1 .slideshowLeft' ).addClass('off');    }
        if( s1count == 13 ) { $('#GamesSlide1 .slideshowRight').removeClass('off'); }
    })

    $('#GamesSlide1 .slideshowRight').click( function() {
        if( s1count  < 14 ) {
            s1count++;
            $('#c_1_'+s1count).css('opacity','1');
            SlideshowGoTo( $('#GamesSlide1 .slideshowText'), s1count-1 );
        }
        if( s1count == 2  ) { $('#c_1_0' ).css('opacity','0'); }
        if( s1count == 8  ) { $('#c_1_7' ).css('opacity','0'); }
        if( s1count == 11 ) { $('#c_1_10').css('opacity','0'); }
        if( s1count == 13 ) { $('#c_1_12').css('opacity','0'); }

        if( s1count == 2  ) { $('#GamesSlide1 .slideshowLeft' ).removeClass('off'); }
        if( s1count == 14 ) { $('#GamesSlide1 .slideshowRight').addClass('off');    }
    })



    // SECOND SLIDESHOW ====================================

    var s2count = 1;

    $('#GamesSlide2 .slideshowLeft').click( function() {
        if( s2count > 1 ) {
            $('#c_2_'+s2count).css('opacity','0');
            s2count--;
            SlideshowGoTo( $('#GamesSlide2 .slideshowText'), s2count-1 );
        }
        if( s2count == 1 ) { $('#GamesSlide2 .slideshowLeft' ).addClass('off');    }
        if( s2count == 8 ) { $('#GamesSlide2 .slideshowRight').removeClass('off'); }
    });

    $('#GamesSlide2 .slideshowRight').click( function() {
        if( s2count  < 9 ) {
            s2count++;
            $('#c_2_'+s2count).css('opacity','1');
            SlideshowGoTo( $('#GamesSlide2 .slideshowText'), s2count-1 );
        }
        if( s2count == 2 ) { $('#GamesSlide2 .slideshowLeft' ).removeClass('off'); }
        if( s2count == 9 ) { $('#GamesSlide2 .slideshowRight').addClass('off');    }
    });



    // NIM SUM ANIMATION ====================================

    var NimCount = 1;
    NimTable(1);

    function NimTable(x) {

        $('.col0, .col1, .col2, .col3, #row0 td, #row1 td, #row2 td, #row3 td, #row4 td, .colx' ).css({'color':'#000','font-weight':'500','opacity':'0'})

        switch(x) {
            case 1: $('.col0'   ).css({'color':'#D90000','font-weight':'700'});
                    $('#row0 td').css({'color':'#0040FF','font-weight':'700'}); break;
            case 2: $('#row1 td').css({'color':'#00B200','font-weight':'700'}); break;
            case 3: $('#row2 td').css({'color':'#3CF'   ,'font-weight':'700'}); break;
            case 4: $('#row3 td').css({'color':'#006DD9','font-weight':'700'}); break;
            case 6: $('.col3'   ).css({'color':'#F60'   ,'font-weight':'700'}); break;
            case 7: $('.col2'   ).css({'color':'#906'   ,'font-weight':'700'}); break;
            case 8: $('.col1'   ).css({'color':'#F09'   ,'font-weight':'700'}); break;
            case 9: $('#row4 td').css({'color':'#D90000','font-weight':'700'});
                    $('.colx'   ).css({'color':'#D90000','font-weight':'700'}); break;
        }

        if( x >= 1 ) { $('.col0, #row0 td').css('opacity','1') }
        if( x >= 2 ) { $('       #row1 td').css('opacity','1') }
        if( x >= 3 ) { $('       #row2 td').css('opacity','1') }
        if( x >= 4 ) { $('       #row3 td').css('opacity','1') }
        if( x >= 6 ) { $('.col3          ').css('opacity','1') }
        if( x >= 7 ) { $('.col2          ').css('opacity','1') }
        if( x >= 8 ) { $('.col1          ').css('opacity','1') }
        if( x >= 9 ) { $('       #row4 td').css('opacity','1') }
    }

    $('#NimSlideshow .slideshowLeft').click( function() {
        if( NimCount > 1 ) {
            NimCount--;
            NimTable(NimCount);
            SlideshowGoTo( $('#NimSlideshow .slideshowText'), NimCount-1 );
        };
        if( NimCount == 1 ) { $('#NimSlideshow .slideshowLeft' ).addClass('off');    }
        if( NimCount == 8 ) { $('#NimSlideshow .slideshowRight').removeClass('off'); }
    });

    $('#NimSlideshow .slideshowRight').click( function() {
        if( NimCount < 9 ) {
            NimCount++;
            NimTable(NimCount);
            SlideshowGoTo( $('#NimSlideshow .slideshowText'), NimCount-1 );
        };
        if( NimCount == 2 ) { $('#NimSlideshow .slideshowLeft' ).removeClass('off'); }
        if( NimCount == 9 ) { $('#NimSlideshow .slideshowRight').addClass('off');    }
    });



    // NIM GAME ====================================

    var NimOriginal = [];
    var NimPiles = [];

    function BinaryDigitalSum(x) {
        var binary = [];

        for( var i=0; i<x.length; i++ ){
            var my = x[i];
            binary[i] = [0,0,0,0,0,0,0];

            if( my>=64 ) { binary[i][6] = 1; my -= 64; }
            if( my>=32 ) { binary[i][5] = 1; my -= 32; }
            if( my>=16 ) { binary[i][4] = 1; my -= 16; }
            if( my>= 8 ) { binary[i][3] = 1; my -=  8; }
            if( my>= 4 ) { binary[i][2] = 1; my -=  4; }
            if( my>= 2 ) { binary[i][1] = 1; my -=  2; }
            if( my>= 1 ) { binary[i][0] = 1; my -=  1; }
        };

        var binarySum = [0,0,0,0,0,0,0];

        for( var i=0; i<7; i++ ){
            for( var j=0; j<x.length; j++ ){
                binarySum[i] += binary[j][i];
            };
            binarySum[i] = binarySum[i]%2;
        };

        var sum = binarySum[0]*1 + binarySum[1]*2 + binarySum[2]*4 + binarySum[3]*8 + binarySum[4]*16 + binarySum[5]*32 + binarySum[6]*64;

        return sum;
    };

    function mySum(x) {
        s=0;
        for( var i=0; i<x.length; i++ ) {
            s += x[i];
        };
        return s;
    };

    function NimSolution() {
        var temp = 0;

        for( var i=0; i<NimPiles.length; i++ ) {
            for( var j=0; j<NimPiles[i]; j++ ) {

                temp = NimPiles.slice(0);
                temp[i] = j;

                if( BinaryDigitalSum(temp) == 0 ) {
                    return temp;
                };

            }
        }

        return NimPiles;
    }

    var Nim = {
        running: 1,

        nextTurn: function(){

            if( mySum(NimPiles) == 0 ) {

                $('#NimWon').removeClass('off');

            } else if( BinaryDigitalSum(NimPiles) == 0 ) {

                setTimeout( function(){
                    var myCounter = $('.NimCounter:not(.off):eq(0)')
                    myCounter.addClass('off');
                    var myPile = Number(myCounter.attr('id').split('_')[1]);
                    NimPiles[myPile] --;
                    Nim.running = 1;
                }, 900);

            } else {

                setTimeout( function(){

                    var myNew = NimSolution();

                    for( var i=0; i<NimPiles.length; i++ ) {
                        if( myNew[i] != NimPiles[i] ) {
                            for( var j=0; j<(NimOriginal[i]- myNew[i]); j++){
                                $('#nim_'+i+'_'+j).addClass('off');
                            };
                        };
                    };
                    NimPiles = myNew;

                    if( mySum(NimPiles) == 0 ) {
                        $('#NimLost').removeClass('off');
                    } else {
                        Nim.running = 1;
                    }
                }, 900);

            };
        }
    };

    function NimSetup(){

        $('#NimLost, #NimWon').addClass('off');

        var myNim  = $('#NimText').val().replace("(","").replace(")","").split(",");
        var myText = "<tr>"

        NimOriginal = [];
        NimPiles    = [];

        for( var i=0; i<myNim.length; i++ ) {
            myText += "<td>"
            for( var j = 0; j<Number(myNim[i]); j++ ) {
                myText += "<div class='NimCounter' id='nim_"+i+"_"+j+"' ></div>"
            };
            myText += "</td>"
            NimOriginal[i] = Number(myNim[i]) || 0;
            NimPiles[i]    = Number(myNim[i]) || 0;
        };
        myText += "</tr>"

        $('#NimTable').html(myText);

        $('.NimCounter').mouseenter( function(){
            if(Nim.running && !($(this).hasClass('off')) ){
                var myID = $(this).attr('id').split('_');

                for(var i=0; i<=Number(myID[2]); i++) {
                    $('#nim_'+myID[1]+'_'+i).addClass('half');
                };
            }
        });

        $('.NimCounter').mouseleave( function(){
            $('.NimCounter.half').removeClass('half');
        });

        $('.NimCounter').click( function(){
            if(Nim.running && !($(this).hasClass('off')) ){
                Nim.running = 0;
                var myID = $(this).attr('id').split('_');

                for(var i=0; i<=Number(myID[2]); i++) {
                    $('#nim_'+myID[1]+'_'+i).addClass('off');
                };
                NimPiles[Number(myID[1])] = NimOriginal[Number(myID[1])] - Number(myID[2]) - 1;
                Nim.nextTurn();
            }
        });

        Nim.running = 1;
    };

    $('#NimButton').click( function(){ NimSetup() });
    NimSetup();

}
