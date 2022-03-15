import BusBoy from "busboy";

export default function MultiPartService(Request, FileStorageService) {
  return new Promise((resolve, reject) => {
    const headers = Request.headers;
    const busboy = BusBoy({ headers });

    busboy.on("error", (err) => reject(err));

    busboy.on("file", async (fieldName, fileStream) => {
      await FileStorageService.SaveFile(fileStream, fieldName).then((data) => {
        resolve({ url: data.Location });
      });
    });

    Request.pipe(busboy);
  });
}
