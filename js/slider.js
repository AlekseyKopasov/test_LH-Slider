$(document).ready(function() {

  $('.slider').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ],

  });

  $('.slide').on('click', function(evt) {
    $('.locked').removeClass('locked');

    if ($(evt.currentTarget).hasClass('locked')) {
      console.log(42);
      $(evt.currentTarget).removeClass('locked');
    } else {
      $(evt.currentTarget).addClass('locked');
    }


    // let lockedSlide = $(this).toggleClass('locked');
    // let lockedSlideIdx = $(evt.currentTarget).attr('data-slick-index');
  });

  $('.slick-arrow').click(function () {
    let isLocked = !!$('.locked').length;
    console.log(isLocked)
  })

});
