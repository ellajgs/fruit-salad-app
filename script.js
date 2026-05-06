const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
const createForm = document.querySelector("#create-form");
const updateForm = document.querySelector("#update-form");
const deleteForm = document.querySelector("#delete-form");

const apiKey = "55564662-2cfeda22c6b5119ce5f7ce3ba";

fruitForm.addEventListener("submit", extractFruit);
createForm.addEventListener("submit", createNewFruit);
updateForm.addEventListener("submit", updateFruit);
deleteForm.addEventListener("submit", deleteFruit);

let calories = 0;

function extractFruit(e) {
  (e.preventDefault(), fetchFruitData(e.target[0].value));
  e.target[0].value = "";
}

async function fetchFruitData(fruit) {
  try {
    const response = await fetch(
      `https://fruits-api-j74x.onrender.com/fruits/${fruit}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const picresponse = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${fruit}+fruit&image_type=photo`,
    );
    const picdata = await picresponse.json();
    addFruit(data, picdata.hits[0]?.webformatURL);
  } catch (error) {
    console.log(`HTTP error! status: ${error}`);
  }
}

function addFruit(fruit, imageUrl) {
  const li = document.createElement("li");
  li.textContent = fruit.name;
  li.dataset.calories = fruit.nutritions.calories;
  li.addEventListener("click", removeFruit, { once: true });

  if (imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = fruit.name;
    img.style.width = "100px";
    img.style.marginLeft = "20px";
    li.append(img);
  }

  fruitList.appendChild(li);

  calories += fruit.nutritions.calories;
  fruitNutrition.textContent = calories;
}

function removeFruit(e) {
  calories -= e.target.dataset.calories;
  fruitNutrition.textContent = calories;
  e.target.remove();
}

async function createNewFruit(e) {
  e.preventDefault();
  console.log("createNewFruit");
  const data = { name: e.target.fruitInput.value };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `https://fruits-api-j74x.onrender.com/fruits/`,
    options,
  );
  console.log(response);

  let createMessageStatus = document.querySelector("#create-message");

  if (response.status === 201) {
    e.target.fruitInput.value = "";
    createMessageStatus.textContent = "New fruit added";
    setTimeout(() => {
      messageStatus.textContent = "";
    }, 4000);
  } else {
    e.target.fruitInput.value = "";
    createMessageStatus.textContent = "Unable to add";
    setTimeout(() => {
      createMessageStatus.textContent = "";
    }, 4000);
  }
}

async function deleteFruit(e) {
  e.preventDefault();
  console.log("deleteFruit");
  const data = e.target.fruitName.value;

  const options = {
    method: "DELETE",
  };

  const response = await fetch(
    `https://fruits-api-j74x.onrender.com/fruits/${data}`,
    options,
  );
  console.log(response);

  let deleteMessageStatus = document.querySelector("#delete-message");

  if (response.status === 204) {
    e.target.fruitName.value = "";
    deleteMessageStatus.textContent = "Fruit deleted";
    setTimeout(() => {
      deleteMessageStatus.textContent = "";
    }, 4000);
  } else {
    e.target.fruitName.value = "";
    deleteMessageStatus.textContent = "Unable to delete";
    setTimeout(() => {
      deleteMessageStatus.textContent = "";
    }, 4000);
  }
}

async function updateFruit(e) {
  e.preventDefault();
  console.log("updateFruit");
  const toChange = e.target.toChange.value
  const newValue = e.target.newValue.value
  const data = {toChange: newValue}

  console.log(toChange, newValue)
  console.log(data)


  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  const response = await fetch(
    `https://fruits-api-j74x.onrender.com/fruits/${e.target.fruitName.value}`,
    options,
  );
  console.log(response);

  let updateMessageStatus = document.querySelector("#update-message");

  if (response.status === 200) {
    e.target.fruitName.value = "";
    e.target.toChange.value = "";
    e.target.newValue.value = "";
    updateMessageStatus.textContent = "Fruit updated";
    setTimeout(() => {
      updateMessageStatus.textContent = "";
    }, 4000);
  } else {
    e.target.fruitName.value = "";
    e.target.toChange.value = "";
    e.target.newValue.value = "";
    updateMessageStatus.textContent = "Unable to update";
    setTimeout(() => {
      updateMessageStatus.textContent = "";
    }, 4000);
  }
}
