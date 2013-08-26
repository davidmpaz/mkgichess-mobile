define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var vent = _.extend({}, Backbone.Events);

    // register listener for re-enhancing the pages after loading
    vent.on("viewRendered", function (payload) {

        $(payload.elem).trigger(payload.enhanceType);

        if (!$("[data-role=page]").hasClass('ui-page-active')) {
            $("[data-role=page]").addClass('ui-page-active');
        }
    });

    return vent;
});