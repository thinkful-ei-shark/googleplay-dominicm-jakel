const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');


describe('Google-Store App', () => {
    it('should be an array of Google Store Apps with at least 1 App.', () => {
        return supertest(app)
            .get('/app')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {

                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
            });
    });
    it('should include all required keys.', () => {
        return supertest(app)
            .get('/app')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                const myApp = res.body[0];
                expect(myApp).to.include.all.keys(
                    'App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price', 'Content Rating',
                    'Genres', 'Last Updated', 'Current Ver', 'Android Ver'
                );
            });
    });
    it('should be an object and App name should be a string.', () => {
        return supertest(app)
            .get('/app')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                const myApp = res.body[0];
                expect(myApp).to.be.an('object')
                expect(myApp.App).to.be.an('string')
            });
    })
    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/app')
            .query({ sort: 'Wrong' })
            .expect(400, '{"message":"sort must be one of \\"rating\\" or \\"app\\""}')  
    });
    it('should sort by rating', () => {
        return supertest(app)
            .get('/app')
            .query({ sort: 'rating' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                let sorted = true;

                let i = 0;
                // iterate once less than the length of the array
                // because we're comparing 2 items in the array at a time
                while (i < res.body.length - 1) {
                    // compare book at `i` with next book at `i + 1`
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i + 1];
                    // if the next book is less than the book at i,
                    if (appAtIPlus1.title < appAtI.title) {
                        // the books were not sorted correctly
                        sorted = false;
                        break; // exit the loop
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            });
    });
})

