(() => {

  function generalSettings() {

    configureAnimation();
  }

  function configureAnimation() {

    const GALLERY_RESTRICTIONS = {
      amountImages: 3,
      defaultType: 20,
      media: ['max-width', ['1920px', '1109px', '1023px', '320px']],
      imagePathListType19: [['img/gallery-image-19-1-1920.jpg', 'img/gallery-image-19-1-1024.jpg', 'img/gallery-image-19-1-768.jpg', 'img/gallery-image-19-1-320.jpg'], ['img/gallery-image-19-2-1920.jpg', 'img/gallery-image-19-2-1024.jpg', 'img/gallery-image-19-2-768.jpg', 'img/gallery-image-19-2-320.jpg'], ['img/gallery-image-19-3-1920.jpg', 'img/gallery-image-19-3-1024.jpg', 'img/gallery-image-19-3-768.jpg', 'img/gallery-image-19-3-320.jpg']],
      imagePathListType20: [['img/gallery-image-20-1-1920.jpg', 'img/gallery-image-20-1-1024.jpg', 'img/gallery-image-20-1-768.jpg', 'img/gallery-image-20-1-320.jpg'], ['img/gallery-image-20-2-1920.jpg', 'img/gallery-image-20-2-1024.jpg', 'img/gallery-image-20-2-768.jpg', 'img/gallery-image-20-2-320.jpg'], ['img/gallery-image-20-3-1920.jpg', 'img/gallery-image-20-3-1024.jpg', 'img/gallery-image-20-3-768.jpg', 'img/gallery-image-20-3-320.jpg']],
      imagePathListType21: [['img/gallery-image-21-1-1920.jpg', 'img/gallery-image-21-1-1024.jpg', 'img/gallery-image-21-1-768.jpg', 'img/gallery-image-21-1-320.jpg'], ['img/gallery-image-21-2-1920.jpg', 'img/gallery-image-21-2-1024.jpg', 'img/gallery-image-21-2-768.jpg', 'img/gallery-image-21-2-320.jpg'], ['img/gallery-image-21-3-1920.jpg', 'img/gallery-image-21-3-1024.jpg', 'img/gallery-image-21-3-768.jpg', 'img/gallery-image-21-3-320.jpg']]
    };

    setupGalleryAnimation(GALLERY_RESTRICTIONS);
  }

  function setupGalleryAnimation(RESTR) {

    const inputList = document.querySelectorAll('.gallery__input');
    const pictureList = document.querySelectorAll('.gallery__picture');

    for (let i = 0; i < RESTR.amountImages; i++) {

      const keys = Object.keys(RESTR);
      const image = document.createElement('img');
      let curType = null;

      keys.forEach((item) => {

        if (item.includes(String(RESTR.defaultType))) {

          curType = item;
        }
      });

      image.src = `${RESTR[curType][i][0]}`;

      for (let j = RESTR[curType][i].length - 1; j > 0; j--) {

        const source = document.createElement('source');
        source.srcset = RESTR[curType][i][j];
        source.media = `(${RESTR['media'][0]}: ${RESTR['media'][1][j]})`;

        pictureList[i].append(source);
      }

      pictureList[i].append(image);
    }

    inputList.forEach((item) => {

      item.addEventListener('click', () => {

        pictureList.forEach((elem) => {

          elem.classList.add('gallery__anim-transform-x');
        });

        setTimeout(() => {

          switch (item.value) {

            case "XIX век":

              setImageSRC(pictureList, RESTR.imagePathListType19);
              break;

            case "XX век":

              setImageSRC(pictureList, RESTR.imagePathListType20);
              break;

            case 'Современность':

              setImageSRC(pictureList, RESTR.imagePathListType21);
              break;
          }
        }, 1500);

        setTimeout(() => {

          pictureList.forEach((elem) => {

            elem.classList.remove('gallery__anim-transform-x');
          });
        }, 2000);
      });
    });
  }

  function setImageSRC(pictureList, imageList) {

    let counter = 1;
    for (let i = 0; i < pictureList.length; i++) {

      for (let j = pictureList[i].children.length - 2; j > -1; j--) {

        pictureList[i].children[j].srcset = imageList[i][counter];
        counter++;
      }

      pictureList[i].children[pictureList[i].children.length - 1].src = `${imageList[i][0]}`;
      counter = 1;
    }
  }

  window.generalSettings = generalSettings;
})();
