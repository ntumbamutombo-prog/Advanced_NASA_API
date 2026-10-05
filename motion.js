//Use NASA's API to return all of their facility locations (~400). 
// Display the name of the facility, 
// its location, 
// and the weather at the facility currently.



const url = `https://data.nasa.gov/docs/legacy/gvk9-iz74.json`

const facilities = document.querySelector("#centers")


document.querySelector("button").addEventListener("click", getLoc)


function getLoc() {
    fetch(url)
        .then((response) => response.json())
        .then(places => {
            places.forEach(place => {
                const center = place.center
                const city = place.city
                const state = place.state
                const country = place.country

                const lat = place.location.latitude
                const lon = place.location.longitude

                getWeather(center, city, state, country, lat, lon)
            })

        })


        .catch((error) => {
            console.log(error);
        });


}

function getWeather(center, city, state, country, lat, lon) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=apparent_temperature&temperature_unit=fahrenheit`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const weather = data.current.apparent_temperature
            const facilities = document.getElementById("centers")
            const aura = document.createElement("p")
            aura.textContent = `${center},${city},${state},${country},${weather}`
            facilities.appendChild(aura)


            // const response = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,cloud_cover,wind_speed_10m,precipitation`) 

            // const weather = await response.json ()
            //         console.log(weather)
            //         return data
            //     })


        })
        .catch((error) => {
            console.log(error);
        });
}

//console.log(data[0].center)
// console.log(data[0].location.latitude)
// console.log(data[0].location.longitude)
// console.log("NASA Facilities:", facilities)


//getWeather(data[0].location.latitude, data[0].location.longitude)

//return data
