function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    $('#ruler').hide();
    $('#show').hide();
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
    // variable for get old Guest
    var getQuanlities = [];
    // function for loop data from array variable
    var oldGuest = 0;
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
                numberOfPerson(element);
                getQuanlities = element.ingredients;
                oldGuest = element.nbGuests;
            }
        });
    });
}
// get recipt
var getRecipt = (getOut) => {
    var getOutput = "";
    // var getGuest = "";
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
                // get(element);
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
        <div class="container">
            <div class="row">
                <div class="col-12">
                <h5 class="text-secondary">Step:${i}</h5>
                <p>${get[i]}</p>
                </div>
            </div>
        </div>
           
        `;
    }
    $('#instruction').html(result);
    $('#instructions').html('Instruction');
}

// function for create number
function numberOfPerson(Guests) {
    const{nbGuests} = Guests;
    var result = "";
    result += `
    </br></br>
    <div class="container mb-5">
        <div class="row">
        <div class="col-4"></div>
    <h2 class="font-italic font-weight-bold">Number Of Person</h2>
    <div class="col-4">
        <div class="input-group">
            <div class="input-group-prepend">
                <button id="minus" type="button"
                    class="btn btn-primary">&nbsp&nbsp&nbsp&nbsp-&nbsp&nbsp&nbsp&nbsp</button>
            </div>
            <input type="text" id="input" style="width:115px" class="text-center" value="${nbGuests}" disabled>
            <div class="input-group-prepend">
                <button type="button" id="add"
                    class="btn btn-dark">&nbsp&nbsp&nbsp&nbsp+&nbsp&nbsp&nbsp&nbsp</button>
            </div>
        </div>
    </div>
    <div class="col-4"></div>
        </div>
    </div>
    
`;

$("#number").html(result);

// when we click add icon
$("#add").on('click', function () {
    var number = parseInt($("#input").val());
    add(number);
})

// when we click minus icon
$("#minus").on('click', function () {
    var number = parseInt($("#input").val());
    minus(number);
})
}

// we just add equal 15
function add(number) {
    var add = parseInt(number) +1;
    if(add <= 15) {
        $("#input").val(add);
       getdata($("#input").val());
    }
}

function minus(number) {
    var minus = parseInt(number)-1;
    if(minus >= 1) {
        $("#input").val(minus);
       getdata($("#input").val());
    }
}

// function for multiply ingredinet
function getdata(outPut) {
    var quantities;
    var newQuanlity;
    var result = "";
    getQuanlities.forEach(element => {
        var {quantity,iconUrl,name,unit} = element;
        quantities = quantity/oldGuest;
        newQuanlity = quantities*outPut;
        result += `
        <tr>
        <td><img src="${iconUrl}" style="width:50px"></td>
        <td id='quantity'>${newQuanlity}</td>
        <td>${unit[0].toLowerCase()}</td>
        <td>${name}</td>
        </tr>
    `;
    });
     $('#ingredient').html(result);
}

