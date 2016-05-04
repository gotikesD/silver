'use strict';

const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const config = require('../config');
const CarItem = require('../models/carsItem');

mongoose.connect(config.database);

let errorsCount = 0;
let totalCount = 0;

fs.createReadStream('./data/initialData.csv')
    .pipe(csv())
    .on('data',(data) => {
        let current = {};
        current.stockId = data['Stock##'];
        current.VINCode = data.VIN;
        current.make = data.Make;
        current.model = data.Model;
        current.color = data.Color;
        current.retailPrice = data.RtlPri;
        current.askPrice = data.AskPri;
        current.internationalPrice = data.ItnPti;
        current.year = data.YR;
        current.mileage = data.Mileag;

        data.N === 'N' ? current.carState = 'New' : current.carState = 'Used';
        data.Transmissi.length > 0 ? current.transmissionType = data.Transmissi :
                                     current.transmissionType = 'Manual';

        current.entryData = data['Entry Da'];
        current.cost = data.Cost;

        let item = new CarItem(current);

        item.save()
                .then( () => {
                      totalCount++;
                })
               .catch(err => {
                       errorsCount++;
                       console.log(err.errors)
               } )

            totalCount++

    })
    .on('end', () => {
       console.log('Total quantity ' + (totalCount - errorsCount));
       console.log('Errors ' + errorsCount)

    });
