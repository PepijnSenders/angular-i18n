var angularI18n = angular.module('I18nModule', []);

angularI18n.provider('i18nService', function() {

  this.setSource = function(source) {
    this.source = source;
  };

  this.$get = function() {
    var self = this;

    return {
      getSource: getSource
    };

    function getSource() {
      return self.source;
    };
  };

});

angularI18n.directive('i18nTranslate', function(i18nService) {

  return function(scope, element, attrs) {
    var splitted = attrs.i18nTranslate.split('.');

    var namespace = splitted.shift(), key = splitted.join('.');

    try {
      element.html(i18nService.getSource()[namespace][key]);
    } catch(error) {
      console.error(namespace + '.' + key + ' doesn\'t exist in sourcefile.');
    }
  };

});