const rainsongimg = document.getElementById('centerimg');
const instructionText = document.getElementById('instruction-text');
const whiteDot = document.getElementById('white-dot');
const ring = document.getElementById('ring');
const mouseText = document.getElementById('mousetxt');

const soundsAndDistances = {
    'A minor': { sound: new Audio('Assets/sounds/Aminor.wav'), minDist: 0, maxDist: 24, text: 'A minor (0-24px)' },
    'G major': { sound: new Audio('Assets/sounds/Gmajor.wav'), minDist: 24, maxDist: 56, text: 'G major (24-56px)' },
    'E major': { sound: new Audio('Assets/sounds/Emajor.wav'), minDist: 56, maxDist: 88, text: 'E major (56-88px)' },
    'D major': { sound: new Audio('Assets/sounds/Dmajor.wav'), minDist: 88, maxDist: 120, text: 'D major (88-120px)' },
    'C major': { sound: new Audio('Assets/sounds/Cmajor.wav'), minDist: 120, maxDist: 152, text: 'C major (120-152px)' },
    'F major': { sound: new Audio('Assets/sounds/Fmajor.wav'), minDist: 152, maxDist: Infinity, text: 'F major (152px to end)' }
};

const windowWidth = window.innerWidth;

let xDist
let yDist
let finaldist
let currentnote
let currentnotetext
document.addEventListener('mousemove', function (event) { 
    const rainsongimgRect = rainsongimg.getBoundingClientRect();
    xDist = event.clientX - (rainsongimgRect.left + rainsongimgRect.width / 2);
    yDist = event.clientY - (rainsongimgRect.top + rainsongimgRect.height / 2);
    finaldist = Math.sqrt(xDist * xDist + yDist * yDist);
    //ratio
    finaldist/=((windowWidth)*1.1/1280)

    for (const [key, value] of Object.entries(soundsAndDistances)) {
        if (finaldist > value.minDist && finaldist <= value.maxDist) {
            currentnote = key;
            currentnotetext = value.text;
            break;
        }
    }

    mouseText.textContent = currentnote
    mouseText.style.left = `${event.clientX + 10}px`
    mouseText.style.top = `${event.clientY + 20}px`
});

document.addEventListener('click', function (event) {
    soundsAndDistances[currentnote].sound.play();
    instructionText.textContent = currentnotetext;

    /*const dotradius = 10;
    whiteDot.style.left = `${event.clientX - dotradius}px`;
    whiteDot.style.top = `${event.clientY - dotradius}px`;
    whiteDot.style.width = `${dotradius * 2}px`;
    whiteDot.style.height = `${dotradius * 2}px`;*/

    let ring = document.createElement('div');
    ring.classList.add('ring');
    ring.style.left = event.clientX + 'px';
    ring.style.top = event.clientY + 'px';
    document.body.appendChild(ring);

    let size = 0;
    let opacity = 0.7;
    function animate() {
        size += 10;
        opacity -= 0.02;

        ring.style.width = size + 'px';
        ring.style.height = size + 'px';
        ring.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            ring.remove();
        }
    }

    requestAnimationFrame(animate);

},true);