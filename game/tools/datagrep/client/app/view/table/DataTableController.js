Ext.define('datagrep.view.table.DataTableController', {
    requires: [
        'datagrep.view.table.CreateTableWindow',
        'datagrep.view.table.AddColumnWindow'
    ],
    extend: 'Ext.app.ViewController',
    alias: 'controller.datatable',

    listen: {
        controller: {
            '#addcolumnwindow': {
                submitaddcolumn: 'onSubmitAddColumn'
            }
        }
    },

    gridStore: null,
    selectedTableModel: null,

    onCreateTableBtnClick: function() {
        var win = Ext.create('datagrep.view.table.CreateTableWindow');
        win.show();
    },

    onRemoveTableBtnClick: function() {
        var me = this,
            refs = me.getReferences(),
            tableCombobox = refs.tableCombobox;

        if(me.selectedTableModel) {
            Ext.MessageBox.confirm("提示", "确定删除？", function(ok) {
                if(ok === 'yes') {
                    me.selectedTableModel.drop();
                    me.clearTableGrid();
                    tableCombobox.setValue('');
                    me.selectedTableModel = null;
                    me.gridStore = null;
                }
            });
        }
    },

    onAddColumnBtnClick: function() {
        var win = Ext.create('datagrep.view.table.AddColumnWindow');
        win.show();
    },

    onAddRowBtnClick: function() {
        if(this.gridStore) {
            this.gridStore.add({});
        }
    },

    onTableSelectionChange: function(combo, model) {
        this.updateTableGrid(model);
        this.selectedTableModel = model;
    },

    onSubmitAddColumn: function(data) {
        var me = this,
            refs = me.getReferences(),
            tableCombobox = refs.tableCombobox,
            columnName = data.columnName,
            columnType = data.columnType;

        if(me.selectedTableModel) {
            me.selectedTableModel.addColumn({
                text: columnName,
                columnType: columnType,
                dataIndex: columnName
            });
            me.updateTableGrid(me.selectedTableModel);
        }
    },

    clearTableGrid: function() {
        var me = this,
            refs = me.getReferences(),
            tableGrid = refs.tableGrid;
        tableGrid.reconfigure(Ext.create('Ext.data.Store'), []);
    },

    updateTableGrid: function(model) {
        var me = this,
            refs = me.getReferences(),
            tableGrid = refs.tableGrid,
            columns = model.getColumns();

        var editorsStore = me.getViewModel().get('Editors');
        var fields = [];
        columns.forEach(function(column) {
            fields.push({
                name: column.dataIndex
            });
        });
        var store = Ext.create('Ext.data.Store', {
            fields: fields
        });
        columns = columns.slice(0);
        columns.forEach(function(column) {
            column.editor = editorsStore.createEditor(column.columnType);
        });
        columns.unshift({
            xtype: 'rownumberer'
        });
        columns.push({
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 50,
            items: [{
                iconCls: 'cell-editing-delete-row',
                tooltip: '删除此行',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                }
            }]
        });
        columns.push({
            text: '',
            flex: 1,
            disabled: true
        });
        tableGrid.reconfigure(store, columns);
        this.gridStore = store;
    }
});
