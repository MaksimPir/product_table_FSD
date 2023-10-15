import { makeAutoObservable } from "mobx";
import { NotificationType } from "shared";
class AlertStore
{
    status:NotificationType|null=null
    message:string=''
    constructor()
    {
        makeAutoObservable(this)
    }
    showAlert=(message:string,status:NotificationType)=>{
        this.message=message
        this.status=status
    } 
    hideAlert=()=>{
        this.message=''
        this.status=null
    }
}
export default new AlertStore()