const app = require('../app');
const request = require('supertest');
const getResult = require('../api/getResult');

jest.mock('../api/getResult',()=>({
    getResult: jest.fn()
}))
jest.setTimeout(30000);
describe('app', () => {
    describe('GET /api/rollnums', () => {
        it('returns json with validNumsArray and resultArray as keys when input is valid', async () => {
            getResult.getResult.mockImplementation(()=>{
                return {
                    error:null,
                    resultArray:['Pass', 'Fail']
                }
            })
            await request(app).
                get('/api/rollnums?rollnums=1,2').
                expect(200).
                then(res=>{
                    expect(res.body).toEqual({validNumsArray: [ 1, 2 ], resultArray: [ 'Pass', 'Fail' ] })
                })
        })
        it('returns message object with status 400 when invalid input', async () => {
            await request(app).
                get('/api/rollnums?rollnums=1,2a').
                expect(400).
                then(res=>{
                    expect(res.body.message).toEqual('Input can only have numbers and commas');
                })
        })
        it('returns 404 when error is from api', async () => {
            getResult.getResult.mockImplementation(()=>{
                return {
                    error:true,
                    resultArray:null
                }
            })
            await request(app).
                get('/api/rollnums?rollnums=1,2').
                expect(404)
        })

    })
})