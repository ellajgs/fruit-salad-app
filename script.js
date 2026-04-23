const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

fruitForm.addEventListener("submit", extractFruit)

let calories = 0

function extractFruit(e){
    e.preventDefault(),
    fetchFruitData(e.target[0].value)
    e.target[0].value="" 
}

function fetchFruitData(fruit){
    fetch (`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        .then((response)=>response.json())
        .then((data)=>addFruit(data))
        .catch((error)=>console.log(error))
}

function addFruit(fruit){
    const li = document.createElement("li")
    li.textContent = fruit.name
    li.dataset.calories = fruit.nutritions.calories
    li.addEventListener("click", removeFruit,{once: true})
    fruitList.appendChild(li)

    calories += fruit.nutritions.calories
    fruitNutrition.textContent = calories
}

function removeFruit(e){
    calories -= e.target.dataset.calories
    fruitNutrition.textContent = calories
    e.target.remove()
}

