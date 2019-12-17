function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    $('#ruler').hide();
    $('#show').hide();
    $('#numbers').hide();
    requestApi();
});

// request api
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
            $('#numbers').show();
            var result = $('#recipes').val();
            if (element.id == result) {
                getRecipt(element);
                getIngredient(element);
                getInstruction(element.instructions);
                getGuest(element.nbGuests);
            }
        });
    });
}
// get recipt
var getRecipt = (getOut) => {
    var getOutput = "";
    var getGuest = "";
    getOutput += `
        ${getOut.name}
        <img src="${getOut.iconUrl}" class="img-fluid rounded" width="200">
    `;
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
                    <td>${element.unit[0].toLowerCase()}</td>
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


// code for add and munus number
var getGuest = (outGust) => {
    var guest = "";
    guest +=`
    <div class="container mt-5">
    <div class="row" >
        <div class="col-4"></div>
        <h4 id="numbers" class="font-italic font-weight-bold"></h4>
        <div class="col-4">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <button class="btn btn-primary" type="button" id="minus">&minus;</button>
                </div>
                <input type="number" class="form-control text-center" disabled id="member" max="15" 
                    min="0" value="${outGust}">
                    
                <div class="input-group-append">
                    <button class="btn btn-dark" type="button" id="add">&#x2b;</button>
                </div>
            </div>
        </div>
        <div class="col-4"></div>
    </div>
</div> 
    `;
    $('#number').html(guest);
   

    // add number
    $('#add').on('click', function() {
        var Number = $('#member').val();
        var increaseNumber = parseInt(Number) + 1;
        if(increaseNumber <= 15) {
            $('#member').val(increaseNumber);
        }
    });

// minus number
    $('#minus').on('click', function() {
        var Number = $('#member').val();
        var decreaseNumber = parseInt(Number) - 1;
        if(decreaseNumber >=0) {
            $('#member').val(decreaseNumber);
        }
    });

   
}



