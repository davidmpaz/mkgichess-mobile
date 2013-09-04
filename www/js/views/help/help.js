define([
    'jquery',
    'lodash',
    'backbone',
    'vm',
    'events',
    'views/help/panel',
    'text!templates/help/help.html'
], function ($, _, Backbone, Vm, Events, PanelView, helpTemplate) {
    var HelpView = Backbone.View.extend({
        el: '.page',
        intialize: function () {
        },
        render: function () {
            $(this.el).html(helpTemplate);

            var panelView = Vm.create(this, 'PanelView', PanelView, {parentView: this});
            panelView.render();

            Events.trigger('viewRendered');
        },
        events: {
            'click .jqm-deeplink': 'showMenu',
            'swiperight': 'showMenu',
            'swipeleft': 'selectSection',
            'click #help-menu-panel a': 'selectSection'
        },
        showMenu: function (ev) {
            ev.preventDefault();

            if ($.mobile.activePage.jqmData("panel") !== "open") {
                if (ev.type === "swiperight") {
                    $("#help-menu-panel").panel("open");
                }
            }
        },
        selectSection: function (ev) {
            ev.preventDefault();

            if ($.mobile.activePage.jqmData("panel") === "open") {
                if (ev.type === "swiperight") {
                    $("#help-menu-panel").panel("close");
                }
            }
            //TODO make the page goes to the selected section
        }
    });

    return HelpView;
});
