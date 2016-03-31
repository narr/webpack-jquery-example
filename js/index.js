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


const MIN_WIDTH_FOR_VIDEO = 500;
let videoEnabled = false;

function checkVideo() {
  let videoTag;
  if (MIN_WIDTH_FOR_VIDEO < $(window).width()) {
    videoEnabled = true;
    const videoSrc = require('res/videos/video.mp4');
    videoTag = `
      <div class="video-wrapper">
        <video preload="auto" loop="loop" class="video-playing">
          <source src="${videoSrc}" type="video/mp4">
        </video>
      </div>
    `;
    $('#bg3').html(videoTag);
  }
}

function playPause(scrollTop) {
  const VIDEO_TOP = -1;
  const VIDEO_BOTTOM = 126; // a quarter length of data-500
  const videoTag = $('video')[0];
  if (VIDEO_TOP < scrollTop && scrollTop < VIDEO_BOTTOM) {
    if (videoTag.paused) {
      videoTag.play();
    }
  } else {
    if (!videoTag.paused) {
      videoTag.pause();
    }
  }
}


const skrollr = window.skrollr;
let scrollbarTimeout;
const $scrollbar = $('#scrollbar');

function initSkrollr() {
  skrollr.init({
    beforerender: () => {
      clearTimeout(scrollbarTimeout);
      $scrollbar.stop().css({
        opacity: 1
      });
    },
    render: (data) => {
      scrollbarTimeout = setTimeout(() => {
        $scrollbar.animate({
          opacity: 0
        });
      }, 200);
      if (videoEnabled) {
        playPause(data.curTop);
      }
    }
  });
}


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
          initSkrollr();
        }
      }
    );
  }, 2000);
}

$(window).load(() => {
  console.log('window loaded..!!');
  checkVideo();
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
