const path = require('path');
const async = require('async');
const newman = require('newman');
const axios = require('axios');

// const parametersForTestRun = {
//   collection: path.join(__dirname, 'postman_collection.json'), // your collection
//   environment: path.join(__dirname, 'postman_environment.json'), //your env
// };
// console.log(parametersForTestRun);
// const parallelCollectionRun = (done) => {
//   newman.run(parametersForTestRun, done);
// };

// const times = process.argv[2] ? +process.argv[2] : 1;
// console.log('Running request ', times,' times');
/*
let runArray = Array(times).fill(parallelCollectionRun);

async.parallel(runArray,
  (err, results) => {
    err && console.error(err);
    results.forEach((result) => {
      let failures = result.run.failures;
      // console.log(result.run.executions[0].response);
      console.info(failures.length ? JSON.stringify(failures.failures, null, 2) :
        `${result.collection.name} ran successfully.`);
    });
  });
  */
const times = process.argv[2] ? +process.argv[2] : 1;
const url = 'https://touchcr-api-dev.herokuapp.com/api/v1/orders/createguest';
const productPrice = 106;
let bodyCreateOrder = {
  products: [
    {
      productId: "01t41000001atkUAAQ",
      count: 1,
    }
  ],
  bumpoffers: [],
  variants: [],
  orderTotal: 106,
  accDetails:
    {
      "firstName": "StressTester",
      "lastName": "Stress",
      "phone": "7894561235",
      "shippingAddress":
        {
          "country": "United States",
          "state": "Mississippi",
          "city": "CityName",
          "street": "StreetName",
          "postal": "789456"
        },
      "billingAddress": {},
      "email": "stresstester9001@gmail.com"
    },
  "cardDetails":
    {
      "CCV": "789",
      "exp_year": "2023",
      "exp_month": "3",
      "Number": "4242424242424242"
    },
  "orderSource": "Cart",
  "orderType": "standard"
}
let reqArray = [];
for (let i = 0; i < times; i++){
  let newBody = JSON.parse(JSON.stringify(bodyCreateOrder));
  newBody.products[0].count = i+1;
  newBody.orderTotal = (i+1) * productPrice;
  newBody.accDetails.email = `stresstesterapi${i}@gmail.com`;
  const parallelCollectionRun = (done) => {
    // console.log('url', url);
    // console.log('body', newBody);
    return axios.post(url, newBody, {  })
      .then(res => console.log('Axios success: ', i))
      .catch((error) => console.log('Axios error', error.message) );
  };
  reqArray.push(parallelCollectionRun);
}

async.parallel(reqArray,
  (err, results) => {
    // console.log(results);
    err && console.error(err);
    results.forEach((result) => {
      console.log(result);
      // let failures = result.run.failures;
      // console.log(result.run.executions[0].response);
      // console.info(failures.length ? JSON.stringify(failures.failures, null, 2) :
      //   `${result.collection.name} ran successfully.`);
    });
  });
  // .catch((error) => {
  //   console.log('Paralel error', error.message);
  // })