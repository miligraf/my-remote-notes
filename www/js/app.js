(function() {

  var app = angular.module('starter', ['ionic']);

  app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('list', {
      url: '/list',
      templateUrl: 'templates/list.html'
    });

    $stateProvider.state('edit', {
      url: '/edit/:noteId',
      templateUrl: 'templates/edit.html'
    });

    $urlRouterProvider.otherwise('/list');
  });

  var notes = [
      {
        id: '1',
        title: 'First Note', 
        description: 'First description'
      },
      {
        id: '2',
        title: 'Second Note', 
        description: 'Second description'
      }
    ];

  function getNote(noteId) {
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === noteId) {
        return notes[i];
      }
    }
    return undefined;
  }

  function updateNote(note) {
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === note.id) {
        notes[i] = note;
        return;
      }
    }
  }

  app.controller('ListCtrl', function($scope) {
    $scope.notes = notes;
  });

  app.controller('EditCtrl', function($scope, $state) {
    $scope.note = angular.copy(getNote($state.params.noteId));

    $scope.save = function() {
      updateNote($scope.note);
      $state.go('list');
    };
  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

}());