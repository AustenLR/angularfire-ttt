var app = angular.module("ttt app", ["firebase", "ngRoute"]);

app.config(function ($routeProvider, $locationProvider, $httpProvider){
  $routeProvider
  .when("/signup",{
    templateUrl: "partials/signup.html",
    controller: "AuthCtrl",
  })
  .when('/login',{
    templateUrl: 'partials/login.html',
    controller: "LoginCtrl"
  })
  .when("/rooms",{
    templateUrl: "partials/rooms.html",
    controller: "RoomsCtrl",
    resolve: {
      currentUser : function(UserService) {
        return UserService.getCurrentUser();
      }
    }
  })
  .when("/rooms/:id",{
    templateUrl: "partials/room.html",
    controller: "RoomCtrl",
    resolve:{
      room: function(RoomService, $route){
        return RoomService.getRoom($route.current.params.id);
      },
      currentUser: function(UserService) {
        return UserService.getCurrentUser();
      },
      messages: function(MessageService, $route){
        return MessageService.getAllMessages($route.current.params.id);
      }
    }
  });
  $locationProvider.html5Mode(true);
});
  