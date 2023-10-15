export type FieldType={
    name: string;
    weight: number;
    dateOrder: Date
    isStock:boolean
    customer:string
}
export type AddFormProps={
    changeVisible:()=>void
}