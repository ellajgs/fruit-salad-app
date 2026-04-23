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
    try{
        const response = await fetch (`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        const data = await response.json
        addFruit(data)
    }   catch(error){
        console.log(error)
    }
    
    //fetch (`${fruit}+fruit&category=food`)
        // .then(processResponse)
        // .then((pic)=> console.log(pic.hits.previewURL))
        // .catch((error)=>console.log(error))
}

function processResponse(response){
    if (response.status === 200){
        return response.json()
    } else {
        throw "Error: http status code" + response.status
    }
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

