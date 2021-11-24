function ngSelectize(selectizeConfig) {
    return {
        restrict: 'EA',
        require: '^ngModel',
        scope: { ngModel: '=', config: '=?', options: '=?', ngDisabled: '=', ngRequired: '&' },
        link: function (scope, element, attrs, modelCtrl) {

            var selectize,
                settings = angular.extend({}, Selectize.defaults, selectizeConfig, scope.config);

            scope.options = scope.options || [];
            scope.config = scope.config || {
                create: true,
                valueField: "id",
                labelField: "name",
                delimiter: '|',
                placeholder: 'Pick something',
            };

            var isEmpty = function (val) {
                return val === undefined || val === null || !val.length; //support checking empty arrays
            };

            var toggle = function (disabled) {
                disabled ? selectize.disable() : selectize.enable();
            }

            var validate = function () {
                var isInvalid = (scope.ngRequired() || attrs.required || settings.required) && isEmpty(scope.ngModel);
                modelCtrl.$setValidity('required', !isInvalid);
            };

            var setSelectizeOptions = function (curr, prev) {
                angular.forEach(prev, function (opt) {
                    if (curr.indexOf(opt) === -1) {
                        var value = opt[settings.valueField];
                        selectize.removeOption(value, true);
                    }
                });

                selectize.addOption(curr, true);

                selectize.refreshOptions(false); // updates results if user has entered a query
                setSelectizeValue();
            }

            var setSelectizeValue = function () {
                validate();

                selectize.$control.toggleClass('ng-valid', modelCtrl.$valid);
                selectize.$control.toggleClass('ng-invalid', modelCtrl.$invalid);
                selectize.$control.toggleClass('ng-dirty', modelCtrl.$dirty);
                selectize.$control.toggleClass('ng-pristine', modelCtrl.$pristine);

                if (!angular.equals(selectize.items, scope.ngModel)) {
                    selectize.setValue(scope.ngModel, true);
                }
            }

            settings.onChange = function (value) {
                var value = angular.copy(selectize.items);
                if (settings.maxItems == 1) {
                    value = value[0]
                }
                modelCtrl.$setViewValue(value);

                if (scope.config.onChange) {
                    scope.config.onChange.apply(this, arguments);
                }
            };

            settings.onOptionAdd = function (value, data) {
                if (scope.options.indexOf(data) === -1) {
                    scope.options.push(data);

                    if (scope.config.onOptionAdd) {
                        scope.config.onOptionAdd.apply(this, arguments);
                    }
                }
            };

            settings.onInitialize = function () {
                selectize = element[0].selectize;

                setSelectizeOptions(scope.options);

                //provides a way to access the selectize element from an
                //angular controller
                if (scope.config.onInitialize) {
                    scope.config.onInitialize(selectize);
                }

                scope.$watchCollection('options', setSelectizeOptions);
                scope.$watch('ngModel', setSelectizeValue);
                scope.$watch('ngDisabled', toggle);
            };

            element.selectize(settings);

            element.on('$destroy', function () {
                if (selectize) {
                    selectize.destroy();
                    element = null;
                }
            });
        }
    };




    // return {
    //     restrict: "A",
    //     transclude: true,
    //     scope: {
    //         "ngResult": "=",
    //     },
    //     link: function ($scope, element, attrs) {
    //         var newId = guid();
    //         var $this = $(element);
    //         $scope.url = attrs.ngSelectizeAjax;
    //         $scope.messageRequire = attrs.ngRequire;
    //         $scope.datas = attrs.ngDatas;
    //         $scope.removeTopica = angular.isDefined(attrs.ngRemoveTopica) == "true" ? true : false;
    //         var optionGroups = [];
    //         var options = [];
    //         $control = $(element).selectize({
    //             options: options,
    //             optgroups: optionGroups,
    //             labelField: 'Caption',
    //             valueField: 'Id',
    //             optgroupField: 'CaptionGroup',
    //             optgroupLabelField: 'CaptionGroup',
    //             optgroupValueField: 'CaptionGroup',
    //             lockOptgroupOrder: true,
    //             searchField: ['Caption'],
    //             create: false,
    //             loadingClass: "loading",
    //             render: {
    //                 option: function (item, escape) {
    //                     if (item.CaptionGroup !== null)
    //                         return "<div style='padding-left: 30px;'>" + escape(item.Caption) + "</div>";
    //                     else {
    //                         var template = "";
    //                         if (escape(item.FullName) != "undefined") {
    //                             var department = "";
    //                             if (escape(item.Department) != "undefined" && escape(item.Department) != "null") {
    //                                 department = escape(item.Department);
    //                             }

    //                             var position = "";
    //                             if (escape(item.Position) != "undefined" && escape(item.Position) != "null") {
    //                                 position = escape(item.Position);
    //                             }

    //                             var email = "";
    //                             if (escape(item.Email) != "undefined" && escape(item.Email) != "null") {
    //                                 email = escape(item.Email);
    //                             }

    //                             template += "<div>";
    //                             template += "<span>" + escape(item.FullName) + " (" + email + ")</span><br/>";
    //                             if (escape(item.IdPositionStatus) == 1) {
    //                                 template += "<span class='color-yellow'><i class='fa fa-star'></i></span>   ";
    //                             }
    //                             template += "<small>Chức vụ: " + position + "&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;Đơn vị: " + department + "</small>";
    //                             template += "</div>";
    //                         } else {
    //                             template = "<div>" + escape(item.Caption) + "</div>";
    //                         }
    //                         return template;
    //                     }
    //                 },
    //                 optgroup_header: function (item, escape) {
    //                     return '<div class="optgroup-header">' + escape(item.CaptionGroup) + '</div>';
    //                 }
    //             },
    //             load: function (query, callback) {
    //                 if (!query.length) return callback();
    //                 var self = this;
    //                 self.clearOptions();
    //                 $.ajax({
    //                     url: $scope.url,
    //                     type: 'GET',
    //                     contentType: "application/json; charset=utf-8",
    //                     dataType: "json",
    //                     data: { keyword: query },
    //                     beforeSend: function () {
    //                         $(element).next().addClass("loading");
    //                     },
    //                     error: function () {
    //                         callback();
    //                     },
    //                     success: function (response) {
    //                         $(element).next().removeClass("loading");
    //                         if (response == null) return;
    //                         options = response;
    //                         optionGroups = Enumerable.From(response)
    //                             .GroupBy(function (m) { return m.CaptionGroup })
    //                             .Select(function (m) { return { CaptionGroup: m.Key() } })
    //                             .ToArray();

    //                         $.each(options, function (index, item) {
    //                             self.addOption(item);
    //                         });
    //                         $.each(optionGroups, function (index, item) {
    //                             self.addOptionGroup(item.CaptionGroup, item);
    //                         });

    //                         callback(optionGroups);
    //                     }
    //                 });

    //                 return callback();
    //             },
    //             onInitialize: function () {
    //                 var self = this;
    //                 if ($scope.datas != "" && $scope.datas != null) {
    //                     var existingOptions = JSON.parse($scope.datas);
    //                     if (Object.prototype.toString.call(existingOptions) === "[object Array]") {
    //                         existingOptions.forEach(function (existingOption) {
    //                             self.addOption(existingOption);
    //                             self.addItem(existingOption[self.settings.valueField]);
    //                         });
    //                     }
    //                     else if (typeof existingOptions === 'object') {
    //                         self.addOption(existingOptions);
    //                         $timeout(function () {
    //                             self.addItem(existingOptions[self.settings.valueField]);
    //                         }, 0);
    //                     }
    //                 }

    //             }
    //         });
    //         $selectize = $control[0].selectize;

    //         $selectize.on("change", function (value) {
    //             var selected = this.options[value];
    //             if (angular.isDefined($scope.ngResult)) {
    //                 $scope.ngResult(selected);
    //                 if (value === "" && angular.isDefined($scope.ngRequire)) {
    //                     $this.after("<span class='color-red' id='" + newId + "'>" + $scope.messageRequire + "</span>");
    //                 } else {
    //                     $("#" + newId).remove();
    //                 }
    //             } else {
    //                 if (angular.isDefined(attrs.ngLabels)) {
    //                     var labels = attrs.ngLabels.split(";");
    //                     if (value !== "") {
    //                         var values = selected.Datas.split(";");
    //                         $.each(labels, function (index, item) {
    //                             $("#" + item).text(values[index]);
    //                         });
    //                     } else {
    //                         $.each(labels, function (index, item) {
    //                             $("#" + item).text("");
    //                         });
    //                     }
    //                 }
    //             }
    //         });
    //         $('.selectize-input').css('border-radius', 0);
    //     },
    // };
};

angular.module('common')
    .value('selectizeConfig', {})
    .directive('ngSelectize', ngSelectize);
ngSelectize.$inject = ['selectizeConfig'];