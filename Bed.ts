
import MiPush from './MiPush'

export default class Bed{
    address:string = ""
    empty:boolean = true
    pressure:number = 0
    no:number
    threshold:number = 300
    static bedMapping = new Map<string,number>()

    constructor(no:number,threshold:number){
        this.no = no
        this.threshold = threshold
    }

    triggerEmpty(){

        MiPush.bedEmpty(this.no)
    }

    // getBedNo(){
    //     var no = Bed.bedMapping.get(this.address)
    //     if(no!=undefined)
    //         return no
    //     else 
    //         return 0
    // }

    triggerOccupied(){
        MiPush.bedOccupied(this.no)
    }
}