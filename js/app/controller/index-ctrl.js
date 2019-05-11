var api = 'https://pokeapi.co/api/v2';

app.controller('indexCtrl', function($scope,FactoryCrud) {

    $scope.arr_pokemons = [];
    $scope.pokemonObj = {};
    $scope.limit = 6;
    $scope.loader = false;

    // load more pokemon
    $scope.loadPokemon = ()=>{
        $scope.loader = true;
         FactoryCrud.get(api+'/pokemon/?limit='+$scope.limit+'&offset='+$scope.arr_pokemons.length).then(function(data){
            var arr = data.data.results;
            $scope.loader = false;
            for (var i = 0; i < arr.length; i++) {
                FactoryCrud.get(arr[i].url).then(function(res){
                    var obj = res.data
                    var pok = {'id':obj.id,'name':obj.name,'img':obj.sprites.front_default,'types':obj.types};
                    $scope.arr_pokemons.push(pok);
                })
            }        
        })
    }
    $scope.loadPokemon();
    //  close pop-up window profile pokemon 
    $scope.closeView = (event)=>{
        var view = document.getElementById('pokemon-inf');
        if(!view.contains(event.target)){ 
            $scope.pokemonObj = {};
        }
    }
    // single pokemon information
    $scope.loadInfPokemon = (id)=>{
        FactoryCrud.get(api+"/pokemon/"+id+"/").then(function(res){
             $scope.pokemonObj = res.data;
        })
    }
});

// fixed pop-up window profile pokemon
window.addEventListener("scroll", ()=>{
    var view = document.getElementById('pokemon-inf');
    var header = document.getElementsByTagName('header')[0].scrollHeight;
    if(document.body.clientWidth > 1000){
        if(window.scrollY > view.offsetTop + header && view.classList.contains("fixed") == false){
            view.classList.add('fixed');
        }else if(window.scrollY < view.offsetTop+header){
            view.classList.remove('fixed');
        }
    }
});
