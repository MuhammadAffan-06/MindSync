
const { handleUpload } = require('@vercel/blob/client');

const VALID_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const SHA256_REGEX = /^[0-9a-f]{64}\.(jpg|jpeg|png|webp)$/;

exports.getBlobUploadUrl = async (req, res) => {
  try {
    const result = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!SHA256_REGEX.test(pathname)) 
          throw new Error(`Invalid filename: "${pathname}". Must be a SHA-256 hex plus .${VALID_EXTENSIONS.join(", .")}`);
        
        if (pathname.includes("..") || pathname.includes("/")) 
          throw new Error("Invalid pathname.");
        
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          tokenPayload: JSON.stringify({ userId: req.user?.id }), 
          pathname,  // use exactly the client’s hash‑based filename
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload complete:", blob.pathname, blob.url);
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Blob upload error:", error);
    res.status(400).json({ message: error.message || "Failed to handle upload" });
  }
};
