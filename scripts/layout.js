// =============================================================
// MATHIGON - WORLD OF MATHEMATICS
// =============================================================

// Copyright (c) Mathigon / Philipp Legner, 2013
// Not to be reused without permission



// ================================================================================================
// ======================================= GLOBAL VARIABLES =======================================

var scripts = {};

scripts.require = function( src, fn ){
    var name = src.substring( src.lastIndexOf('/')+1, src.indexOf('.')  );
    if( scripts[name] ) fn();
    else                jQuery.getScript( src ).done( function(){ scripts[name] = 1; fn(); });
}

var browser = {
    width:      window.innerWidth,
    height:     window.innerHeight,
    html:       document.getElementsByTagName('html')[0],

    isMobile:   navigator.userAgent.match(/(iPhone|iPod|iPad|Android|Opera Mini|IEMobile|BlackBerry)/)? 1 : 0,
    isRetina:   ( (window.devicePixelRatio || 1) > 1.25 ) ? 1 : 0,
    isTouch:    !!('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    imgExt:     ( (window.devicePixelRatio || 1) > 1.25 ) ? "@2x" : ""
};

browser.resize = function(){
    browser.width  = window.innerWidth;
    browser.height = window.innerHeight;
    article.resizeBoxes();

    if(slider.loaded){
        slider.slideBack();
        slider.backgrounds();
        for( i=0; i<slider.n-1; ++i ) slider.translate( i,    -browser.width, 0 );
        for( i=slider.n+1; i<6; ++i ) slider.translate( i, 0.5*browser.width, 0 );
    }
};

browser.pauseEvent = function(e){
    e.stopPropagation();
    e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
};

var titles = ["Introduction","Credits","Conic_Sections","Polygons_and_Polyhedra","Symmetry_and_Groups",
              "Modelling_Space","Dimensions_and_Distortions","Fractals","Sequences","Functions_and_Series",
              "Prime_Numbers","More_Number_Theory","Real_Irrational_Imaginary","Infinity","Combinatorics",
              "Graph_Theory","Knots_Mazes_Labyrinths","Optimisation","Logic_and_Paradoxes","Axioms_and_Proof",
              "Probability","Normal_Distribution","Random_Walks","Statistics","Game_Theory",
              "Coding_and_Cryptography","Forces_Motion_Calculus","Waves_and_Music","Fluid_Dynamics",
              "Chaos","Theory_of_Relativity","Quantum_Mechanics"];

// ================================================================================================

var touchClick = function(el, fn, touchStartFn){
    this.el = el;
    this.fn = fn;
    if(touchStartFn) this.touchStartFn = touchStartFn;

    el.addEventListener('touchstart', this, false);
    el.addEventListener('click',      this, false);
};

touchClick.prototype.handleEvent = function(event) {
    switch (event.type) {
        case 'touchstart': this.touchStart(event); break;
        case 'touchmove':  this.touchMove(event); break;
        case 'touchend':   this.click(event); break;
        case 'click':      this.click(event); break;
    }
};

touchClick.prototype.touchStart = function(event) {
    if(this.touchStartFn) this.touchStartFn();

    event.stopPropagation();
    this.el.addEventListener(      'touchend',  this,     false);
    document.body.addEventListener('touchmove', this, false);

    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
};

touchClick.prototype.touchMove = function(event) {
    if( Math.abs(event.touches[0].clientX - this.startX) > 10 ||
        Math.abs(event.touches[0].clientY - this.startY) > 10 ){
        this.reset();
    }
};

touchClick.prototype.click = function(event) {
    event.stopPropagation();
    this.reset();
    this.fn(event);
};

touchClick.prototype.reset = function() {
    this.el.removeEventListener(      'touchend',  this.click,     false);
    document.body.removeEventListener('touchmove', this.touchMove, false);
};



// ================================================================================================
// ======================================= CHAPTERS SLIDER ========================================

var slider = {
    loaded:     0,
    n:          0,
    start:      {},
    delta:      {},
    isScroll:   0,
    iconBox:    0,
    scrolling:  0,
    lastScroll: 0
};

slider.translate = function( i, dist, time, delay ){

    slide = slider.elements[i];
    icons = slider.icons[i];

    if( slider.isTransf ){

        slide.style.webkitTransitionDuration = slide.style.MozTransitionDuration = slide.style.transitionDuration =
        icons.style.webkitTransitionDuration = icons.style.MozTransitionDuration = icons.style.transitionDuration
            = time + 's';

        slide.style.webkitTransitionDelay = slide.style.MozTransitionDelay = slide.style.transitionDelay =
        icons.style.webkitTransitionDelay = icons.style.MozTransitionDelay = icons.style.transitionDelay
            = delay ? delay+'s' : '0s';

        slide.style.webkitTransform = slide.style.MozTransform = slide.style.transform = 'translate3D(' + dist + 'px,0,0)';
        icons.style.webkitTransform = icons.style.MozTransform = icons.style.transform = 'translate3D(' + 0.5*dist + 'px,0,0)';

    } else {
        slide.style.transform = 'translateX(' + dist + 'px)';
        slide.style.left      = dist+"px";
    }
};

slider.slideBack = function(){

    if(slider.n != 0) slider.translate( slider.n-1, -1*browser.width,  0.5 );
                      slider.translate( slider.n  , 0                , 0.5 );
    if(slider.n != 5) slider.translate( slider.n+1, 0.5*browser.width, 0.5 );
};

slider.prev = function(){
    if( slider.n == 0 ) return;
    --slider.n;
    slider.container.className = 'on'+(slider.n);

    slider.translate( slider.n  , 0,                 browser.isMobile?0.5:0.75 );
    slider.translate( slider.n+1, 0.5*browser.width, browser.isMobile?0.5:0.75 );
};

slider.next = function(){
    if( slider.n == 5 ) return;
    ++slider.n;
    slider.container.className = 'on'+(slider.n);

    slider.translate( slider.n  , 0,              browser.isMobile?0.5:0.75 );
    slider.translate( slider.n-1, -browser.width, browser.isMobile?0.5:0.75 );
};

slider.slideTo = function(n){

    if( n<0 || n > 5 || n == slider.n ) return;
    if( n-slider.n ==  1 ){ slider.next(); return; };
    if( n-slider.n == -1 ){ slider.prev(); return; };

    if( n > slider.n ){
        slider.translate( slider.n, -browser.width, 0.5, 0 );
        for( var i = slider.n+1; i<n; ++i )
            slider.translate( i, -browser.width, 1, 0.2*(i-slider.n-1) );
        slider.translate( n, 0, 0.75, 0.2*(n-slider.n)-0.15 );
    }

    if( n < slider.n ){
        slider.translate( slider.n, 0.5*browser.width, 0.5, 0 );
        for( var i = slider.n-1; i>n; --i )
            slider.translate( i, 0.5*browser.width, 1, 0.2*(slider.n-i-1) );
        slider.translate( n, 0, 0.75, 0.2*(slider.n-n)-0.15 );
    }

    slider.n = n;
    slider.container.className = 'on'+n;
};

// ================================================================================================

slider.touchstart = function(event){

    event.stopPropagation();

    slider.start = { x: event.touches[0].clientX, y: event.touches[0].clientY, time: +new Date };
    slider.delta = { x:0, y:0 };
    slider.scrolling = 0;
};

slider.touchmove = function(event){

    event.stopPropagation();

    if ( event.touches.length > 1 || event.scale && event.scale !== 1){
        event.preventDefault();
        slider.slideBack();
        return;
    }

    slider.delta.x = event.touches[0].clientX - slider.start.x;
    slider.delta.y = event.touches[0].clientY - slider.start.y;

    if( slider.scrolling ) return;

    if( (browser.height < 500 || browser.width < 530) && Math.abs(slider.delta.x) < Math.abs(slider.delta.y) ){
        slider.slideBack();
        slider.scrolling = 1;
        return;
    }

    event.preventDefault();

    // Add resistance at ends of slider
    if( (slider.n==0 && slider.delta.x>0) || (slider.n==5 && slider.delta.x<0) ){
        slider.delta.x = slider.delta.x / ( Math.abs(slider.delta.x) / browser.width + 1 )
    }

    // Translate Current Slide
    slider.translate( slider.n, ((slider.delta.x<0 || slider.n==0)?1:0.5)*slider.delta.x, 0 );

    // Translate adjacent Slides
    if( slider.delta.x < 0 ){
        if(slider.n != 0) slider.translate( slider.n-1, -1*browser.width,                      0 );
        if(slider.n != 5) slider.translate( slider.n+1, 0.5*( browser.width + slider.delta.x), 0 );
    } else {
        if(slider.n != 0) slider.translate( slider.n-1, -1*( browser.width - slider.delta.x), 0 );
    }
};

slider.touchend = function(event){

    event.preventDefault();
    event.stopPropagation();

    if( slider.scrolling ) return false;

    var duration = +new Date - slider.start.time;

    var isValidSlide =
        Number(duration) < 250                           // if slide duration is less than 250ms
        && Math.abs(slider.delta.x) > 20                 // and if slide amt is greater than 20px
        || Math.abs(slider.delta.x) > browser.width/3;   // or if slide amt is greater than half the width

    var isPastBounds = slider.n==0 && slider.delta.x>0 || slider.n==5 && slider.delta.x<0;

    if( isValidSlide && !isPastBounds ){
        if(slider.delta.x < 0) slider.next();
        else                   slider.prev();
    } else {
        slider.slideBack();
    }
};

slider.mousewheel = function(event){

    event.stopPropagation();

    if( article.isOpen || browser.height < 500 || browser.width < 530 ) return;

    //if( Math.abs(event.wheelDeltaX) < slider.lastScroll ) return; // stop intertia scrolling on Mac
    //slider.lastScroll = Math.abs(event.wheelDeltaX);

    event.preventDefault();

    if( event.wheelDeltaX<0 && slider.isScroll<=0 && slider.n!=5  ){
        slider.isScroll = 1;
        slider.next();
        slider.timeout = setTimeout( function(){ slider.isScroll = slider.lastScroll = 0; }, 1000 );
    } else if( event.wheelDeltaX>0 && slider.isScroll>=0 && slider.n!=0 ){
        slider.isScroll = -1;
        slider.prev();
        slider.timeout = setTimeout( function(){ slider.isScroll = slider.lastScroll = 0; }, 1000 );
    };
};

slider.clickevent = function(el,fn){

    el.addEventListener('touchend', function(event){
        if( Math.abs(slider.delta.x) < 20 && Math.abs(slider.delta.y) < 20 ){
            event.preventDefault();
            event.stopPropagation();
            slider.slideBack();
            fn();
        }
    }, false);

    el.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        fn();
    }, false);
};

// ================================================================================================

slider.backgrounds = function(){

    var titles = ["intro","space","numbers","logic","games","matter"];
    var o = (browser.width > browser.height) ? 1 : 0;  // 1 if landscape, 0 if portrait
    var d = browser.isRetina + 1;
    var w = (o ? browser.width  : browser.height) * d;
    var h = (o ? browser.height : browser.width ) * d;

         if ( w > 2100 || h > 1400 ) { var n = 2400; }
    else if ( w > 1800 || h > 1200 ) { var n = 2100; }
    else if ( w > 1500 || h > 1000 ) { var n = 1800; }
    else if ( w > 1200 || h >  800 ) { var n = 1500; }
    else if ( w >  900 || h >  600 ) { var n = 1200; }
    else                             { var n =  900; }

    for( var i=0; i<6; ++i ) {
        slider.elements[i].style.backgroundImage = 'url(images/backgrounds' + (o?"L":"P") + '/' + titles[i] + '_' + n + '.jpg)';
    }
}

slider.iconBoxClose = function() {
    if( slider.iconBox ) {
        var x = $('.topIcon.on');
        x.removeClass('on');
        setTimeout( function(){ x.find('.topIconFrame').css('display','none') }, 200 )
        slider.iconBox = 0;
    }
}

slider.topIconOpen = function(icon){
    t = $(icon);
    s = t.parent()
    u = s.find('.topIconFrame');
    q = s.hasClass('on');

    slider.iconBoxClose();

    if( !q && u[0] ) {
        u.css('display','block');
        setTimeout( function(){ s.addClass('on') }, 5 );
        slider.iconBox = 1;
    }
}

slider.setup = function(){

    slider.loaded = 1;

    // SLIDER SETUP ----------------------------------------------------

    slider.container = document.getElementById("chapters"),
    slider.elements  = slider.container.children;
    slider.icons     = [];
    slider.isTransf  = !( slider.elements[0].style.webkitTransform === undefined && slider.elements[0].style.MozTransform === undefined && slider.elements[0].style.transform === undefined );

    for( var i=0; i<6; ++i ) slider.icons[i] = document.getElementById("n"+i);
    for( var i=1; i<6; ++i ) slider.translate( i, 0.5*browser.width, 0 );

    slider.backgrounds();

    // CHAPTER ICONS ----------------------------------------------------

    var icons  = document.getElementsByClassName('icon');
    var iconsN = icons.length;

    for( var i=0; i<iconsN; ++i ){
        var url = icons[i].getAttribute('href');
        icons[i].style.backgroundImage = 'url(images/icons' + browser.imgExt + '/' + url + '.jpg?1)';
        slider.clickevent( icons[i], (function(x){ return function(){ article.open(x); } })(url) );
    }

    // KEYBOARD ARROW EVENTS ----------------------------------------------------

    document.addEventListener('keydown', function(e){
         var k = e.keyCode || e.which;
        if( !article.isOpen ) {
            if ( k == 39 /*RIGHT ARROW*/ || k == 40 /*DOWN ARROW*/ ){
                slider.next();
            } else if ( k == 37 /*LEFT ARROW*/ || k == 38 /*UP ARROW*/ ){
                slider.prev();
            };
        };
    }, false);

    // TOUCH AND SCROLL EVENTS ----------------------------------------------------

    if( browser.isTouch ) {
        slider.container.addEventListener('touchstart',  slider.touchstart, false);
        slider.container.addEventListener('touchmove',   slider.touchmove,  false);
        slider.container.addEventListener('touchend',    slider.touchend,   false);
        slider.container.addEventListener('touchcancel', slider.touchend,   false);
    } else {
        slider.container.addEventListener("mousewheel",     slider.mousewheel, false);
        slider.container.addEventListener("DOMMouseScroll", slider.mousewheel, false); // Firefox
    }

    // NAVIGATION MENU EVENTS ----------------------------------------------------

    slider.clickevent( document.getElementById('navP'), slider.prev );
    slider.clickevent( document.getElementById('navN'), slider.next );

    for( var i=0; i<6; ++i ){
        slider.clickevent( document.getElementById('nav'+i), (function(x){ return function(){ slider.slideTo(x); } })(i) );
    }

    // MOBILE CHAPTER SCROLL ----------------------------------------------------

    if( browser.height < 500 || browser.width < 530 ){
        var contents = document.getElementsByClassName('contents');
        for( i=0; i<contents.length; ++i ){
            contents[i].addEventListener('touchstart', (function(a){ return function(event){
                if(a.scrollTop <= 0) a.scrollTop = 1;
                if(a.scrollTop + a.offsetHeight >= a.scrollHeight) a.scrollTop = a.scrollHeight - a.offsetHeight - 1;
            }; })(contents[i]), false);
        }
    }

    // ICON BOXES ----------------------------------------------------

    topIcons = document.getElementsByClassName('iconImg');

    for( var i=1; i<topIcons.length; ++i )
        slider.clickevent( topIcons[i], (function(x){ return function(){ slider.topIconOpen(topIcons[x]); } })(i) );

    $( ".topIconFrame" ).on( "click touchstart touchend", function(e){
        e.stopPropagation();
    } );
    $( ".topIconFrame" ).on( "touchmove mousewheel DOMMouseScroll", function(e){
        e.stopPropagation();
        e.preventDefault();
    } );

    slider.clickevent( slider.container, slider.iconBoxClose );

    var ih = document.getElementById('iconHelp').children[1].children[1];
    ih.addEventListener('mousewheel', function(e){ e.stopPropagation(); }, false)
    ih.addEventListener('touchmove', function(e){ e.stopPropagation(); }, false)
    ih.addEventListener('touchstart', function(e){
        startTopScroll = ih.scrollTop;
        if(startTopScroll <= 0) ih.scrollTop = 1;
        if(startTopScroll + ih.offsetHeight >= ih.scrollHeight) ih.scrollTop = ih.scrollHeight - ih.offsetHeight - 1;
        e.stopPropagation();
    }, false);

    // FULL SCREEN BUTTON ---------------------------------------------------------

    slider.toggleFullScreen = function(){
        if( !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement ){
                 if (document.body.requestFullscreen      ) document.body.requestFullscreen();
            else if (document.body.msRequestFullScreen    ) document.body.msRequestFullScreen();
            else if (document.body.mozRequestFullScreen   ) document.body.mozRequestFullScreen();
            else if (document.body.webkitRequestFullscreen) document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            document.getElementById("iconFull").className = 'topIcon on1';
        } else {
                 if (document.cancelFullScreen)       document.cancelFullScreen();
            else if (document.mozCancelFullScreen)    document.mozCancelFullScreen();
            else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
            document.getElementById("iconFull").className = 'topIcon';
        }
    }

    var b = document.getElementById("body");

    if( b.mozRequestFullScreen || b.webkitRequestFullScreen || b.RequestFullScreen || b.msRequestFullscreen ){
        slider.clickevent( document.getElementById('iconFull'), slider.toggleFullScreen );
    } else {
        document.getElementById("iconFull").style.display = "none";
        browser.html.className += ' noFullScreen';
    }

    // SOCIAL BUTTONS ----------------------------------------------------

    // Tweet Button
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

    // Stumble Upon
    (function() { var li = document.createElement('script'); li.type = 'text/javascript'; li.async = true; li.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + '//platform.stumbleupon.com/1/widgets.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(li, s); })();

    // Google+ Button
    (function() { var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true; po.src = 'https://apis.google.com/js/plusone.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s); })();

}



// ================================================================================================
// ====================================== ARTICLE NAVIGATION ======================================


article = {
    shadow:    document.getElementById('shadow'),
    isOpen:    window.isHome ? 0 : 1,
    glossQ:    0,
    count:     window.isHome ? 0 : 1,
    vars:      []
}

article.elements = article.isOpen ? [ document.getElementById("A1") ] : [];

article.append = function( url, where ){
    url = url.replace('.html','');

    article.elements[article.count-1] = document.createElement('article');
    var a = article.elements[article.count-1];
    var i = jQuery.inArray( url, titles );

    a.id = 'A'+article.count;
    a.className = where?where:'down';
    a.setAttribute( 'data-url', url );

    // Avoid loading retina size header images on small devices
    var headExt = (browser.width > 510 || browser.height > 510) ? browser.imgExt : "";

    a.innerHTML =
         '<div class="topBarA"><div class="topBarBack"><div class="topBarIcon"></div>BACK</div>'
        +'<div class="topBarClose"><div class="topBarIcon"></div></div></div>'
        +'<div class="abox">'
        +'<header style="background-image: url(images/headers' + headExt + '/' + url + '.jpg?1), url(images/loading'+browser.imgExt+'.gif);"></header>'
        +'<div class="loading"></div></div>'
        +'<div class="bottomBar">'
        +(i>0 ?'<div class="bottomBarPrev ellipsis"><div class="topBarIcon"></div>'+titles[i-1].replace(/_/g,' ').toUpperCase()+'</div>':'')
        +(i<31?'<div class="bottomBarNext ellipsis"><div class="topBarIcon"></div>'+titles[i+1].replace(/_/g,' ').toUpperCase()+'</div>':'')
        +'</div>';

    document.body.appendChild(a);
    article.events(a,url,i);
}

article.events = function(a,url,i){
    url = url.replace('.html','');

    a.addEventListener('click',article.close,false);
    a.children[1].addEventListener('click', function(e){e.stopPropagation();}, false);

    a.addEventListener('touchstart', function(event){
        startTopScroll = a.scrollTop;

        if(startTopScroll <= 0)
            a.scrollTop = 1;

        if(startTopScroll + a.offsetHeight >= a.scrollHeight)
            a.scrollTop = a.scrollHeight - a.offsetHeight - 1;
    }, false);

    new touchClick( a.children[0].children[0], function(e){ e.stopPropagation(); article.goBack(); } );
    if(i>0)  new touchClick( a.children[2].children[0    ], function(e){e.stopPropagation(); article.switchL(titles[i-1]);} );
    if(i<31) new touchClick( a.children[2].children[i?1:0], function(e){e.stopPropagation(); article.switch( titles[i+1]);} );
}

article.open = function( url ){
    url = url.replace('.html','');

    slider.slideBack();
    slider.iconBoxClose();

    ++article.count;
    article.isOpen = 1;
    article.append(url,'down');

    article.shadow.style.display = 'block';
    article.shadow.offsetTop;

    browser.html.className += ' reading';
    article.elements[article.count-1].className = '';

    article.load(url);
}

article.switch = function( url ){
    url = url.replace('.html','');

    ++article.count;
    article.append(url,'next');

    article.elements[article.count-2].className = 'prev';
    article.elements[article.count-1].offsetTop;
    article.elements[article.count-1].className = '';

    article.load(url);
}

article.switchL = function( url ){
    url = url.replace('.html','');

    for( var i=0; i<article.count-1; ++i ) // TODO check memory leaks
        article.elements[i].remove();

    ++article.count;
    article.append(url,'prev');

    article.elements[article.count-2].className = 'next';
    article.elements[article.count-1].offsetTop;
    article.elements[article.count-1].className = 'noback';

    setTimeout( function(){
        article.elements[article.count-2].remove();
        article.elements[article.count-1].id = "A1";
        article.elements = [article.elements[article.count-1]]
        article.count = 1;
        article.load(url);
    }, 1000)

}

article.goBack = function(){

    if( article.count < 2 ){ article.close(); return; }

    article.elements[article.count-2].className = '';
    article.elements[article.count-1].className = 'next';
    --article.count;

    setTimeout( function(){
        article.elements[article.count].remove();
    }, 1000);

    var url = article.elements[article.count-1].getAttribute('data-url');
    if(url) {
        document.title = url.replace(/_/g," ") + " | World of Mathematics";
        if(window.history.pushState)
            window.history.pushState({"url": url}, "", '/' + url);
    };

    article.vars = article.elements[article.count-1].children[1].children[2].getElementsByTagName('i');
}

article.close = function(){

    $('article').not('#A'+article.count).find('img').removeAttr('src');
    $('article').not('#A'+article.count).remove();
    $('article').css({'transform':'translate3D(0,100%,0)'});

    $(browser.html).removeClass('reading');

    setTimeout( function(){
        article.shadow.style.display = 'none';
        var a = document.getElementsByTagName('article');
        for( var i=0; i<a.length; ++i ){
            var img = a[i].getElementsByTagName('img');
            for( var j=0; j<img.length; ++j ) img[j].src = '';
            a[i].remove();
        }
    }, 1000);

    article.isOpen = article.count = 0;
    article.elements = [];

    document.title = "Mathigon | World of Mathematics";
    if(window.history.pushState)
        window.history.pushState({"url": ""}, "", '/');

    if( !slider.loaded ) {
        $('#chapters').load( '/'+"index.html #chapters", function(response, status, xhr, url){
            $(this).children().unwrap();
            slider.setup();
            slider.loaded = 1;
        });
    };

}



// ================================================================================================
// ======================================= RENDER ARTICLES ========================================


article.load = function( url ){
    url = url.replace('.html','');

    // Google Analytics Update
	if(ga) ga('send', 'pageview', url);

    // Update Page Title
    document.title = url.replace(/_/g," ") + " | World of Mathematics";
    if(window.history.pushState)
        window.history.pushState({"url": url}, "", '/'+url);

    // Send AJAX Request
    var xhr = new XMLHttpRequest();
    var abox = article.elements[article.count-1].children[1];

    xhr.onreadystatechange = function(){
        if (xhr.readyState != 4) return;

        if (xhr.status == 200) {
            var doc = document.implementation.createHTMLDocument("example");
            doc.documentElement.innerHTML = xhr.responseText;
            
            var ad = doc.getElementsByClassName('ad-box')[0];
            ad.parentNode.removeChild(ad);

            abox.appendChild( document.adoptNode(doc.getElementsByClassName('tBody')[0]) );
        } else {
            var msg = "<p>Unfortunately we were not able to load " + url + ". This  could be because you entered a wrong url or because the link you followed is broken.";
            abox.innerHTML += "<div class='tBody''><h2>" + xhr.status + " " + xhr.statusText + "</h2>" + msg + "</div>";
        }

        abox.getElementsByClassName('loading')[0].style.display = 'none';
        article.render(url);
    };

    xhr.open("GET", '/'+url, true);
    xhr.send();
}

// ================================================================================================

article.glossClose = function() {
    if( article.glossQ ) {
        var x = $('.gloss.on');
        x.removeClass('on');
        setTimeout( function(){ x.find('.glossFrame').css('display','none') }, 200 )
        article.glossQ = 0;
    }
};

article.glossOpen = function(gloss){
    f = $(gloss).find('.glossFrame');
    q = $(gloss).hasClass('on');

    article.glossClose();

    if( !q && f[0] ) {
        f.css('display','block');
        setTimeout( function(){ $(gloss).addClass('on') }, 5 );
        article.glossQ = 1;
    }
};

article.tabOpen = function(link,i){

    if( $(link).hasClass('on') ) return;

    $(link).addClass('on').siblings('.boxTabLink').removeClass('on');
    if( link.hasAttribute('data-script') ) eval( link.getAttribute('data-script') );

    var $b = $(link).parents('.frame');
    if( !$b[0] ) $b = $(link).parents('.box').find('.frame');
    if( !$b[0] ) return;

    var $new = $($b[0].getElementsByClassName('boxWrap')[i]);

    $b.height( $b.height() ).addClass('changing')
      .find('.boxWrap.on').removeClass('on');

    setTimeout( function(){
        $b.addClass('animateHeight').height( $new.height() );
    }, 200);

    setTimeout( function(){
        $new.addClass('on');
    }, 400);

    setTimeout( function(){
        $b.removeClass('animateHeight changing').css('height','auto');
    }, 800);
};

article.makeGallery = function(g){

    var slidesN = $(g).hasClass('galleryLarge') ? 1 : ( ($(g).hasClass('gallerySmall') || browser.width < 560) ? 2 : 3 );

    g.innerHTML += '<div class="GalDots"></div><div class="GalLeft"></div><div class="GalRight"></div>';
    if( slidesN > 1 ) g.innerHTML += '<div class="GalLeftGrad"></div><div class="GalRightGrad"></div>';
    var pagination = g.getElementsByClassName('GalDots')[0];

    var gallery = $(g).swiper({
        speed: 600,
        loop: true,
        slidesPerView: slidesN,
        calculateHeight: true,
        pagination: pagination,
        wrapperClass: 'GalWrap',
        paginationAsRange: true,
        slideClass: 'GalSlide'
        //paginationClass: 'chapterIcons',
        //paginationActiveClass: 'on',
    });

    if( !browser.isTouch ){
        $(g).on( 'mousewheel DOMMouseScroll', function(event) {
            if( Math.abs(event.wheelDeltaX) < Math.abs(event.wheelDeltaY) ) return;
            event.preventDefault();
            event.stopPropagation();
            if (event.originalEvent.wheelDeltaX > 0) gallery.swipePrev();
            else                                     gallery.swipeNext();
        });
    }

    g.getElementsByClassName('GalLeft' )[0].addEventListener( 'click', function(){gallery.swipePrev()}, false );
    g.getElementsByClassName('GalRight')[0].addEventListener( 'click', function(){gallery.swipeNext()}, false );
};

article.makeVariable = function($i) {
    $i.setAttribute( 'data-exp', $i.innerHTML );
    if( !$i.hasAttribute('data-var') ) return;

    $i.className += ' var';
    var t = $i.getAttribute('data-var').split('|');
    var name = t[0], init = t[1], type = t[2];
    var info = t[3] ? t[3].split(',') : [];

    $i.innerHTML = init;
    V[name] = init;

    if( type == "slider" ) {   // info = [min,max,step]

        V[name] = Number(init);
        $($i).addClass('varSlider').html('<span class="varSliderText"></span><span class="varSliderFrame" style="display: none;"><span class="varSliderBar" style="width: '+( (init-Number(info[0]))/(Number(info[1])-Number(info[0]))*100  )+'%"></span></span>');

        VarMoveData[name] = {
            startPosition: 0,
            startValue: 0,
            distance: 0,
            sense: Math.sqrt( info[2] / (info[1] - info[0] ) * 1000 ) + (browser.touch?10:2),

            start: (function(nx,el){ return function(event){
                this.startPosition = event.pageX || event.originalEvent.touches[0].pageX;
                this.startValue = V[nx];
                $(el).find('.varSliderFrame').fadeIn(100);
                browser.pauseEvent(event);
            }; })(name,$i),
            move: function(event){
                this.distance = (event.pageX || event.originalEvent.touches[0].pageX) - this.startPosition;
                browser.pauseEvent(event);
            },
            end: (function(el){ return function(event){
                $(el).find('.varSliderFrame').fadeOut(100);
            }; })($i),
            handle: (function(nx,el){ return function(event){
                VarMoveData[nx].move(event);
                V[nx] = Math.round( Math.max(info[0], Math.min(info[1],VarMoveData[nx].startValue + VarMoveData[nx].distance/VarMoveData[nx].sense))/info[2] ) * info[2];
                $(el).find('.varSliderBar').css('width', String(  (V[nx]-Number(info[0]))/(Number(info[1])-Number(info[0]))*100  )+'%' );
                V.eval();
                browser.pauseEvent(event);
            }; })(name,$i)
        };

        $($i).bind('touchstart', ( function(nx){ return function(event){
            VarMoveData[nx].start(event);
            browser.html.addEventListener('touchmove', VarMoveData[nx].handle, false);
        }; })(name) );

        $('html').bind('touchend', ( function(nx){ return function(event){
            VarMoveData[nx].end(event);
            browser.html.removeEventListener('touchmove', VarMoveData[nx].handle, false);
        }; })(name) );

        $($i).mousedown( ( function(nx){ return function(event){
            VarMoveData[nx].start(event);
            browser.html.addEventListener('mousemove', VarMoveData[nx].handle, false);
        }; })(name) );

        $('html').mouseup( ( function(nx){ return function(event){
            VarMoveData[nx].end(event);
            browser.html.removeEventListener('mousemove', VarMoveData[nx].handle, false);
        }; })(name) );

    } else if( type == "bolean" ) {   // info = []

        V[name] = Number(init);
        $($i).click( function(){
            V[name] = 1 - V[name];
            V.eval();
        });

    } else if( type == "switch" ) {   // info = [val1,val2,val3,...]

        V[name] = init;
        $($i).click( function(){
            var n = jQuery.inArray( V[name], info ) + 1;
            V[name] = (n == info.length ? info[0] : info[n]);
            V.eval();
        });

    }
};

// ================================================================================================

article.render = function(url){

    art  = article.elements[article.count-1];
    text = art.getElementsByClassName('tBody')[0];

    // TABLE OF CONTENTS -------------------------------------------------

    var headings = text.getElementsByTagName('h2');
    var tocString = '<div class="tocIcon"></div><div class="toc"><div class="tocTitle">TABLE OF CONTENTS</div>';

    for( i=0; i<headings.length; ++i ){
        headings[i].className += ' tocLink'+i;
        tocString += '<div class="tocItem" data-tocId=".tocLink'+i+'">'+headings[i].innerHTML+'</div>';
    }
    tocString += '</div>';
    art.children[1].children[0].innerHTML = tocString;

    var tocLinks = art.children[1].children[0].children[1].children;

    for( i=1; i<tocLinks.length; ++i ){
        tocLinks[i].addEventListener('click', function(){
            $(art).animate({ scrollTop: $(art).find( $(this).attr('data-tocID') ).position().top + 100 }, 800);
        }, false);
    }

    // ADVERTISING -------------------------------------------------

    var adBox = text.getElementsByClassName('ad-box')[0];
    var adHide = text.getElementsByClassName('ad-hide')[0];

    if (adHide) adHide.addEventListener('click', function() {
        adBox.parentNode.removeChild(adBox);
    });


    // FIX LINKS IN ARTICLE -------------------------------------------------

    var links = text.getElementsByTagName('a');

    for( i=0; i<links.length; ++i ){

        var aUrl = links[i].getAttribute('href').replace('.html','');

        if ( aUrl.substring(0,4) != "http" && aUrl.substring(0,4) != "mail" ) {
            $(links[i]).click( function(event){
                event.preventDefault();
                article.switch($(this).attr('href'));
                return false;
            });
        } else {
            links[i].setAttribute('target','_blank');
            links[i].addEventListener('click', function(e){ e.stopPropagation(); }, false);
        }
    }

    // GLOSSARY ENTRIES -------------------------------------------------

    var gloss = text.getElementsByClassName('gloss');

    for( i=0; i<gloss.length; ++i ){

        gloss[i].innerHTML += '<span class="glossFrame off"><span class="glossBox">'
                              + gloss[i].getAttribute('data-gloss') + '</span><span class="glossArrow"></span></span>'

        gloss[i].addEventListener( 'click', (function(x){ return function(e){
            e.stopPropagation();
            article.glossOpen(gloss[x])
        }; })(i), false )
    }

    $( ".glossFrame" ).on( "click", function(e){ e.stopPropagation(); } );
    text.addEventListener('click', article.glossClose, false );

    // LOAD RETINA IMAGES -------------------------------------------------

      if ( browser.isRetina ) {
        var imgs = text.getElementsByTagName('img');
        for( i=0; i<imgs.length; ++i ){ //(function(x){
            var newSrc = imgs[i].getAttribute('src').replace(/(.+)(\.\w{3,4})$/, "$1"+"@2x"+"$2");
            //$.ajax({url: newSrc, type: "HEAD", success: function() {
                imgs[i].setAttribute('src', newSrc);
            //}});
        }//)(i) }
    };

    // TABBED BOXES -------------------------------------------------

    var tabs = text.getElementsByClassName('tabbed');
    for( i=0; i<tabs.length; ++i ){
        var tabLinks = tabs[i].getElementsByClassName('boxTabLink');
        for( j=0; j<tabLinks.length; ++j ){
            tabLinks[j].addEventListener('click', ( function(index){ return function(){
                article.tabOpen(this,index)
            }; } )(j), false)
        }
    }

    // EXPANDABLE EXTRAS -------------------------------------------------

    $(text).find('.extra .boxTitle').click( function(){

        var $extraBox = $(this).parent('.box');
        var $boxWrap  = $extraBox.find('.boxWrap');

        if( $extraBox.hasClass('on') ){
            $boxWrap.css('height', $boxWrap.height() );
            setTimeout( function(){ $boxWrap.addClass('animateHeight').css('height', 0) }, 10);
            setTimeout( function(){ $extraBox.removeClass('on') }, 510);
        } else {
            $extraBox.addClass('on');
            var boxheight = $extraBox.find('.boxWrap > *').height() + 30;
            $boxWrap.css('height', boxheight).addClass('animateHeight');
            setTimeout( function(){ $boxWrap.removeClass('animateHeight').css('height', 'auto'); }, 510);
        };
    });

    // GALLERIES -------------------------------------------------

    scripts.require( "scripts/swiper-22.js", function(){

        var galleries = text.getElementsByClassName( 'galleryLarge' );
        for( i=0; i<galleries.length; ++i ) article.makeGallery( galleries[i] );

        galleries = text.getElementsByClassName( 'gallerySmall' );
        for( i=0; i<galleries.length; ++i ) article.makeGallery( galleries[i] );

        galleries = text.getElementsByClassName( 'galleryTriple');
        for( i=0; i<galleries.length; ++i ) article.makeGallery( galleries[i] );

    });

    // VARIABLES -------------------------------------------------

    article.vars = text.getElementsByTagName('i');

    for( i=0; i<article.vars.length; ++i ){
        article.makeVariable(article.vars[i]);
    }
    V.eval();

    // INDIVIDUAL SCRIPTS

    if( scripts[url] ) scripts[url]();
    else jQuery.getScript( "resources/" + url + "/script.min.js" ).done( function(){scripts[url]()} );

    article.resizeBoxes();
}

article.resizeBoxes = function() {
    $('.resizable').each( function(){
        $t = $(this);
        $t.height( eval( $t.attr('data-size').replace('w', $t.width() ).replace('h', $t.height() ) ) + 'px' );
    });
}

var V = {};
var VarMoveData = {};

V.eval = function() {
    for( i=0; i<article.vars.length; ++i ){
        $i = $(article.vars[i]);
        if( $i.hasClass('varSlider') ) {
            $i.find('.varSliderText').html( eval(String($i.attr('data-exp'))) );
        } else if ( $i.attr('data-function') ) {
            eval($i.attr('data-function'));
        } else {
            $i.html( eval(String($i.attr('data-exp'))) );
        }

    }
}



// ================================================================================================
// ======================================== GLOBAL SCRIPTS ========================================


$(document).ready( function(){

    // SETUP PAGE ----------------------------------------------------

    browser.html.className += (browser.isMobile ? " isMobile" : " notMobile");

    if ( article.isOpen ) {

        var url = window.location.href.substring(window.location.href.lastIndexOf("/")+1).replace('.html', '');
        var a = article.elements[0];
        var i = jQuery.inArray( url, titles );
        a.setAttribute( 'data-url', url );

        if( browser.isRetina && (browser.width > 510 || browser.height > 510) )
            a.children[1].children[0].style.backgroundImage = 'url(images/headers@2x/' + url + '.jpg)';

        article.events( a, url );
        article.render( url );

    } else {

        slider.setup();

    }

    window.addEventListener('resize', browser.resize, false)


    var popped = false;
    var initialURL = location.href;

    window.addEventListener('popstate', function(){

        var initialPop = !popped && location.href == initialURL;
        popped = true;
        if (initialPop) return;

        if (article.count) {
            article.goBack();
        } else {
            article.close();
        }
    });


    // SETUP SPLASH SCREENS ----------------------------------------------------

    var head = document.getElementsByTagName('head')[0];

    if (navigator.platform === 'iPad') {
        var portrait  = browser.isRetina ? 'images/splash/splash-1536-2008.png' : 'images/splash/splash-768-1004.png';
        var landscape = browser.isRetina ? 'images/splash/splash-2048-1496.png' : 'images/splash/splash-1024-748.png';

        var link1 = document.createElement('link');
        link1.setAttribute('rel', 'apple-touch-startup-image');
        link1.setAttribute('media', 'screen and (orientation: portrait)');
        link1.setAttribute('href', portrait);
        head.appendChild(link1);

        var link2 = document.createElement('link');
        link2.setAttribute('rel', 'apple-touch-startup-image');
        link2.setAttribute('media', 'screen and (orientation: landscape)');
        link2.setAttribute('href', landscape);
        head.appendChild(link2);
    } else {
        var portrait = browser.isRetina ? "images/splash/splash-640-920.png" : "images/splash/splash-320-460.png";
        if( browser.height == 568 ) portrait = "images/splash/splash-640-1096.png";

        var link1 = document.createElement('link');
        link1.setAttribute('rel', 'apple-touch-startup-image');
        link1.setAttribute('href', portrait);
        head.appendChild(link1);
    }

});
