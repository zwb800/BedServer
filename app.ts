import UdpServer from './UdpServer'

import Bed from './Bed'

const beds = new Map<string,Bed>()


beds.set("192.168.2.225",new Bed(1,150))
beds.set("192.168.2.151",new Bed(2,200))
beds.set("192.168.2.175",new Bed(3,350))
beds.set("192.168.2.107",new Bed(4,250))
beds.set("192.168.2.158",new Bed(5,100))
beds.set("192.168.2.218",new Bed(6,15))


var lastStr = ""
const server = new UdpServer((msg,rinfo)=>{
    let val = msg[0]<<8 | msg[1]

    var bed:Bed = new Bed(0,300)

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