let app = require('../src/app')
import chai, { expect } from 'chai'
import request from 'supertest'


describe('Test routow tras', () => {
    describe('Poprawne pobranie danych o trasie po shortID', () => {
        const tokenTurysty = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2RlV29yayIsInN1YiI6InR1cnlzdGFAdGVzdC5jb20iLCJ1c2VyIjp7ImVtYWlsIjoidHVyeXN0YUB0ZXN0LmNvbSIsInR5cGUiOjB9LCJpYXQiOjE1NDY3MTg4MjYzMDUsImV4cCI6MTU0NjgwNTIyNjMwNX0.o6z034xj5gFUn7nVB_E2f3hsHk-GAyMXjcdlk_xjLz8'
        
        it('powinien zwrocic 200', function(done) { 
            request(app).get('/api/v1/routes').set('authorization', tokenTurysty).end((err, res) => { 
                expect(res.statusCode).to.equal(200)
                done()
            });
        })
    })
    describe('Wyszukanie trasy po shortId', () => {
        const tokenTurysty = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2RlV29yayIsInN1YiI6InR1cnlzdGFAdGVzdC5jb20iLCJ1c2VyIjp7ImVtYWlsIjoidHVyeXN0YUB0ZXN0LmNvbSIsInR5cGUiOjB9LCJpYXQiOjE1NDY3MTg4MjYzMDUsImV4cCI6MTU0NjgwNTIyNjMwNX0.o6z034xj5gFUn7nVB_E2f3hsHk-GAyMXjcdlk_xjLz8'
        
        it('powinien zwrocic 200', function(done) { 
            request(app).get('/api/v1/routes/nfgPp0Kc0').set('authorization', tokenTurysty).end((err, res) => { 
                expect(res.statusCode).to.equal(200)
                done()
            });
        })
    })
    describe('Nieautoryzowany dostęp do trasy z poprawnym tokenem', () => {    
        const tokenPracownika = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2RlV29yayIsInN1YiI6InByYWNvd25pa0B0ZXN0LmNvbSIsInVzZXIiOnsiZW1haWwiOiJwcmFjb3duaWtAdGVzdC5jb20iLCJ0eXBlIjoyfSwiaWF0IjoxNTQ4NTgwMzgzODk0LCJleHAiOjE1NDg2NjY3ODM4OTR9.yKxB5HyUXvIQMpHYw31AkUk8aD4xJFwzCqHTg840WGI'

        it('powinien zwrocic 404', function(done) { 
            request(app).get('/api/v1/routes/nfgPp0Kc0').set('authorization', tokenPracownika).end((err, res) => { 
                expect(res.statusCode).to.equal(404)
                done()
            });
        })
    })
    describe('Nieautoryzowany dostęp do trasy z niepoprawnym tokenem', () => {    
        const tokenPracownika = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDb2RlV29yayIsInN1YiI6InByYWNvd25pa0B0ZXN0LmNvbSIsInVzZXIiOnsiZW1haWwiOiJwcmFjb3duaWtAdGVzdC5jb20iLCJ0eXBlIjoyfSwiaWF0IjoxNTQ4NTgwMzgzODk0LCJleHAiOjE1NDg2NjY3ODM4OTR9.yKxB5HyUXvIQMpHYw31AkUk8aD4xJFwzCqHTg840WGI'

        it('powinien zwrocic 404', function(done) { 
            request(app).get('/api/v1/routes/nfgPp0Kc0').set('authorization', tokenPracownika).end((err, res) => { 
                expect(res.statusCode).to.equal(404)
                done()
            });
        })
    })
})