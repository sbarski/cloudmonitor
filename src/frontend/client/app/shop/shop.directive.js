(function () {

  angular.module('app.shop').directive('uiShopSpinner', [
    function() {
      return {
        restrict: 'A',
        compile: function(ele, attrs) {
          ele.addClass('ui-spinner');
          return {
            post: function() {
             var arr = Array("orange", "banana", "apple");

             var formatSpinner = function(elem){
              elem.val(arr[elem.val()]);
            };

            return ele.spinner({  step: 1
            })
            .change(function() {
              formatSpinner($(this));
            })
            .trigger("change");
          }
        };
      }
    };
  }
  ])
})(); 

