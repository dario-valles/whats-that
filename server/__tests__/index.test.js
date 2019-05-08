const App = require('../app');
let app;
const request = require('supertest');
const io = require('socket.io-client');
const mock = require('../mocks/mocks.js');


// describe('check basic http response', () => {

//   beforeAll(async () => {
//     app = await App.createServer();
//   });
  
//   afterAll(async () => {
//    app = await App.close();
//   })

//   test('/', async () => {
//     await request(app)
//       .get('/')
//       .expect(200);
//   })
//   test('/getGameKey', async () => {
//     await request(app)
//       .get('/getGameKey')
//       .expect(200);
//   })
// })

describe.only('check basic socket' , () => {
  let sender;
  let receiver;
  const testMsg = 'hello';
  const ioOptions = { 
    transports: ['websocket'],
    forceNew: true, 
    reconnection: false,
  }
  beforeAll(async (done) => {
    await App.createServer();
    sender = await io.connect('http://localhost:2000', ioOptions );
    done();
    });

  afterAll(async (done) => {
    await sender.disconnect()
    // await receiver.disconnect()
    await App.close();
    done()
  })

  test('/', async (done) => {
    await sender.emit('connect', 'test');
    await expect(true).toBe(true);
    done();
  })
})

