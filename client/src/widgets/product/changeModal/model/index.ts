import { IProduct } from "entities/product";

export type FieldType={
    isStock:boolean
    customer:string
}
export interface IPropsForm
{
    product:{
        id:number
        name: string;
        weight: number;
        dateOrder: Date
        isStock:boolean
        customer:string
    }
}