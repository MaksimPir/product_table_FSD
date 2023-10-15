import { Input,Form, Select, Row, Button } from "antd";
import { FC, useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import productStore from 'entities/product/model/store/Product-store'
import { observer } from "mobx-react-lite";
import { FieldType, IPropsForm } from "../model";

const ChangeForm:FC<IPropsForm> = observer(({product}) => {
    const [form]=useForm()
    useEffect(()=>{
        form.setFieldsValue({...product})
    },[product])
    const Submit=(values:FieldType)=>{  
        productStore.updateProduct({...form.getFieldsValue(),id:product.id})
    }
    return (
            <Form
                onFinish={Submit}
                form={form}
            >
                <Form.Item<FieldType>
                    name='isStock'
                    label='В наличии'    
                    rules={[{ required: true, message: 'Выберите наличие!' }]}
                >
                    <Select style={{ width: '100%' }}>
                        <Select.Option key='Yes' value={true}  >
                            <div>
                                Да
                            </div>
                        </Select.Option>
                        <Select.Option key='No' value={false}  >
                            <div>
                                Нет
                            </div>
                        </Select.Option>
                    </Select>
                </Form.Item>          
                <Form.Item<FieldType>
                    label="Заказчик"
                    name="customer"
                    rules={[{ required: true, message: 'Введите заказчика!' }]}
                    >
                    <Input/>
                </Form.Item> 
                <Row justify={'end'}>
                    <Button type="primary" htmlType="submit">Сохранить</Button> 
                </Row>
            </Form>
    );
});

export default ChangeForm;