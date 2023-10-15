import { notification } from "antd";
import alertStore from 'entities/product/model/store/Alert-store'
import { NotificationType } from "./models";

const UseOwnNotification=()=>{
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType,title:string, desc:string) => {
      api[type]({
        message: title,
        description:desc,
        onClose:()=>alertStore.hideAlert()
      });
    };
    return {openNotificationWithIcon,contextHolder}
}
export default UseOwnNotification
