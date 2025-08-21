import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path'

export default function uploadAWS(){
    const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS,
        region: "?"
    });
    const storage = multerS3({
        s3: s3,
        bucket: "?",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'private', 
        key: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            const filePath = `${filename}`;
            req.filenames.push(filePath);
            console.log(req.filenames)
            cb(null, filePath);
        }
    });
    const fileFilter = function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            return res.status(400).send({validationErrors:[{msg:"File must be png,jpg or jpeg."}]});
        }
    };
    const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: 1024 * 1024 * 10 } 
    });
    return upload
}
