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
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCisDdbOedUEQI9JSwzBFXzzgA1GRpLxyY",
        authDomain: "portfolio-34235.firebaseapp.com",
        databaseURL: "https://portfolio-34235.firebaseio.com",
        projectId: "portfolio-34235",
        storageBucket: "portfolio-34235.appspot.com",
        messagingSenderId: "417783244082",
        appId: "1:417783244082:web:4fa45b3298ce53be4fa32b",
        measurementId: "G-R8M44J1FF8"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.performance();
    const analytics = firebase.analytics();

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

    $('#contact-dmclavel').submit(function (e) {
        e.preventDefault();

        const url = 'https://api.hsforms.com/submissions/v3/integration/submit/6419045/2ddaf219-ff4c-4f1a-afb3-440946797113';
        const formData = JSON.stringify({
            "submittedAt": new Date().getTime(),
            "fields": [
                {
                    "name": "email",
                    "value": e.target[1].value
                },
                {
                    "name": "gclid",
                    "value": e.target[0].value
                }
            ],
        });

        $.ajax({
            type: 'POST',
            url,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            success: function (data) {
                console.log(data);
            },
            error: function(request, status, message) {
                alert("Something went wrong. please try again. ", message, request, status);
            },
            complete: function () {

            }
        })
    });

    $('#github-click').on('click', function () {
        window.dataLayer.push({
            'event': 'github-click',
            'dateClicked': new Date().toString(),
            'transactionId': '1001',
            'transactionTotal': 3000,
            'transactionProducts': [
                {
                    'sku': 'GH1',
                    'name': 'Github Link Trial',
                    'price': 3000,
                    'quantity': 1
                }
            ]
        });

        analytics.logEvent('ecommerce_purchase', {
            currency: 3000, transaction_id: '1001'
        });
    });
});

// GOOGLE'S RECOMMENDED CODE IN GETTING GCLID
function getParam(p) {
    var match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
  
function getExpiryRecord(value) {
    var expiryPeriod = 90 * 24 * 60 * 60 * 1000; // 90 day expiry in milliseconds

    var expiryDate = new Date().getTime() + expiryPeriod;
    return {
        value: value,
        expiryDate: expiryDate
    };
}
  
function addGclid() {
    var gclidParam = getParam('gclid');
    var gclidFormFields = [
            'gclid'
        ]; // all possible gclid form field ids here
    var gclidRecord = null;
    var currGclidFormField;

    var gclsrcParam = getParam('gclsrc');
    var isGclsrcValid = !gclsrcParam || gclsrcParam.indexOf('aw') !== -1;

    gclidFormFields.forEach(function (field) {
        if (document.getElementById(field)) {
            currGclidFormField = document.getElementById(field);
        }
    });

    if (gclidParam && isGclsrcValid) {
        gclidRecord = getExpiryRecord(gclidParam);
        localStorage.setItem('gclid', JSON.stringify(gclidRecord));
    }

    var gclid = gclidRecord || JSON.parse(localStorage.getItem('gclid'));
    var isGclidValid = gclid && new Date().getTime() < gclid.expiryDate;

    if (currGclidFormField && isGclidValid) {
        currGclidFormField.value = gclid.value;
    }
}

window.addEventListener('load', addGclid);

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