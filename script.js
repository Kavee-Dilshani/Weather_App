const temperatureField = document.querySelector('.temp p');
const locationField = document.querySelector('.TimeAndLocation p:first-child');
const dataField = document.querySelector('.TimeAndLocation p:last-child');
const weatherField = document.querySelector('.condition p');
const iconField = document.querySelector('.weather_icon'); 
const searchField = document.querySelector('.search_area');
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

let target = 'Sri Lanka';

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=5482db0613ca4bffb7f04038262402&q=${targetLocation}&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    let iconUrl = data.current.condition.icon;

    // Passing 5 things to the function
    updateDetails(temp, locationName, time, condition, iconUrl);
}

// Fixed: Now receiving all 5 things in the parentheses
function updateDetails(temp, locationName, time, condition, iconUrl) {

    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];

    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = temp;
    locationField.innerText = locationName;
    dataField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    weatherField.innerText = condition;
    
    // Now iconUrl is defined and usable!
    iconField.src = "https:" + iconUrl;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}

function getDayName(number) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[number];
}

fetchResults(target);