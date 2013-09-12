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
        }
        //TODO make the page goes to the selected section and show the panel

    });

    return HelpView;
});
