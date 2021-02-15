const server = require('http').createServer();

const SECRET = process.env.SECRET || "ABC";

const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

const waiting = new class {
    constructor() {
        this.list = []; // waiting this.list
        this.masters = null; // master socket
    }

    generateCode() {
        let code;
        if (this.list.length >= 999) return '-1';
        while (true) {
            code = '';
            for (let i = 0; i < 3; i++) code += Math.floor(Math.random() * Math.floor(10));
            if (this.list.some(x => x.code === code)) continue;
            break;
        }
        return code;
    }

    register(data, cb) {
        data.code = waiting.generateCode();
        data.ts = Math.floor((new Date()).getTime() / 1000);
        this.list.push(data);
        if (this.masters) this.masters.emit('register', data);
        cb(data.code);
    }
    
    call(code, cb) {
        if (this.list.some(x => x.code === code)) {
            this.list = this.list.filter(x => x.code !== code);
            cb(true);
        }
        else cb(false);
    }
}

io.on('connect', (socket) => {
    // connect and disconnect
    console.log('client connected: ' + socket.id);
    socket.on('disconnect', () => {
        if (waiting.masters && socket.id === waiting.masters.id) {
            console.log('master client disconnected: ' + socket.id);
            waiting.masters = { id: null };
        }
        else console.log('client disconnected: ' + socket.id);
    });

    // register the connected socket as master socket to waiting class
    socket.on('master', (secret, cb) => {
        // compare secret key
        if (SECRET === secret) {
            waiting.masters = socket;
            console.log('registered as master socket: ' + socket.id);

            // return waiting list
            socket.on('/', (cb) => {
                cb(waiting.list);
            });

            // call waiting person
            /**
             * @params code: String # code of the called person
             */
            socket.on('call', (code, cb) => waiting.call(code, cb));

            cb(true);
        }
        else cb(false);
    });

    // insert into waiting list
    /**
     * @params data: Object
     * {
     *      code: String # code for waiting person
     *      sei: String # sei of waiting person
     *      mei: String # mei of waiting person
     *      ts: Number # timestamp when registered
     * }
     */
    socket.on('register', (data, cb) => waiting.register(data, cb));
});

server.listen({
    port: 3000
}, () => {
    console.log('Socket.IO Server listening on PORT 3000');
});