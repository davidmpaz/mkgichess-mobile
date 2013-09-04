define([
    'jquery',
    'lodash',
    'backbone',
    'events',
    'text!templates/help/panel.html',
], function ($, _, Backbone, Events, panelTemplate) {
    var PanelView = Backbone.View.extend({
        id: 'help-menu-panel',
        el: '#help-menu-panel',
        intialize: function () {
        },
        render: function () {
            $(this.options.parentView.$el).append(panelTemplate);
        }
    });

    return PanelView;
});
