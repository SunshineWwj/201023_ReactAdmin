/* eslint-disable react/prefer-stateless-function */
/**
 * 品类管理
 */
import React, {Component} from 'react';
import {Card, Button, Table, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {reqCategories, reqCategoryDetail} from '../../api';
export default class Category extends Component {
    state={
        dataSource: []
    }
    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        this.columns = [
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
                render: (text, record) => (
                    <span>
                        <Button type="link" onClick={() => this.getCategoryDetail(record.id)}>修改分类</Button>
                        <Button type="link">查看子分类</Button>
                    </span>
                )
            },
        ];
    }
    componentDidMount() {
        reqCategories().then(res => {
            console.log('list:', res);
            if(res.status === 0)
                this.setState({dataSource: res.data});
            else
                message.warn('获取列表失败');
        });
    }
    getCategoryDetail = id => {
        reqCategoryDetail(id).then(res => {
            console.log('detail:', res);
        });
    }
    render() {
        const {dataSource = []} = this.state;
          
        return (
            <Card
                bordered
                title="一级分类列表"
                extra={<Button type="primary" icon={<PlusOutlined />}>添加</Button>} >
                <Table
                    bordered
                    rowKey="id"
                    dataSource={dataSource}
                    columns={this.columns} />
            </Card>
        );
    }
}
