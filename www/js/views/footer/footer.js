define([
    'jquery',
    'lodash',
    'backbone',
    'events',
    'text!templates/footer/footer.html'
], function ($, _, Backbone, Events, footerTemplate) {
    var FooterView = Backbone.View.extend({
        el: '.footer',
        intialize: function () {

        },
        render: function () {
            $(this.el).html(footerTemplate);
        },
        events:{
            'click #more-menu-btn': 'showMenu'
        },
        showMenu: function (ev) {
            ev.preventDefault();
            $( "#more-menu" ).popup("open");
        }
    });

    return FooterView;
});
