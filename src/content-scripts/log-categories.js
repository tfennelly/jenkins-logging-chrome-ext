// See https://jenkinsci.github.io/js-storage/StorageNamespace.html
const logging = require('@jenkins-cd/logging');
const message = require('./../messaging');

const categories = [];
logging.getCategoriesStorageNS().iterate(function (category, logLevel) {
  categories.push({
    category: category,
    logLevel: logLevel
  });
});

message.sendMessageToPanel('log.categories', {
  count: categories.length,
  categories: categories
});
