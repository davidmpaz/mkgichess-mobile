define([
    'jquery',
    'lodash',
    'backbone',
    'text!templates/header/menu.html'
], function ($, _, Backbone, headerMenuTemplate) {
    var HeaderMenuView = Backbone.View.extend({
        el: '.header',
        initialize: function () {
        },
        render: function () {
            $(this.el).html(headerMenuTemplate);
        }
    })

    return HeaderMenuView;
});
