$(document).ready(function() {
  let lockedSlide = null;
  let lockedSlideIndex = null;
  let nextSlide = null;
  let prevSlide = null;
  let isLastScreen = false;
  let isChangeDirection = null;

  const slides = $('.slide');

  function swapElements(obj1, obj2) {
    if (!obj1 || !obj2) {
      return;
    }

    // create marker element and insert it where obj1 is
    let temp = document.createElement('div');

    if (obj1.parentNode) {
      obj1.parentNode.insertBefore(temp, obj1);
    }

    if (obj2.parentNode) {
      // move obj1 to right before obj2
      obj2.parentNode.insertBefore(obj1, obj2);
    }

    // move obj2 to right before where obj1 used to be
    temp.parentNode.insertBefore(obj2, temp);

    // remove temporary marker node
    temp.parentNode.removeChild(temp);
  };

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
    const visibleSlides = $('.slider .slick-active').length;

    if (visibleSlides === 1) {
      return;
    }

    if ($('.locked')[0] !== $(evt.currentTarget)[0]) {
      $('.locked').toggleClass('locked');
    }

    $(evt.currentTarget).hasClass('locked') ?
      $(evt.currentTarget).removeClass('locked') :
      $(evt.currentTarget).addClass('locked');
  });

  $(window).on('resize', function () {
    if ($('.locked')[0]) {
      $('.locked').removeClass('locked');
    }
  });

  $('.slick-arrow').on('click', (function (evt) {
    const nextButton = $(evt.currentTarget).hasClass('slick-next');
    const prevButton = $(evt.currentTarget).hasClass('slick-prev');
    const isLocked = $('.locked').length;
    const currentIndex = $('[data-slick-index]')[0];
    const countSlides = $('[data-slick-index]').length;
    const visibleSlides = $('.slider .slick-active');

    if (!isLocked ||
      currentIndex <= 0 ||
      currentIndex >= countSlides ||
      visibleSlides.length === 1) {
      return;
    }

    if (nextButton) {
      if (isLastScreen) { return; }

      isChangeDirection = true;

      lockedSlideIndex = +($('.locked').attr("data-slick-index"));
      lockedSlide = $('.locked')[0];
      nextSlide = $(`[data-slick-index="${lockedSlideIndex + 1}"]`)[0];

      swapElements(lockedSlide, nextSlide);

      $('.locked').attr('data-slick-index', lockedSlideIndex + 1);
      lockedSlideIndex += 1;
      nextSlide = null;

      isLastScreen = (visibleSlides[1] === slides[slides.length - visibleSlides.length + 1]);
    }

    if (prevButton) {
      isChangeDirection ? isLastScreen = false : isLastScreen = true;
      if (isLastScreen) { return; }

      lockedSlideIndex = +($('.locked').attr("data-slick-index"));
      lockedSlide = $('.locked')[0];
      prevSlide = $(`[data-slick-index="${lockedSlideIndex - 1}"]`)[0];

      swapElements(lockedSlide, prevSlide);

      $('.locked').attr('data-slick-index', lockedSlideIndex - 1);
      lockedSlideIndex -= 1;
      prevSlide = null;

      isLastScreen = (visibleSlides[0] === slides[0]);
    }
  }));
});
