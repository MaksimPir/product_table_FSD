import {FC} from 'react';
import { Button, Space, Spin} from 'antd'
import Table, { ColumnsType } from 'antd/es/table';
import productStore from 'entities/product/model/store/Product-store'
import { observer } from 'mobx-react-lite';
import { convertDate } from 'shared';
import { IProduct } from 'entities/product';
import { getColumnSearchProps } from 'features/products-filter';
import { tableProps } from '../model';
  
const TableComponent:FC<tableProps> = observer(({changeHandler,deleteHandler}) => {
    const columns: ColumnsType<IProduct> = [
        {
            title: 'ID товара',
            dataIndex: 'id',
            key: 'id',
            sorter:(a, b) => a.id-b.id
        },
        {
            title: 'Наименование товара',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps(),
            sorter:(a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Вес товара',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'Дата заказа',
            dataIndex: 'dateOrder',
            key: 'dateOrder',
            sorter: (a, b) => new Date(a.dateOrder).valueOf() - new Date(b.dateOrder).valueOf(),
            render:((date:Date)=>convertDate(new Date(date)))
        },
        {
            title: 'Наличие на складе',
            dataIndex: 'isStock',
            key: 'isStock',
            render:((el:boolean)=>el?'Да':'Нет')
        },
        {
            title: 'Заказчик',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Меню',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Button key={'change'} onClick={()=>changeHandler(record.id)}>Изменить</Button>
                <Button key={'del'} onClick={()=>deleteHandler(record.id)}>Удалить</Button>
              </Space>
            ),
          },
      ];
    return  ( 
    <>
        <Spin tip="Loading" size="large" spinning={productStore.isLoading}>
            <Table 
            rowKey={'id'}
            columns={columns} dataSource={productStore.products} /> 
        </Spin>
    </>
    ) 
    ;
});

export default TableComponent;