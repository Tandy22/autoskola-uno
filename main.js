let elVideos = document.getElementsByClassName('video');
let videos = [];

for (let i = 0; i < elVideos.length; i++) {
  videos.push({
    element: elVideos[i],
    previous: elVideos[i - 1] || elVideos[elVideos.length - 1],
    next: elVideos[i + 1] || elVideos[0]
  });
}

videos.forEach(video => {
  video.element.addEventListener('ended', () => {
    video.next.currentTime = .5;
    video.next.play();
    video.next.classList.remove('hidden');
    video.element.classList.add('hidden');
    console.log(`Video ${video.next.children[0].src} is playing`)
  });
});



let elCenterContent = document.getElementsByClassName("introduction-container")[0];

if (videos.length > 0) {
  // start center content animation and remove event listener for a video
  let startAnimation = () => {
    elCenterContent.classList.add('introduction-container--animated');
    videos[0].element.removeEventListener('play', startAnimation);
  }

  // REF: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event
  // start center content animation when video is started (this will fix situation when video
  // is slowly loaded, so text doesn't come out too soon)
  videos[0].element.addEventListener('play', startAnimation);

  // REF: https://stackoverflow.com/questions/10086427/what-is-the-exact-difference-between-currenttarget-property-and-target-property
  // when animation is ended, override visibility settings and remove animation class
  elCenterContent.addEventListener('animationend', (e) => {
    if (e.animationName === 'fadeIn') {
      e.target.classList.add('visible');
      e.target.classList.remove('introduction-container--animated');
    }
  })
}





/* HAMBURGER MENU */
let hamburgerMenuIcon = document.querySelector('.main_navigation__menu--mobile');
let menu = document.querySelector('.main-navigation__list');
let menuOverlay = document.querySelector('.menu-overlay');

hamburgerMenuIcon.addEventListener('click', () => {
  menu.classList.toggle('visible-flex');
  menuOverlay.classList.toggle('visible-flag');
  elCenterContent.classList.toggle('invisible');
});
