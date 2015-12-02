(function () {
    var cat = {};

    var app = angular.module("myApp", ['ui-rangeSlider', 'ngRoute', 'ngMap']);
    app.config(function ($routeProvider) {
        $routeProvider

        // route for the home page
            .when('/home', {
                templateUrl: 'partial/home.html'
            })

            // route for the about page
            .when('/contact', {
                templateUrl: 'partial/contact.html',
                controller: 'contactController'

            })
            .when('/404', {
                templateUrl: 'partial/404.html'

            })
            .when('/blog', {
                templateUrl: 'partial/blog.html'

            })
            .when('/login', {
                templateUrl: 'partial/login.html'

            })
            .when('/cart', {
                templateUrl: 'partial/cart.html'

            })
            .when('/checkout', {
                templateUrl: 'partial/checkout.html'

            })
            . when('/product/:productId', {
                templateUrl: 'partial/single.html',
                controller: 'ProductDetailCtrl'
            })

            // route for the contact page
            .otherwise({
                redirectTo: '/home'
            });
    });
    app.filter("range", function ($filter) {
        return function (data,page) {
            console.log(page);
            if (angular.isArray(data)) {
                var start_index = page;
                    return $filter("limitTo")(data.splice(start_index), 3);
            } else {
                return data;
            }
        }
    });

    app.controller("myCtrl", ['$scope', '$http', '$location', function ($scope, $http, $location) {

        $scope.productList = [];
        $scope.categorories = [];
        $scope.selectpro = null;
        $scope.demo2 = {
            range: {
                min: 0,
                max: 600
            },
            minPrice: 0,
            maxPrice: 600
        };
        $http.get('/productlist_latest.json').then(function (response) {
            $scope.productList = response.data;
            angular.forEach(response.data, function (aproduct) {
                var nowcat = aproduct['Categories'];
                var subcat = aproduct['SubCategory'];
                if (angular.isUndefined(cat[nowcat])) {
                    cat[nowcat] = true;

                    var nowdata = {
                        name: nowcat,
                        subcat: [subcat]
                    };
                    if (subcat == "") {
                        nowdata.subcat = [];
                    }
                    $scope.categorories.push(nowdata);
                } else {
                    angular.forEach($scope.categorories, function (cat) {

                        if (cat['name'] == nowcat) {
                            if ((cat['subcat']).indexOf(subcat) == -1) {
                                cat['subcat'].push(subcat);
                            }
                        }
                    });

                }
            });
        }, function () {

        });
        $scope.seletedProduct = function (aCategory) {
            $scope.selectpro = aCategory;
        };
        $scope.clicktoselect = function (aproduct) {
            return $scope.selectpro == null || $scope.selectpro == aproduct.SubCategory || $scope.selectpro == aproduct.Categories;
        };
        $scope.selectactive = function (category) {
            return category == $scope.selectpro ? "active" : null;
        };

        $scope.seletedPrice = function (aproduct) {
            if (aproduct.Price >= $scope.demo2.minPrice && aproduct.Price <= $scope.demo2.maxPrice) {
                return true;
            }
            return false;
        };
        $scope.isActive = function (route) {
            return route === $location.path();
        }
    }]);
    app.controller("contactController", ['$scope', '$http', 'NgMap', function ($scope, $http, NgMap) {
        NgMap.getMap().then(function (map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });
    }]);
    app.controller('ProductDetailCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
        $scope.productID = $routeParams.productId;
        $scope.seletedProduct = {};
        $scope.seletedImage = null;

        function getProdutInformation(){
            angular.forEach($scope.productList, function(aproduct) {
                if(aproduct.ID == $scope.productID){
                  //  console.log(aproduct);
                    $scope.seletedProduct = aproduct;
                }
            });
        }
        getProdutInformation();
        $scope.changeImage = function(img){
            $scope.seletedImage = img;
        };
        $scope.selectedinfoPro = function(aproduct){
            if(aproduct.Categories == $scope.seletedProduct.Categories && aproduct.SubCategory == $scope.seletedProduct.SubCategory){
                return true;
            }
            return false;
        };
        $scope.getpage = 1;

    }]);
})();
