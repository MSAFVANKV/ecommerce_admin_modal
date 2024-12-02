import toast from "react-hot-toast";

export const makeToast = (text:string)=>{
    toast.success(text, {
        style:{
            borderRadius:"4px",
            background:"#8817EC",
            color:"#fff"
        }
    })
}

export const makeToastError = (text:string)=>{
    toast.error(text, {
        style:{
            borderRadius:"4px",
            background:"#8817EC",
            color:"#fff"
        }
    })
}

export const makeToastWarning = (text:string)=>{
    toast(text, {
        style:{
            borderRadius:"4px",
            background:"#333",
            color:"#fff"
        }
    })
}
