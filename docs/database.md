### Seeding

There are mongodb database seeding and drop utility commands available.

Run the bundle command to install Capistrano (Ruby)

    cd meanr-full-stack/
    bundle
    cap local mongodb_seed

Mongodb database collection drop command

    cap local mongodb_drop

The json seed fixtures files are in

    test/fixtures/db

The password for the user "Net Citizen" is `asdf`

### Indexing Strategy

**TODO** Some further investigation into the production indexing strategy.

Database indexes are kept outside of the mongoose models.

As recommended by the [MongooseJS Guide](http://mongoosejs.com/docs/guide.html) auto indexing is off.

    When your application starts up, Mongoose automatically calls ensureIndex for each defined index in your schema.
    While nice for development, it is recommended this behavior be disabled in production since index creation
    can cause a significant performance impact.
    Disable the behavior by setting the autoIndex option of your schema to false

So the models themselves with everything else (validations, virtuals etc) except indexes are in the `models/` directory.

Indexes are in the `indexes/` directory.

An example index would be like this for unique email values in the users collection

    db.users.ensureIndex( { "email": 1 }, { unique: true } )