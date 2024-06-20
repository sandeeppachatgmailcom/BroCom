import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import firebaseDB from "./config";
import { v4 } from "uuid";

const uploadPDF = async (pdfFile:any) => {
    const pdfRef = ref(firebaseDB, `/User/documents/${v4() + pdfFile.name}`);

    if (pdfFile) {
        try {
            await uploadBytes(pdfRef, pdfFile);
            const downloadUrl = await getDownloadURL(pdfRef);

            return downloadUrl;
        } catch (error) {
            throw error;
        }
    }

    throw new Error("No PDF file provided");
};

export default uploadPDF;