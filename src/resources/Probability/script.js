// Probability
// (c) Mathigon


var diceHits = [];

// N[Normalize[ With[{n = 6}, CoefficientList[Expand[(x + x^2 + x^3 + x^4 + x^5 + x^6)^n], x]], Total], 2]
var diceP = {
    "1":  [0, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17],
    "2":  [0, 0, 0.028, 0.056, 0.083, 0.11, 0.14, 0.17, 0.14, 0.11, 0.083, 0.056, 0.028],
    "3":  [0, 0, 0, 0.0046, 0.014, 0.028, 0.046, 0.069, 0.097, 0.12, 0.13, 0.13, 0.12, 0.097, 0.069, 0.046, 0.028, 0.014, 0.0046],
    "4":  [0, 0, 0, 0, 0.00077, 0.0031, 0.0077, 0.015, 0.027, 0.043, 0.062, 0.080, 0.096, 0.11, 0.11, 0.11, 0.096, 0.080, 0.062, 0.043, 0.027, 0.015, 0.0077, 0.0031, 0.00077],
    "5":  [0, 0, 0, 0, 0, 0.00013, 0.00064, 0.0019, 0.0045, 0.0090, 0.016, 0.026, 0.039, 0.054, 0.069, 0.084, 0.095, 0.10, 0.10, 0.095, 0.084, 0.069, 0.054, 0.039, 0.026, 0.016, 0.0090, 0.0045, 0.0019, 0.00064, 0.00013],
    "6":  [0, 0, 0, 0, 0, 0, 0.000021, 0.00013, 0.00045, 0.0012, 0.0027, 0.0054, 0.0098, 0.016, 0.025, 0.036, 0.048, 0.061, 0.074, 0.084, 0.090, 0.093, 0.090, 0.084, 0.074, 0.061, 0.048, 0.036, 0.025, 0.016, 0.0098, 0.0054, 0.0027, 0.0012, 0.00045, 0.00013, 0.000021]
}

function DiceTable(n) {

    var probs = diceP[n];
    var pmax  = Number(probs[Math.round(7*n/2)]) + 0.01;

    var t = '<tr>';
    for(var i=n; i<=6*n; i++) {
        t += '<td><span class="dice sansSerif">'+String(i)+'</span></td>';
    }
    t += '</tr>';

    t += '<tr class="green">';
    for(var i=n; i<=6*n; i++) {
        t += '<td>'+probs[i]+'</td>';
    }
    t += '</tr>';

    t += '<tr class="lblue">';
    for(var i=n; i<=6*n; i++) {
        t += '<td id="dc1'+String(i)+'">0</td>';
    }
    t += '</tr>';

    t += '<tr>';
    for(var i=n; i<=6*n; i++) {
        t += '<td><div class="pBox"><div class="diceCount" id="dc2'+String(i)+'"></div><div class="diceProb" style="bottom: '+String(probs[i]/pmax*100)+'%"></div></div></td>';
    }
    t += '</tr>';

    $('#probTable').html(t);

    for(var i=0; i<=60; i++) { diceHits[i] = 0; }
    hitsTotal = 0;
};

function probChoose(p,x) {
    var count = 0;
    for( var i=1; i<60; i++) {
        count += p[i];
        if( count >= x) { return i; }
    }
};

function rollDice(p,d) {
    var x = probChoose(p,Math.random());

    diceHits[x] = diceHits[x] ? (diceHits[x]+1) : 1;
    var hitsMax = Math.max.apply( Math, diceHits );

    for(var i=d; i<=6*d; i++) {
        $('#dc1'+String(i)).html(String(diceHits[i]));
        $('#dc2'+String(i)).css('height',(diceHits[i]/hitsMax*100)+'%');
    };
}

scripts.Probability = function(){

    DiceTable(2);

    $('#rollOnce').click( function(){
        var d = V.Dice;
        rollDice(diceP[d],d);
    });

    $('#roll100').click( function(){
        var d = V.Dice;
        var p = diceP[d];

        for( i=0; i<100; i++) {
            setTimeout( function() {
                rollDice(p,d);
            },100*i);
        }
    });

    $('#roll1000').click( function(){
        var d = V.Dice;
        var p = diceP[d];

        for( i=0; i<1000; i++) {
            setTimeout( function() {
                rollDice(p,d);
            },10*i);
        }
    });

    // ================================================================

    function randomCircles(){
        var c = document.getElementById("randomCircles");
        var ctx=c.getContext("2d");
        ctx.clearRect(0,0,600,600);

        for(i=0; i<50; i++){

            var r  = Math.floor( Math.random()*100 );
            var c1 = r + Math.floor( Math.random()*(600-2*r) );
            var c2 = r + Math.floor( Math.random()*(600-2*r) );
            var x1 = Math.floor( Math.random()*255 );
            var x2 = Math.floor( Math.random()*255 );
            var x3 = Math.floor( Math.random()*255 );

            ctx.beginPath();
            ctx.arc(c1, c2, r, 0, 2*Math.PI, false);
            ctx.fillStyle = "rgba("+x1+","+x2+","+x3+",0.4)";
            ctx.fill();

        };
    };

    randomCircles();

    $('#randomCircles, #randomCircleRefresh').click( function(){
        randomCircles();
        return false;
    });

    // ================================================================

    var $radio = $('#Radioactive');

    for(var i=0; i<15; i++) {
        for(var j=0; j<10; j++) {
            $radio.append('<div id="radio'+i+'-'+j+'" class="Atom on" style="left: '+(i*6.667)+'%; top: '+(j*10)+'%"></div>')
        }
    };

    var RadioN = 150;

    function decay(){
        var tx = - 20000 * Math.log(1 - Math.random() ) / RadioN;
        var Atoms = $('.Atom.on');
        var which = Math.floor( Math.random() * Atoms.length );

        setTimeout( function(){
            $('.Atom.on:eq('+which+')').removeClass('on');
            RadioN--
            if( RadioN > 0 ) { decay(); };
        }, tx)
    };

    $('#RadioBox').click( function(){
        if( !($('#RadioBox .AnimationBar').hasClass('off')) ) {
            $('#RadioBox .AnimationBar').addClass('off');
            decay();
        }
    });

}

