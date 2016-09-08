//Clear the image when everytime website is loaded or refresed
$(document).ready(function () {
    $("img").hide();
});
//Pokemon class, to construct an pokemon object
var Pokemon = (function () {
    function Pokemon(id, name, order, abilities, attack, specialattck, hp) {
        this.poke_id = id;
        this.poke_name = name;
        this.poke_order = order;
        this.poke_abilities = abilities;
        this.poke_attack = attack;
        this.poke_hp = hp;
        this.poke_specialattack = specialattck;
    }
    return Pokemon;
}());
//A function to be called when the request succeed...
function response(resp) {
    var abi_stack = [];
    var i;
    var j;
    var ablitemp;
    var theAbli;
    var pokemon_attack;
    var pokemon_specialattack;
    var pokemon_hp;
    //get abilities...
    for (i = 0; i < resp['abilities'].length; i++) {
        ablitemp = resp['abilities'][i].ability.name;
        theAbli = ablitemp[0].toUpperCase() + ablitemp.slice(1);
        abi_stack.push((i + 1) + ". " + theAbli + "<br>");
    }
    //get the stat of attack, special-attack and hp...
    for (j = 0; j < resp['stats'].length; j++) {
        if (resp['stats'][j].stat.name == "attack") {
            pokemon_attack = resp['stats'][j].base_stat;
        }
        if (resp['stats'][j].stat.name == "hp") {
            pokemon_hp = resp['stats'][j].base_stat;
        }
        if (resp['stats'][j].stat.name == "special-attack") {
            pokemon_specialattack = resp['stats'][j].base_stat;
        }
    }
    //Construct a new Pokemon!
    var aPokemon = new Pokemon(resp['id'], resp['name'], resp['order'], abi_stack, pokemon_attack, pokemon_hp, pokemon_specialattack);
    $('#pokemon-name').html(aPokemon.poke_name.toUpperCase());
    $('#pokemon-ability').html(aPokemon.poke_abilities);
    $('#pokemon-hp').html("" + aPokemon.poke_hp);
    //$('#pokemon-attack').html(""+ aPokemon.poke_attack);
    //$('#pokemon-specialattck').html(""+ aPokemon.poke_specialattack);
    var image_url = resp['sprites'].front_default;
    $("#poke_image").show();
    $("#poke_image").attr("src", image_url);
}
//A function to be called when the request fails...
function err_response(err_resp) {
    alert("Wrong Input! Please enter Pokemon's Name or Index.");
    $('#pokemon-name').html("This pokemon is ...");
    $('#pokemon-ability').html("" + err_resp.statusText);
    $("#poke_image").hide();
}
//Button listener..
$("#find_button").click(function () {
    var pokeindex = $('#poke-input').val();
    if (typeof pokeindex == "string") {
        pokeindex = pokeindex.toLowerCase();
    }
    $.ajax({
        url: 'http://pokeapi.co/api/v2/pokemon/' + pokeindex,
        type: 'GET',
        dataType: 'json',
        success: response,
        error: err_response //failure...
    });
});
