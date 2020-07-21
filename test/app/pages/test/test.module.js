/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.test', [
    
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('test', {
          url: '/test',
          templateUrl : 'app/pages/test/test.html',
          controller: 'TestCtrl',
          title: 'test Features',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 200,
          },
        });
  }

})();
