"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee col-6">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function noCoffee() {
    let noCoffeeList ='<div class="coffee col-6">';
    noCoffeeList += '<h2>No coffees available with those selections.</h2>';
    noCoffeeList += '</div>';

    return noCoffeeList;
}


function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data

    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast && coffee.name.toLowerCase().includes(keyInput.value)) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === 'all' && coffee.name.toLowerCase().includes(keyInput.value)) {
            filteredCoffees.push(coffee)
        }

    });

    if (filteredCoffees.length === 0)
    {
        menu.innerHTML = noCoffee();
    } else {
        menu.innerHTML = renderCoffees(filteredCoffees);

    }

}

function newCoffee() {
    coffees.push({
        id: coffees.length+1,
        name: newName.value,
        roast: newRoast.value
    });

    menu.innerHTML = renderCoffees(coffees);
}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var menu = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var keyInput = document.querySelector('#key-input');

var newSubmit = document.querySelector('#newSubmit');
var newRoast = document.querySelector('#new-roast');
var newName = document.querySelector('#new-name');

menu.innerHTML = renderCoffees(coffees);

keyInput.addEventListener(`keyup`, updateCoffees);
submitButton.addEventListener('click', updateCoffees);

newSubmit.addEventListener('click', newCoffee);
newSubmit.addEventListener('click', function (){
    roastSelection.value="all";
    keyInput.value=keyInput.defaultValue;
});
