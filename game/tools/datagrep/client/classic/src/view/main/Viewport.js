Ext.define('datagrep.view.main.Viewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'mainviewport',

    requires: [
        'Ext.list.Tree'
    ],

    controller: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'datagrep-headerbar',
            height: 44,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    cls: 'datagrep-logo',
                    html: '<div class="main-logo">数据处理工具</div>',
                    width: 150
                },
                {
                    margin: '0 0 0 8',
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                }
            ]
        },
        {
            xtype: 'container',
            id: 'maincontainer',
            flex: 1
        }
    ]
});
