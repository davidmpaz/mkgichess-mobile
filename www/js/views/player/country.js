define([
    'jquery',
    'lodash',
    'baseview',
    'mustache',
], function ($, _, BaseView, Mustache) {
    var CountryPart = BaseView.extend({
        el: '#select-country',
        render: function () {
            var self = this,
                str = '<option value="{{code}}" {{#selected}}selected="selected"{{/selected}}>{{name}}</option>';
            this.$el.html("");

            _.each(this.options.countries, function (country) {
                country.selected = '';
                if (self.model.get('country') != null) {
                    country.selected =
                        country.code == self.model.get('country').toUpperCase();
                }

                self.$el.append(Mustache.render(str, country));
            });


        }
    });

    return CountryPart;
});
