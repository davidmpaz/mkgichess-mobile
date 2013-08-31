define([
    'jquery',
    'lodash',
    'backbone',
    'events',
    'text!templates/footer/footer.html',
], function ($, _, Backbone, Events, footerTemplate) {
    var FooterView = Backbone.View.extend({
        el: '.footer',
        intialize: function () {

        },
        render: function () {
            $(this.el).html(footerTemplate);
            $('a[href="' + window.location.hash + '"]').addClass('active');
            console.info('Footer rendered.');
        },
        events: {
            'click a': 'highlightMenuItem'
        },
        highlightMenuItem: function (ev) {
            $('.active').removeClass('active');
            $(ev.currentTarget).addClass('active');
        }
    });

    return FooterView;
});
