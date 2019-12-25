var app = angular.module('app', ['ngMaterial', 'ngMessages', 'ngAnimate', 'ngRoute', 'chart.js']);

// disabling the default angularjs material theming
// app.config(function($mdThemingProvider ){
//   $mdThemingProvider.disableTheming();
// });




//configured routing system for sidenav menu item & not submenu for now
app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
  .when("/", {
    template: '<div class="center-viewText">this is the / route which is home page view without any active views</div>'
  })
  .when("/dashboard", {
    template: '<div class="center-viewText">This is the dashboard view & not sub menu</div>',
    controller: 'NavigationController'
  })
  // crashes because submenu routign is not done properly
  .when("/page-visitors", {
    templateUrl: "views/page-visitors.html",
    controller: 'NavigationController'
  })
  .when("/post-performance", {
    templateUrl: "views/post-performance.html",
    controller: 'NavigationController'
  })
   .otherwise({
    template: '<div class="center-viewText">Error 404: Please select the only links with dropdown</div>'
  })
}]);

// Controller for Sidenavigation items
app.controller('NavigationController', function ($scope) {

  //checking conditions for ng-click working but have bug when open and clicked on no li with no subitem
    $scope.toggleSubNav = function(item) {
  if (item.subItems) {
    $scope.itemClicked = $scope.clicked = !$scope.clicked;

  if ($scope.itemClicked === true &&  item.subicon === 'unfold_more'){
    item.subicon = 'arrow_drop_down';
    console.log('item clicked first time');
    }
    else{
    item.subicon = 'unfold_more'
      }
    }
  };


    // Must use a wrapper object, otherwise "activeItem" won't work
    $scope.states = {};
    $scope.states.activeItem = '';
    $scope.items = [{
        id: 'item1',
        title: 'Dashboard',
        icon: 'dashboard',
        subicon: 'unfold_more',
        route: 'dashboard',
        subItems: [
          {
            title : 'Page Visitors',
            subroute: 'page-visitors',
          },
          {
            title: 'Post Performace',
            subroute: 'post-performance',
          },
          {
            title: 'Team Overall',
            // subroute: '/team-overall',
          }
        ]
    }, {
        id: 'item2',
        title: 'Calendar',
        icon: 'calendar_today',
    }, {
        id: 'item3',
        title: 'Inbox',
        icon: 'inbox',
        subicon: 'unfold_more',
        subItems: [
          {
            title : 'New Mail',
            // subroute: '/new-mail',

          },
          {
            title: 'Scoial',
            // subroute: '/new-social',
          },
          {
            title: 'Updates',
            // subroute: '/new-updates',
          }
        ]
    },  {
        id: 'item4',
        title: 'Invoicing',
        icon: 'insert_drive_file',
    },  {
        id: 'item5',
        title: 'Lab / Experimental',
        icon: 'build',
    }
  ];


});



  // Optional configuration
app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      responsive: true
    });
  }])

//canvas tyoe - Bar on view page
app.controller('BarCtrl', function($scope){

  $scope.labels = [
    '1', '2', '3', '4', '5',
    '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25',
    '26', '27', '28', '29', '30', '31'
  ];

  $scope.data = [
    7277, 7861, 3748, 5072, 6597, 6054, 6304, 5275,
    8260, 3642, 5061, 8029, 4393, 6827, 3937, 4107,
    4344, 7542, 5364, 8626, 5935, 6093, 7426, 6650,
    5454, 6730, 7631, 8047, 4600, 4297, 6547
  ];

  $scope.datasetOverride = {
    label: 'Visiters',
    backgroundColor: '#0e66da',
    hoverBackgroundColor: '#2E2E99',
    borderColor: '#0e66da',
    borderWidth: 1,
    barPercentage: 0.5 // need to write it here in 2.x chart ver
  };

  $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: 'rgba(255,255,255)',
      titleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      titleFontSize: 12,
      titleFontStyle: 'bold',
      titleFontColor: 'grey',
      titleAlign: 'left',
      titleSpacing: 2,
      bodyFontColor: 'black',
    },
    scales: {
      xAxes: [{
        // barPercentage: 0.5, deprecated
        gridLines: {
          display: false,
          drawBorder: false,
          drawTicks: false
        },
        ticks: {
          padding: 8
        }
      }],
      yAxes: [{
        gridLines: {
          drawBorder: false,
          display: true,
          lineWidth: 1,
          color: '#ebeef4',
          offsetGridLines: true,
          tickMarkLength: 3,
          drawTicks: false
        },
        position: 'right',
        ticks: {
          beginAtZero: false,
          suggestedMin: 3000,
          suggestedMax: 9000,
          padding: 8,
          autoSkip: true,
        }
      }]
    }
  };
});



// can't figure out how to dynamically repeat diffrent charts inside different box, maybe make a custom directive of card?


//Canvas chart type - Line for the 4 boxes inside view page
app.controller("LineCtrlOne", function ($scope) {
  // disabled for now
  $scope.labels = ["", "", "", "", "", "", "","","",""];
  $scope.series = ['Real-Time Users'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40, 45, 60, 65]

  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{
    backgroundColor: 'rgba(137, 196, 244, 0.3)',
    borderColor: 'rgba(65, 131, 215, 1)',
    borderWidth: 2
  }];
  $scope.options = {
    elements: {
      point:{
        radius: 0
      },
      line: {
        fll: true,
        tension: 0
      },
      layout: {
        padding: {
          bottom: 0
        }
      }
      },
    scales: {
      yAxes: [{
          id: 'y-axis-1',
          type: 'linear',
          display: false,
          position: 'left',
          gridLines: {
          display: false
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
    }
  };
});
app.controller("LineCtrlTwo", function ($scope) {
  // disabled for now
  $scope.labels = ["", "", "", "", "", "", "","","",""];
  $scope.series = ['Real-Time Users'];
  $scope.data = [
    [15, 20, 25, 21, 36, 55, 40, 35, 27,30]

  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{
    backgroundColor: 'rgba(123, 239, 178, 0.3)',
    borderColor: 'rgba(38, 166, 91, 1)',
    borderWidth: 2
  }];
  $scope.options = {
    elements: {
      point:{
        radius: 0
      },
      line: {
        fll: true,
        tension: 0
      },
      layout: {
        padding: {
          bottom: 0
        }
      }
      },
    scales: {
      yAxes: [{
          id: 'y-axis-2',
          type: 'linear',
          display: false,
          position: 'left',
          gridLines: {
          display: false
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
    }
  };
});
app.controller("LineCtrlThree", function ($scope) {
  // disabled for now
  $scope.labels = ["", "", "", "", "", "", "","","",""];
  $scope.series = ['Real-Time Users'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40, 65, 59, 80]

  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{
    backgroundColor: 'rgba(213, 184, 255, 0.3)',
    borderColor: 'rgba(165, 55, 253, 1)',
    borderWidth: 2
  }];
  $scope.options = {
    elements: {
      point:{
        radius: 0
      },
      line: {
        fll: true,
        tension: 0
      },
      layout: {
        padding: {
          bottom: 0
        }
      }
      },
    scales: {
      yAxes: [{
          id: 'y-axis-3',
          type: 'linear',
          display: false,
          position: 'left',
          gridLines: {
          display: false
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
    }
  };
});
app.controller("LineCtrlFour", function ($scope) {
  // disabled for now
  $scope.labels = ["", "", "", "", "", "", "","","",""];
  $scope.series = ['Real-Time Users'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40, 52, 13, 27]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{
    backgroundColor: 'rgba(254, 250, 212, 0.3)',
    borderColor: 'rgba(250, 216, 89, 1)',
    borderWidth: 2
  }];
  $scope.options = {
    elements: {
      point:{
        radius: 0
      },
      line: {
        fll: true,
        tension: 0
      },
      layout: {
        padding: {
          bottom: 0
        }
      }
      },
    scales: {
      yAxes: [{
          id: 'y-axis-4',
          type: 'linear',
          display: false,
          position: 'left',
          gridLines: {
          display: false
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
    }
  };
});

app.controller("LineCtrlBounceRate", function ($scope) {
  // disabled for now
  $scope.labels = ["", "", "", "", "", "", "","","",""];
  $scope.series = ['BounceRate'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40, 45, 60, 65]

  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{
    backgroundColor: 'rgba(137, 196, 244, 0.3)',
    borderColor: 'rgba(65, 131, 215, 1)',
    borderWidth: 2
  }];
  $scope.options = {
    elements: {
      point:{
        radius: 0
      },
      line: {
        fll: true,
        tension: 0
      },
      layout: {
        padding: {
          bottom: 0
        }
      }
      },
    scales: {
      yAxes: [{
          id: 'y-axis-1',
          type: 'linear',
          display: false,
          position: 'left',
          gridLines: {
          display: false
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
    }
  };
});


app.controller('platformController', function($scope){
  $scope.platforms = [{
    id: 'plat1',
    platformTitle: 'Instagram',
    visitor: 3550,
    goal: 5000,
  },
  {
    id: 'plat2',
    platformTitle: 'Facebook',
    visitor: 2236,
    goal: 4800,
  },
  {
    id: 'plat3',
    platformTitle: 'Twitter',
    visitor: 1795,
    goal: 4000,
  },
  {
    id: 'plat4',
    platformTitle: 'Linkedin',
    visitor: 62,
    goal: 600,
  }
]
});


app.controller('pagesController', function($scope){
  $scope.pages = [{
    id: 'page1',
    pathDirectory: '/store',
    linkIcon: 'launch',
    visitor: 4890,
    uniquePageVisit: 3985,
    bounceRate: 81.56,
  },
  {
    id: 'page2',
    pathDirectory: '/store/symbols-styleguides',
    linkIcon: 'launch',
    visitor: 3785,
    uniquePageVisit: 3182,
    bounceRate: 62.56,
  },
  {
    id: 'page3',
    pathDirectory: '/store/dashboard-ui-kit',
    linkIcon: 'launch',
    visitor: 2985,
    uniquePageVisit: 2115,
    bounceRate: 58.56,
  },
  {
    id: 'page4',
    pathDirectory: '/store/webflow-cards.html',
    linkIcon: 'launch',
    visitor: 2440,
    uniquePageVisit: 1789,
    bounceRate: 39.59,
  }
]
});
