const path = require('path');
const async = require('async'); 
const newman = require('newman');

const parametersForTestRun = {
  collection: path.join(__dirname, 'postman_collection.json'), // your collection
  environment: path.join(__dirname, 'postman_environment.json'), //your env
};

const parallelCollectionRun = (done) => {
  newman.run(parametersForTestRun, done);
};

const times = process.argv[2] ? +process.argv[2] : 1;
console.log('Running request ', times,' times');
let runArray = Array(times).fill(parallelCollectionRun);

async.parallel(runArray,
  (err, results) => {
    err && console.error(err);
    results.forEach((result) => {
      var failures = result.run.failures;
      console.info(failures.length ? JSON.stringify(failures.failures, null, 2) :
        `${result.collection.name} ran successfully.`);
    });
  });