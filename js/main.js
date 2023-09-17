let mealsrow = document.querySelector("#items");
let itemDescription = document.querySelector("#item-description");
let search = document.querySelector("#search");
let categories = document.querySelector("#categories");
let area = document.querySelector("#area");
let ingredients = document.querySelector("#ingredients");
let contact = document.querySelector("#contact");
let contactUs = document.querySelector("#contact-us");
let searchMeal = document.querySelector("#search-meal");


const mealsApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const categoriesApi = "https://www.themealdb.com/api/json/v1/1/categories.php";
const areaApi = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
const ingApi = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

$(document).ready(function () {

    $(".spinner").fadeOut(1000, function () {
        $(".loading").slideUp(1000, function () {
            $('body').css("overflow", "auto");
            $(".loading").remove();
        })
    });





    (async function () {

        meals = await fetchApi(mealsApi);
        displayMeals(meals.slice(0, 20));

        search.addEventListener('click', function () {
            mealsrow.innerHTML = '';
            $("#contact-us").addClass('d-none');
            $("#search-meal").removeClass('d-none');
            closeNav();

        });
        categories.addEventListener('click', async function () {
            let cataegorys = await fetchCatApi(categoriesApi);
            mealsrow.innerHTML = '';
            $("#contact-us").addClass('d-none');
            $("#search-meal").addClass('d-none');
            closeNav();
            displayCategorys(cataegorys);
        });
        area.addEventListener('click', async function () {
            let areas = await fetchAreaApi(areaApi);
            mealsrow.innerHTML = '';
            $("#contact-us").addClass('d-none');
            $("#search-meal").addClass('d-none');
            closeNav();
            displayAreas(areas);
        });
        ingredients.addEventListener('click', async function () {
            let ingredients = await fetchIngApi(ingApi);
            mealsrow.innerHTML = '';
            $("#contact-us").addClass('d-none');
            $("#search-meal").addClass('d-none');
            closeNav();
            displayIngredients(ingredients.slice(0, 20));
        });
        contact.addEventListener('click', function () {
            mealsrow.innerHTML = '';
            $("#contact-us").removeClass('d-none');
            $("#search-meal").addClass('d-none');
            closeNav();


        })
    })();


});





function openNav() {

    $(".nav").animate({ left: '0' }, 500,);
    $(".open").addClass('d-none');
    $(".close").removeClass('d-none')
    $(".nav-body ul").animate({ top: 0 }, 500);

}
$(".open").click(function () {
    openNav();
});


function closeNav() {
    let width = $(".nav-body").outerWidth(true);
    $(".nav").animate({ left: -width }, 500);
    $(".close").addClass('d-none');
    $(".open").removeClass('d-none');
    $(".nav-body ul").animate({ top: '600px' }, 500);
}
$(".close").click(function () {
    closeNav();
});


let meals;
let mealDetails;
async function fetchApi(apiUrl) {
    let response = await fetch(apiUrl);
    let result = await response.json();
    return result.meals;
};
async function fetchCatApi(apiUrl) {
    let response = await fetch(apiUrl);
    let result = await response.json();
    return result.categories;
};
async function fetchAreaApi(apiUrl) {
    let response = await fetch(apiUrl);
    let result = await response.json();
    return result.meals;
};
async function fetchIngApi(apiUrl) {
    let response = await fetch(apiUrl);
    let result = await response.json();
    return result.meals;
};

function displayMeals(list) {
    box = ``;
    for (let i = 0; i < list.length; i++) {
        box +=
            `
                <div class="col-md-3">
                    <div onclick="displayDetals(${list[i].idMeal})" class="item position-relative">
                        <img class="w-100" src="${list[i].strMealThumb}" alt="${list[i].strMeal}">
                        <div class="layout d-flex align-items-center">
                            <h3 class="text-black fw-bolder" >${list[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    mealsrow.innerHTML = box;
}
function displayCategorys(list) {
    box = ``;
    for (let i = 0; i < list.length; i++) {
        box +=
            `
                <div class="col-md-3">
                    <div onclick="searchByCat('${list[i].strCategory}')" class="item position-relative">
                        <img class="w-100" src="${list[i].strCategoryThumb}" alt="${list[i].strCategory}">
                        <div class="layout text-black rounded-2">
                            <h4 class="fw-bolder text-center">${list[i].strCategory}</h4>
                            <p class="catp" >${list[i].strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
        `
    }
    mealsrow.innerHTML = box;
}
function displayAreas(list) {
    box = ``;
    for (let i = 0; i < list.length; i++) {
        box +=
            `
                <div class="col-md-3 ">
                    <div class=" text-center " onclick="searchByArea('${list[i].strArea}')">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h4 class="fw-bolder mt-2">${list[i].strArea}</h4>
                    </div>
                </div>
        `
    }
    mealsrow.innerHTML = box;
}
function displayIngredients(list) {
    box = ``;
    for (let i = 0; i < list.length; i++) {
        box +=
            `
                <div class="col-md-3 ">
                    <div class=" text-center" onclick="searchByIng('${list[i].strIngredient}')">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h4 class="fw-bolder mt-2">${list[i].strIngredient}</h4>
                        <p class="mt-2 ingP">${list[i].strDescription}</p>
                    </div>
                </div>
        `
    }
    mealsrow.innerHTML = box;
}

async function displayDetals(idMeal) {
    mealsrow.innerHTML = ``;
    await GetMealByid(idMeal);
    closeNav()
    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {

        if (mealDetails[`strIngredient${i}`] != "")
            ingredients += `<li class="alert alert-info  m-2 p-1" >${mealDetails[`strMeasure${i}`]} ${mealDetails[`strIngredient${i}`]} </li>`
    }


    let tags = mealDetails.strTags?.split(",");
    if (!tags)
        tags = [];
    let tag = ''
    for (let i = 0; i < tags.length; i++) {
        tag += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let box =
        `
                <div class="col-md-4">
                    <img src="${mealDetails.strMealThumb}" class="w-100 rounded-3" alt="${mealDetails.strMeal}">
                    <h3 class="mb-4">${mealDetails.strMeal}</h3>
                </div>
                <div  class="col-md-8">
                    <h3>Instructions</h3>
                    <p>${mealDetails.strInstructions.split(' ').slice(0,20).join(' ')}</p>

                    <h3 class="fw-bold">Area :${mealDetails.strArea} </h3>
                    <h3 class="fw-bold">Category :${mealDetails.strCategory} </h3>

                    <div class="recipes">
                        <h4 class="fw-bold">Recipes :</h4>
                        <ul class="d-flex flex-wrap g-4">
                            ${ingredients}
                            
                        </ul>
                    </div>
                    <div class="tag mb-4">
                        <h3 class="fw-bold mb-3">Tags : </h3>
                        <ul class="d-flex flex-wrap g-4">
                        ${tag}
                        </ul>
                    </div>
                    <a class="btn btn-success" target="_blank" href="${mealDetails.strSource}">Surce</a>
                    <a class="btn btn-danger" target="_blank" href="${mealDetails.strYoutube}">Youtube</a>
                </div>

`;
mealsrow.innerHTML = box;
}

async function searchByName(name) {

    let searchMealsUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    let response = await fetch(searchMealsUrl);
    let result = await response.json();
    displayMeals(result.meals);
};
async function searchByChar(char) {

    let searchMealsCharUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`;
    let response = await fetch(searchMealsCharUrl);
    let result = await response.json();
    displayMeals(result.meals);
};
async function searchByCat(catName) {
    let searchCatUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`;
    let response = await fetch(searchCatUrl);
    let result = await response.json();
    console.log(result)
    displayMeals(result.meals.slice(0, 20));
};
async function searchByArea(AreaName) {
    console.log(AreaName);
    let searchAreaUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaName}`;
    let response = await fetch(searchAreaUrl);
    let result = await response.json();
    displayMeals(result.meals.slice(0, 20));
};
async function searchByIng(ingName) {
    let searchIngUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingName}`;
    let response = await fetch(searchIngUrl);
    let result = await response.json();
    displayMeals(result.meals.slice(0, 20));
};
async function GetMealByid(idMeal){
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    respone = await respone.json();
    mealDetails =respone.meals[0];
   
}

//////////////////////////form////////////////////////////

let nameInputFocus = false;
let emailInputFocus = false;
let phoneInputFocus = false;
let ageInputFocus = false;
let passInputFocus = false;
let repassFocus = false;


let nameInput = document.querySelector("#nameInput");
let emailInput = document.querySelector("#emailInput");
let phoneInput = document.querySelector("#phoneInput");
let ageInput = document.querySelector("#ageInput");
let passInput = document.querySelector("#passInput");
let rePassInput = document.querySelector("#rePassInput");
let btn = document.querySelector("#btn");

$("#nameInput").focus(function () {
    // console.log('nameInputFocus');
    nameInputFocus = true
});
$("#emailInput").focus(function () {
    // console.log('emailInputFocus');
    emailInputFocus = true
});
$("#phoneInput").focus(function () {
    // console.log('phoneInputFocus');
    phoneInputFocus = true
});
$("#ageInput").focus(function () {
    // console.log('ageInputFocus');
    ageInputFocus = true
});
$("#passInput").focus(function () {
    // console.log('passInputFocus');
    passInputFocus = true
});
$("#rePassInput").focus(function () {
    // console.log('repassFocus');
    repassFocus = true
});




function validateName() {
    let regex = /^[\w]{3,}$/;
    return regex.test(nameInput.value);
}
function validateEmail() {
    let regex = /^[\w]{3,}\@[\w]{4,}\.(com)$/;
    return regex.test(emailInput.value);
}
function validatePhone() {
    let regex = /01[0125][0-9]{8}$/;
    return regex.test(phoneInput.value);
}
function validateAge() {
    if (ageInput.value > 18 && ageInput.value < 100)
        return true;
    else
        return false;

}
function validatePassword() {
    let regex = /^[\w]{3,}$/;
    return regex.test(passInput.value);
}
function validateRePass() {
    if (passInput.value == rePassInput.value)
        return true;
    else
        return false;
}

function validateInput() {
    if (nameInputFocus) {
        if (validateName()) {
            document.querySelector("#nameInputW").classList.replace("d-block", "d-none")

        } else {
            document.querySelector("#nameInputW").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputFocus) {

        if (validateEmail()) {
            document.querySelector("#emailInputW").classList.replace("d-block", "d-none")
        } else {
            document.querySelector("#emailInputW").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputFocus) {
        if (validatePhone()) {
            document.querySelector("#phoneInputW").classList.replace("d-block", "d-none")
        } else {
            document.querySelector("#phoneInputW").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputFocus) {
        if (validateAge()) {
            document.querySelector("#ageInputW").classList.replace("d-block", "d-none")
        } else {
            document.querySelector("#ageInputW").classList.replace("d-none", "d-block")

        }
    }

    if (passInputFocus) {
        if (validatePassword()) {
            document.querySelector("#passInputW").classList.replace("d-block", "d-none")
        } else {
            document.querySelector("#passInputW").classList.replace("d-none", "d-block")

        }
    }
    if (repassFocus) {
        if (validateRePass()) {
            document.querySelector("#reInputW").classList.replace("d-block", "d-none")
        } else {
            document.querySelector("#reInputW").classList.replace("d-none", "d-block")

        }
    }

    if (validateName() && validateEmail() &&
        validatePhone() && validateAge() &&
        validatePassword() && validateRePass()
    )
        btn.removeAttribute("disabled");
    else
        btn.setAttribute("disabled", true)
}








