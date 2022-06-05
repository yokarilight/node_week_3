const httpStatusCodes = require('../constants/statusCode');
const Post = require('../models/postModel');
const successHandle = require('../utils/successHandler');
const errorHandle = require('../utils/errorHandler');

const posts = {
	getPosts: async (res) => {
		const allPosts = await Post.find();
		successHandle(res, allPosts);
	},
	getSinglePost: async (req, res) => {
		try {
			const { id } = req.params;
			const targetPost = await Post.findById(id);
			successHandle(res, targetPost);
		} catch (err) {
			errorHandle(res, err, httpStatusCodes.BAD_REQUEST);
		}
	},
	createSinglePost: async (req, res) => {
		try {
			const data = req.body;
			if (!data || !Object.values(data).length) {
				throw Error('invalid data!');
			}
			const newPost = await Post.create(data);
			successHandle(res, newPost);
		} catch (err) {
			errorHandle(res, err, httpStatusCodes.BAD_REQUEST);
		}
	},
	editSinglePost: async (req, res) => {
		try {
			const { id } = req.params;
			const data = req.body;
			if (!data || !Object.values(data).length) {
				throw Error('invalid data!');
			}
			const editPost = await Post.findByIdAndUpdate(id, data, { new: true });
			if (editPost === null) {
				throw Error('cannot find post');
			}
			successHandle(res, editPost);
		} catch (err) {
			errorHandle(res, err, httpStatusCodes.BAD_REQUEST);
		}
	},
	deleteAllPosts: async (res) => {
		try {
			await Post.deleteMany();
			successHandle(res, []);
		} catch (err) {
			errorHandle(res, err, httpStatusCodes.BAD_REQUEST);
		}
	},
	deleteSinglePost: async (req, res) => {
		try {
			const { id } = req.params;
			await Post.findByIdAndDelete(id);
			const allPosts = await Post.find();
			successHandle(res, allPosts);
		} catch (err) {
			errorHandle(res, err, httpStatusCodes.BAD_REQUEST);
		}
	},
}

module.exports = posts;
