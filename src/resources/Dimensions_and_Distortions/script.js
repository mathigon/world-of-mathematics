// Dimensions_and_Distortions
// (c) Mathigon


scripts.Dimensions_and_Distortions = function(){

    scripts.require( "scripts/jsx-098.js", function(){

        var hyplines = 0,
            pointsA = [],
            pointsB = [],
            pointsC = [],
            pointsP = [],
            arcs = [],
            x1 = 0;

        var getMouseCoords = function(e) {
            var cPos = board.getCoordsTopLeftCorner(e),
                absPos = JXG.getPosition(e),
                dx = absPos[0]-cPos[0],
                dy = absPos[1]-cPos[1];

            return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
        };

        var up = function(e) {
            var canCreate = true,
                coords = getMouseCoords(e),
                el;

            // Check whether inside disk
            if( Math.pow(coords.usrCoords[1],2) + Math.pow(coords.usrCoords[2],2) > 1 ) {
                return
            }

            // Check whether clicked existing object
            for (el in board.objects) {
                if(JXG.isPoint(board.objects[el]) && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
                    return;
                }
            }

            if( hyplines ) {
               var x = x1;

               pointsB[x] = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]], {name:'',fillColor:"#D90000", strokeColor:"#D90000"});

                pointsC[x] = board.create('point', [function(){
                    return (pointsA[x].X()/(pointsA[x].X()*pointsA[x].X()+pointsA[x].Y()*pointsA[x].Y()));
                }, function(){
                    return (pointsA[x].Y()/(pointsA[x].X()*pointsA[x].X()+pointsA[x].Y()*pointsA[x].Y()));
                }], {visible:false});

                // Great Circle Centre
                pointsP[x] = board.create('circumcirclemidpoint',[pointsA[x],pointsB[x],pointsC[x]], {visible:false});

                // Hyperbolic Line
                arcs[x] = board.create('minorarc',[pointsP[x],pointsB[x],pointsA[x]],{strokeColor:"#D90000",strokeWidth:2});

                hyplines = 0;
                 x1++;

            } else {
                var x = x1;
                pointsA[x] = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]], {name:'',fillColor:"#D90000", strokeColor:"#D90000"});
                hyplines = 1;
            }
        };

        var board = JXG.JSXGraph.initBoard('hyperbox',{
            boundingbox: [-1.05,1.05,1.05,-1.05],
            axis:true,
            keepaspectratio:true,
            axis:false,
            grid:false,
            showNavigation:false,
            showCopyright:false
        });

        var d = board.create('circle',[[0,0],1],{strokeColor:"#006DD9",highlightStrokeOpacity:1,highlightFillOpacity:1});

        if(browser.isMobile){
            board.on('touchend',up);
        } else {
            board.on('up',up);
        };

    });


    $('#hypbg').change( function(){
        if( $('#hypbg').val() == 0 ) {
            $('#hyperboxoverlay').css('background-image','none');
        } else if( $('#hypbg').val() == 1 ) {
            $('#hyperboxoverlay').css('background-image','url(resources/Dimensions_and_Distortions/tiling'+browser.imgExt+'.png)');
        } else {
            $('#hyperboxoverlay').css('background-image','url(resources/Dimensions_and_Distortions/escher'+browser.imgExt+'.jpg)');
        }

    });


    scripts.require( "resources/Conic_Sections/keyframes.js", function(){

        $.keyframe.browserCode();

        for( i=1; i<=10; i++ ) {

            $.fn.addKeyframe([{
                name:   "letters"+i,
                "0%":   "background-position:      0 -"+((i-1)*100)+"%",
                "9%":   "background-position:  -100% -"+((i-1)*100)+"%",
                "18%":  "background-position:  -200% -"+((i-1)*100)+"%",
                "27%":  "background-position:  -300% -"+((i-1)*100)+"%",
                "36%":  "background-position:  -400% -"+((i-1)*100)+"%",
                "45%":  "background-position:  -500% -"+((i-1)*100)+"%",
                "54%":  "background-position:  -600% -"+((i-1)*100)+"%",
                "63%":  "background-position:  -700% -"+((i-1)*100)+"%",
                "72%":  "background-position:  -800% -"+((i-1)*100)+"%",
                "81%":  "background-position:  -900% -"+((i-1)*100)+"%",
                "90%":  "background-position: -1000% -"+((i-1)*100)+"%",
                "100%": "background-position: -1100% -"+((i-1)*100)+"%"
            }]);

            $('#LetterBox'+i).attr('data-num',i);

            $('#LetterBox'+i).click( function(){
                var n = Number($(this).attr('data-num'));

                if(n) {
                    $(this).attr('data-num','0');
                    $('#LetterBox'+n+' .AnimationBar').addClass('off');

                    $('#Letter'+n).css({
                        "animation": "letters"+n+" .8s step-start",
                        "animation-delay": ".1s"
                    });

                    setTimeout( function(){
                        $('#Letter'+n).css("background-position","-1100% -"+((n-1)*100)+"%")
                    }, 200);

                    $('#Letter'+n).css('AnimationPlayState', 'running');
                };

            });

       }
    });

};
