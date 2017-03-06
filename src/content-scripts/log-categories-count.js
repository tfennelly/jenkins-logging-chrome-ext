// See https://jenkinsci.github.io/js-storage/StorageNamespace.html
const logging = require('@jenkins-cd/logging');
const message = require('./../messaging');

message.sendMessageToPanel('log.categories.count', {
  count: logging.getCategoriesStorageNS().count()
});
