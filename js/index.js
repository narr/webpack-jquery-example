import '../css/index.scss';

const $ = window.jQuery;
const skrollr = window.skrollr;

let scrollbarTimeout;
const $scrollbar = $('#scrollbar');

$(window).load(() => {
  console.log('hide progress bar..!!');

  skrollr.init({
    beforerender: () => {
      clearTimeout(scrollbarTimeout);
      $scrollbar.stop().css({
        opacity: 1
      });
    },
    render: () => {
      scrollbarTimeout = setTimeout(() => {
        $scrollbar.animate({
          opacity: 0
        });
      }, 200);
    }
  });
});
