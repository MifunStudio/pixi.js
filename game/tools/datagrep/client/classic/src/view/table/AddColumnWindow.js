Ext.define('datagrep.view.table.AddColumnWindow', {
    extend: 'Ext.window.Window',
    xtype: 'addcolumn-window',

    controller: 'addcolumnwindow',

    layout: 'fit',
    title: '新建列',
    modal: true,
    scrollable: true,
    bodyPadding: 10,
    constrain: true,
    closable: true,

    initComponent: function() {
        var me = this;

        me.items = [{
            xtype: 'form',
            width: 400,
            layout: 'form',
            reference: 'addColumnForm',
            items: [{
                xtype: 'textfield',
                name: 'columnName',
                fieldLabel: '列名称',
                value: ''
            }, {
                xtype: 'combobox',
                store: Ext.StoreManager.get('Editors'),
                queryMode: 'local',
                displayField: 'name',
                valueField: 'type',
                name: 'columnType',
                fieldLabel: '数值类型',
                value: '字符串',
                editable: false
            }]
        }];

        me.buttons = [{
            text: '确定',
            handler: 'onAddColumnBtnOkClick'
        }, {
            text: '取消',
            handler: function() {
                me.close();
            }
        }];

        me.callParent();
    }

});
