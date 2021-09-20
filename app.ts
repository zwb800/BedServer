import UdpServer from './UdpServer'

import Bed from './Bed'
import MiPush from './MiPush'

const beds = new Map<string,Bed>()

Bed.bedMapping.set("192.168.2.225",1)
Bed.bedMapping.set("192.168.2.151",2)
Bed.bedMapping.set("192.168.2.175",3)


var lastStr = ""
const server = new UdpServer((msg,rinfo)=>{
    let val = msg[0]<<8 | msg[1]

    var bed:Bed = new Bed()

    if(beds.has(rinfo.address))
    {
        var b = beds.get(rinfo.address)
        if(b!=undefined)
            bed = b
    }
    else
    {
        beds.set(rinfo.address,bed)
    }

    bed.address = rinfo.address
    bed.pressure = val

    var newState = bed.pressure < bed.threshold

    if(bed.empty != newState)
    {
        if(newState)
            bed.triggerEmpty()
        else
            bed.triggerOccupied()

        bed.empty = newState
    }
        

    var str = ""
    for (const b of beds.values()) {
        if(b!=undefined)
            str += `${b.pressure}\t`
    }

    if(str != lastStr)
    {
        console.log(str);
        lastStr = str
    }
        
})
server.start()