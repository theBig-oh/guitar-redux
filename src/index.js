import '../css/style.scss';
import MakeElement from './Tools/MakeElement.js';
import GuitarHarmonizer from './Pages/guitarHarmonizer.js';
import GuitarScale from './Pages/guitarScale.js';

class GallerySlideShow {

  /*
    Constructor 
      @params 
        int - amountOfImagesShown 
              - Sets the amount of images being shown per page

        int - pageSpeed
              - Sets the speed of the loading of next images
  */


  constructor (amountOfImagesShown, pageSpeed) {
    this.state = {
      amountOfImagesCurrentShown : amountOfImagesShown,
      currentImageCount: 0,
      currentPage : 0,
      totalAmountOfPages : 0,
      images : [],
      renderedImages : [],
      receivedImages: false,
      loadedImages : false,
      pageSpeed: pageSpeed,
      
    }

    /* Reserved for method binds */
  }

  /*
    receiveImages 
      @params
        - {} Object - Receives images to store in state


    Function description - 

      - Receives the images, and saves them into state.images. 
      - Calculates the number of Total pages for carousel by rounding up
        the result of the images length by the current amount of images shown


  */


  receiveImages (imagesBeingReceived) {
    this.state.images = imagesBeingReceived;
    this.state.totalAmountOfPages = this.state.images ? Math.ceil(this.state.images.length / this.state.amountOfImagesCurrentShown) - 1 : 0;
    this.renderImages(this.state.currentPage);
    this.updateState('receivedImages');
  }



  /*

    renderImageContainer 

      
      - Builds out the container divs for the images. The amount being generated is depending on the 
        `amountOfImagesCurrentShown` value in the `state` 

      - Will append the imageContainers in whatever HTML element (preferrably DIV) is in the `insertContainerHere` callback/argument
  */



  renderImageContainer (insertContainersHere) {
    let renderImageContainers = [];

    for(let x=0; x <= this.state.amountOfImagesCurrentShown - 1; x++) {
      let renderContainer = makeEle.createEle('div','renderImageContainer__'+x, false, ['renderImageContainers','renderImages__not-loaded']);
      let renderImage = makeEle.createEle('img', 'renderImage__'+x, false, ['renderImages','renderImage','renderImages__not-loaded']);

      renderContainer.append(renderImage);
      renderImageContainers.push(renderContainer);
    }

    return (

    renderImageContainers.forEach(i => {
      insertContainersHere.append(i);
    })

    )
  }



  /*
    renderImages 

      - Collects all the imageContainers.

      - Checks the where to start the images by start count. 
        - StartCount also depends if the pageCount is greater than 0, due to math... 
          Needs to know that pageCount is greater than 0 so to not duplicate images

      - Adds a `no-image-available` class if image is not available


  */


  renderImages (pageCount) {
    let imageContainers = Array.of(document.querySelectorAll('.renderImage'))[0];
    let startCount = pageCount * this.state.amountOfImagesCurrentShown;
  
    imageContainers.forEach((imgEle, index) => {
      let imageNum;
  
        imageNum = startCount + index;
        
  

      if(!this.state.images[imageNum]) {
        imgEle.classList.remove('image-available');
        imgEle.classList.add('no-image-available');
        imgEle.parentNode.classList.remove('image-available');
        imgEle.parentNode.classList.add('no-image-available');
      } else {
        imgEle.src = this.state.images[imageNum].link;
          window.setTimeout(() => {
            imgEle.classList.remove('image-loading');
            imgEle.classList.add('image-available');
            imgEle.classList.remove('no-image-available');
            imgEle.parentNode.classList.remove('no-image-available');
            imgEle.parentNode.classList.add('image-available');
        }, this.state.pageSpeed)
      }

    })
  }

  /*
    movePage

    Moves the gallery carousel by increasing or decreasing the this.state.currentPage and
    calls the renderImages function to re-render the gallery with the newer images.
      


  */


  movePage (pageMove) {
    if (!pageMove) {
      if ((this.state.currentPage + 1) <= this.state.totalAmountOfPages) {
        this.state.currentPage += 1;
      }
    } else {
      if ((this.state.currentPage - 1) >= 0) {
        this.state.currentPage -= 1;
      }
    }

    let imageContainers = Array.of(document.querySelectorAll('.renderImage'))[0];


    imageContainers.forEach(imgEle => {
      imgEle.classList.add('image-loading');
    })

    this.renderImages(this.state.currentPage);
    
  }


  updateState (stateUpdated) {
    this.state[stateUpdated] = !this.state[stateUpdated];
  }

  renderGallery () {
    let galleryContainer = makeEle.createEle('div','galleryContainer', false, ['galleryContainer']),
        galleryImagesContainer = makeEle.createEle('div','galleryImagesContainer', false, ['galleryImageContainer']),
        galleryControlsContainer = [makeEle.createEle('div','galleryControlLeft',false,['galleryControls']),
                                    makeEle.createEle('div','galleryControlRight',false,['galleryControls'])];


    galleryControlsContainer.forEach(ctrl => {
      
      ctrl.addEventListener('click', (e) => {
        if (ctrl.id == 'galleryControlLeft') {
          this.movePage(true);
        } else {
          this.movePage(false);
        }
      })
      console.log(ctrl);
    })

    this.renderImageContainer(galleryImagesContainer);

    galleryContainer.append(galleryControlsContainer[0], galleryImagesContainer, galleryControlsContainer[1]);

    return galleryContainer;

  }


}



function RenderSite(){
  let body = document.querySelector('body');
 
  let makeEle = new MakeElement;

  let bodyContainer = makeEle.createEle('div','bodyContainer',false,'bodyContain');  

  let bodyLayout = [
                    GuitarHarmonizer()
                  ];

  bodyLayout.forEach((item) => {
    console.log(item);
    bodyContainer.append(item);
  })

  bodyContainer.append();
  body.append(bodyContainer);
}

RenderSite(); 