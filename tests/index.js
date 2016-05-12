'use strict';
const supertest = require("supertest");
const should = require("should");

const server = supertest.agent("http://localhost:3000");


const CAR = '57344fc4d94982eb1d19a009';
const FAKE_CAR = '5733109a22244b5e88d1893e';
const ORDER_ID = '573200d6f16569125475c10e';
const FAKE_ORDER_ID = '443200d6f16569125475c10e';
const USER_ID = '573194ccd146638f11967807';
const FAKE_USER_ID = '573194ccd146638f61967807';

const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImNyZWF0ZWRBdCI6ImluaXQiLCJydWxlcyI6ImluaXQiLCJzZW5kT3JkZXJzIjoiaW5pdCIsIm93bkNhcnMiOiJpbml0IiwiX192IjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInN1ck5hbWUiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwicnVsZXMiOnRydWUsInNlbmRPcmRlcnMiOnRydWUsIm93bkNhcnMiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwic3VyTmFtZSI6dHJ1ZSwibmFtZSI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7ImNyZWF0ZWRBdCI6IjIwMTYtMDUtMTBUMTI6MjI6NTMuNTk0WiIsInJ1bGVzIjoiQWRtaW4iLCJzZW5kT3JkZXJzIjowLCJvd25DYXJzIjpbXSwiX192IjowLCJwYXNzd29yZCI6IiQyYSQxMCRTQkd0a0NoWFlRSGo2RzlRWmdCYm1ldUV3U1pUUkdpY1VRZmdTT1hEa3pObTMwUXRkTUE4QyIsImVtYWlsIjoiYWRtaW5AbWFpbC5ydSIsInN1ck5hbWUiOiJBZG1pbiIsIm5hbWUiOiJBZG1pbiIsIl9pZCI6IjU3MzFkMmMyYTdkNGMwYTUzN2QxMjRjZCJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ2MzA0NjM3NH0.RpTWRPUAJ87Ow35Pjxhl-wiItzM4PK8XG3XNJwgAgW4';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImNyZWF0ZWRBdCI6ImluaXQiLCJydWxlcyI6ImluaXQiLCJzZW5kT3JkZXJzIjoiaW5pdCIsIm93bkNhcnMiOiJpbml0IiwiX192IjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInN1ck5hbWUiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwicnVsZXMiOnRydWUsInNlbmRPcmRlcnMiOnRydWUsIm93bkNhcnMiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwic3VyTmFtZSI6dHJ1ZSwibmFtZSI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7ImNyZWF0ZWRBdCI6IjIwMTYtMDUtMTBUMDc6NTg6MjAuMDc5WiIsInJ1bGVzIjoiQWR2YW5jZWQiLCJzZW5kT3JkZXJzIjo1OSwib3duQ2FycyI6W251bGwsIjIwMjAyMyJdLCJfX3YiOjAsInBhc3N3b3JkIjoiJDJhJDEwJEw3a2hHZy92OVFwczJzcE9LeHRUcmVpL2F4aHZpaXZmLjcxNFBKWmQxaWNETFhYWFVxVk5hIiwiZW1haWwiOiJ0ZXN0M0BtYWlsLnJ1Iiwic3VyTmFtZSI6IlRlc3QzIiwibmFtZSI6IlRlc3QzIiwiX2lkIjoiNTczMTk0Y2NkMTQ2NjM4ZjExOTY3ODA3In0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDYzMDM5NjQ2fQ.k-Y_0ImO4LYh6Gpc_RR82zfDdMEy5PL4V-kuY2X4fwU';
describe("For not logged users ",() =>{

    it("Just a simple home request ",(done) => {
        server
            .get("/")
            .end(function(err,res){

                res.body.should.be.instanceOf(Array);
                res.status.should.equal(200);
                done();
            });
    });

    it("Request for getting single car info ",(done) => {
        server
            .get("/cars/" + CAR)
            .end(function(err,res){
                res.body.should.have.property('_id');
                res.body.should.have.property('createdAt');
                res.body.should.have.property('stockId');
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(200);
                done();
            });
    });

    it("Request for getting FAKE car info ",(done) => {
        server
            .get("/cars/" + FAKE_CAR)
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });

    //for every new run of  this test need to change email

    //it("Request for  singing up",(done) => {
    //
    //    let body = {
    //        name : 'FAKE' ,
    //        surName : 'FAKE',
    //        email : 'fake112@fake.ru',
    //        password : 'password',
    //        dateOfBirth : 10-10-1990
    //    };
    //    server
    //        .post("/auth/sign")
    //        .send(body)
    //        .end(function(err,res){
    //            res.body.should.have.property('_id');
    //            res.body.should.have.property('createdAt');
    //            res.body.should.have.property('email');
    //            res.body.should.be.instanceOf(Object);
    //            res.status.should.equal(200);
    //            done();
    //        });
    //});


    it("Request for  singing up with the same email!",(done) => {
        let body = {
            name : 'FAKE' ,
            surName : 'FAKE',
            email : 'fake@fake.ru',
            password : 'password',
            dateOfBirth : 10-10-1990
        };
        server
            .post("/auth/sign")
            .send(body)
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });


    it("Request for  singing up with the BAD EMAIL!",(done) => {
        let body = {
            name : 'FAKE' ,
            surName : 'FAKE',
            email : 'fakefake.ru',
            password : 'password',
            dateOfBirth : 10-10-1990
        };
        server
            .post("/auth/sign")
            .send(body)
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });


    it("Request for  LOGIN IN",(done) => {
        let body = {
            email : 'test3@mail.ru',
            password : 'password'
        };
        server
            .post("/auth/login")
            .send(body)
            .end(function(err,res){
                res.body.should.be.type('string');
                res.body.should.be.not.empty();
                res.status.should.equal(200);
                done();
            });
    });

    it("Request for  LOGIN with fake data ",(done) => {
        let body = {
            email : 'xxxxx@mail.ru',
            password : 'password'
        };
        server
            .post("/auth/login")
            .send(body)
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });

});


describe("For logged users with SIMPLE rules ",() =>{

    it("Request for  ADD item into basket",(done) => {
        let body = {
            stockId : '123456'
        };
        server
            .post("/cart")
            .set({ 'x-access-token' : TOKEN})
            .send(body)
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.be.not.empty();
                res.status.should.equal(200);
                done();
            });
    });


    it("Request for  ADD item into basket WITHOUT stockId",(done) => {
        server
            .post("/cart")
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'UserId,StockId required' });
                res.status.should.equal(404);
                done();
            });
    });

    it("Request for  DELETE item from the basket",(done) => {
        server
            .delete("/cart/" + ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
            .send({stockId : 1010})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(200);
                done();
            });
    });

    it("Request for  DELETE item fake Order Id",(done) => {
        server
            .delete("/cart/" + FAKE_ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
            .send({stockId : 1010})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                res.body.should.eql({ message: 'Not Found' });
                done();
            });
    });


    it("Request for  Update item amount in the  the basket",(done) => {
        server
            .put("/cart/" + ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
            .send({stockId : 1010 , amount : 10})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(200);
                done();
            });
    });


    it("Request for  Update item in the  the basket without amount",(done) => {
        server
            .put("/cart/" + ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
            .send({stockId : 1010 })
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });


    it("Request for view user own order",(done) => {
        server
            .get("/cart/view/" + ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('userId');
                res.body.should.have.property('status');
                res.body.should.have.property('items');
                res.status.should.equal(200);
                done();
            });
    });


    it("Request for view user own order with fake ORDER_ID",(done) => {
        server
            .get("/cart/view/" + FAKE_ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                res.body.should.be.not.empty();
                res.body.should.eql({ message: 'Not Found' });
                done();
            });
    });


    it("Request to confirming user order",(done) => {
        server
            .post("/cart/confirm/" + ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.have.length(24);
                res.status.should.equal(200);
                done();
            });
    });


    it("Request to confirming user order with FAKE ORDER_ID",(done) => {
        server
            .get("/cart/confirm/" + FAKE_ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });

    //for every new run of  this test need to change stockId

    //it("Request to ADD new car into DB. User become advanced",(done) => {
    //    let body = {
    //        stockId : '202021',
    //        color : 'White',
    //        model : 'Tesla',
    //        made : 'Tesla'
    //    };
    //    server
    //        .post("/cars/")
    //        .send(body)
    //        .set({ 'x-access-token' : TOKEN})
    //        .end(function(err,res){
    //            res.body.should.be.instanceOf(Object);
    //            res.body.should.have.property('stockId');
    //            res.body.should.have.property('bought');
    //            res.body.should.have.property('amount');
    //            res.status.should.equal(200);
    //            done();
    //        });
    //});


    it("Request to ADD new car into DB without stockId",(done) => {
        let body = {
            color : 'White',
            model : 'Tesla',
            made : 'Tesla'
        };
        server
            .post("/cars/")
            .send(body)
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });

});



describe("For logged users with ADVANCED rules ",() =>{

    it("Deleting user own car from DB",(done) => {
        server
            .delete("/advanced/cars/")
            .send({ stockId: '202020'})
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('answer');
                res.status.should.equal(200);
                done();
            });
    });


    it("Here i gonna try delete a car, which is not user own",(done) => {

        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImNyZWF0ZWRBdCI6ImluaXQiLCJydWxlcyI6ImluaXQiLCJzZW5kT3JkZXJzIjoiaW5pdCIsIm93bkNhcnMiOiJpbml0IiwiX192IjoiaW5pdCIsImRhdGVPZkJpcnRoIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInN1ck5hbWUiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwicnVsZXMiOnRydWUsInNlbmRPcmRlcnMiOnRydWUsIm93bkNhcnMiOnRydWUsImRhdGVPZkJpcnRoIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiZW1haWwiOnRydWUsInN1ck5hbWUiOnRydWUsIm5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJjcmVhdGVkQXQiOiIyMDE2LTA1LTExVDEyOjI0OjM0LjI4MVoiLCJydWxlcyI6IlNpbXBsZSIsInNlbmRPcmRlcnMiOjAsIm93bkNhcnMiOltdLCJfX3YiOjAsImRhdGVPZkJpcnRoIjoiMTk2OS0xMi0zMVQyMzo1OTo1OC4wMTBaIiwicGFzc3dvcmQiOiIkMmEkMTAkVHdoMHJsWG1ad1V0OFlZYnYxbEpGTzdMbi81ekhYWGJLTDRyVzdvSXg5bTh0Qm5LQVZUc0siLCJlbWFpbCI6ImZha2UxMTJAZmFrZS5ydSIsInN1ck5hbWUiOiJGQUtFIiwibmFtZSI6IkZBS0UiLCJfaWQiOiI1NzMzMmE5Mjg2MjQzZTY0NzAyMTY3MGEifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W119LCJpYXQiOjE0NjMwMzkxNzl9.WUrxUwSSJcwz9lIPmGZrz1U-hjHTGH-voU0muMkyf4s';

        server
            .delete("/advanced/cars/")
            .send({ stockId: '202023'})
            .set({ 'x-access-token' : token})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(403);
                done();
            });
    });

    it("Updating user own car from DB",(done) => {
        server
            .put("/advanced/cars/")
            .send({ stockId: '202023', color : 'GreatColor'})
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('_id');
                res.body.should.have.property('stockId');
                res.status.should.equal(200);
                done();
            });
    });

    it("Here i gonna try Update a car, which is not user own",(done) => {

        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImNyZWF0ZWRBdCI6ImluaXQiLCJydWxlcyI6ImluaXQiLCJzZW5kT3JkZXJzIjoiaW5pdCIsIm93bkNhcnMiOiJpbml0IiwiX192IjoiaW5pdCIsImRhdGVPZkJpcnRoIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInN1ck5hbWUiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwicnVsZXMiOnRydWUsInNlbmRPcmRlcnMiOnRydWUsIm93bkNhcnMiOnRydWUsImRhdGVPZkJpcnRoIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiZW1haWwiOnRydWUsInN1ck5hbWUiOnRydWUsIm5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJjcmVhdGVkQXQiOiIyMDE2LTA1LTExVDEyOjI0OjM0LjI4MVoiLCJydWxlcyI6IlNpbXBsZSIsInNlbmRPcmRlcnMiOjAsIm93bkNhcnMiOltdLCJfX3YiOjAsImRhdGVPZkJpcnRoIjoiMTk2OS0xMi0zMVQyMzo1OTo1OC4wMTBaIiwicGFzc3dvcmQiOiIkMmEkMTAkVHdoMHJsWG1ad1V0OFlZYnYxbEpGTzdMbi81ekhYWGJLTDRyVzdvSXg5bTh0Qm5LQVZUc0siLCJlbWFpbCI6ImZha2UxMTJAZmFrZS5ydSIsInN1ck5hbWUiOiJGQUtFIiwibmFtZSI6IkZBS0UiLCJfaWQiOiI1NzMzMmE5Mjg2MjQzZTY0NzAyMTY3MGEifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W119LCJpYXQiOjE0NjMwMzkxNzl9.WUrxUwSSJcwz9lIPmGZrz1U-hjHTGH-voU0muMkyf4s';

        server
            .put("/advanced/cars/")
            .send({ stockId: '202023' , model : 'NewModel'})
            .set({ 'x-access-token' : token})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(403);
                done();
            });
    });


    it("Get list of all users cars",(done) => {
        server
            .get("/advanced/cars/")
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Array);
                res.status.should.equal(200);
                done();
            });
    });


    it("Get list of all users cars without token",(done) => {
        server
            .get("/advanced/cars/")
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'Token not found' });
                res.status.should.equal(404);
                done();
            });
    });

    it("Get list of a single  user car",(done) => {
        server
            .get("/advanced/cars/" + CAR )
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(200);
                done();
            });
    });

    it("Get list of a single  user car, which is not been in the usersOwn list",(done) => {
        server
            .get("/advanced/cars/" + FAKE_CAR )
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'This car is not your' });
                res.status.should.equal(404);
                done();
            });
    });

});


describe("For logged users with ADMIN rules ",() =>{

    it("Get list all users",(done) => {
        server
            .get("/admin/users")
            .set({ 'x-access-token' : ADMIN_TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Array);
                res.status.should.equal(200);
                done();
            });
    });

    it("Get list all users with the simple user token ",(done) => {
        server
            .get("/admin/users")
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'Permission denied' });
                res.status.should.equal(403);
                done();
            });
    });


    it("Get info of a single user ",(done) => {
        server
            .get("/admin/users/" + USER_ID)
            .set({ 'x-access-token' : ADMIN_TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('name');
                res.body.should.have.property('surName');
                res.body.should.have.property('email');
                res.body.should.have.property('ownCars');
                res.body.should.have.property('rules');
                res.status.should.equal(200);
                done();
            });
    });


    it("Get info of a single user with fake user Id ",(done) => {
        server
            .get("/admin/users/" + FAKE_USER_ID)
            .set({ 'x-access-token' : ADMIN_TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'User not found' });
                res.status.should.equal(404);
                done();
            });
    });


    it("Get list of top 5 sold cars",(done) => {
        server
            .get("/admin/topCars")
            .set({ 'x-access-token' : ADMIN_TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Array).and.have.length(5);
                res.status.should.equal(200);
                done();
            });
    });


    it("Get list of top 5 sold cars with the simple user token ",(done) => {
        server
            .get("/admin/topCars")
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'Permission denied' });
                res.status.should.equal(403);
                done();
            });
    });


    it("Get list of top 5 users",(done) => {
        server
            .get("/admin/topUsers")
            .set({ 'x-access-token' : ADMIN_TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Array).and.have.length(5);
                res.status.should.equal(200);
                done();
            });
    });


    it("Get list of top 5 users with the simple user token ",(done) => {
        server
            .get("/admin/topCars")
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'Permission denied' });
                res.status.should.equal(403);
                done();
            });
    });


    it("Get info about all last week orders",(done) => {
        server
            .get("/admin/lastOrders")
            .set({ 'x-access-token' : ADMIN_TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Array).and.have.length(7);
                res.status.should.equal(200);
                done();
            });
    });


    it("Get info about all last week orders with the simple user token ",(done) => {
        server
            .get("/admin/topCars")
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'Permission denied' });
                res.status.should.equal(403);
                done();
            });
    });

});