
$(document).ready(function () {
    $('#recipe').on('change', function () {
        var recipes = $('#recipe').val();
        chooseRecipe(recipes);
    });
});
var chooseRecipe = (myRecipe) => {
    var darom = parseInt(myRecipe);
    switch (darom) {
        case 1:
            data();

            break;
        case 2:
            datas();
            break;
    }
}
function data() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    $.ajax({
        dataType: 'json',
        url: url,
        success: function (datas) {
            var result = "";
           
            datas.recipes.forEach(element => {

                if (element.id == 0) {
                    result += `
                    ${element.name}
                         <img src="${element.iconUrl}" width="90" class="img-fluid circle-rounded">
                    `;
                }
            });
            $('#results').html(result);
            var ingrediant = "";
            datas.recipes.forEach(element => {
                element.ingredients.forEach(item => {
                    if (element.id == 0) {
                        ingrediant += `
                                <tr>
                                    ${element.name}
                                    <td><img src="${item.iconUrl}" width="70" class="img-fluid circle-rounded"></td>
                                    <td>${item.quantity}</td>
                                    <td>${item.unit[0]}</td>
                                    <td>${item.name}</td>
                                </tr>
                        `;
                    }
                    $('#result').html(ingrediant);
                })
            });
        }
    });
}
function datas() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    $.ajax({
        dataType: 'json',
        url: url,
        success: function (datas) {
            var result = "";
            datas.recipes.forEach(element => {

                if (element.id == 1) {
                    result += `
                            ${element.name}
                           <img src="${element.iconUrl}" width="90" class="img-fluid circle-rounded">        
                    `;
                }
            });
            $('#results').html(result);
            var ingrediant = "";
            datas.recipes.forEach(element => {
                element.ingredients.forEach(item => {
                    if (element.id == 1) {
                        ingrediant += `
                                <tr>
                                    ${element.name}
                                    <td><img src="${item.iconUrl}" width="70" class="img-fluid circle-rounded"></td>
                                    <td>${item.quantity}</td>
                                    <td>${item.unit[0]}</td>
                                    <td>${item.name}</td>
                                </tr>
                        `;
                    }
                    $('#result').html(ingrediant);
                })
            });
        }
    });
}
