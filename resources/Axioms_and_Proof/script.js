// Axioms_and_Proof
// (c) Mathigon


scripts.Axioms_and_Proof = function(){

    scripts.require( "scripts/jqueryUI-110.js", function(){
    scripts.require( "resources/Axioms_and_Proof/tower.js", function(){
    scripts.require( "resources/Axioms_and_Proof/disk.js", function(){
    scripts.require( "resources/Axioms_and_Proof/game.js", function(){

        new Game().init();

        $("#numDisks").change( function() {
            new Game().init();
        });

        $("#startOver").click(function() {
            new Game().init();
        });

        $(window).resize(function() {
            TOWER_WIDTH  = $('#Hanoi').width() / 3 - 1;
            DISK_WIDTHS = [ 0.3*TOWER_WIDTH, 0.4*TOWER_WIDTH, 0.5*TOWER_WIDTH, 0.6*TOWER_WIDTH, 0.7*TOWER_WIDTH, 0.8*TOWER_WIDTH, 0.9*TOWER_WIDTH ];
        });

    });
    });
    });
    });

};
