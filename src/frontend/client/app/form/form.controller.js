'use strict';
angular.module('app.ui.form').controller('DatepickerDemoCtrl', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
}).controller('TimepickerDemoCtrl', [
  '$scope', function($scope) {
    $scope.mytime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };
    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      return $scope.ismeridian = !$scope.ismeridian;
    };
    $scope.update = function() {
      var d;
      d = new Date();
      d.setHours(14);
      d.setMinutes(0);
      return $scope.mytime = d;
    };
    $scope.changed = function() {
      return console.log('Time changed to: ' + $scope.mytime);
    };
    return $scope.clear = function() {
      return $scope.mytime = null;
    };
  }
]).controller('TypeaheadCtrl', [
  '$scope', 'ShopService', function($scope, ShopService) {
    $scope.selected = void 0;

    $scope.$on('category-refresh', function(){
      ShopService.getCurrentCategories()
      .then(function(data){
        $scope.categories = data;
      })
    });
  }
]).controller('RatingDemoCtrl', [
  '$scope', function($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      return $scope.percent = 100 * (value / $scope.max);
    };
    return $scope.ratingStates = [
      {
        stateOn: 'glyphicon-ok-sign',
        stateOff: 'glyphicon-ok-circle'
      }, {
        stateOn: 'glyphicon-star',
        stateOff: 'glyphicon-star-empty'
      }, {
        stateOn: 'glyphicon-heart',
        stateOff: 'glyphicon-ban-circle'
      }, {
        stateOn: 'glyphicon-heart'
      }, {
        stateOff: 'glyphicon-off'
      }
    ];
  }
]);

