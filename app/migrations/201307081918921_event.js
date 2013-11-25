migration.up = function(db) {

    db.db.execute('ALTER TABLE ' + db.table + ' ADD COLUMN enabled BOOLEAN;');
   
};

migration.down = function(db) {

};
