const phrases = [
    "I'm an IT Risk Consultant",
    "I'm a Certified Scrum Master",
    "I'm an Amateur Astro Photographer"
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
let typewriterText = document.getElementById('typewriter-text');
let typingSpeed = 60;
let deleteSpeed = 60;

function type() {
    const text = phrases[currentPhrase].substring(0, currentChar);
    typewriterText.textContent = text;
    let timeout = isDeleting ? deleteSpeed : typingSpeed;

    if (!isDeleting && currentChar === phrases[currentPhrase].length) {
        // Finish typing current phrase
        timeout = 1000; // Pause at end of phrase
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        // Finished deleting current phrase
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
    }

    currentChar += isDeleting ? -1 : 1;
    setTimeout(type, timeout);
}

document.addEventListener('DOMContentLoaded', function() {
    // Start typing effect after DOM has fully loaded
    type();
});



gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", (event) => {

  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }

  $("[words-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), { opacity: 0, yPercent: 100, duration: 0.6, ease: "back.out(2)", stagger: { amount: 0.5 } });
    createScrollTrigger($(this), tl);
  });
  
  $("[letters-fade-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, duration: 0.5, ease: "power1.out", stagger: { amount: 0.8 } });
    createScrollTrigger($(this), tl);
  });
  
    $("[words-slide-from-right]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), { opacity: 0, x: "1em", duration: 0.8, ease: "power2.out", stagger: { amount: 0.2 } });
    createScrollTrigger($(this), tl);
  });
  
   $("[letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, yPercent: 100, duration: 0.2, ease: "power1.out", stagger: { amount: 0.6 } });
    createScrollTrigger($(this), tl);
  });
  
    $("[letters-fade-in-random]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { opacity: 0, duration: 0.05, ease: "power1.out", stagger: { amount: 0.4, from: "random" } });
    createScrollTrigger($(this), tl);
  });
  
    $("[scrub-each-word]").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 90%",
        end: "top center",
        scrub: true
      }
    });
    tl.from($(this).find(".word"), { opacity: 0.2, duration: 0.2, ease: "power1.out", stagger: { each: 0.4 } });
  });
/*
  $("[words-rotate-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.set($(this).find(".word"), { transformPerspective: 1000 });
    tl.from($(this).find(".word"), { rotationX: -90, duration: 0.6, ease: "power2.out", stagger: { amount: 0.6 } });
    createScrollTrigger($(this), tl);
  });


  $("[letters-slide-down]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { yPercent: -120, duration: 0.3, ease: "power1.out", stagger: { amount: 0.7 } });
    createScrollTrigger($(this), tl);
  });
  

*/
  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});

/*
//from tympanus/codrops
const MathUtils = {
    // map number x from range [a, b] to [c, d]
    map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
    // linear interpolation
    lerp: (a, b, n) => (1 - n) * a + n * b
};

let currentScrollPos = 0;
let oldScrollPos = 0;
let olderScrollPos = 0;
let ease = 0.3;
let transformValue = 0;
const content = document.getElementById('content-area');

function myEffect() {
  currentScrollPos = window.scrollY;
  
  //lerp: (a, b, n) => (1 - n) * a + n * b
  olderScrollPos = MathUtils.lerp(olderScrollPos, oldScrollPos, ease);
  oldScrollPos = MathUtils.lerp(oldScrollPos, currentScrollPos, ease);
  
  // The Solution i came up with (works less well)
  //olderScrollPos = (oldScrollPos - olderScrollPos)/2 + olderScrollPos;
  //oldScrollPos = (currentScrollPos - oldScrollPos)/2 + oldScrollPos;
  
  transformValue = (olderScrollPos - oldScrollPos) * 0.025;
  transformValue = transformValue.toFixed(2);
  //latestKnownScrollPos;
  
  content.style.transform = 'skewY(' + transformValue +'deg)';
  
  requestAnimationFrame(myEffect);
}
myEffect();
*/





const COLOR_LIST = ['#7f00ff', '#ff00ff', '#0000ff', '#007fff', '#00ffff'];
let $targetList;

const init = () => {

  $targetList = document.querySelectorAll('[data-js="reveal"]');

  setup();

  window.addEventListener('scroll', onScroll, false);
  window.dispatchEvent(new Event('scroll'));

};

const getArrayRandomValue = array => array[Math.floor(Math.random() * array.length)];

const setup = () => {

  for (const $target of $targetList) {

    const content = $target.innerHTML;
    const color = 'revealColor' in $target.dataset ? $target.dataset.revealColor : getArrayRandomValue(COLOR_LIST);
    $target.innerHTML = `<span data-reveal="content"><div data-reveal="cover" style="background-color:${color}"></div><span data-reveal="text">${content}</span></span>`;

  }

};

const onScroll = () => {

  const windowH = window.innerHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const isMostScroll = document.body.clientHeight <= scrollTop + windowH;

  for (const $target of $targetList) {

    if ($target.classList.contains('loaded')) continue;

    const rect = $target.getBoundingClientRect();
    const top = rect.top + scrollTop;
    if (isMostScroll || top <= scrollTop + windowH * .8) $target.classList.add('loaded');

  }

};

document.addEventListener('DOMContentLoaded', init, false);


$(document).ready(function() {
  var $slider=$("#slider");
  var slideLength = $("#slider > .slide").length -1 ;
  var ctrl=false;
  $(document).keydown(function (e) {
      if(e.keyCode==17) {
          ctrl=true;
          $("#slider").removeClass("_3D");
          $(".key.ctrl").addClass("active");
      }
  }).keyup(function (e) {
      if(e.which == 17){
          ctrl=false;
          $("#slider").addClass("_3D");
          $(".key.ctrl").removeClass("active");
      }
      if(e.which==39 || e.which==40){
          nextSlide();
          return;
      }
      if(e.which==37 || e.which==38){
          prevSlide();
          return;
      }
  });

  var is3D=false;
  $(".key").mousedown(function(){
      if($(this).hasClass("ctrl")){
          if($(this).hasClass("active")) is3D = true;
          $("#slider").removeClass("_3D");
      }
      $(this).addClass("active");
  }).mouseup(function(){
      if($(this).hasClass("down") || $(this).hasClass("right")) nextSlide();
      if($(this).hasClass("up") || $(this).hasClass("left")) prevSlide();
      console.log(is3D);
      if($(this).hasClass("ctrl active")){
          if(is3D){
              $(this).removeClass("active");
              $("#slider").addClass("_3D");
              is3D=false;
          } 
      }else{
          $(this).removeClass("active");
      }
  });

  function nextSlide() {
      lastElem().addClass("active");
      $slider.addClass("transfomer");
      setTimeout(function(){
          var $slicedSlide = $('.slide').slice(slideLength);
          $slider.prepend($slicedSlide);
          $(document).find(".slide.active").removeClass("active");
          $slider.removeClass("transfomer");
      },300);
  }

  function prevSlide(){
      var $slicedSlide = $('.slide').slice(0,1).addClass("active");
      $slider.append($slicedSlide);
      setTimeout(function(){
          lastElem().removeClass("active");
      },50);
  }

  function lastElem(){
      return $("#slider > .slide").last();
  }
});



function showSidebar(){
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'flex'

}
function hideSidebar(event){
  const sidebar = document.querySelector('.sidebar');
  
  // Check if the link is an internal link
  if (event.target.closest('a').getAttribute('href').startsWith('#')) {
    // Allow the default action for internal links but hide the sidebar after a short delay
    setTimeout(() => {
      sidebar.style.display = 'none';
    }, 300); // Adjust delay as needed
  } else {
    // Prevent the default action for external links
    event.preventDefault();
    sidebar.style.display = 'none';
  }
}






paceOptions ={
  ajax: true,
  document:true
}
Pace.on('done', () => {
  gsap.timeline()
  .add('p')
  .to('.pace', {
    transform: 'scale(10,1)',
    duration:4,
  },"+=.2")
  .to('.pace',{
    duration:0.5,
    height:"100%",
  },"-=2.5")
  .to('.loading_text',{
    delay:1.2,
    duration:2,
    opacity:0,
    yPercent:-400,
    ease:'BezierEasing(0.19,1,0.22,1)'
  },'p')
  .to('.pace',{
    duration:1,
    opacity:0,
    ease:'BezierEasing(0.19,1,0.22,1)'
  },"-=1.9")
  .to('.mega-cont',{
    delay:.1,
    duration:1,
    opacity:1,
    ease:Expo.easeInOut
  },"-=2.2")
})