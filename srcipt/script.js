var url = "https://raw.githubusercontent.com/ronanogor/jquery-project/master/database-v1.json";
$(document).ready(() => {
    $('#recipe').on('change', () => {
        var recipes = $('#recipe').val();
        chooseRecipe(recipes);
    });
});
var getAPI = (api) => {
    $.ajax({
        dataType: 'json',
        url: api,
        success: (data) => getRecipes(data),
        error: () => console.error("Cannot request data")
    });
}


function getRecipes(datas) {

    datas.recipes.forEach(recs => {

        getIngrediant(recs); // get all ingrediant
        
    });


}

function getIngrediant(recipe) {
    recipe.ingredients.forEach(element => {
        showIngrediantTable(element);
    })
}


var showIngrediantTable = (element) => {

    var ingrediant = "";
    ingrediant += `
        <tr>
            <td><img src="${element.iconUrl}" width="70" class="img-fluid circle-rounded"></td>
            <td>${element.quantity}</td>
            <td>${element.unit[0]}</td>
            <td>${element.name}</td>
        </tr>
    `;
    $('#result').append(ingrediant);
}
var chooseRecipe = (myRecipe) => {
    var data = parseInt(myRecipe);
    switch (data) {
        case 2:
            getAPI(url);
            hideAlert();
            break;
        case 3:
            data();
            break;
        case 1:
            data();
            break;
        default: console.warn("do not something");
    }
}


