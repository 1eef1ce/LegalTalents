$( document ).ready(function() {

    $(".navbar-toggler").on("click", function () {
        $(this).toggleClass("active");
    });

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

    $.each($('.profile-links').find('li'), function() {
        $(this).toggleClass('active',
            window.location.pathname.indexOf($(this).find('a').attr('href')) > -1);
    });

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
            //console.log($this.val());
        });

        $(document).click(function() {
            $customSelect.removeClass('active');
            $list.hide();
        });

    });

});