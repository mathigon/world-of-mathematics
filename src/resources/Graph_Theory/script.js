// Graph_Theory
// (c) Mathigon


scripts.Graph_Theory = function(){

    var nxt = "fac";
    $('.g_fac, .g_ver, .g_edg, .g_sum').css('opacity','0');

    $('#g_but').click( function() {

        if( nxt == "fac" ) {
            $('#euler1').attr('src','resources/Graph_Theory/Euler/a4'+browser.imgExt+'.png')
            $('#euler2').attr('src','resources/Graph_Theory/Euler/b4'+browser.imgExt+'.png')
            $('#euler3').attr('src','resources/Graph_Theory/Euler/c4'+browser.imgExt+'.png')
            $('#euler4').attr('src','resources/Graph_Theory/Euler/d4'+browser.imgExt+'.png')
            $('.g_fac').css('opacity','1');
            $('.g_ver, .g_edg, .g_sum').css('opacity','0');
            $('#g_but').html('Click to count vertices&#8230;');
            nxt = "ver";
        } else if( nxt == "ver" ) {
            $('#euler1').attr('src','resources/Graph_Theory/Euler/a2'+browser.imgExt+'.png')
            $('#euler2').attr('src','resources/Graph_Theory/Euler/b2'+browser.imgExt+'.png')
            $('#euler3').attr('src','resources/Graph_Theory/Euler/c2'+browser.imgExt+'.png')
            $('#euler4').attr('src','resources/Graph_Theory/Euler/d2'+browser.imgExt+'.png')
            $('.g_ver').css('opacity','1');
            $('#g_but').html('Click to count edges&#8230;');
            nxt = "edg";
        } else if( nxt == "edg" ) {
            $('#euler1').attr('src','resources/Graph_Theory/Euler/a3'+browser.imgExt+'.png')
            $('#euler2').attr('src','resources/Graph_Theory/Euler/b3'+browser.imgExt+'.png')
            $('#euler3').attr('src','resources/Graph_Theory/Euler/c3'+browser.imgExt+'.png')
            $('#euler4').attr('src','resources/Graph_Theory/Euler/d3'+browser.imgExt+'.png')
            $('.g_edg').css('opacity','1');
            $('#g_but').html('Let us add faces and vertices&#8230;');
            nxt = "sum";
        } else if( nxt == "sum" ) {
            $('#euler1').attr('src','resources/Graph_Theory/Euler/a1'+browser.imgExt+'.png')
            $('#euler2').attr('src','resources/Graph_Theory/Euler/b1'+browser.imgExt+'.png')
            $('#euler3').attr('src','resources/Graph_Theory/Euler/c1'+browser.imgExt+'.png')
            $('#euler4').attr('src','resources/Graph_Theory/Euler/d1'+browser.imgExt+'.png')
            $('.g_sum').css('opacity','1');
            $('#g_but').html('Click to start over');
            nxt = "fac";
        }

    });
}
