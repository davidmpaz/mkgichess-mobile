define([
    'jquery',
    'backbone',
    'events'
], function ($, Backbone, Events) {
    var BaseView = Backbone.View.extend({
        enhance: function () {
            this.render();
            // enhance recently added content, since we have single page layout
            // we enhance the content section only
            $("[data-role=content]").trigger('create');
        },
        fadeIn: function () {
            this.enhance();
            // apply effect
            this.$el.hide().fadeIn();
        }
    });

    return BaseView;
});
