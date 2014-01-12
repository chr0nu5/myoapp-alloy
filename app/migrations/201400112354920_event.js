migration.up = function(db) {

    db.db.execute('ALTER TABLE ' + db.table + ' ADD COLUMN urlStartlist varchar;');
    db.db.execute('ALTER TABLE ' + db.table + ' ADD COLUMN urlResults varchar;');
};

migration.down = function(db) {

};
