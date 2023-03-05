const fetchedDataFunction = async () => {
  try {
    const btn = document.querySelector(".fetch_data");
    console.log(btn);

    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    /// change the key value of the data so it is not in camel case or any other case
    let str = "_id";

    /// making sure the key value is all alphabetic so I can use the it for the <th> in the tabel head row
    const makeSureAllCharactersAreAlphabetic = {};
    for (const key in data) {
      //prettier-ignore
      makeSureAllCharactersAreAlphabetic[`${key.replace(/[^a-zA-Z]/g, "").toUpperCase()}`] = data[key];
    }
    console.log(makeSureAllCharactersAreAlphabetic);

    const tableHeadRow = document.querySelector(".table_headRow"); ///select the row in the table head
    const tBodyRow = document.querySelector(".table_bodyRow"); /// select the row in the table body

    btn.addEventListener("click", async () => {
      //   debugger;
      btn.disabled = true; /// disable the button after the first time it is clicked. when the clear button is clicked the page refreshes and disables is reset

      /// populates the th in the tr in thead according to the length of the memebers in the object
      for (const key in makeSureAllCharactersAreAlphabetic) {
        const th = document.createElement("th"); /// creates a th element every time the loop goes thru
        console.log(th);
        th.innerText = `${key}`; /// the value of the element = the value of the key, e.g, the first loop would be "ID"
        tableHeadRow.appendChild(th); /// appends the th accordingly
      }

      /// populates the td in the tr in the tbody
      for (let key in makeSureAllCharactersAreAlphabetic) {
        /// cycle thru the memebers of the object
        let tableData = document.createElement("td"); /// add a td element
        tableData.innerText = `${makeSureAllCharactersAreAlphabetic[key]}`; /// add the value to that td element
        tBodyRow.append(tableData); /// append that makeSureAllCharactersAreAlphabetic to the table row
      }
    });

    /// clear btn
    const clearBtn = document.querySelector(".btn_clear");
    clearBtn.addEventListener("click", async () => {
      location.reload();
    });

    return data;
  } catch (error) {
    alert(error);
  }
};

// debugger;
const x = await fetchedDataFunction();
console.log(x);
