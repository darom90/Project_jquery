function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    $('#ruler').hide();
    $('#show').hide();
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
            $('#ruler').show();
            $('#show').show();
            var result = $('#recipes').val();
            if (element.id == result) {
                getRecipt(element);
                getIngredient(element);
                getInstruction(element.instructions);
            }
        });
    });
}
// get recipt
var getRecipt = (getOut) => {
    var getOutput = "";
    getOutput += `
        ${getOut.name}
        <img src="${getOut.iconUrl}" class="img-fluid rounded" width="150">
    `
    $("#result").html(getOutput);
}

// get ingredient
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

// get ingredient
var getIngredient = (getdata) => {
    var display = "";
    getdata.ingredients.forEach(element => {
        display += `
                <tr>
                <td><img src="${element.iconUrl}" class="img-fluid rounded" width="80"><td>
                    <td>${element.quantity}</td>
                    <td>${element.unit[0]}</td>
                    <td>${element.name}</td>
                </tr>
            `;
    });
    $('#ingredient').html(display);
    $('#ingredients').html('Ingredient');
}

// get instruction
function getInstruction(insturc) {
    var result = "";
    var get = insturc.split('<step>');
    for (let i = 1; i < get.length; i++) {
        result += `
            <h5 class="text-secondary">Step:${i}</h5>
            <p>${get[i]}</p>
        `;
    }
    $('#instruction').html(result);
    $('#instructions').html('Instruction');
}

$(document).ready(function () {
    $('#minus').on('click', function () {
        var members = $('#member').val();
        decreaseMember(members);
    });
    $('#add').on('click', function () {
        var members = $('#member').val();
        increaseMember(members);
    });
});
$('#number').html('Number Of Person');
// ninus number
function decreaseMember(minus) {
    var member = parseInt(minus) - 1;
    if (member >= 0) {
        $('#member').val(member);
        compute(member);
    }
}

// increment number
function increaseMember(add) {
    var members = parseInt(add) + 1;
    if (members <= 15) {
        $('#member').val(members);
        compute(members);
    }
}





