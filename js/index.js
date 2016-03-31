import '../css/index.scss';

const $ = window.jQuery;

function animateLoadingBar(total, current) {
  // console.log(total);
  // console.log(current);
  const percentCounter = (current / total) * 100;
  $('.loading-bar').stop().animate({
    width: `${percentCounter}%`
  });
}

function loadingBar() {
  const req = require.context('../res/images', true, /\.(jpe?g|png|gif|svg)$/i);
  const imgUrls = req.keys().map(req);
  let loadedNum = 0;
  imgUrls.forEach(url => {
    $('<img>').attr('src', url)
      .load(animateLoadingBar.call(undefined, imgUrls.length, ++loadedNum))
      .error(animateLoadingBar.call(undefined, imgUrls.length, ++loadedNum));
  });
}

loadingBar();


const skrollr = window.skrollr;
let scrollbarTimeout;
const $scrollbar = $('#scrollbar');

function showContent() {
  setTimeout(() => {
    $('body').removeClass('is-loading');
    $('.spinner-wrapper').animate(
      {
        opacity: 0
      },
      {
        duration: 1000,
        complete: () => {
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
        }
      }
    );
  }, 2000);
}

$(window).load(() => {
  console.log('window loaded..!!');
  showContent();
});


// @ loading an image to caculate the progress status
// $.ajax({
//   url: 'res/images/end0.jpg',
//   xhrFields: {
//     onprogress: progress => {
//       // console.log(progress);
//       if (progress.lengthComputable) {
//         const percentage = Math.floor(progress.loaded / progress.total * 100);
//         console.log('progress', percentage);
//         if (percentage === 100) {
//           console.log('done!!');
//         }
//       }
//     }
//   }
// })
// .done(data => {
//   console.log('done..!!!!');
// });
// loading an image to caculate the progress status @
