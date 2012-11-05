
Snippets = new Meteor.Collection("snippets");



Template.header.title = function () {
    return "My Snippets";
};

Template.inputarea.snippets = function () {
    return Snippets.find({},{sort:{regTimestamp:-1}});
};

Template.inputarea.events({
    'click #btnInsert': function () {
        var content = $('textarea').val();
        var date = new Date();
        if(!content.length) {
            return;
        }
        Snippets.insert({content:content,
            regTimestamp:date.getTime(),
            regdate:date.toLocaleDateString(),
            user:Meteor.user()});
        $('textarea').val('').focus();
    },
    'click .btnRemove': function () { 
        Snippets.remove(this._id);
    },
    'click .btnUpdate': function () { 
        Snippets.update({_id:this._id}, {content:'updated contents'});
    }
});

