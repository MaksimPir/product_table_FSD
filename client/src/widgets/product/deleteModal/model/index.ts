import { IProduct } from "entities/product"

export type deleteModalProps={
    product:IProduct|null
    changeIdProductToDelete:(id:number|null)=>void
}