app.factory('bmcdFactory', function ($http) {
    return {
        getAllBmcd: getAllBmcd,
        doNewAnalyse: doNewAnalyse,
        returnAnalyse: returnAnalyse,
        saveBmcdAnalyze: saveBmcdAnalyze,
        getOneBmcd: getOneBmcd,
        deleteSimulation: deleteSimulation
    };

    function complete(response) {
        return response.data;
    }

    function failed(response) {
        return response.statusText;
    }

    function getAllBmcd() {
        return $http.get('api/station/listall/bmcd').then(complete).catch(failed);
    }

    function getOneBmcd(id) {
        return $http.get('/api/station/findById/' + id).then(complete).catch(failed);
    }

    function doNewAnalyse(bmcdData) {
        return $http.post('api/bmcd/analyze', bmcdData).then(complete).catch(failed);
    }

    function saveBmcdAnalyze(bmcdData) {
        return $http.post('api/bmcd/analyze/save', bmcdData).then(complete).catch(failed);
    }

    function returnAnalyse(id) {
        return $http.get('api/bmcd/analyze/' + id).then(complete).catch(failed);
    }

    function deleteSimulation(id) {
        return $http.delete('api/station/delete/' + id).then(complete).catch(failed);
    }
});




