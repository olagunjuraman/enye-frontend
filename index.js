const itemList = [
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item6",
  "item7",
  "item8",
  "item9",
  "item10",
];

const elements = document.getElementById("list");
const pagination_element = document.getElementById("pagination");

const row = 5;
const page = 1  ;

const displayList = (itemList, elements, row, page) => {
  elements.innerHTML = "";
  page--;
  let start = page * row;
  let end = start + row;
  const paginatedItems = itemList.slice(start, end);

  for (let i = 0; i < paginatedItems.length; i++) {
    const li = document.createElement("li");
    li.innerText = paginatedItems[i];
    elements.appendChild(li);
  }
};

displayList(itemList, elements, row, page);

const setupPagination = (itemList, pagination, row)=>{
    const pageCount = Math.ceil(itemList/row)

    for(let i = 1; i < pageCount; i++){
        paginationButton(i, itemList)
    }
}

const paginationButton = (page)=>{
    let button = document.createElement('button');
    button.innerText = page
}
