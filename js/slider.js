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
    if ($('.locked')[0] !== $(evt.currentTarget)[0]) {
      $('.locked').toggleClass('locked');
    }

    $(evt.currentTarget).hasClass('locked') ?
      $(evt.currentTarget).removeClass('locked') :
      $(evt.currentTarget).addClass('locked');
  });

  $('.slick-arrow').on('click', (function (evt) {
    let isLocked = $('.locked').length;
    if (!isLocked) {
      return;
    }

    let lockedSlide = $('.locked')[0];
    let lockedSlideIndex = $('.locked').attr("data-slick-index");
    let nextSlide = $(`[data-slick-index=${+lockedSlideIndex + 1}]`)[0];
    let prevSlide = $(`[data-slick-index=${+lockedSlideIndex - 1}]`)[0];
    const nextButton = $(evt.currentTarget).hasClass('slick-next');

    let clonedLocked = lockedSlide.cloneNode(true); // 1
    let clonedNext = nextSlide.cloneNode(true); // 2
    let clonedPrev = prevSlide.cloneNode(true);  // 3

    if (nextButton) {
      let nextIndex = $(nextSlide).attr("data-slick-index");

      nextSlide.parentNode.replaceChild(clonedLocked, nextSlide);
      lockedSlide.parentNode.replaceChild(clonedNext, lockedSlide);

      nextSlide = $(`[data-slick-index=${(+nextIndex + 1)}]`)[0];

    } else {
      let prevIndex = $(prevSlide).attr("data-slick-index");

      prevSlide.parentNode.replaceChild(clonedLocked, prevSlide);
      lockedSlide.parentNode.replaceChild(clonedPrev, lockedSlide);

      prevSlide = $(`[data-slick-index=${(+prevSlide + 1)}]`)[0];
    }
  }));
});
