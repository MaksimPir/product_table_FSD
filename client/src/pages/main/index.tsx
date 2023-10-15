import {FC, useEffect, useState} from 'react';
import TableComponent from 'widgets/product/table/ui';
import alertStore from 'entities/product/model/store/Alert-store'
import productStore from 'entities/product/model/store/Product-store'
import UseOwnNotification from 'shared/api/typicode/hooks';
import { Button, Modal } from 'antd';
import AddForm from 'widgets/product/addModal/ui';
import { observer } from 'mobx-react-lite';
import { IProduct } from 'entities/product';
import ChangeForm from 'widgets/product/changeModal/ui';
import DeleteModal from 'widgets/product/deleteModal/ui';
const MainPage:FC = observer(() => {
    const {contextHolder,openNotificationWithIcon}=UseOwnNotification()
    const [visibleModalAdd,setVisibleModalAdd]=useState(false)
    const [productToUpdate,setProductToUpdate]=useState<IProduct|null>(null)
    const [productToDelete,setProductToDelete]=useState<IProduct|null>(null)
    const changeVisibleAdd=()=>{
        setVisibleModalAdd((prev)=>!prev)
    }
    useEffect(()=>{
        if(alertStore.message && alertStore.status)
        {
            openNotificationWithIcon(alertStore.status,alertStore.status,alertStore.message)
            alertStore.hideAlert()
        }
    },[alertStore.message])
    useEffect(()=>{
        productStore.fetchProducts()
    },[])
    const changeHandler=(id:number|null)=>{
       
        if(id!==null) 
        {
            const findProduct=productStore.products.find(el=>el.id===id)
            if(findProduct)
            setProductToUpdate(findProduct)
        }
        else
        {
            setProductToUpdate(null)
        }
    }
    const deleteHandler=(id:number|null)=>{
        if(id===null)
        {
            setProductToDelete(null)
        }
        else
        {
            const findProduct=productStore.products.find(el=>el.id===id)
            if(findProduct)
            {
                setProductToDelete(findProduct)
            } 
        }
    }
    return (
        <>
            {contextHolder}
            <div>
                <Button onClick={()=>setVisibleModalAdd(true)} type="primary" style={{ marginBottom: 16}}>
                    Добавить товар
                </Button>
                <TableComponent changeHandler={changeHandler} deleteHandler={deleteHandler}/>
                <Modal key={'addModal'} title='Добавить товар ' open={visibleModalAdd} footer={null} onCancel={changeVisibleAdd}>
                    <AddForm changeVisible={changeVisibleAdd}/>
                </Modal>
                <Modal key={'changeModal'} title='Изменить товар'  open={productToUpdate!==null} footer={null} onCancel={()=>{setProductToUpdate(null)}}>
                     <ChangeForm product={productToUpdate!}/>
                 </Modal>
                 <DeleteModal product={productToDelete} changeIdProductToDelete={deleteHandler}/>
            </div>
        </>
    );
});

export default MainPage;