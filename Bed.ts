
import MiPush from './MiPush'

export default class Bed{
    address:string = ""
    empty:boolean = true
    pressure:number = 0
    threshold:number = 300
    static bedMapping = new Map<string,number>()

    triggerEmpty(){

        MiPush.bedEmpty(this.getBedNo())
    }

    getBedNo(){
        var no = Bed.bedMapping.get(this.address)
        if(no!=undefined)
            return no
        else 
            return 0
    }

    triggerOccupied(){
        MiPush.bedOccupied(this.getBedNo())
    }
}