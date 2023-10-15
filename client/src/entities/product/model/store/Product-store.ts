import { makeAutoObservable, runInAction } from "mobx";
import { IProduct, IProductPropsCreate, IProductPropsUpdate } from "entities/product/model";
import ProductService from "entities/product/api";
import { isAxiosError } from "axios";
import alertStore from 'entities/product/model/store/Alert-store'

class ProductStore
{
    products:IProduct[]=[]
    isLoading:boolean=false
    constructor()
    {
        makeAutoObservable(this)
    }
     fetchProducts =async()=>
    {
        this.isLoading=true
            try {
                const response=await ProductService.getAllProducts()
                runInAction(()=>{
                    if(!isAxiosError(response))
                    {
                        this.products= response
                    }
                    else 
                    {
                        alertStore.showAlert(response.message,'error')
                    }
                })
                
            } catch (e) {
                alertStore.showAlert('Непредвиденная ошибка','error')
            }
            finally
            {
                runInAction(()=>{
                    this.isLoading=false
                })
            }
       
    }
     deleteProduct=async (id:number)=>
    {
        this.isLoading=true
        try {
            const response=await ProductService.deleteProduct(id)
            runInAction(()=>{
                if(!isAxiosError(response))
                {
                    alertStore.showAlert(response.data,'success')
                    this.isLoading=false
                   
                }
                else 
                {
                    alertStore.showAlert(response.message,'error')
                }
            })
            this.fetchProducts()
        } catch (e) {
            runInAction(()=>{
                alertStore.showAlert('Непредвиденная ошибка','error')
            })
        }
        finally
        {
           
        }

        
    }
     updateProduct=async(product: IProductPropsUpdate)=>
    {
        this.isLoading=true
        try {
            const response=await ProductService.updateProduct(product)
            runInAction(()=>{
                if(!isAxiosError(response))
                {
                    this.isLoading=false
                    alertStore.showAlert(response.data,'success')
                }
                else 
                {
                    alertStore.showAlert(response.response?.data.message! ,'error')
                }
            }) 
            this.fetchProducts() 
        } catch (e) {
            runInAction(()=>{
                alertStore.showAlert('Непредвиденная ошибка','error')
            })
        }
        finally
        {
        }
    }
     createProduct=async(product:IProductPropsCreate)=>
    {
        this.isLoading=true
        try {
            const response=await ProductService.createProduct(product)
            runInAction(()=>{
                if(!isAxiosError(response))
                {
                    this.isLoading=false
                    alertStore.showAlert(response.data,'success')
                }
                else 
                {
                    alertStore.showAlert(response.message,'error')
                }
            })
            this.fetchProducts()
        } catch (e) {
            runInAction(()=>{
                alertStore.showAlert('Непредвиденная ошибка','error')
            })
            
        }
        finally
        {
           
        }
    } 
}
export default new ProductStore()