var aws = require('aws-sdk');
var S3_BUCKET = 'resto-item-images';
var uuid = require('uuid/v1');
var itemModel;
var userModel;
var _ = require('lodash');
var models = require("../../database/models");
var s3 = require("../../config/s3");
setDatabase(models);


aws.config.update(s3.s3Config);


module.exports = {
  getS3UploadImageKey: getS3UploadImageKey,
  deleteImage: deleteImage
};

function setDatabase(m) {
  models = m;
  itemModel = models.getItemModel();
  userModel = models.getUserModel();
}

function getS3UploadImageKey(req, res) {
  var s3 = new aws.S3();
  userModel.findOne({where: {id: req.userId}, attributes: ["id", "s3BucketId"]}).then(function (user) {

     if (user.s3BucketId == "" || user.s3BucketId == null) {
      user.s3BucketId = uuid();
      user.save();
      var params = {
        Bucket: user.s3BucketId,
        ACL: 'public-read-write'
      };
      s3.createBucket(params, function (err, data) {
        var corsParams = {
          Bucket: user.s3BucketId,
          CORSConfiguration: {
            CORSRules: [
              {
                AllowedMethods: [
                  'GET', 'PUT', 'POST', 'DELETE'
                ],
                AllowedOrigins: [
                  '*'
                ],
                AllowedHeaders: [
                  '*'
                ]
              }
            ]
          }
        };
        if (err)
          console.log(err, err.stack);
        else {
          s3.putBucketCors(corsParams, function (err, data) {
            if (err) console.log(err, err.stack);
            else {
              getKey();
            }
          });
        }
      });
    }
    else {
      getKey();
    }

    function getKey() {

      var fileName = req.query['imageName'];
      var fileType = req.query['imageType'];
      var uuidGen = uuid();
      var s3Params = {
        Bucket: user.s3BucketId,
        Key: uuidGen,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
      };

      s3.getSignedUrl('putObject', s3Params, function (err, data) {
        if (err) {
          console.log(err);
          return res.end();
        }
        const returnData = {
          signedRequest: data,
          url: 'https://' + user.s3BucketId + '.s3.amazonaws.com/' + uuidGen
        };
        return res.json(returnData);
      });
    }


  });

}

function deleteImage(req, res) {
  userModel.findOne({where: {id: req.userId}, attributes: ["id", "s3BucketId"]}).then(function (user) {
    var s3 = new aws.S3();
    var s3Params = {
      Bucket: user.s3BucketId,
      Key: req.imageKey,
    };

    s3.deleteObject(s3Params, function (err, data) {
      if (err) console.log(err, err.stack);
    })
  });
}


function imageCleanUp() {
  var s3 = new aws.S3();
  var params = {
    Bucket: S3_BUCKET
  };
  s3.listObjectVersions(params, function(err, imagesUrls) {
    if (err) console.log(err, err.stack);
    if (!imagesUrls)
      return;
    itemModel.findAll().then(function (items) {
      var unlinkedItems = _.differenceWith(imagesUrls.Versions, items,
        function(imageUrl, item) {
          return 'https://resto-item-images.s3.amazonaws.com/' + imageUrl.Key == item.dataValues.imageUrl}
      )
      unlinkedItems.forEach(function (unlinkedItem) {
        var req = {imageKey: unlinkedItem.Key};
        deleteImage(req, {});
      })
    })
  });
}

imageCleanUp();
