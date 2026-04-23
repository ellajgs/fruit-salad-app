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

async function fetchFruitData(fruit){
    try{
        const response = await fetch (`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        const picresponse = await fetch(`https://pixabay.com/api/?key=55564662-2cfeda22c6b5119ce5f7ce3ba&q=${fruit}+fruit&image_type=photo`)
        const picdata = await picresponse.json()
        addFruit(data, picdata.hits[0]?.webformatURL)
    }   catch(error){
        console.log(`HTTP error! status: ${error}`)
    }
   
}

function addFruit(fruit, imageUrl){
    const li = document.createElement("li")
    li.textContent = fruit.name
    li.dataset.calories = fruit.nutritions.calories
    li.addEventListener("click", removeFruit,{once: true})
    
    if(imageUrl){
        const img = document.createElement("img")
        img.src = imageUrl
        img.alt = fruit.name
        img.style.width = "100px"
        img.style.marginLeft = "20px"
        li.append(img)
    }
    
    fruitList.appendChild(li)

    calories += fruit.nutritions.calories
    fruitNutrition.textContent = calories
}

function removeFruit(e){
    calories -= e.target.dataset.calories
    fruitNutrition.textContent = calories
    e.target.remove()
}

