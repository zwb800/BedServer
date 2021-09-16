import dgram from 'dgram'

export default class UdpServer{

    private server = dgram.createSocket('udp4')

    constructor(){
        this.server.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
                this.server.close();
            });
            
            this.server.on('message', (msg, rinfo) => {
                console.log(`server got: ${msg[0]} ${msg[1]} from ${rinfo.address}:${rinfo.port}`);
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
