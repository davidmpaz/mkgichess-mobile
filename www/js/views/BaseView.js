define([
    'jquery',
    'backbone',
    'events'
], function ($, Backbone, Events) {
    var BaseView = Backbone.View.extend({
        enhance: function () {
            this.render();
            // trigger the viewRendered event to re-enhance the new content added
            Events.trigger('viewRendered');
        },
        fadeIn: function () {
            this.enhance();
            // apply effect
            this.$el.hide().fadeIn();
        }
    });

    return BaseView;
});
