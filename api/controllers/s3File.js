var aws = require('aws-sdk');
var S3_BUCKET = 'resto-item-images';
var uuid = require('node-uuid');

aws.config.update({
  accessKeyId: 'AKIAIEQO625YFT5PBZ3A',
  secretAccessKey: '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',
  region: 'us-east-1'
});


module.exports = {
  getS3UploadImageKey: getS3UploadImageKey,
  deleteImage: deleteImage
};


function getS3UploadImageKey(req, res) {
  var s3 = new aws.S3();
  var fileName = req.query['imageName'];
  var fileType = req.query['imageType'];
  var uuidGen = uuid.v4();
  var s3Params = {
    Bucket: S3_BUCKET,
    Key: uuidGen,
    Expires: 60,
    ContentType: 'image/png',
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, function (err, data) {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
        signedRequest: data,
        url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + uuidGen
      };
    return res.json(returnData);
  });
}

function deleteImage(req, res) {
  var s3 = new aws.S3();
  var s3Params = {
    Bucket: S3_BUCKET,
    Key: req.imageKey,
  };

  s3.deleteObject(s3Params, function(err, data) {
    if (err) console.log(err, err.stack);
  })
}
