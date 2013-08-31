define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var vent = _.extend({}, Backbone.Events);

    // register listener for re-enhancing the pages after loading
    vent.on("viewRendered", function () {
        // enhance recently added content, since we have single page layout
        // we enhance the content section only
        $("[data-role=content]").trigger('create');
    });

    return vent;
});