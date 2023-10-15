import { Button, Modal } from "antd"
import { FC } from "react"
import { deleteModalProps } from "../model"
import productStore from 'entities/product/model/store/Product-store'

const DeleteModal:FC<deleteModalProps>=({product,changeIdProductToDelete})=>{
    const deleteHandler=(e:any)=>{
        if(product !==null) 
        {
            productStore.deleteProduct(product.id)
        }
        changeIdProductToDelete(null)
    }
    return(
       <Modal key={'delModal'} title='Удалить товар' open={product!==null}
                footer={
                    [<Button key={'del'} onClick={deleteHandler}>Удалить</Button>,
                    <Button key={'cancel'} onClick={()=>changeIdProductToDelete(null)}>Отмена</Button>
                ]} 
                onCancel={()=>{changeIdProductToDelete(null)}}>
                        {product &&<p key={product.id}>{product.id} {product.name}</p>}
        </Modal>
    )
}
export default DeleteModal