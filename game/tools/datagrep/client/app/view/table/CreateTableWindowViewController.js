Ext.define('datagrep.view.table.CreateTableWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.createtablewindow',

    onCreateTableOkBtnClick: function() {
        var me = this,
            viewModel = me.getViewModel(),
            store = viewModel.getStore('DataTable'),
            refs = me.getReferences(),
            createTableForm = refs.createTableForm,
            values = createTableForm.getValues(),
            tableName = values.tableName;

        var model = Ext.create('datagrep.model.DataTable', {
            tableName: tableName
        });
        store.add(model);

        me.getView().close();
    }
});
