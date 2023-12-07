(() => {

  async function main() {

    startPreloader();

    const data = await getFromDb();
    fillPanel(data);
  }

  function startPreloader() {

    setTimeout(() => {

      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 1000);
  }

  async function getFromDb() {

    let data = null;
    const idLimit = getRandomInt(1, 10);
    const pseFilter = setPseudorandomFilter(idLimit);

    await fetch(`https://jsonplaceholder.typicode.com/users${pseFilter}`)
      .then(async (response) => {

        if (response.ok) {

          data = await response.json();
        }
        else {

          throw "Error";
        }
      })
      .catch(() => {

        const errorTemplate = document.querySelector('.error-template');
        const clone = errorTemplate.content.cloneNode(true);
        const wrapper = document.querySelector('.client-panel__wrapper');

        wrapper.append(clone);
      });

    return data;
  }

  function fillPanel(data) {

    const table_headers = document.querySelectorAll('.manage-table__col_main');
    const tableBody = document.querySelector('.manage-table__body');

    for (let i = 0; i < data.length; i++) {

      const tableTemplate = document.querySelector('.table-template');
      const clone = tableTemplate.content.cloneNode(true);

      tableBody.append(clone);

      const tableCol = tableBody.lastElementChild.children;

      for (let j = 0; j < table_headers.length; j++) {

        switch (true) {

          case table_headers[j].classList.contains('manage-table__col_main_id'):

            setTableElem(tableCol[j], data[i], 'id');
            break;

          case table_headers[j].classList.contains('manage-table__col_main_name'):

            setTableElem(tableCol[j], data[i], 'name');
            break;

          case table_headers[j].classList.contains('manage-table__col_main_username'):

            setTableElem(tableCol[j], data[i], 'username');
            break;

          case table_headers[j].classList.contains('manage-table__col_main_email'):

            setTableElem(tableCol[j], data[i], 'email');
            break;

          case table_headers[j].classList.contains('manage-table__col_main_phone'):

            setTableElem(tableCol[j], data[i], 'phone');
            break;

          case table_headers[j].classList.contains('manage-table__col_main_city'):

            setTableElem(tableCol[j], data[i]['address'], 'city');
            break;

          case table_headers[j].classList.contains('manage-table__col_main_website'):

            setTableElem(tableCol[j], data[i], 'website');
            break;

          case table_headers[j].classList.contains('manage-table__col_main_company'):

            setTableElem(tableCol[j], data[i]['company'], 'name');
            break;
        }
      }
    }
  }

  function setPseudorandomFilter(idLimit) {

    let pseFilter = `?id=1`;
    for (let i = 2; i <= idLimit; i++) {

      pseFilter = [pseFilter, `&id=${i}`].join('');
    }

    return pseFilter;
  }

  function setTableElem(col, dataElem, param) {

    col.textContent = `${dataElem[param]}`;
  }

  function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  document.addEventListener('DOMContentLoaded', () => {

    main();
  });
})();
