

import * as path from 'path'

var Service = require('node-windows').Service

// Create a new service object
var svc = new Service({
    name:'Bed',
    description: 'Bed server.',
    script: path.join(__dirname, 'app.js'),
//   execPath: 'ts-node',
    nodeOptions: [
      '--harmony',
      '--max_old_space_size=4096'
    ]
    //, workingDirectory: '...'
    //, allowServiceLogon: true
  });
  
  // Listen for the "install" event, which indicates the
  // process is available as a service.
  svc.on('uninstall',function(){
    console.log('uninstall complete')
    console.log(`service ${svc.exists?'':'not'} exists`)
  });
  
  svc.uninstall();