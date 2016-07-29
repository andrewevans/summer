import DS from 'ember-data';

export default DS.JSONSerializer.extend({

  // Modify "member" object
  // Only used for 'findRecord' requests, such as: this.store.findRecord('member', 4) .
  normalizeFindRecordResponse(store, primaryModelClass, payload) {
    var member = payload.member;

    return {
      data: {
        type: 'member',
        id: parseInt(member.id),
        attributes: member,
      },
    };
  },

  // Modify "member" object
  // Only used for sending data, such as: member.save() .
  serialize: function(snapshot) {
    var json = snapshot.attributes();
    json.id = snapshot.id;

    return json;
  },
});
