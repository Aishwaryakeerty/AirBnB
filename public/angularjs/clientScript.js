/**
 * Created by harshmehta6711 on 17-11-2016.
 */

var clientModule=angular.module("clientModule",['ui.router','ngAutocomplete']).run(function ($rootScope) {
    $rootScope.authenticated = false;
    $rootScope.current_user = '';

    // $rootScope.signout = function(){
    //     $http.get('auth/signout');
    //     $rootScope.authenticated = false;
    //     $rootScope.current_user = '';
    // };

});

clientModule.config(function ($stateProvider,$urlRouterProvider,$locationProvider) {
    console.log("inside angular");
   // $locationProvider.html5Mode(true);

    $stateProvider
        .state('home',{
            url:'/',
            //templateUrl:"../templates/index.html"
            views:{
                'index': {
                    templateUrl: '../templates/indexpartial.html'

                },
                'header':{
                    templateUrl:'../templates/NavigationBar.html'
                }

            }




        });
   $urlRouterProvider.otherwise('/');

});



clientModule.controller('ctrlNavigation',function ($scope,$http,$rootScope) {
    console.log("inside controller");
    $scope.register=function () {
        console.log($scope.user.lname);
        $http({
            method : 'POST',
            url : '/register',
            data : $scope.user
        }).success(function(data) {
            //checking the response data for statusCode
            if (data.statusCode == 401) {
                $rootScope.authenticated = true;
               // $scope.validlogin = true;
            }
            else
            {
                $scope.validlogin = false;
                $scope.invalid_login = true;
            }
            //Making a get call to the '/redirectToHomepage' API
            //window.location.assign("/homepage");
        }).error(function(error) {
            $scope.validlogin = true;
            $scope.invalid_login = true;
        });
    }
    
});

clientModule.controller('TestCtrl',function ($scope,$http) {

    $scope.result1 = '';
    $scope.options1 = null;
    $scope.details1 = '';


    $scope.searchOptions=function () {

        console.log($scope.journey);
        $http({
            method : 'POST',
            url : '/searchroom',
            data : $scope.journey
        }).success(function(data) {
            //checking the response data for statusCode
            if (data.statusCode == 401) {
                $rootScope.authenticated = true;
                // $scope.validlogin = true;
            }
            else
            {
                $scope.validlogin = false;
                $scope.invalid_login = true;
            }
            //Making a get call to the '/redirectToHomepage' API
            //window.location.assign("/homepage");
        }).error(function(error) {
            $scope.validlogin = true;
            $scope.invalid_login = true;
        });
    }

    // $scope.result2 = '';
    // $scope.options2 = {
    //     country: 'ca',
    //     types: '(cities)'
    // };    $scope.details2 = '';
    //
    //
    //
    // $scope.result3 = '';
    // $scope.options3 = {
    //     country: 'gb',
    //     types: 'establishment'
    // };
    // $scope.details3 = '';
});


// clientModule.controller('ctrlNavigation',function ($scope,$http) {
//     console.log("inside controller");
//     $http({
//         method:'GET',
//         url:'/'
//     });
//
// });
//
// clientModule.controller('ctrlFB',function ($scope,$http,$window) {
//
//
//     console.log("inside fb ctrl");
//     $scope.submit=function () {
//         $window.location = $window.location.protocol + "//" + $window.location.host + $window.location.pathname + "auth/facebook";
//         /* // $http({
//          //     method:'GET',
//          //
//          //     url:'/auth/google',
//          //     headers: {
//          //         'Access-Control-Allow-Origin': true
//          //         //'Content-Type': 'application/json'
//          //     }
//          //
//          // });*/
//
//     };
// });