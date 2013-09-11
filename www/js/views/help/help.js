define([
    'jquery',
    'lodash',
    'baseview',
    'vm',
    'events',
    'views/help/panel',
    'text!templates/help/help.html'
], function ($, _, BaseView, Vm, Events, PanelView, helpTemplate) {
    var HelpView = BaseView.extend({
        el: '.page',
        intialize: function () {
        },
        render: function () {
            $(this.el).html(helpTemplate);

            var panelView = Vm.create(this, 'PanelView', PanelView, {parentView: this});
            panelView.render();
        },
        events: {
            'click .jqm-deeplink': 'showMenu',
            'swiperight': 'showMenu',
            'swipeleft': 'selectSection',
            'click #help-menu-panel a': 'showMenu'
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
