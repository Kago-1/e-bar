const API_URL = 'https://api.openbrewerydb.org/breweries'
const container =  document.querySelector("#recent-breweries-list")
//const resultsContainer = document.querySelector("#brewery-list")
const resultsContainer = document.querySelector("#grid")

document.addEventListener('DOMContentLoaded', fetchBreweries)


function fetchBreweries(){
    //fetch request 
    fetch(`${API_URL}?per_page=3&sort=+created_at`)
    .then(res => res.json())
    .then(breweries => {
        const brews = breweries.map((brewery) =>{
            const li = document.createElement('li')
            li.innerText = `${brewery["name"]} located in ${brewery["city"]},${brewery["state"]}.`
            console.log(li)
            return li 
        })

        //append each li to DOM 
        const ul = document.createElement('ul')
        ul.id = "brewery-list-ul"
        container.append(ul)
        brews.forEach((brew) => {
            //const ul = document.querySelector("#brewery-list")
            ul.append(brew)

        })

    })

}

////////////////////////////////////////////////////////////////////////////////
const form = document.querySelector("#brewery-search-form")
form.addEventListener('submit', handleSubmit)

function handleSubmit(event){
    event.preventDefault() 
    resultsContainer.innerHTML = " "
    const queryTerm = event.target.firstElementChild.value
    console.log(queryTerm)
   
    fetch(`${API_URL}/search?query=${queryTerm}`)
    .then(res => res.json())
    .then(breweries => {
        // const header = document.createElement("h3")
        // header.innerText = `${breweries.length} results found`
        // resultsContainer.append(header)
        const brews = breweries.map((brewery) => {  
            const li = document.createElement('li')
            li.innerText = `Name:${brewery["name"]} Location:${brewery["city"]},${brewery["state"]} Street:${brewery["street"]}`
            return li 
     
        })

    //     //append each li to DOM 
        const ol = document.createElement('ol')
        ol.id = "brewery-list-results"
        resultsContainer.append(ol)
        


        brews.forEach((brew) => { 
            //const ul = document.querySelector("#brewery-list")
        ol.append(brew)
          

        })

    })  

}

   
