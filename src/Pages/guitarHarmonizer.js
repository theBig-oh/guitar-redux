import MakeElement from '../Tools/MakeElement.js';
import '../../css/Pages/guitarHarmonizer.scss';

const makeEle = new MakeElement;
const ratioArray = [
    {'name':'Half','ratioVal':2},
    {'name':'Third','ratioVal':3},
    {'name':'Quarter','ratioVal':4},
    {'name':'Fifth','ratioVal':5},
];
const fretArray = [
    100, 97, 91,
    86.5, 81.5, 77,
    73, 68.5, 64,
    61, 58, 55,
    51.5, 49, 46,
    43, 41, 39,
    37, 35, 33
];

const fretBlockCounts = [];
let displayActivation = false; 
let ratioDisplay = null;

// Active Class style changer for multiple items
function styleActiveChanger(ele, classActive) {
    let concernParent = ele.parentNode.getElementsByClassName(ele) ? ele.parentNode.getElementsByClassName(classActive) : 'no active children';

    [...concernParent].forEach((item) => {
        item.classList.remove(classActive);
    })
    ele.classList.add(classActive);
}

function guitarInstrucDisplay() {
    const displayContainer = makeEle.createEle('div','ledDisplayContainer',null,['ledDisplayContainer']);
    const displayFretText = makeEle.createEle('div','displayFretText',null,['displayFretText']);
    const displayRatioText = makeEle.createEle('div','displayRatioText',null,['displayRatioText']);
    const displayFretNum = makeEle.createEle('div','displayFretNum',null,['displayFretNum']);
    const displayRatioDisplay = makeEle.createEle('div','displayRatioDisplay',null,['displayRatioDisplay']);
    const displayFretGroup = makeEle.createEle('div','displayFretGroup',null,['displayFretGroup','displayContainerItem']);
    const displayRatioGroup = makeEle.createEle('div','displayRatioGroup',null,['displayRatioGroup','displayContainerItem']);

    displayFretText.innerHTML = 'Fret';
    displayRatioText.innerHTML = 'Ratio';


    fretArray.forEach((fret, i) => {
        const fretDisplayBlock = makeEle.createEle('div','fretDisplayBlock'+i,null,['ledItem','fretDisplayBlock']);
        if (i == 0){
            fretDisplayBlock.innerHTML = 'Open';
            fretDisplayBlock.classList.add('activeFret');
        } else {
            fretDisplayBlock.innerHTML = i;
        };

        displayFretNum.append(fretDisplayBlock);
    });

    ratioArray.forEach((ratio, i) => {
        const ratioDisplayBlock = makeEle.createEle('div','ratioDisplayBlock'+i,null,['ledItem','ratioDisplayBlock']);
        ratioDisplayBlock.innerHTML = ratio.name;
        if (i == 0) {
            ratioDisplayBlock.classList.add('activeRatio');
        }
        displayRatioDisplay.append(ratioDisplayBlock);
    });
    
    displayFretGroup.append(displayFretText, displayFretNum);
    displayRatioGroup.append(displayRatioText, displayRatioDisplay);

    displayContainer.append(displayFretGroup, displayRatioGroup);
    return displayContainer;
}


function guitarInstruction() {
    const instructContainer = makeEle.createEle('div','instructContainer', null,['instructContainer']);

    const instructTitle = makeEle.createEle('div','instructTitle',null,['instructTitle','instructContainerItem','controlTitle']);
    const instructOff = makeEle.createEle('div','instructOff',null,['instructOff','instructContainerItem', 'powerOp']);
    const instructOn = makeEle.createEle('div','instructOn',null,['instructOn','instructContainerItem', 'powerOp']);
    const instructDisplay = makeEle.createEle('div','instructDisplay',null,['instructDisplay','instructContainerItem']);
    const instructButtonArray = [instructOff, instructOn];

    instructTitle.innerHTML = `
        <div> Guitar Harmonizer </div>
    `;

    instructDisplay.append(guitarInstrucDisplay());
    instructContainer.append(instructTitle, instructOff, instructOn, instructDisplay);

    instructButtonArray.forEach((button, i) => {
        if (i == 0) {
            button.classList.add('activeOutput');
        }

        button.addEventListener('click', function(e) {
            displayActivation = !displayActivation;
            console.log(displayActivation);
            instructTitle.classList.toggle('activePower');
            document.querySelector('.fretArrayContainer').classList.toggle('activeComponent');
            document.querySelector('.ratioArrayContainer').classList.toggle('activeComponent');

            styleActiveChanger(button, 'activeOutput');
            instructDisplay.classList.toggle('activeDisplay');
        })
    });

    return instructContainer;
}

// Helper function for Fret Control
function guitarControlFretsClick(container, fretVal) {
    const style = getComputedStyle(container);
    const maxWidth = parseInt(style.maxWidth.replace('px', ''));
    container.style.width = (maxWidth * (fretVal / 100)) + 'px';
}
// Controller for Frets
function guitarControlFrets() {
    const fretContainer = makeEle.createEle('div','fretContainer',null,['fretContainer', 'guitarControlFretsItem','guitarControllerItem']);
    const fretTitle = makeEle.createEle('div','fretTitle',null,['fretTitle','fretContainerItem','controlTitle']);
    const fretArrayContainer = makeEle.createEle('div','fretArrayContainer',null,['fretArrayContainer','fretContainerItem']);

    fretTitle.innerHTML = `
        <div> FRET SELECT </div>
    `;

    fretArray.forEach((fret, i) => {
        const fretBlock = makeEle.createEle('div','fretBlock-'+i,null,['fretBlock','ampButton']);

        if (i == 0) {
            fretBlock.innerHTML = 'Open';
            fretBlock.classList.add('activeFret');
        } else {
            fretBlock.innerHTML = i;
        }

        fretArrayContainer.append(fretBlock);       
        
        fretBlock.addEventListener('click', function(e) {
            let displayFret = document.querySelector('#fretDisplayBlock'+i);

            if (displayActivation) {
                styleActiveChanger(fretBlock, 'activeFret');
                styleActiveChanger(displayFret, 'activeFret');
                guitarControlFretsClick(document.querySelector('.guitarRatio'), fret);
            } else {
                console.log('still off');
            }
        });

    });

    fretContainer.append(fretTitle, fretArrayContainer);
    return fretContainer;
}

// Helper function for ratio click
function guitarControlRatioClick(ratioVal) {
    ratioDisplay.update(ratioVal);
}

// Ratio display 
class GuitarRatioDisplay {
    constructor(container, ratVal) {
        this.container = container;
        this.ratVal = ratioArray[ratVal].ratioVal;
        this.ratName = ratioArray[ratVal].name;
        this.ratioBlocks = [];
        this.init();
    }

    init() {
        this.createRatioBlocks();
        this.render();
    }

    createRatioBlocks() {
        for (let x = 0; x <= this.ratVal - 1; x++) {
            let ratioBlock = makeEle.createEle('div','ratioBlock-'+x,null,['ratioBlock', 'ratio-'+this.ratName]);
            this.ratioBlocks.push(ratioBlock);
        }
    }

    render() {
        this.ratioBlocks.forEach((ratioBlock, i) => {
            this.container.append(ratioBlock);
        })
    }   

    update(ratVal) {
        this.container.innerHTML = '';
        this.ratVal = ratioArray[ratVal].ratioVal;
        this.ratName = ratioArray[ratVal].name;
        this.ratioBlocks = [];
        this.init();
    }
}

// Ratio Control display
function guitarControlRatio() {
    const ratioContainer = makeEle.createEle('div','ratioContainer',null,['ratioContainer', 'guitarControlRatioItem','guitarControllerItem']);
    const ratioTitle = makeEle.createEle('div','ratioTitle',null,['ratioTitle','ratioContainerItem','controlTitle']);
    const ratioArrayContainer = makeEle.createEle('div','ratioArrayContainer',null,['ratioArrayContainer','ratioContainerItem']);

    ratioTitle.innerHTML = `
        <div> RATIO SELECT </div>
    `;

    ratioArray.forEach((ratio, i) => {
        const ratioBlock = makeEle.createEle('div','ratioBlock-'+i,null,['ratioBlock','ampButton']);
        if (i == 0) {
            ratioBlock.classList.add('activeRatio');
        }
        
        ratioBlock.innerHTML = ratio.name;
        ratioArrayContainer.append(ratioBlock);

        ratioBlock.addEventListener('click',  function(e) {
            let displayRatio = document.querySelector('#ratioDisplayBlock'+i);

            if (displayActivation) {
                styleActiveChanger(displayRatio, 'activeRatio');
                styleActiveChanger(ratioBlock, 'activeRatio');
                guitarControlRatioClick(i);
            } else {
                console.log('still off');
            }

        });
    })

    ratioContainer.append(ratioTitle, ratioArrayContainer);

    return ratioContainer;
}

// Main Page 
function GuitarHarmonizer() {

    // Main Content Container
    const mainContent = makeEle.createEle('div','guitarHarmonizerMainContent',null,['guitarHarmonizerMainContent','bodyContainerItem']);

    // Guitar Harmonizer Components
    const guitarWrapper = makeEle.createEle('div','guitarWrapper',null,['guitarWrapper', 'guitarHarmContent']);
    const guitarControl = makeEle.createEle('div','guitarControl',null,['guitarControl', 'guitarHarmContent']);
    const guitarInstructions = makeEle.createEle('div','guitarInstructions',null,['guitarInstructions', 'guitarHarmContent']);

    // Guitar Display
    const guitarRatio = makeEle.createEle('div','guitarRatio',null,['guitarRatio', 'guitarWrapperItem']);
    const guitarSVG = makeEle.createEle('div','guitarSVG',null,['guitarSVG','guitarWrapperItem']);

    // Appending components to page
    // 1. Guitar Controls (Fret Control, Ratio Control)
    // 2. Guitar Display  (Ratio Display)
    // 3. Initialize Ratios
    // . Main Content    (Guitar Control, Guitar Display)

    ratioDisplay = new GuitarRatioDisplay(guitarRatio, 0); // * 3    
    guitarControl.append(guitarControlFrets(), guitarControlRatio()); // * 1
    guitarInstructions.append(guitarInstruction());
    guitarWrapper.append(guitarRatio, guitarSVG); // * 2
    mainContent.append(guitarControl, guitarInstructions, guitarWrapper); // * 

    return mainContent;
}

export default GuitarHarmonizer;
