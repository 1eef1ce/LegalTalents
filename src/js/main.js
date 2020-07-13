$( document ).ready(function() {

    //toggle navbar icon on mobile
    $(".navbar-toggler").on("click", function () {
        $(this).toggleClass("active");
    });

    //navbar panel - add active state
    $('#navbar').on('show.bs.collapse', function () {
        $('.header-modal').addClass('active');
    });
    $('#navbar').on('hidden.bs.collapse', function () {
        $('.header-modal').removeClass('active');
    });

    $(window).resize(function() {
        if ($(window).width() > 1439) {
            $('.header-modal').removeClass('active');
        }
    }).resize();

    //double range slider
    $(".js-range-slider").ionRangeSlider({
        skin: "big",
        type: "double",
        min: 0,
        max: 300000,
        from: 10000,
        to: 150000,
        postfix: " Руб.",
        hide_min_max: true,
        force_edges: true,
    });

    //set links active by href
    $.each($('.profile-links').find('li'), function() {
        $(this).toggleClass('active',
            window.location.pathname.indexOf($(this).find('a').attr('href')) > -1);
    });

    //image upload with preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function() {
        readURL(this);
    });

    //custom select
    $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-custom"></div>');

        var $customSelect = $this.next('div.select-custom');
        $customSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($customSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $customSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-custom.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $customSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
        });

        $(document).click(function() {
            $customSelect.removeClass('active');
            $list.hide();
        });

    });

    //input tags
    $('.tagsinput').tagsInput();

    //editor
    $('.editor').trumbowyg({
        btns: [
            ['strong', 'underline', 'em'],
            ['unorderedList', 'orderedList'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['link'],
        ],
        autogrow: true,
    });

    //swiper sliders
    var swiperPartners = new Swiper('.swiper-partners', {
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.partners-nav-next',
            prevEl: '.partners-nav-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2
            },
            960: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }
    });

    var swiperFeedback = new Swiper('.swiper-feedback', {
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.feedback-nav-next',
            prevEl: '.feedback-nav-prev',
        },
    });

});