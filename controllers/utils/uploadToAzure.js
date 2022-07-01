const storage = require("@azure/storage-blob");
const resolve = require("path").resolve;

/**
 *
 * @param {e.Request} req
 */
module.exports = async (req, containerName = "stories") => {
	const accountName = process.env.STORAGE_NAME;
	const key = process.env.CLOUD_KEY;
	const certs = new storage.StorageSharedKeyCredential(
		accountName,
		key
	);
	const blobServiceClient = new storage.BlobServiceClient(
		`https://${accountName}.blob.core.windows.net`,
		certs
	);
	const client = blobServiceClient.getContainerClient(containerName);
	const newBlobBlock = client.getBlockBlobClient(req.file.filename);
	await newBlobBlock.uploadFile(
		resolve(__dirname + "/../../temp-storage") +
			"/" +
			req.file.filename
	);
};
