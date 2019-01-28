let app = require('../src/app')
import chai, { expect } from 'chai'
import request from 'supertest'


describe('Test routow usera', () => {
    describe('Poprawne pobranie danych uzytwkonika', () => {
        const tokenPracownika = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2RlV29yayIsInN1YiI6InByYWNvd25pa0B0ZXN0LmNvbSIsInVzZXIiOnsiZW1haWwiOiJwcmFjb3duaWtAdGVzdC5jb20iLCJ0eXBlIjoyfSwiaWF0IjoxNTQ4NTgwMzgzODk0LCJleHAiOjE1NDg2NjY3ODM4OTR9.yKxB5HyUXvIQMpHYw31AkUk8aD4xJFwzCqHTg840WGI'
        
        it('powinien zwrocic 200', function(done) { 
            request(app).get('/api/v1/user').set('authorization', tokenPracownika).end((err, res) => { 
                expect(res.statusCode).to.equal(200)
                done()
            });
        })
    })
    describe('Niepoprawny token', () => {
        const tokenPracownika = 'nieprawidolowytoken'
        
        it('powinien zwrocic 401', function(done) { 
            request(app).get('/api/v1/user').set('authorization', tokenPracownika).end((err, res) => { 
                expect(res.statusCode).to.equal(401)
                done()
            });
        })
    })

    describe('Brak tokena', () => {    
        it('powinien zwrocic 401', function(done) { 
            request(app).get('/api/v1/user').set('authorization', '').end((err, res) => { 
                expect(res.statusCode).to.equal(401)
                done()
            });
        })
    })
})