const centerimgdiv = document.getElementById("centerimgdiv");
const instructionText = document.getElementById("instruction-text");
const whiteDot = document.getElementById("white-dot");
const ring = document.getElementById("ring");
const mouseText = document.getElementById("mousetxt");
const mouseTextDiv = document.getElementById("mousetxtdiv");

const soundsAndDistances = {
    "G major": { sound: new Audio("Assets/sounds/GMajor.wav"), minDist: 0, maxDist: 24, text: "G major (0-24px)" },
    "A minor": { sound: new Audio("Assets/sounds/AMinor.wav"), minDist: 24, maxDist: 56, text: "A minor (0-56px)" },
    "B minor": { sound: new Audio("Assets/sounds/Bminor.wav"), minDist: 56, maxDist: 88, text: "B minor (56-88px)" },
    "C major": { sound: new Audio("Assets/sounds/Cmajor.wav"), minDist: 88, maxDist: 120, text: "C major (88-120px)" },
    "D major": { sound: new Audio("Assets/sounds/Dmajor.wav"), minDist: 120, maxDist: 152, text: "D major (120-152px)" },
    "E minor": { sound: new Audio("Assets/sounds/Eminor.wav"), minDist: 152, maxDist: 99999, text: "E major (152px to end)" }
};

const windowWidth = window.innerWidth;

let xDist
let yDist
let finaldist
let currentnote
let currentnotetext
document.addEventListener("mousemove", function (event) { 
    const centerimgdivRect = centerimgdiv.getBoundingClientRect();
    xDist = event.clientX - (centerimgdivRect.left + centerimgdivRect.width / 2);
    yDist = event.clientY - (centerimgdivRect.top + centerimgdivRect.height / 2);
    finaldist = Math.sqrt(xDist * xDist + yDist * yDist);
    //ratio
    finaldist/=((windowWidth*2)/1020);

    for (const [key, value] of Object.entries(soundsAndDistances)) {
        if (finaldist > value.minDist && finaldist <= value.maxDist) {
            currentnote = key;
            currentnotetext = value.text;
            break;
        }
    }

    mouseText.textContent = currentnote;
    mouseTextDiv.style.left = `${event.clientX + 5}px`;
    mouseTextDiv.style.top = `${event.clientY + 10}px`;

    const dotradius = 8;
    whiteDot.style.left = `${event.clientX}px`;
    whiteDot.style.top = `${event.clientY}px`;

});

document.addEventListener("click", function (event) {
    soundsAndDistances[currentnote].sound.currentTime = 0;
    soundsAndDistances[currentnote].sound.play();
    instructionText.textContent = currentnotetext;

    let ring = document.createElement("div");
    ring.id = "ring"
    ring.style.left = event.clientX + "px";
    ring.style.top = event.clientY + "px";
    document.body.appendChild(ring);

    let size = 0;
    let opacity = 0.7;
    function animate() {
        size += 10;
        opacity -= 0.02;

        ring.style.width = size + "px";
        ring.style.height = size + "px";
        ring.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            ring.remove();
        }
    }

    requestAnimationFrame(animate);

},true);