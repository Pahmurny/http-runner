const path = require('path');
const async = require('async');
const newman = require('newman');
const axios = require('axios');

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
    return axios.post(url, newBody, {  })
      .then(res => console.log('Axios success: ', i))
      .catch((error) => console.log('Axios error', error.message) );
  };
  reqArray.push(parallelCollectionRun);
}

async.parallel(reqArray,
  (err, results) => {
    err && console.error(err);
  });
