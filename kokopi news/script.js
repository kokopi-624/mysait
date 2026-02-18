const baseHtml = document.querySelector('.spreadsheets--item.js-base');
const spreadsheets = document.querySelector('.spreadsheets');
const apiURL = 'https://script.google.com/macros/s/AKfycbyCj8DrunZ_Dwb7-NKGEDz6boB-99DoYRMM9K7DNSXpkFPXwkpTcf-XuTDqE1nSVhd3GA/exec';

async function loadData() {
    const response = await fetch(apiURL);
    const data = await response.json();

    data.forEach(entry => {
        const copy = baseHtml.cloneNode(true);
        copy.classList.add(entry.category);
        copy.querySelector('.spreadsheets--title').textContent = entry.title;
        copy.querySelector('.spreadsheets--link').setAttribute("href", entry.link);
        copy.querySelector('.spreadsheets--img').src = "data:image/png;base64," + entry.image;
        spreadsheets.appendChild(copy);
    });

    baseHtml.remove();
}

window.onload = function () {
    loadData();
};

function showCategory(category) {
    const allItems = document.querySelectorAll(".spreadsheets--item");

    allItems.forEach(item => {
        if (category === "all" || item.classList.contains(category)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function search() {
    const inputElement = document.getElementById("myInput");
    const value = inputElement.value;
    const allItems = document.querySelectorAll(".spreadsheets--item");

    allItems.forEach(item => {
        if (item.querySelector(".spreadsheets--title").textContent.includes(value)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}
