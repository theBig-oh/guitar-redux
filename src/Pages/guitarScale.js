import MakeElement from '../Tools/MakeElement.js';
import '../../css/Pages/guitarScale.scss';



function GuitarScale() {
    const makeEle = new MakeElement;

    const mainContent = makeEle.createEle('div','guitarScaleMainContent',null,['guitarScaleMainContent','bodyContainerItem']);

    mainContent.innerHTML = `
        <div class="guitarScaleMainContent">
            <div class="guitarScaleMainContent__title">Guitar Scale</div>
            <div class="guitarScaleMainContent__description">This is a guitar Scale</div>
        </div>
    `;

    return mainContent;
}

export default GuitarScale;
