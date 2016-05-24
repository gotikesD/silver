'use strict';

const fs = require(`fs`);
const csv = require(`csv-parser`);
const mongoose = require(`mongoose`);
const config = require(`../config/index`);
const CarItem = require(`../models/carsItem`);


mongoose.connect(config.database);

let errorsCount = 0;
let totalCount = 0;

fs.createReadStream(`../data/initialData.csv`)
  .pipe(csv())
  .on(`data`, (chunk) => {
    const current = {};
    current.stockId = chunk[`Stock##`];
    current.VINCode = chunk.VIN;
    current.make = chunk.Make;
    current.model = chunk.Model;
    current.color = chunk.Color;
    current.retailPrice = chunk.RtlPri;
    current.askPrice = chunk.AskPri;
    current.internationalPrice = chunk.ItnPti;
    current.year = chunk.YR;
    current.mileage = chunk.Mileag;

    chunk.N === `N` ? current.carState = `New` : current.carState = `Used`;
    chunk.Transmissi.length > 0 ? current.transmissionType = chunk.Transmissi :
      current.transmissionType = `Manual`;

    current.entryData = chunk[`Entry Da`];
    current.cost = chunk.Cost.split(`.`)[0].slice(-2);

    const item = new CarItem(current);

    item.save()
      .then(() => {
        totalCount++;
      })

      .catch(error => {
        errorsCount++;
      });
    totalCount++
  })
  .on(`end`, () => {
    console.log(`Total quantity  ${(totalCount - errorsCount)}`);
    console.log(`Errors  ${errorsCount}`)

  });
