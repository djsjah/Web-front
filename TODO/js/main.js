(() => {

  function main(timerStart) {

    let page = null;
    const userLocation = location.href.match(/[\d\w-]+\.\w+$/);
    const descr = document.createElement('p');
    const descrTime = document.createElement('p');
    const footer = document.querySelector('.footer');

    const timeLoad = setPageLoadTime(timerStart);

    switch (userLocation[0]) {

      case 'index.html':

        page = document.querySelector('.nav-link_main');
        break;

      case 'dad.html':

        page = document.querySelector('.nav-link_dad');
        break;

      case 'mom.html':

        page = document.querySelector('.nav-link_mom');
        break;
    }

    page.classList.add('nav-link_active');
    descr.classList.add('descr');

    descr.textContent = "Page load time in JavaScript";
    descrTime.innerHTML = `Page load time is <span class="time">${timeLoad}</span> Seconds`;

    footer.append(descr);
    footer.append(descrTime);
  }

  function setPageLoadTime(timerStart) {

    return Date.now() - timerStart;
  }

  window.main = main;
})();
