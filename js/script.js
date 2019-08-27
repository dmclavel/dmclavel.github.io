$(window).on('load', function() {
    $('.loader .inner').fadeOut(500, function() {
        $('.loader').fadeOut(500);
    });

    $('.items').isotope({
        filter: '*',
        animationOptions: {
            duration: 1500,
            easing: 'linear',
            queue: false
        }
    });
});

$(document).ready(function() {  // when the page is loaded, call superslides function
    $('#slides').superslides({
        animation: 'fade',
        play: 4000,
        pagination: false
    });

    new Typed('.typed', {
        strings: ['Full Stack Web Developer', 'Passionate Techy', 'Language Learner'],
        typeSpeed: 90,
        loop: true,
        startDelay: 1000,
        showCursor: false 
    });

    $('.owl-carousel').owlCarousel({
        loop:true,
        items: 4,
        responsive:{
            0:{
                items:1
            },
            480:{
                items:2
            },
            768:{
                items:3
            },
            938: {
                items:4
            }
        }
    });

    const skillsTopOffset = $('.skills-section').offset().top;
    const statsSectionTopOffset = $('.stats-section').offset().top;
    let statsSectionReached = false;    // checker if counting needs to be executed
    
    $(window).scroll(function() {
        if (window.pageYOffset > skillsTopOffset - $(window).height() + 200) {
            $('.chart').easyPieChart({
                easing: 'easeInOut',
                barColor: '#fff',
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 152,
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }

        if (!statsSectionReached && window.pageYOffset > statsSectionTopOffset - $(window).height() + 200) {
            let idx = 1;
            $('.counter').each(function() {
                const endVal = parseInt($(this).text());
        
                const cu = new counterUp({
                    duration: 1000,
                    selector: `.counter${idx++}`,
                    start: 0,
                    end: endVal,
                    append: '',
                    intvalues: true
                });
                cu.start();
            });
            statsSectionReached = true; // counting needs not to be done
        }
    });

    $('[data-fancybox]').fancybox();

    $('#filters a').click(function() {
        $('#filters .current').removeClass('current');
        $(this).addClass('current');

        const selector = $(this).attr('data-filter');
        $('.items').isotope({
            filter: selector,
            animationOptions: {
                duration: 1500,
                easing: 'linear',
                queue: false
            }
        });

        return false;   // stop any default action
    });

    $('#navigation li a').click(function(e) {
        e.preventDefault();
        
        const targetElement = $(this).attr('href');
        const targetPosition = $(targetElement).offset().top;
        $('html, body').animate({
            scrollTop: targetPosition - 50
        }, 'slow');
    });

    const nav = $('#navigation');
    const navTop = nav.offset().top;

    $(window).on('scroll', stickyNavigation);
    checkActiveLink();

    function stickyNavigation() {
        const body = $('body');

        if ($(window).scrollTop() > navTop) {
            body.css('padding-top', nav.outerHeight() + 'px');
            body.addClass('fixed-nav');
        } else {
            body.css('padding-top', 0);
            body.removeClass('fixed-nav');
        }

        checkActiveLink();
    }

    $('#github-click').on('click', function () {
        console.log('CLicked');
        window.dataLayer.push({
            'dateClicked': new Date().toString()
        });
    });
});

function checkActiveLink() {
    const aboutTop = $('#about').offset().top;
    const skillsTop = $('#skills').offset().top;
    const statsTop = $('#stats').offset().top;
    const contactTop = $('#contact').offset().top;
    const portfolioTop = $('#portfolio').offset().top;
    
    if ($(window).scrollTop() >= aboutTop - 100 && $(window).scrollTop() < aboutTop + 100) {
        applyActiveClass('about');
    }

    if ($(window).scrollTop() >= skillsTop - 100 && $(window).scrollTop() < skillsTop + 100) {
        applyActiveClass('skills');
    }

    if ($(window).scrollTop() >= statsTop - 100 && $(window).scrollTop() < statsTop + 100) {
        applyActiveClass('stats');
    }

    if ($(window).scrollTop() >= contactTop - 100 && $(window).scrollTop() < contactTop + 100) {
        applyActiveClass('contact');
    }

    if ($(window).scrollTop() >= portfolioTop - 100 && $(window).scrollTop() < portfolioTop + 100) {
        applyActiveClass('portfolio');
    }
}

function applyActiveClass(type) {
    $('#navigation ul li a').each(function() {
        const selector = $(this).attr('data-filter');

        if (type === selector) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
}