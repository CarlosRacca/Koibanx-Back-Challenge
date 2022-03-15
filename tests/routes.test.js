const request = require('supertest');
const app = require('../index');

describe('Authentification', () => {
    it('Should validate the user', done => {
        request(app)
            .get('/api/stores/:limit/:page')
            .set('Accept', 'application/json')
            .auth('test@koibanx.com', 'test123')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('Should not work if authentification is missing', done => {
        request(app)
            .get('/api/stores/:limit/:page')
            .set('Accept', 'application/json')
            .expect(401, done)
    });
});

describe('Getting all stores', () => {
    it('Should get the data of our database', done => {
        request(app)
            .get('/api/stores/:limit/:page')
            .set('Accept', 'application/json')
            .auth('test@koibanx.com', 'test123')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('Should not get the data if the route is not complete', done => {
        request(app)
            .get('/api/stores/:limit')
            .set('Accept', 'application/json')
            .auth('test@koibanx.com', 'test123')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(404, done)
    });
});

describe('Posting a Store', () => {
    it('Should create the store if everything is in the correct format', done => {
        const store = {
            Comercio: "Juan Shop",
            CUIT: "20392121103",
            Concepto: [{"Concepto 1": 102}, {"Concepto 2": 91}, {"Concepto 3": 79}, {"Concepto 4": 135}, {"Concepto 5": 105}, {"Concepto 6": 122}],
            BalanceActual: 1029,
            Activo: true
        };
        request(app)
            .post('/api/stores/')
            .send(store)
            .set('Accept', 'application/json')
            .auth('test@koibanx.com', 'test123')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('Should not create the store if something is not in the correct format', done => {
        const store = {
            Comercio: "Juan Shop",
            CUIT: 20392121103,
            Concepto: [{"Concepto 1": 102}, {"Concepto 2": 91}, {"Concepto 3": 79}, {"Concepto 4": 135}, {"Concepto 5": 105}, {"Concepto 6": 122}],
            BalanceActual: 1029,
            Activo: true
        };
        request(app)
            .post('/api/stores/')
            .send(store)
            .set('Accept', 'application/json')
            .auth('test@koibanx.com', 'test123')
            .expect('Content-Type', /json/)
            .expect(404, done)
    });

})


// it('DELETE -- Respond with the Store removed in format JSON', done => {
//     request(app)
//         .delete('/api/stores/:ID')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done)
// });