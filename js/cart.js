angular.module("cart", [])
    .factory("cart", function () {
            var cartData = [];
            return {
                addProduct: function (aproduct) {
                    var addedToExistingItem = false;
                    var comesFromSingle = true;
                    if(angular.isUndefined(aproduct.count)){
                        comesFromSingle = false;
                    }
                    for (var i = 0; i < cartData.length; i++) {
                        if (cartData[i].ID == aproduct.ID) {
                            if(comesFromSingle){

                                cartData[i].count += parseInt(aproduct.count);
                            }else{
                                cartData[i].count++;
                            }

                            addedToExistingItem = true;
                            alert("product update successfully");
                            break;
                        }
                    }
                    if(!addedToExistingItem){
                        var aitem = {Title: aproduct.Title,ID:aproduct.ID,Price:aproduct.Price,images:aproduct.images[0]};
                        if(!comesFromSingle){
                            aitem.count = 1;
                        }else{
                            aitem.count = parseInt(aproduct.count);
                        }
                        cartData.push(aitem);
                        alert("product insert successfully");
                    }

                },
                removeProduct: function (id) {
                    for (var i = 0; i < cartData.length; i++) {
                        if (cartData[i].ID == id) {
                            cartData.splice(i, 1);
                            alert("product remove successfully");
                            break;
                        }
                    }
                },
                getProducts: function () {
                    return cartData;
                }
            };
        }
    ).directive("cartSummary", function (cart) {
    return {
        restrict: "E",
        templateUrl: "partial/cartSummary.html",
        controller: function ($scope) {
            var cartData = cart.getProducts();
            $scope.total = function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += (cartData[i].Price * cartData[i].count);
                }
                return total;
            };
            $scope.itemCount = function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += cartData[i].count;
                }
                return total;
            };
        }
    };
});


