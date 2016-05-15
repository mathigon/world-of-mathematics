// Conic_Sections
// (c) Mathigon


scripts.Conic_Sections = function(){

    if( browser.isMobile ){
       var PiString = $('.PiString.onlyMobile')
    } else {
       var PiString = $('.PiString.onlyDesktop')
    }

    var PiHighlight = $('.PiHighlight');

    PiString.bind("propertychange keyup input paste", function(){

        if( PiHighlight[0] )
            PiHighlight.replaceWith( PiHighlight.html() );

        if( (Number(PiString.val())+1) && (PiString.val() != "") ){
            $('#PiDigits').html(
                $('#PiDigits').html().replace( PiString.val(), '<span class="PiHighlight">'+PiString.val()+'</span>'  )
            );
            PiHighlight = $('.PiHighlight');
        };

        if( PiHighlight[0] ) {
            $('#PiNot').removeClass('on');
            var s = $('#PiDigits').scrollTop() + PiHighlight.position().top - 100;
            $('#PiDigits').stop().animate({ scrollTop: s }, 500);
        } else if( PiString.val() != "" ) {
            $('#PiNot').addClass('on');
        };

    });


    scripts.require( "resources/Conic_Sections/spritespin.js", function(){

        var conepath = "resources/Conic_Sections/cone"+browser.imgExt+"/cone";

        $("#conics-cone").spritespin({
            width     : 760,  // window width
            height    : 270,  // window height
            frames    : 28,   // number of frames
            animate   : false,
            frameWrap : false,
            sense     : 2,
            frame     : 0,
            onLoad    : function(){ $('#conics-cone').css({'width':'100%','height':'100%'}); },
            source    : [
                            conepath+"00.png",
                            conepath+"01.png",
                            conepath+"02.png",
                            conepath+"03.png",
                            conepath+"04.png",
                            conepath+"05.png",
                            conepath+"06.png",
                            conepath+"07.png",
                            conepath+"08.png",
                            conepath+"09.png",
                            conepath+"10.png",
                            conepath+"11.png",
                            conepath+"12.png",
                            conepath+"13.png",
                            conepath+"14.png",
                            conepath+"15.png",
                            conepath+"16.png",
                            conepath+"17.png",
                            conepath+"18.png",
                            conepath+"19.png",
                            conepath+"20.png",
                            conepath+"21.png",
                            conepath+"22.png",
                            conepath+"23.png",
                            conepath+"24.png",
                            conepath+"25.png",
                            conepath+"26.png",
                            conepath+"27.png"
                        ]
        }).bind("onFrame", function(){
            var frame = $("#conics-cone").spritespin("frame");
            $('.conetab').removeClass('on');

            if( frame == 0 ) {
                $('#conetab1').addClass('on');
            } else if( frame < 20 ) {
                $('#conetab2').addClass('on');
            } else if( frame == 20 ) {
                $('#conetab3').addClass('on');
            } else {
                $('#conetab4').addClass('on');
            };
        });

        $('#conetab1').click(function(){ $("#conics-cone").spritespin("frame",  0); });
        $('#conetab2').click(function(){ $("#conics-cone").spritespin("frame", 12); });
        $('#conetab3').click(function(){ $("#conics-cone").spritespin("frame", 20); });
        $('#conetab4').click(function(){ $("#conics-cone").spritespin("frame", 27); });

    });


    scripts.require(  "resources/Conic_Sections/keyframes.js", function(){

        var AnimationData = {
            pages: 3,
            columns: 6,
            rows: 3,
            count: 49,
            width: 204,
            height: 280,
            url: ["resources/Conic_Sections/kepler/kepler1.png","resources/Conic_Sections/kepler/kepler2.png","resources/Conic_Sections/kepler/kepler3.png"],
            url2x: ["resources/Conic_Sections/kepler/kepler1@2x.png","resources/Conic_Sections/kepler/kepler2@2x.png","resources/Conic_Sections/kepler/kepler3@2x.png"]
        };

        var Animation = new Object();
        var AnimationCount  = 0;
        Animation.name = "kepler-sequence";

        for( var i=0; i < AnimationData.pages; i++ ) {
            for( var j=0; j < AnimationData.rows; j++ ) {
                for( var k=0; k < AnimationData.columns; k++ ) {

                    if( AnimationCount < AnimationData.count ){
                        Animation[ String(AnimationCount/AnimationData.count*100)+"%" ] =
                            "background-image: url(" + (browser.isRetina?(AnimationData.url2x[i]):(AnimationData.url[i])) + "); background-position: " + (-AnimationData.width*k) + "px " + (-AnimationData.height*j) + "px;";
                    };
                    AnimationCount++;
                };
            };
        };

        $.fn.addKeyframe([ Animation ]);

        $('#KeplerBox').click( function(){

            $('#kepler').css({
                "animation": "kepler-sequence 2.450s step-start",
                "animation-delay": ".1s"
            });

            $('#kepler')[0].style.webkitAnimationPlayState = "running";

            $('#KeplerBox .AnimationBar').addClass('off');
            setTimeout( function(){
                $('#KeplerBox .AnimationBar').addClass('replay');
                $('#kepler').css({"background-image":"url(resources/Conic_Sections/kepler/kepler3"+browser.imgExt+".png)",
                                 "background-position":"0 -560px"});
            }, 600);

            $('#kepler').on('webkitAnimationEnd', function() {
                this.style.webkitAnimationPlayState = "paused";
                setTimeout( function(){ $('#KeplerBox .AnimationBar').removeClass('off'); }, 200);
            });
        });

    });

};
