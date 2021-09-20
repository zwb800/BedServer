import dgram from 'dgram'

type UdpCallback = (msg:Buffer,rinfo:dgram.RemoteInfo)=>void

export default class UdpServer{

    private server = dgram.createSocket('udp4')

    constructor(callback:UdpCallback){
        this.server.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
                this.server.close();
            });
            
            this.server.on('message', (msg, rinfo) => {
                
                callback(msg,rinfo)
            });
            
            this.server.on('listening', () => {
                const address = this.server.address();
                console.log(`server listening ${address.address}:${address.port}`);
            });
    }

    start():void{
        this.server.bind(8080)
    }

}
