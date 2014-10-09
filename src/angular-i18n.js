var angularI18n = angular.module('I18nModule', []);

angularI18n.provider('intService', function() {

  this.setSource = function(source) {
    this.source = source;
  };

  this.$get = ['$log', function($log) {
    var self = this;

    return {
      getSource: getSource,
      translate: translate
    };

    function translate(name) {
      var splitted = name.split('.');

      var namespace = splitted.shift(), key = splitted.join('.');

      try {
        return self.source[namespace][key];
      } catch(error) {
        $log.error(namespace + '.' + key + ' doesn\'t exist in sourcefile.');
      }
    };

    function getSource() {
      return self.source;
    };
  }];

});

angularI18n.directive('intTranslate', function(intService) {

  return function(scope, element, attrs) {
    element.html(intService.translate(attrs.intTranslate));
  };

});