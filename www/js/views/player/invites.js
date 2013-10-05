define([
    'jquery',
    'lodash',
    'baseview',
    'mustache',
    'text!templates/player/invites.html'
], function ($, _, BaseView, Mustache, invitationTemplate) {
    var InvitePage = BaseView.extend({
        el: '.page',
        render: function () {
            var tpl = Mustache.render(invitationTemplate, {invitations: this.collection});

            $(this.el).html(tpl);
        }
    });

    return InvitePage;
});
