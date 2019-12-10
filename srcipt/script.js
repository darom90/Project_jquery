function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    requestApi();
});

function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.error("Error"),
    });
}
var allData = [];
function chooseRecipe(recip) {
    allData = recip;
    var option = "";
    recip.forEach(item => {
        option += `
            <option value="${item.id}">${item.name}</option>
        `;

    });
    $('#recipes').append(option);
    Recipes(allData);
    Ingredient(allData);
}

var Recipes = (data) => {
    data.forEach(element => {
        $('#recipes').on('change', function () {
            var result = $('#recipes').val();
            if (element.id == result) {
                getRecipt(element);
                getIngredient(element);
            }
        });
    });
}
var getRecipt = (getOut) => {
    var getOutput = "";
    getOutput +=`
        ${getOut.name}
        <img src="${getOut.iconUrl}" class="img-fluid rounded" width="150">
    `
    $("#result").html(getOutput);
}


var Ingredient = (data) => {
    data.forEach(element => {
        $('#recipes').on('change', function () {
            var result = $('#recipes').val();
            if (element.id == result) {
                get(element);
            }
        });
    });
}
var get= (getOut) => {
    var Ingredient = "";
    Ingredient +=`
        ${getOut.instructions}
    `
    $("#recip").html(Ingredient);
}

var getIngredient = (getdata) =>{
    var display ="";
        getdata.ingredients.forEach(element =>{
            display +=`
                <tr>
                <td><img src="${element.iconUrl}" class="img-fluid rounded" width="80"><td>
                    <td>${element.quantity}</td>
                    <td>${element.unit[0]}</td>
                    <td>${element.name}</td>
                </tr>
            `;
        }); 
        $('#ingredient').html(display);
}




