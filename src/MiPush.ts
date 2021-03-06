import * as https from 'https'
import format from 'date-fns/format'
import * as querystring from 'querystring'

export default class MiPush{
    private static send(title:string,description:string,nid:number,channel:string):void{
        // new URLSearchParams()
        var params = querystring.stringify({
            payload:"payload",
            restricted_package_name:"com.jnrecycle.app",
            pass_through:'0',
            title:title,
            description:description,
            notify_id:nid,
            'extra.channel_id':channel
        })

        var req = https.request("https://api.xmpush.xiaomi.com/v2/message/all",{ 
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Content-Length':params.length,
                Authorization:"key=LcMMgzTu9GUVuXYvQxeARw=="
                
        }},(response)=>{
            let data = ""
            response.on('data',(chunck)=>{
                data+= chunck
                console.log(chunck)
            })
        
            response.on('end',()=>{
                console.log('end')
                console.log(data)
            })

            response.on('error',()=>{
                console.error("error")
            })
        })

        req.on("error",(e)=>{
            console.error(e)
        })
    
        req.end(params)
        

        
    }

    static bedEmpty(bedno:number){
        this.send(bedno+"床起床",this.dateStr(),bedno,"bed_empty")
    }

    static bedOccupied(bedno:number){
        this.send(bedno+"床躺下",this.dateStr(),bedno,"bed_occupied")
    }

    private static dateStr(){
        return format(new Date(),"HH:mm:ss")
    }
}