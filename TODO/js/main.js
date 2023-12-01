(() => {

  function main(timerStart) {

    const userLocation = location.href.match(/[\d\w-]+\.\w+$/);
    const descr = document.createElement('p');
    const descrTime = document.createElement('p');
    const footer = document.querySelector('.footer');

    const timeLoad = setPageLoadTime(timerStart);
    const page = document.querySelector(`.nav-link_${userLocation[0].split('.')[0]}`);

    page.classList.add('nav-link_active');
    descr.classList.add('descr');

    descr.textContent = "Page load time in JavaScript";
    descrTime.innerHTML = `Page load time is <strong class="time">${timeLoad / 1000}</strong> Second(s)`;

    footer.append(descr);
    footer.append(descrTime);
  }

  function setPageLoadTime(timerStart) {

    return Date.now() - timerStart;
  }

  const timerStart = Date.now();
  document.addEventListener('DOMContentLoaded', function () {

    main(timerStart);
  });
})();
