/*

 ________   ___   __     ________  ___ __ __   ______      
/_______/\ /__/\ /__/\  /_______/\/__//_//_/\ /_____/\     
\::: _  \ \\::\_\\  \ \ \__.::._\/\::\| \| \ \\::::_\/_    
 \::\_\  \ \\:. `-\  \ \   \::\ \  \:.      \ \\:\/___/\   
  \:: __  \ \\:. _    \ \  _\::\ \__\:.\-/\  \ \\::___\/_  
   \:.\ \  \ \\. \`-\  \ \/__\::\__/\\. \  \  \ \\:\____/\ 
    \__\/\__\/ \__\/ \__\/\________\/ \__\/ \__\/ \_____\/ 
                                                           

*/


//drag drop
var position = { x: 0, y: 0 }

var aniTimeout = [];
var timer = [];
var delta = [];

var cadence = {
  menu: {
    barLag: 800
  },
  fight: {
    applause: 4000,
    spawn: 1000,
    countdown: 2000,
    battle: 6000
  },
  countDown: {
    tempo: 1000
  },
  hit: {
    flicker: 400,
    count: 800
  },
  battle1: {
    bell: 7000
  },
  smash: {
    air: 1000
  }
}

function time(title) {
  // Get the current date and time
const currentTime = new Date();

// Extract hours, minutes, seconds, and milliseconds
const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();
const seconds = currentTime.getSeconds();
const milliseconds = currentTime.getMilliseconds();
const store = parseFloat(`${seconds}.${milliseconds}`);
timer.push({
  title: title,
  time:  store
});

// Log the current time to the console
//console.log(`Current Time: ${hours}:${minutes}:${seconds}.${milliseconds}`);
}

function readT() {
  for(let i =0; i < timer.length; i++) {
    let t = timer[i].title + timer[i+1].title;
    let d = timer[i+1].time - timer[i].time
    delta.push({
      title: t,
      delta: d
    })
  }
}

interact('.draggable').draggable({
  listeners: {
    start (event) {
      //console.log(event.type, event.target)
      event.target.classList.add('dragging');
      if(document.getElementById('banner')){
        get('banner').remove();
      }
    },
    move (event) {
      position.x += event.dx
      position.y += event.dy

      event.target.style.transform =
        `translate(${position.x}px, ${position.y}px)`
    },
    end (event) {
        event.target.classList.remove('dragging'); // Remove the class when the disc is dropped
    },
  }
})

interact('.char').dropzone({
  accept: '.draggable', // Only accept elements with the 'draggable' class
  overlap: 0.5,
  ondragenter(event) {
    const draggableElement = event.relatedTarget;
    const dropzone = event.target;
    if (draggableElement.classList.contains('draggable')) {
      //loadCard(dropzone.id);
      dropzone.classList.add('choice'); // Add a class to the tile when the disc enters
    }
  },
  ondragleave(event) {
    const draggableElement = event.relatedTarget;
    const dropzone = event.target;
    if (draggableElement.classList.contains('draggable')) {
      dropzone.classList.remove('choice'); // Remove the class from the tile when the disc leaves
    }
  },
  ondrop(event) {
      //const draggableElement = event.relatedTarget;
      var dropzone = event.target;
      console.log(dropzone);
      dropzone.classList.add('choice')
      character = parseInt(dropzone.id);
      loadCard(character);
      console.log('char picked',dropzone.id);
  }
});

interact('.dest').dropzone({
  accept: '.draggable', // Only accept elements with the 'draggable' class
  overlap: 0.5,
  ondragenter(event) {
    const draggableElement = event.relatedTarget;
    const dropzone = event.target;
    if (draggableElement.classList.contains('draggable')) {
      //loadCard(dropzone.id);
      dropzone.classList.add('choice'); // Add a class to the tile when the disc enters
    }
  },
  ondragleave(event) {
    const draggableElement = event.relatedTarget;
    const dropzone = event.target;
    if (draggableElement.classList.contains('draggable')) {
      dropzone.classList.remove('choice'); // Remove the class from the tile when the disc leaves
    }
  },
  ondrop(event) {
      //const draggableElement = event.relatedTarget;
      var dropzone = event.target;
      console.log(dropzone);
      arena = parseInt(dropzone.id);
      banner()
      //console.log('stage picked')
  }
});

interact.dynamicDrop(true)

function isMobileDevice() {
  // Get the current screen width
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // Define the mobile breakpoint (e.g., 769px)
  const mobileBreakpoint = 769;

  // Check if the screen width is less than the mobile breakpoint
  return screenWidth < mobileBreakpoint;
}
  
//animation
function welcome() {
    var image = get("logo");
    var opacity = 0;
    var intervalID = setInterval(function() {
        if (opacity < 1) {
        opacity += 0.01;
        image.style.opacity = opacity;
        } else {
        clearInterval(intervalID);
        setTimeout(function() {
            var intervalID2 = setInterval(function() {
            if (opacity > 0) {
                opacity -= 0.01;
                image.style.opacity = opacity;
            } else {
                clearInterval(intervalID2);
            }
            }, 4);
        }, 1000);
        }
    }, 2);
    setTimeout(function() {
        frame("","","","",
          create("button","sound","","start(true)","SOUND")
          +
          create("button","quiet","","start(false)","NO SOUND")
        )
        get('bar').style.display = "none";
    }, 2000);
}

function bannerSlide(id) {
    playSprite('selection');
    const element = document.getElementById(id);
    // Use a setTimeout to apply the transformation after a brief delay
    setTimeout(() => {
      element.style.top = '30%'; /* Move to the vertical center of the screen */
      element.style.transform = 'translate(-50%, -50%)'; /* Apply transformation */
    }, 100);
}

function countSlide(id) {
  //console.log('count');
  //time('count');
  const element = document.getElementById(id);
  // Use a setTimeout to apply the transformation after a brief delay
  setTimeout(() => {
    element.style.top = '50%'; /* Move to the vertical center of the screen */
    element.style.transform = 'translate(-50%, -50%)'; /* Apply transformation */
  }, 100);
}

function spawnSlide(id) {
  // console.log('spawn');
  //time('spawn');
  playSprite('spawn');
  el = get(id);
  //unhide the element if it is hidden
  if(el.style.display == "none"){
    el.style.display = "";
  }

  el.classList.add('spawn-slide');

  document.addEventListener(`animationend`, (event) => {
    if (event.animationName === "spawnSlideIn") {
      event.target.classList.remove('spawn-slide');
    }
  }, {once: true});
}

function countDown() {
  const tempo = cadence.countDown.tempo;
  document.body.innerHTML += 
    create("h1","count","fight","","3");
  countSlide("count");
  playSprite('three');
  setTimeout(() => {
    get('count').remove()
    document.body.innerHTML += 
      create("h1","count","fight","","2");
    countSlide("count");
    playSprite('two');
  },tempo)
  setTimeout(() => {
    get('count').remove()
    document.body.innerHTML += 
      create("h1","count","fight","","1");
    countSlide("count");
    playSprite('one');
  },tempo*2)
  setTimeout(() => {
    get('count').remove()
    document.body.innerHTML += 
      create("h1","count","fight","","FIGHT");
    countSlide("count");
    playSprite('ffight');
  },tempo*3)
  setTimeout(() => {
    get('count').remove()
  },tempo*4)
}

function battle1() {
  //console.log('battle1');
  //time('battle1');
  var p1 = get('player1');
  var p2 = get('player2');
  const tempo = cadence.hit.count;
  const bell = cadence.battle1.bell;
  //first blood
  hit(p2);
  setTimeout(()=>{
    hit(p1)
  },tempo);
  //exchanges
  setTimeout(()=>{
    curInt = setInterval(()=>{
      hit(p2);
      setTimeout(() => {hit(p1)},tempo);
    },tempo*2)
  },tempo)
  
  //decisive
  setTimeout(function () {
    smash();
  },bell)
}

smash = () => {
  //console.log('smash');
  //time('smash');
  clearInterval(curInt);
  var p1 = get('player1');
  var p2 = get('player2');
    // Apply a CSS class to initiate the animation
    p1.classList.add('smashR');
    p2.classList.add('smashL');
    setTimeout(()=>{
      if(score[round]){
        knockOff(p2,1);
      } else if(!score[round]){
        knockOff(p1,0);
      } else {
        knockOff(p1,0);
        knockOff(p2,1);
      }
      p1.classList.remove('smashR');
      p2.classList.remove('smashL');
    },100)

}

function hit(el) {
  //console.log('hit');
  //time('hit');
  playSprite('hit');
  let count = 0;
  const flickerInterval = setInterval(() => {
    if (count < 3) {
      el.style.transition = 'opacity 0.2s'; // Adjust the duration as needed
      el.style.opacity = '0'; // Set opacity to 0 (fully transparent)

      // Preserve the existing transform property
      const existingTransform = getComputedStyle(el).transform;
      el.style.transform = existingTransform + ' scaleX(-1)';

      setTimeout(() => {
        el.style.opacity = '1'; // Set opacity back to 1 (fully opaque)

        // Reset the transform property to its original state
        el.style.transform = existingTransform;
      }, cadence.hit.flicker/2); // This delay should match the transition duration

      count++;
    } else {
      clearInterval(flickerInterval); // Stop the flickering after 3 times
    }
  }, cadence.hit.flicker); // Adjust the interval as needed (e.g., 500ms for a flicker every half-second)
}

function knockOff(el,right) {
  //console.log('knockOff');
  //time('knockoff');
  playSprite('homerun');
  // Apply a CSS class to initiate the animation
  if(right == 0){
    el.classList.add('knock-off-left');
    game.p1.stock -= 1;
  } else {
    el.classList.add('knock-off-right');
    game.p2.stock -= 1;
  }
  setTimeout(()=>{
    //time('knockover');
    if(game.p1.stock > 0 && game.p2.stock > 0){
      get('action').innerHTML = action();
      if(right == 0){
        el.classList.remove('knock-off-left');
        spawnSlide('player1',right);
      } else if (right == 1){
        el.classList.remove('knock-off-right');
        spawnSlide('player2',right);
      }
      setTimeout(()=>{
        battle1();
      },cadence.fight.spawn)
    } else {
      stopMusics();
      if(game.p1.stock == 0){
        document.getElementById('0stock1').style.display = 'none'
      }else if(game.p2.stock == 0){
        document.getElementById('1stock1').style.display = 'none'
      }
      //time('fin');
      playSprite('ggame');;
      document.body.innerHTML += 
      create("button","result","","result()","FIN");
    }
    // if(game.p1.stock > 0 && game.p2.stock > 0){

      
    // }else{

    // }
  },cadence.smash.air)

  // Remove the element from the DOM after the animation ends
  // el.addEventListener('animationend', () => {
    
    
  // },{once: true});

  setTimeout(()=>{

  },cadence.smash.air)
  round++;
}

function panUp(zoomFactor) {
  const image = document.getElementById('dogpile');
  const container = document.getElementById('intro');
  
  const imageHeight = image.offsetHeight;
  const containerHeight = container.offsetHeight;

  if (imageHeight > containerHeight) {
    // Calculate the maximum scroll distance
    const maxScroll = imageHeight - containerHeight;
    const maxZoomedWidth = image.width * zoomFactor;
    const maxZoomedHeight = image.height * zoomFactor;
    
    // Apply CSS animations for smooth scrolling
    image.style.transition = 'transform 7s'; // Adjust the duration as needed
    image.style.transform = `translateY(${maxScroll}px)`;

    image.style.transition = 'transform 7s, width 7s, height 7s'; // Adjust durations as needed
    image.style.transform = `translateY(${maxScroll}px) scale(${zoomFactor})`;
    //image.style.width = `${maxZoomedWidth}px`;
    //image.style.height = `${maxZoomedHeight}px`;
  }
}
