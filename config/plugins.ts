export default () => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-imagekit",
      providerOptions: {
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      },
    },
  },
});
