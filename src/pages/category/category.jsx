/* eslint-disable react/prefer-stateless-function */
/**
 * 品类管理
 */
import React, {Component} from 'react';
import {Card, Button, Table} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
export default class Category extends Component {
    render() {
        const dataSource = [
            {
                parentId: '0',
                _id: '0001',
                name: '家用电器',
                _v: 0
            },
            {
                parentId: '0',
                _id: '0002',
                name: '电脑',
                _v: 0
            },
            {
                parentId: '0',
                _id: '0003',
                name: '图书',
                _v: 0
            }
        ];
          
        const columns = [
            {
                title: '一级分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                dataIndex: '',
                key: 'action',
                render: () => (
                    <span>
                        <Button type="link">修改分类</Button>
                        <Button type="link">查看子分类</Button>
                    </span>
                )
            },
        ];
          
        return (
            <Card
                bordered
                title="一级分类列表"
                extra={<Button type="primary" icon={<PlusOutlined />}>添加</Button>} >
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns} />
            </Card>
        );
    }
}
