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

    /*const test = await fetch(`https://jsonplaceholder.typicode.com/users/1`);

    console.log(test);*/

    let data = null;
    await fetch('https://jsonplaceholder.typicode.com/users')
      .then(async (res) => {

        if (res.status < 200 || res.status >= 300) {

          const error = document.createElement('div');
          const wrapper = document.querySelector('.client-panel__wrapper');

          error.textContent = 'Что-то пошло не так';
          error.classList.add('error');

          wrapper.append(error);
        }
        else {

          data = await res.json();
        }
      });

    return data;
  }

  function fillPanel(data) {

    const idLimit = getRandomInt(1, data.length);
    const table_headers = document.querySelectorAll('.manage-table__col_main');
    const tableBody = document.querySelector('.manage-table__body');

    for (let i = 0; i < data.length; i++) {

      if (data[i]['id'] <= idLimit) {

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
