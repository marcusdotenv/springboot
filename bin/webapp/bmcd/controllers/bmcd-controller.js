angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

function prepara(entrada) {
    let saida = {
        // eixocompleto: [],
        dataset: [{}],
        data: [[], []]
    };

    for (let i = 0; i < entrada.superiorPos.length; i++) {

        // saida.eixocompleto = eixoXcompleto(saida.eixocompleto, entrada[i].eixoX);
        saida.data[0][i] = {
            y: entrada.superiorCarta[i],
            x: entrada.superiorPos[i]
        };
        saida.data[1][i] = {
            x: entrada.inferiorPos[i],
            y: entrada.inferiorCarta[i]
        };

        saida.dataset = [{
            cubicInterpolationMode: "monotone",

            fill: false,
            borderWidth: 1,
            pointRadius: 2.0,
            pointStyle: 'rectRot',
            pointBorderWidth: 0.0001
        }, {
            cubicInterpolationMode: "monotone",

            fill: false,
            borderWidth: 1,
            pointRadius: 2.0,
            pointStyle: 'rectRot',
            pointBorderWidth: 0.0001
        }];
    }

    //console.log(entrada);
    //console.log(saida);
    return saida;
}

app.controller('root-list', function (bmcdFactory, $scope) {

    $scope.TypeSimulation = 'BMCD';
    $scope.redirectTo = function (url) {
        location.replace('#!/' + url);
    };
    $scope.delete = function (id) {
        let box = confirm("Você tem certeza disto?");
        if (box === true) {
            bmcdFactory.deleteSimulation(id);
            location.reload(true);
        }
    };
    $scope.stations = [];
    bmcdFactory.getAllBmcd()
        .then(function (value) {
            $scope.stations = value;
        })
        .then(function () {
            var coll = document.getElementsByClassName("collapsible");
            var i;

            for (i = 0; i < coll.length; i++) {
                coll[i].addEventListener("click", function () {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                });
            }
        })
});
app.controller('analyze-controller', ['$scope', 'bmcdFactory', 'casingFactory', 'tubingFactory', 'bombUnitFactory', 'pistonFactory', function ($scope, bmcdFactory, casingFactory, tubingFactory, bombUnitFactory, pistonFactory) {
    $scope.util = {
        abnt: function (classe) {
            $(classe).off("keypress");
            $(classe).on("keypress", function (evt) {
                let keycode = evt.charCode || evt.keyCode;
                //alert(keycode);
                if (keycode == 46) {
                    alert("O Suit não aceita o caractere ponto para números, por favor utilize vírgula");
                    return false;
                }
            });
        }
    };
    $scope.util.abnt(".numerosabnt");
    $scope.revestimentos = [];
    $scope.colunas = [];
    $scope.unidadesBombeio = [];
    $scope.hastes = [];
    if (developement) {
        $scope.object = {
            name: "Marcolino",
            well: "RKT-14500",
            date: new Date(),
            bmcd: {
                curso: null,
                ciclos: 5.0,
                espacoMorto: 0.3,
                diametroHastePolida: 1.25,
                temperaturaSuperficie: 30.0,
                moduloElasticidadeColunaHastes: 30000000.0,
                moduloElasticidadeColunaTubos: 30000000.0,
                massaEspecificaMaterialHastes: 7850.0,
                numeroMinimoPontosCarta: 200,
                gravidade: 9.80665,

                bmcdSuperior: {
                    edicaoLivre: 0,
                    profBomba: 800,
                    densidadeRelativaOleo: 0.0,
                    ancora: 1,
//                    diametroExternoTubing: 2.375,
                    diametroHaste: [
                        1.0,
                        0.875,
                        0.75,
                        0.625
                    ],
//                    diametroInternoTubing: 1.995,
                    // diametroPistao: 1.75,
                    // diametroInternoRevestimento: 0.1616964,
                    numeroSecoes: 1,
                    pressaoCabeca: 2.0,
                    pressaoAnular: 0.0,
                    submergencia: 0.0,
                    eficienciaSeparacaoGas: 0.0,
                    // cursoHastePolida: 86.0,
                    densidadeRelativaGas: 0.7,
                    temperaturaBomba: 50.0,
                    viscosidadeMedia: 100.0,
                    bsw: 0.0,
                    ccarga: 213.0,
                    trup: 90000.0,
                    grau: "C",
                    ctorque: 228.0,
                    api: 30.0,
                    rgo: 1.0,
                    compSecao: [0, 0, 0, 0]
                },
                bmcdInferior: {
                    edicaoLivre: 0,
                    profBomba: 810,
                    densidadeRelativaOleo: 0.0,
                    ancora: 1,
                    // diametroExternoTubing: 2.375,
                    diametroHaste: [
                        1.0,
                        0.875,
                        0.75,
                        0.625
                    ],
                    // diametroInternoTubing: 1.995,
                    // diametroPistao: 1.75,
                    // diametroInternoRevestimento: 0.1616964,
                    numeroSecoes: 1,
                    pressaoCabeca: 2.0,
                    pressaoAnular: 0.0,
                    submergencia: 0.0,
                    eficienciaSeparacaoGas: 0.0,
                    // cursoHastePolida: 86.0,
                    densidadeRelativaGas: 0.7,
                    temperaturaBomba: 50.0,
                    viscosidadeMedia: 100.0,
                    bsw: 0.0,
                    ccarga: 213.0,
                    trup: 90000.0,
                    grau: "C",
                    ctorque: 228.0,
                    api: 30.0,
                    rgo: 1.0,
                    compSecao: [0, 0, 0, 0]
                }
            }
        };
    } else {
        $scope.object = {
            name: "",
            well: "",
            date: new Date(),
            bmcd: {
                curso: null,
                ciclos: 5.0,
                espacoMorto: 0.3,
                diametroHastePolida: 1.25,
                temperaturaSuperficie: 30.0,
                moduloElasticidadeColunaHastes: 30000000.0,
                moduloElasticidadeColunaTubos: 30000000.0,
                massaEspecificaMaterialHastes: 7850.0,
                numeroMinimoPontosCarta: 200,
                gravidade: 9.80665,

                bmcdSuperior: {
                    edicaoLivre: null,
                    profBomba: 0,
                    comprimetoHastes: null,
                    densidadeRelativaOleo: null,
                    ancora: null,
                    diametroExternoTubing: null,
                    diametroHaste: [
                        1.0,
                        0.875,
                        0.75,
                        0.625
                    ],
                    diametroInternoTubing: null,
                    // diametroPistao: 1.75,
                    // diametroInternoRevestimento: 0.1616964,
                    numeroSecoes: null,
                    pressaoCabeca: null,
                    pressaoAnular: null,
                    submergencia: null,
                    eficienciaSeparacaoGas: null,
                    // cursoHastePolida: 86.0,
                    densidadeRelativaGas: null,
                    temperaturaBomba: null,
                    viscosidadeMedia: null,
                    bsw: null,
                    ccarga: null,
                    trup: null,
                    grau: "C",
                    ctorque: null,
                    api: null,
                    rgo: null,
                    compSecao: [0, 0, 0, 0]
                },
                bmcdInferior: {
                    edicaoLivre: null,
                    profBomba: 0,
                    comprimetoHastes: null,
                    densidadeRelativaOleo: null,
                    ancora: null,
                    diametroExternoTubing: null,
                    diametroHaste: [
                        1.0,
                        0.875,
                        0.75,
                        0.625
                    ],
                    diametroInternoTubing: null,
                    // diametroPistao: 1.75,
                    // diametroInternoRevestimento: 0.1616964,
                    numeroSecoes: null,
                    pressaoCabeca: null,
                    pressaoAnular: null,
                    submergencia: null,
                    eficienciaSeparacaoGas: 0,
                    // cursoHastePolida: 86.0,
                    densidadeRelativaGas: null,
                    temperaturaBomba: null,
                    viscosidadeMedia: null,
                    bsw: null,
                    ccarga: null,
                    trup: null,
                    grau: "C",
                    ctorque: null,
                    api: null,
                    rgo: null,
                    compSecao: [0, 0, 0, 0]
                }
            }
        };
    }
    casingFactory.listAll().then(function (value) {
        $scope.revestimentos = value;
        $scope.object.bmcd.casing = value[24];
        //console.log($scope.revestimentos);
    });
    tubingFactory.listAll().then(function (value) {
        $scope.colunas = value;
        $scope.object.bmcd.bmcdInferior.tubing = value[0];
        $scope.object.bmcd.bmcdSuperior.tubing = value[0];
        //console.log($scope.colunas);
    });
    bombUnitFactory.listAll().then(function (value) {
        $scope.unidadesBombeio = value;
        $scope.object.bmcd.bombUnit = value[0];
        $scope.object.bmcd.curso = value[0].path2;
        //console.log($scope.unidadesBombeio);
    });
    pistonFactory.listAll().then(function (value) {
        $scope.hastes = value;
        //console.log($scope.hastes);

        let allCategories = value.map(function (item) {
            return item.rodCode;
        });
        // console.log(allCategories);
//Remove the duplication from the first array
        $scope.filteredCategories = [];
        allCategories.forEach(function (item) {
            if ($scope.filteredCategories.indexOf(item) < 0) {
                $scope.filteredCategories.push(item);
            }
        });
        // console.log(filteredCategories);

//Assign the filtered array to scope
        $scope.listOfRodCode = $scope.filteredCategories;
        $scope.rodCodeSelector = $scope.listOfRodCode[0];
        $scope.rodCodeSelector2 = $scope.listOfRodCode[0];
        $scope.object.bmcd.bmcdInferior.piston = value[0];
        $scope.object.bmcd.bmcdSuperior.piston = value[0];

    });

    $scope.response = {
        torqueMaximo: 0,
        potCabresto: 0,
        potenciaMotor: 0,
        cargaMaxima: 0,
        cargaMinima: 0,
        inferiorVazaoBruta: 0,
        inferiorVazaoOleo: 0,
        inferiorTensaoMaxima: 0,
        inferiorTensaoMinima: 0,
        inferiorTensaoAdmissivel: 0,
        inferiorPorcentagemUtilizacao: 0,
        inferiorEspacoMortoDinamico: 0,
        inferiorDeslVol: 0,
        superiorVazaoBruta: 0,
        superiorVazaoOleo: 0,
        superiorTensaoMaxima: 0,
        superiorTensaoMinima: 0,
        superiorTensaoAdmissivel: 0,
        superiorPorcentagemUtilizacao: 0,
        superiorEspacoMortoDinamico: 0,
        superiorDeslVol: 0,
        superiorSuperficie: {
            name: "null",
            data: null
        },
        inferiorSuperficie: {
            name: "null",
            data: null
        },
        superiorFundo: {
            name: "null",
            data: null
        },
        inferiorFundo: {
            name: "null",
            data: null
        },
    };
    $scope.selected = 1;
    $scope.tabnum = 1;
    $scope.tabGraph = 1;
    $scope.tabParam =1;
    $scope.tabEntr =1;

    $scope.zeroModel = 9999;
    $scope.graficosfunction = [];
    $scope.downloadData = function () {
        try {
            let csvGenericchart = function (genericChart, tipo) {
                let nome = genericChart.name;
                let dados = genericChart.data;

                let result = [tipo + ";", nome + ";", "X;Y"];

                for (let d in dados) {
                    result.push([dados[d].x, dados[d].y].join(';'));
                }
                return result;

            };
            let inferiorSuperficie = csvGenericchart($scope.response.inferiorSuperficie, "Inferior");
            let inferiorFundo = csvGenericchart($scope.response.inferiorFundo, "Inferior");
            let superiorSuperficie = csvGenericchart($scope.response.superiorSuperficie, "Superior");
            let superiorFundo = csvGenericchart($scope.response.superiorFundo, "Superior");
            let resultante = csvGenericchart($scope.response.resultante, "Resultante");


            let csvGenericChartJoin = function (csvGenericchart) {
                let tamanhos = [];
                for (let G in csvGenericchart) {
                    tamanhos.push(csvGenericchart[G].length);
                }
                let maximo = Math.max.apply(null, tamanhos);
                let resultado = [];

                for (let i = 0; i < maximo; i++) {
                    let meio = [];
                    for (let G in csvGenericchart) {
                        if (csvGenericchart[G].length >= i) {
                            meio.push(csvGenericchart[G][i]);
                        }
                    }
                    resultado.push(meio.join(";;"));
                }
                return resultado;
            };
            let arrayCSV = csvGenericChartJoin([inferiorFundo, inferiorSuperficie, superiorFundo, superiorSuperficie, resultante]);

            let csvDowloadFile = function (Valores, title = 'tituloNaoDefinido') {
                let csvRows = [];
                for (let i = 0, l = Valores.length; i < l; ++i) {
                    let intermedio = Valores[i];
                    while (intermedio.includes('.')) {
                        intermedio = intermedio.replace('.', ',');
                    }
                    csvRows.push(intermedio);
                }
                let csvString = csvRows.join("%0A");
                let a = document.createElement('a');
                a.href = 'data:attachment/csv,' + csvString;
                a.target = '_blank';
                a.download = title + '.csv';
                document.body.appendChild(a);
                a.click();
            };
            let date = new Date();
            csvDowloadFile(arrayCSV, 'BMCD ' + date.toTimeString() + ' ' + date.toDateString());
            //console.log(arrayCSV);

            // let date = new Date();
            // let mapeado = mapearParaCsv([$scope.responsePwf.chartDeepnees, $scope.responsePwf.chartGilbert, $scope.responsePwf.chartGodbey, $scope.responsePwf.chartGodbeyBenno, $scope.responsePwf.chartPapa, $scope.responsePwf.chartPodio, $scope.responsePwf.chartGasCompressibility]);
            // createCsv(mapeado, ['Profundidade', 'Gilbert', 'Godbey', 'Godbey Benno', 'Papadimetrio', 'Podio', 'Fator' +
            // ' compressibilidade de Gas'], 'PWF ' +date.toTimeString() + ' ' + date.toDateString());
        } catch (errou) {
            console.log("Erro detectado no Download dos arquivos!");
        }

    };
    $scope.select = function (a) {
        //$scope.selected = index;
        //$scope.selected= index.options[index.selectedIndex].getAttribute("myid");
        $scope.selected = a;
        // $scope.selected=(a.value || a.options[a.selectedIndex].value);
    };
    $scope.isSet = function (num) {
        return $scope.selected === num;
    };
    $scope.setTab = function (a) {

        $scope.tabnum = a;

    };
    $scope.getTab = function (num) {
        return $scope.tabnum === num;
    };
    $scope.setGraph = function (a) {

        $scope.tabGraph = a;

    };
    $scope.getGraph = function (num) {
        return $scope.tabGraph === num;
    };

    $scope.setParam = function (a) {

        $scope.tabParam = a;

    };
    $scope.getParam = function (num) {
        return $scope.tabParam === num;
    };

    $scope.setEntr = function (a) {

        $scope.tabEntr = a;

    };
    $scope.getEntr = function (num) {
        return $scope.tabEntr === num;
    };



    $scope.redirectTo = function () {
        location.replace('#!/');
    };
    $scope.checkErro = function (){
        let folgaRev = $scope.object.bmcd.casing.idin
                        - $scope.object.bmcd.bmcdInferior.tubing.diametroExterno/25.4
                        - $scope.object.bmcd.bmcdSuperior.tubing.diametroExterno/25.4;
        if($scope.object.bmcd.bmcdInferior.profBomba < $scope.object.bmcd.bmcdSuperior.profBomba)
            alert("Coluna inferior menor que superior");

        else if(folgaRev < 1.1)
            alert("Colunas não cabem no revestimento");

    }

    $scope.doNewAnalyse = function () {
        $scope.calcComprimentoSecao($scope.object.bmcd.bmcdInferior);
        $scope.calcComprimentoSecao($scope.object.bmcd.bmcdSuperior);
        console.log($scope.object);
        console.log($scope.response);
        $scope.checkErro();
        bmcdFactory.doNewAnalyse($scope.object).then(function (value) {
            $scope.response = value;

            if($scope.response.erro[0] != 0 || $scope.response.erro[1] != 0){
                if($scope.response.erro[0] == 1 || $scope.response.erro[1] == 1)
                    alert("Não há solução numérica");
                else if($scope.response.erro[0] == 2 || $scope.response.erro[1] == 2)
                    alert("Espaço morto inferior ao mínimo necessário");
                else if($scope.response.erro[0] == 3 || $scope.response.erro[1] == 3)
                    alert("Número de pontos maior que 1000");
                else alert("Erro: " + $scope.response.erro[0])
            }

            $scope.graficosfunction[0]($scope.response.inferiorSuperficie);
            $scope.graficosfunction[1]($scope.response.inferiorFundo);
            $scope.graficosfunction[2]($scope.response.superiorSuperficie);
            $scope.graficosfunction[3]($scope.response.superiorFundo);
            $scope.graficosfunction[4]($scope.response.resultante);
            $scope.graficosfunction[5]($scope.response.inferiorTensao);
            $scope.graficosfunction[6]($scope.response.superiorTensao);
            $scope.graficosfunction[7]($scope.response.torque);
            // $scope.graficosfunction[5]($scope.response.resultanteFundo);

            let html_torqueMax = document.getElementById("Torque_max");
            let html_Carga_max = document.getElementById("Carga_max");
            let html_Carga_min = document.getElementById("Carga_min");


            var atributo_vermelho = document.createAttribute("style");
            atributo_vermelho.value = "color:red";
            var atributo_preto = document.createAttribute("style");
            atributo_preto.value = "color:black";

            if($scope.response.torqueMaximo > $scope.object.bmcd.bombUnit.maximumTorque*1000) html_torqueMax.setAttributeNode(atributo_vermelho.cloneNode(true));
            else    html_torqueMax.setAttributeNode(atributo_preto.cloneNode(true));

            if($scope.response.cargaMaxima > $scope.object.bmcd.bombUnit.maximumLoad*100) html_Carga_max.setAttributeNode(atributo_vermelho.cloneNode(true));
            else    html_Carga_max.setAttributeNode(atributo_preto.cloneNode(true));

            if($scope.response.cargaMinima < 0) html_Carga_min.setAttributeNode(atributo_vermelho.cloneNode(true));
            else    html_Carga_min.setAttributeNode(atributo_preto.cloneNode(true));




        }).then(function () {
            document.getElementById('downloadButton').removeAttribute('disabled');
        }).catch(function (algo) {
            console.log('erro detectado na analise dos dados enviados, codigo: ' + algo);
        });
    };
    $scope.saveAnalyse = function () {
        bmcdFactory.saveBmcdAnalyze($scope.object).then(function (value) {
            // console.log(value);
            $scope.redirectTo();
        });
    };

    $scope.edicaoLivreChange = function(){
            let disableI = document.getElementsByClassName("edicaoLivreInf");
            let disableS = document.getElementsByClassName("edicaoLivreSup");
            let enableI = document.getElementsByClassName("notEdicaoLivreInf");
            let enableS = document.getElementsByClassName("notEdicaoLivreSup");
           // for(let i=0; i<disableI.length; i++){
            for(let i in disableI){
                disableI[i].disabled = !$scope.object.bmcd.bmcdInferior.edicaoLivre;
                disableS[i].disabled = !$scope.object.bmcd.bmcdSuperior.edicaoLivre;
            }
            for(let i in enableI){
                enableI[i].disabled = $scope.object.bmcd.bmcdInferior.edicaoLivre;
                enableS[i].disabled = $scope.object.bmcd.bmcdSuperior.edicaoLivre;
            }

    };
    $scope.calcComprimentoSecao = function (zona) {
        if(zona.piston && (zona.edicaoLivre == 0)){
            zona.compSecao = [0, 0, 0, 0];
            let j = (zona.piston.rodCode % 10);
            let k = (zona.piston.rodCode - j) / 10;k
            if (k - j > 0) {
                let perc = [zona.piston.percentage1,
                    zona.piston.percentage2,
                    zona.piston.percentage3];
                let sperc = 0;
                let N = k;
                for (let M = 0; N > j; N--, M++) {
                    zona.compSecao[8 - N] = zona.profBomba * perc[M] / 100;
                    sperc += perc[M];
                }
                zona.compSecao[8 - N] = zona.profBomba * (1 - sperc / 100);
            }
            else {
                zona.compSecao[8 - j] = zona.profBomba;
            }

            let maiorD;
            for(let i = 0; i < 4; i++){
                if(zona.compSecao[i]>0){
                    maiorD = zona.diametroHaste[i];
                    break;
                }
            }
            let folgaHaste = (zona.tubing.diametroInterno/25.4 - maiorD)/(zona.tubing.diametroInterno/25.4)*100;
//            console.log("maior diametro: "+  maiorD + " diametro externo: " +zona.tubing.diametroInterno/25.4);
//            console.log("% folga " + (zona.tubing.diametroInterno/25.4 - maiorD)/(zona.tubing.diametroInterno/25.4)*100);
            if(folgaHaste < 60)
                alert("Hastes não cabem na tubulação")

            zona.diametroHaste = [
                1,
                7.0 / 8.0,
                3.0 / 4.0,
                5.0 / 8.0
            ];
        }
    };

    $scope.calcProf  =function(zona){
        if(zona == "inf"){
            $scope.object.bmcd.bmcdInferior.profBomba = 0;
            for(let i in $scope.object.bmcd.bmcdInferior.compSecao){
                $scope.object.bmcd.bmcdInferior.profBomba += $scope.object.bmcd.bmcdInferior.compSecao[i];
            }
        }
        if(zona == "sup"){
            $scope.object.bmcd.bmcdSuperior.profBomba = 0;
            for(let i in $scope.object.bmcd.bmcdSuperior.compSecao){
                $scope.object.bmcd.bmcdSuperior.profBomba += $scope.object.bmcd.bmcdSuperior.compSecao[i];
            }
        }
    };
    $scope.introtuc = function () {
        introJs().setOption('doneLabel', 'Próxima página').start()
            .oncomplete(function () {this.exit();})
            .onbeforechange(function (targetElement) {
                if(Number(targetElement.attributes['data-step'].nodeValue) == 2 && $scope.tabnum != 1){ //pular ajuda dos dados
                    this.goToStep(4);
                    this.goToStepNumber(4);
                }
//                if(Number(targetElement.attributes['data-step'].nodeValue) == 3 && $scope.tabnum == 2){ //pular ajuda dos graficos
//                    this.goToStep(5);
//                    this.goToStepNumber(5);
//                    this.refresh();
//                }
//                if(Number(targetElement.attributes['data-step'].nodeValue) == 3 && $scope.tabnum == 3){ //pular ajuda dos parametros
//                    this.goToStep(6);
//                    this.refresh();
//                }
            });


    };
}]);
app.controller('analyze-controller-id', ['$scope', 'bmcdFactory', 'casingFactory', 'tubingFactory', 'bombUnitFactory', 'pistonFactory', '$routeParams', function ($scope, bmcdFactory, casingFactory, tubingFactory, bombUnitFactory, pistonFactory, $routeParams) {
       $scope.util = {
           abnt: function (classe) {
               $(classe).off("keypress");
               $(classe).on("keypress", function (evt) {
                   let keycode = evt.charCode || evt.keyCode;
                   //alert(keycode);
                   if (keycode == 46) {
                       alert("O Suit não aceita o caractere ponto para números, por favor utilize vírgula");
                       return false;
                   }
               });
           }
       };
       $scope.util.abnt(".numerosabnt");
       $scope.revestimentos = [];
       $scope.colunas = [];
       $scope.unidadesBombeio = [];
       $scope.hastes = [];
       if (developement) {
           $scope.object = {
               name: "Marcolino",
               well: "RKT-14500",
               date: new Date(),
               bmcd: {
                   curso: null,
                   ciclos: 5.0,
                   espacoMorto: 0.3,
                   diametroHastePolida: 1.25,
                   temperaturaSuperficie: 30.0,
                   moduloElasticidadeColunaHastes: 30000000.0,
                   moduloElasticidadeColunaTubos: 30000000.0,
                   massaEspecificaMaterialHastes: 7850.0,
                   numeroMinimoPontosCarta: 200,
                   gravidade: 9.80665,

                   bmcdSuperior: {
                       edicaoLivre: 0,
                       profBomba: 800,
                       densidadeRelativaOleo: 0.0,
                       ancora: 1,
   //                    diametroExternoTubing: 2.375,
                       diametroHaste: [
                           1.0,
                           0.875,
                           0.75,
                           0.625
                       ],
   //                    diametroInternoTubing: 1.995,
                       // diametroPistao: 1.75,
                       // diametroInternoRevestimento: 0.1616964,
                       numeroSecoes: 1,
                       pressaoCabeca: 2.0,
                       pressaoAnular: 0.0,
                       submergencia: 0.0,
                       eficienciaSeparacaoGas: 0.0,
                       // cursoHastePolida: 86.0,
                       densidadeRelativaGas: 0.7,
                       temperaturaBomba: 50.0,
                       viscosidadeMedia: 100.0,
                       bsw: 0.0,
                       ccarga: 213.0,
                       trup: 90000.0,
                       grau: "C",
                       ctorque: 228.0,
                       api: 30.0,
                       rgo: 1.0,
                       compSecao: [0, 0, 0, 0]
                   },
                   bmcdInferior: {
                       edicaoLivre: 0,
                       profBomba: 810,
                       densidadeRelativaOleo: 0.0,
                       ancora: 1,
                       // diametroExternoTubing: 2.375,
                       diametroHaste: [
                           1.0,
                           0.875,
                           0.75,
                           0.625
                       ],
                       // diametroInternoTubing: 1.995,
                       // diametroPistao: 1.75,
                       // diametroInternoRevestimento: 0.1616964,
                       numeroSecoes: 1,
                       pressaoCabeca: 2.0,
                       pressaoAnular: 0.0,
                       submergencia: 0.0,
                       eficienciaSeparacaoGas: 0.0,
                       // cursoHastePolida: 86.0,
                       densidadeRelativaGas: 0.7,
                       temperaturaBomba: 50.0,
                       viscosidadeMedia: 100.0,
                       bsw: 0.0,
                       ccarga: 213.0,
                       trup: 90000.0,
                       grau: "C",
                       ctorque: 228.0,
                       api: 30.0,
                       rgo: 1.0,
                       compSecao: [0, 0, 0, 0]
                   }
               }
           };
       } else {
           $scope.object = {
               name: "",
               well: "",
               date: new Date(),
               bmcd: {
                   curso: null,
                   ciclos: 5.0,
                   espacoMorto: 0.3,
                   diametroHastePolida: 1.25,
                   temperaturaSuperficie: 30.0,
                   moduloElasticidadeColunaHastes: 30000000.0,
                   moduloElasticidadeColunaTubos: 30000000.0,
                   massaEspecificaMaterialHastes: 7850.0,
                   numeroMinimoPontosCarta: 200,
                   gravidade: 9.80665,

                   bmcdSuperior: {
                       edicaoLivre: null,
                       profBomba: 0,
                       comprimetoHastes: null,
                       densidadeRelativaOleo: null,
                       ancora: null,
                       diametroExternoTubing: null,
                       diametroHaste: [
                           1.0,
                           0.875,
                           0.75,
                           0.625
                       ],
                       diametroInternoTubing: null,
                       // diametroPistao: 1.75,
                       // diametroInternoRevestimento: 0.1616964,
                       numeroSecoes: null,
                       pressaoCabeca: null,
                       pressaoAnular: null,
                       submergencia: null,
                       eficienciaSeparacaoGas: null,
                       // cursoHastePolida: 86.0,
                       densidadeRelativaGas: null,
                       temperaturaBomba: null,
                       viscosidadeMedia: null,
                       bsw: null,
                       ccarga: null,
                       trup: null,
                       grau: "C",
                       ctorque: null,
                       api: null,
                       rgo: null,
                       compSecao: [0, 0, 0, 0]
                   },
                   bmcdInferior: {
                       edicaoLivre: null,
                       profBomba: 0,
                       comprimetoHastes: null,
                       densidadeRelativaOleo: null,
                       ancora: null,
                       diametroExternoTubing: null,
                       diametroHaste: [
                           1.0,
                           0.875,
                           0.75,
                           0.625
                       ],
                       diametroInternoTubing: null,
                       // diametroPistao: 1.75,
                       // diametroInternoRevestimento: 0.1616964,
                       numeroSecoes: null,
                       pressaoCabeca: null,
                       pressaoAnular: null,
                       submergencia: null,
                       eficienciaSeparacaoGas: 0,
                       // cursoHastePolida: 86.0,
                       densidadeRelativaGas: null,
                       temperaturaBomba: null,
                       viscosidadeMedia: null,
                       bsw: null,
                       ccarga: null,
                       trup: null,
                       grau: "C",
                       ctorque: null,
                       api: null,
                       rgo: null,
                       compSecao: [0, 0, 0, 0]
                   }
               }
           };
       }
       casingFactory.listAll().then(function (value) {
           $scope.revestimentos = value;
           $scope.object.bmcd.casing = value[24];
           //console.log($scope.revestimentos);
       });
       tubingFactory.listAll().then(function (value) {
           $scope.colunas = value;
           $scope.object.bmcd.bmcdInferior.tubing = value[0];
           $scope.object.bmcd.bmcdSuperior.tubing = value[0];
           //console.log($scope.colunas);
       });
       bombUnitFactory.listAll().then(function (value) {
           $scope.unidadesBombeio = value;
           $scope.object.bmcd.bombUnit = value[0];
           $scope.object.bmcd.curso = value[0].path2;
           //console.log($scope.unidadesBombeio);
       });
       pistonFactory.listAll().then(function (value) {
           $scope.hastes = value;
           //console.log($scope.hastes);

           let allCategories = value.map(function (item) {
               return item.rodCode;
           });
           // console.log(allCategories);
   //Remove the duplication from the first array
           $scope.filteredCategories = [];
           allCategories.forEach(function (item) {
               if ($scope.filteredCategories.indexOf(item) < 0) {
                   $scope.filteredCategories.push(item);
               }
           });
           // console.log(filteredCategories);

   //Assign the filtered array to scope
           $scope.listOfRodCode = $scope.filteredCategories;
           $scope.rodCodeSelector = $scope.listOfRodCode[0];
           $scope.rodCodeSelector2 = $scope.listOfRodCode[0];
           $scope.object.bmcd.bmcdInferior.piston = value[0];
           $scope.object.bmcd.bmcdSuperior.piston = value[0];

       });

       $scope.response = {
           torqueMaximo: 0,
           potCabresto: 0,
           potenciaMotor: 0,
           cargaMaxima: 0,
           cargaMinima: 0,
           inferiorVazaoBruta: 0,
           inferiorVazaoOleo: 0,
           inferiorTensaoMaxima: 0,
           inferiorTensaoMinima: 0,
           inferiorTensaoAdmissivel: 0,
           inferiorPorcentagemUtilizacao: 0,
           inferiorEspacoMortoDinamico: 0,
           inferiorDeslVol: 0,
           superiorVazaoBruta: 0,
           superiorVazaoOleo: 0,
           superiorTensaoMaxima: 0,
           superiorTensaoMinima: 0,
           superiorTensaoAdmissivel: 0,
           superiorPorcentagemUtilizacao: 0,
           superiorEspacoMortoDinamico: 0,
           superiorDeslVol: 0,
           superiorSuperficie: {
               name: "null",
               data: null
           },
           inferiorSuperficie: {
               name: "null",
               data: null
           },
           superiorFundo: {
               name: "null",
               data: null
           },
           inferiorFundo: {
               name: "null",
               data: null
           },
       };
       $scope.selected = 1;
       $scope.tabnum = 1;
       $scope.tabGraph = 1;
       $scope.tabParam =1;
       $scope.tabEntr =1;

       $scope.zeroModel = 9999;
       $scope.graficosfunction = [];
       $scope.downloadData = function () {
           try {
               let csvGenericchart = function (genericChart, tipo) {
                   let nome = genericChart.name;
                   let dados = genericChart.data;

                   let result = [tipo + ";", nome + ";", "X;Y"];

                   for (let d in dados) {
                       result.push([dados[d].x, dados[d].y].join(';'));
                   }
                   return result;

               };
               let inferiorSuperficie = csvGenericchart($scope.response.inferiorSuperficie, "Inferior");
               let inferiorFundo = csvGenericchart($scope.response.inferiorFundo, "Inferior");
               let superiorSuperficie = csvGenericchart($scope.response.superiorSuperficie, "Superior");
               let superiorFundo = csvGenericchart($scope.response.superiorFundo, "Superior");
               let resultante = csvGenericchart($scope.response.resultante, "Resultante");


               let csvGenericChartJoin = function (csvGenericchart) {
                   let tamanhos = [];
                   for (let G in csvGenericchart) {
                       tamanhos.push(csvGenericchart[G].length);
                   }
                   let maximo = Math.max.apply(null, tamanhos);
                   let resultado = [];

                   for (let i = 0; i < maximo; i++) {
                       let meio = [];
                       for (let G in csvGenericchart) {
                           if (csvGenericchart[G].length >= i) {
                               meio.push(csvGenericchart[G][i]);
                           }
                       }
                       resultado.push(meio.join(";;"));
                   }
                   return resultado;
               };
               let arrayCSV = csvGenericChartJoin([inferiorFundo, inferiorSuperficie, superiorFundo, superiorSuperficie, resultante]);

               let csvDowloadFile = function (Valores, title = 'tituloNaoDefinido') {
                   let csvRows = [];
                   for (let i = 0, l = Valores.length; i < l; ++i) {
                       let intermedio = Valores[i];
                       while (intermedio.includes('.')) {
                           intermedio = intermedio.replace('.', ',');
                       }
                       csvRows.push(intermedio);
                   }
                   let csvString = csvRows.join("%0A");
                   let a = document.createElement('a');
                   a.href = 'data:attachment/csv,' + csvString;
                   a.target = '_blank';
                   a.download = title + '.csv';
                   document.body.appendChild(a);
                   a.click();
               };
               let date = new Date();
               csvDowloadFile(arrayCSV, 'BMCD ' + date.toTimeString() + ' ' + date.toDateString());
               //console.log(arrayCSV);

               // let date = new Date();
               // let mapeado = mapearParaCsv([$scope.responsePwf.chartDeepnees, $scope.responsePwf.chartGilbert, $scope.responsePwf.chartGodbey, $scope.responsePwf.chartGodbeyBenno, $scope.responsePwf.chartPapa, $scope.responsePwf.chartPodio, $scope.responsePwf.chartGasCompressibility]);
               // createCsv(mapeado, ['Profundidade', 'Gilbert', 'Godbey', 'Godbey Benno', 'Papadimetrio', 'Podio', 'Fator' +
               // ' compressibilidade de Gas'], 'PWF ' +date.toTimeString() + ' ' + date.toDateString());
           } catch (errou) {
               console.log("Erro detectado no Download dos arquivos!");
           }

       };
       $scope.select = function (a) {
           //$scope.selected = index;
           //$scope.selected= index.options[index.selectedIndex].getAttribute("myid");
           $scope.selected = a;
           // $scope.selected=(a.value || a.options[a.selectedIndex].value);
       };
       $scope.isSet = function (num) {
           return $scope.selected === num;
       };
       $scope.setTab = function (a) {

           $scope.tabnum = a;

       };
       $scope.getTab = function (num) {
           return $scope.tabnum === num;
       };
       $scope.setGraph = function (a) {

           $scope.tabGraph = a;

       };
       $scope.getGraph = function (num) {
           return $scope.tabGraph === num;
       };

       $scope.setParam = function (a) {

           $scope.tabParam = a;

       };
       $scope.getParam = function (num) {
           return $scope.tabParam === num;
       };

       $scope.setEntr = function (a) {

           $scope.tabEntr = a;

       };
       $scope.getEntr = function (num) {
           return $scope.tabEntr === num;
       };



       $scope.redirectTo = function () {
           location.replace('#!/');
       };
       $scope.checkErro = function (){
           let folgaRev = $scope.object.bmcd.casing.idin
                           - $scope.object.bmcd.bmcdInferior.tubing.diametroExterno/25.4
                           - $scope.object.bmcd.bmcdSuperior.tubing.diametroExterno/25.4;
           if($scope.object.bmcd.bmcdInferior.profBomba < $scope.object.bmcd.bmcdSuperior.profBomba)
               alert("Coluna inferior menor que superior");

           else if(folgaRev < 1.1)
               alert("Colunas não cabem no revestimento");

       }

       $scope.doNewAnalyse = function () {
           $scope.calcComprimentoSecao($scope.object.bmcd.bmcdInferior);
           $scope.calcComprimentoSecao($scope.object.bmcd.bmcdSuperior);
           console.log($scope.object);
           console.log($scope.response);
           $scope.checkErro();
           bmcdFactory.doNewAnalyse($scope.object).then(function (value) {
               $scope.response = value;

               if($scope.response.erro[0] != 0 || $scope.response.erro[1] != 0){
                   if($scope.response.erro[0] == 1 || $scope.response.erro[1] == 1)
                       alert("Não há solução numérica");
                   else if($scope.response.erro[0] == 2 || $scope.response.erro[1] == 2)
                       alert("Espaço morto inferior ao mínimo necessário");
                   else if($scope.response.erro[0] == 3 || $scope.response.erro[1] == 3)
                       alert("Número de pontos maior que 1000");
                   else alert("Erro: " + $scope.response.erro[0])
               }

               $scope.graficosfunction[0]($scope.response.inferiorSuperficie);
               $scope.graficosfunction[1]($scope.response.inferiorFundo);
               $scope.graficosfunction[2]($scope.response.superiorSuperficie);
               $scope.graficosfunction[3]($scope.response.superiorFundo);
               $scope.graficosfunction[4]($scope.response.resultante);
               $scope.graficosfunction[5]($scope.response.inferiorTensao);
               $scope.graficosfunction[6]($scope.response.superiorTensao);
               $scope.graficosfunction[7]($scope.response.torque);
               // $scope.graficosfunction[5]($scope.response.resultanteFundo);

               let html_torqueMax = document.getElementById("Torque_max");
               let html_Carga_max = document.getElementById("Carga_max");
               let html_Carga_min = document.getElementById("Carga_min");


               var atributo_vermelho = document.createAttribute("style");
               atributo_vermelho.value = "color:red";
               var atributo_preto = document.createAttribute("style");
               atributo_preto.value = "color:black";

               if($scope.response.torqueMaximo > $scope.object.bmcd.bombUnit.maximumTorque*1000) html_torqueMax.setAttributeNode(atributo_vermelho.cloneNode(true));
               else    html_torqueMax.setAttributeNode(atributo_preto.cloneNode(true));

               if($scope.response.cargaMaxima > $scope.object.bmcd.bombUnit.maximumLoad*100) html_Carga_max.setAttributeNode(atributo_vermelho.cloneNode(true));
               else    html_Carga_max.setAttributeNode(atributo_preto.cloneNode(true));

               if($scope.response.cargaMinima < 0) html_Carga_min.setAttributeNode(atributo_vermelho.cloneNode(true));
               else    html_Carga_min.setAttributeNode(atributo_preto.cloneNode(true));




           }).then(function () {
               document.getElementById('downloadButton').removeAttribute('disabled');
           }).catch(function (algo) {
               console.log('erro detectado na analise dos dados enviados, codigo: ' + algo);
           });
       };
       $scope.saveAnalyse = function () {
           bmcdFactory.saveBmcdAnalyze($scope.object).then(function (value) {
               // console.log(value);
               $scope.redirectTo();
           });
       };

       $scope.edicaoLivreChange = function(){
               let disableI = document.getElementsByClassName("edicaoLivreInf");
               let disableS = document.getElementsByClassName("edicaoLivreSup");
               let enableI = document.getElementsByClassName("notEdicaoLivreInf");
               let enableS = document.getElementsByClassName("notEdicaoLivreSup");
              // for(let i=0; i<disableI.length; i++){
               for(let i in disableI){
                   disableI[i].disabled = !$scope.object.bmcd.bmcdInferior.edicaoLivre;
                   disableS[i].disabled = !$scope.object.bmcd.bmcdSuperior.edicaoLivre;
               }
               for(let i in enableI){
                   enableI[i].disabled = $scope.object.bmcd.bmcdInferior.edicaoLivre;
                   enableS[i].disabled = $scope.object.bmcd.bmcdSuperior.edicaoLivre;
               }

       };
       $scope.calcComprimentoSecao = function (zona) {
           if(zona.piston && (zona.edicaoLivre == 0)){
               zona.compSecao = [0, 0, 0, 0];
               let j = (zona.piston.rodCode % 10);
               let k = (zona.piston.rodCode - j) / 10;k
               if (k - j > 0) {
                   let perc = [zona.piston.percentage1,
                       zona.piston.percentage2,
                       zona.piston.percentage3];
                   let sperc = 0;
                   let N = k;
                   for (let M = 0; N > j; N--, M++) {
                       zona.compSecao[8 - N] = zona.profBomba * perc[M] / 100;
                       sperc += perc[M];
                   }
                   zona.compSecao[8 - N] = zona.profBomba * (1 - sperc / 100);
               }
               else {
                   zona.compSecao[8 - j] = zona.profBomba;
               }

               let maiorD;
               for(let i = 0; i < 4; i++){
                   if(zona.compSecao[i]>0){
                       maiorD = zona.diametroHaste[i];
                       break;
                   }
               }
               let folgaHaste = (zona.tubing.diametroInterno/25.4 - maiorD)/(zona.tubing.diametroInterno/25.4)*100;
   //            console.log("maior diametro: "+  maiorD + " diametro externo: " +zona.tubing.diametroInterno/25.4);
   //            console.log("% folga " + (zona.tubing.diametroInterno/25.4 - maiorD)/(zona.tubing.diametroInterno/25.4)*100);
               if(folgaHaste < 60)
                   alert("Hastes não cabem na tubulação")

               zona.diametroHaste = [
                   1,
                   7.0 / 8.0,
                   3.0 / 4.0,
                   5.0 / 8.0
               ];
           }
       };

       $scope.calcProf  =function(zona){
           if(zona == "inf"){
               $scope.object.bmcd.bmcdInferior.profBomba = 0;
               for(let i in $scope.object.bmcd.bmcdInferior.compSecao){
                   $scope.object.bmcd.bmcdInferior.profBomba += $scope.object.bmcd.bmcdInferior.compSecao[i];
               }
           }
           if(zona == "sup"){
               $scope.object.bmcd.bmcdSuperior.profBomba = 0;
               for(let i in $scope.object.bmcd.bmcdSuperior.compSecao){
                   $scope.object.bmcd.bmcdSuperior.profBomba += $scope.object.bmcd.bmcdSuperior.compSecao[i];
               }
           }
       };
       $scope.introtuc = function () {
           introJs().setOption('doneLabel', 'Próxima página').start().oncomplete(
               function () {}).onchange(function (targetElement) {
   //            if(Number(targetElement.attributes['data-step'].nodeValue) == 4){
   //                console.log($scope.tabnum);
   //                console.log("tab 2");
   //                document.getElementById("tab_2").active = true;
   //                $scope.tabnum = 2;
   //                console.log($scope.tabnum);
   //            }
               $scope.algonovone = targetElement.attributes['data-step'].nodeValue;
           });


       };
/////////////////////////////////////////////////////////////////////////////
    bmcdFactory.getOneBmcd($routeParams.id).then(function (value) {
        $scope.object = value;
        $scope.object.date = new Date(value.date);
    }).then($scope.doNewAnalyse);

}]);

app.controller('genericChart', ['$scope', function ($scope) {
    $scope.zeroChart = {
        name: 'Laut',
        data: [{
            x: 0,
            y: 0
        }],
    };
    $scope.atualizarGrafico = function (genericChart) {
        $scope.series = [genericChart.name];
        $scope.type = 'line';
        $scope.data = [genericChart.data];
        // $scope.datasetOverride = [$scope.mostragem.dataset[0]];
        //$scope.datasetOverride = {fill: false};
        $scope.options = {
            responsiveAnimationDuration: 0, // animation duration after a resize
            cubicInterpolationMode: "monotone",
            legend: {display: true},
            responsive: true,
            title: {
                display: false,
                text: 'Não Definido'
            },
            tooltips: {
                mode: 'nearest',
                position: 'nearest',
                intersect: false,
            },
            hover: {
                animationDuration: 0,
                mode: 'nearest',
                intersect: false
            },
            scales: {
                xAxes: [{

                    display: true,
                    type: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: 'Deslocamento (in)'
                    }
                }],
                yAxes: [
                    {

                        scaleLabel: {
                            display: true,
                            labelString: 'Carga (lbf)'
                        },
                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                    }
                ]
            }
        }
    };
}]);
app.controller('genericChart_torque', ['$scope', function ($scope) {
    $scope.zeroChart = {
        name: 'Laut',
        data: [{
            x: 0,
            y: 0
        }],
    };
    $scope.atualizarGrafico = function (genericChart) {
        $scope.series = [genericChart.name];
        $scope.type = 'line';
        $scope.data = [genericChart.data];
        // $scope.datasetOverride = [$scope.mostragem.dataset[0]];
        //$scope.datasetOverride = {fill: false};
        $scope.options = {
            responsiveAnimationDuration: 0, // animation duration after a resize
            cubicInterpolationMode: "monotone",
            legend: {display: true},
            responsive: true,
            title: {
                display: false,
                text: 'Não Definido'
            },
            tooltips: {
                mode: 'nearest',
                position: 'nearest',
                intersect: false,
            },
            hover: {
                animationDuration: 0,
                mode: 'nearest',
                intersect: false
            },
            scales: {
                xAxes: [{

                    display: true,
                    type: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: 'Deslocamento (Graus)'
                    }
                }],
                yAxes: [
                    {

                        scaleLabel: {
                            display: true,
                            labelString: 'Torque (lbf*in)'
                        },
                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                    }
                ]
            }
        }
    };
}]);
app.controller('genericMultipleDataChart', ['$scope', function ($scope) {
    $scope.zeroChart = {
        labels: ['LAUT'],
        data: [[{
            x: 0,
            y: 0
        }]]
    };
    $scope.atualizarGrafico = function (genericChart) {
        $scope.series = genericChart.labels;
        $scope.type = 'line';
        $scope.data = genericChart.data;
        $scope.colors = ['#ff0000', '#0000ff'];
        let dataset = [];
        for (let dat in genericChart.data) {
            dataset.push({
                fill: false,
                borderWidth: 1,
                pointRadius: 2.0,
                pointStyle: 'rectRot',
                pointBorderWidth: 0.0001
            });
        }
        $scope.datasetOverride = dataset;
        $scope.options = {
            responsiveAnimationDuration: 0, // animation duration after a resize
            cubicInterpolationMode: "monotone",
            legend: {display: true},
            responsive: true,
            title: {
                display: false,
                text: 'Não Definido'
            },
            tooltips: {
                mode: 'nearest',
                position: 'nearest',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ' : ';
                        }
                        label += Math.round(tooltipItem.yLabel * 100) / 100;
                        return tooltipItem.xLabel + ' : ' + tooltipItem.yLabel;
                    },
                    title: function (tooltipItem, data) {
                        return 'Tensão, deslocamento';
                    }

                },
            },
            hover: {
                animationDuration: 0,
                mode: 'nearest',
                intersect: false
            },
            scales: {
                xAxes: [{

                    display: true,
                    type: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: 'Tensão (psi)'
                    }
                }],
                yAxes: [
                    {

                        scaleLabel: {
                            display: true,
                            labelString: 'Deslocamento (m)'
                        },
                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                    }
                ]
            }
        }
    };
}]);






