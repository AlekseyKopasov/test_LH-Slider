$(document).ready(function() {
  let lockedSlide = null;
  let lockedSlideIndex = null;
  let nextSlide = null;
  let prevSlide = null;

  function swapElements(obj1, obj2) {
    // create marker element and insert it where obj1 is
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);

    // move obj1 to right before obj2
    obj2.parentNode.insertBefore(obj1, obj2);

    // move obj2 to right before where obj1 used to be
    temp.parentNode.insertBefore(obj2, temp);

    // remove temporary marker node
    temp.parentNode.removeChild(temp);
  }

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
    if ($('.locked')[0] !== $(evt.currentTarget)[0]) {
      $('.locked').toggleClass('locked');
    }

    $(evt.currentTarget).hasClass('locked') ?
      $(evt.currentTarget).removeClass('locked') :
      $(evt.currentTarget).addClass('locked');
  });

  $('.slick-arrow').on('click', (function (evt) {
    const isLocked = $('.locked').length;
    const currentIndex = $('[data-slick-index]')[0];
    const length = $('[data-slick-index]').length;

    if (!isLocked || currentIndex <= 0 || currentIndex >= length) {
      return;
    }


    const nextButton = $(evt.currentTarget).hasClass('slick-next');

    if (nextButton) {

      lockedSlideIndex = +($('.locked').attr("data-slick-index"));
      lockedSlide = $('.locked')[0];
      nextSlide = $(`[data-slick-index="${lockedSlideIndex + 1}"]`)[0];

      swapElements(lockedSlide, nextSlide);

      $('.locked').attr('data-slick-index', lockedSlideIndex + 1);
      lockedSlideIndex += 1;
      nextSlide = $(`[data-slick-index="${lockedSlideIndex}"]`)[0];
    } else {
      lockedSlideIndex = +($('.locked').attr("data-slick-index"));
      lockedSlide = $('.locked')[0];
      prevSlide = $(`[data-slick-index="${lockedSlideIndex - 1}"]`)[0];

      swapElements(lockedSlide, prevSlide);

      $('.locked').attr('data-slick-index', lockedSlideIndex - 1);
      lockedSlideIndex -= 1;
      prevSlide = $(`[data-slick-index="${lockedSlideIndex}"]`)[0];
    }
  }));
});
