// mirage/serializers/application.js
import { Serializer } from 'ember-cli-mirage';

export default Serializer.extend({

  // Solarium is custom JSON. Therefore, the data must be sent through the serializer that leaves its custom format in tact.
  serialize(object, request) {

    // This is how to call super, as Mirage borrows [Backbone's implementation of extend](http://backbonejs.org/#Model-extend)
    let json = Serializer.prototype.serialize.apply(this, arguments);

    // Add metadata, sort parts of the response, etc.

    return json;
  },
});
