import multer from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
	destination: (req: Request, file, cb) => {
		if (file.fieldname === 'profilePicture') {
			cb(null, 'uploads/profile_pictures/');
		} else if (file.fieldname === 'image') {
			cb(null, 'uploads/post_images/');
		}
	},
	filename: (req: Request, file, cb) => {
		cb(null, `${(req as any).user._id}-${Date.now()}${path.extname(file.originalname)}`);
	},
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
	if (file.mimetype.startsWith('image/')) {
		cb(null, true);
	} else {
		cb(new Error('Only image files are allowed!'), false);
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 },
});

export { upload };
