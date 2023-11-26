import { firestore } from "./firebaseConfic";
import {
  addDoc,
  collection,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { toast } from "react-toastify";

import { storage } from "./firebaseConfic";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const datasRef = collection(firestore, "datas");

export const postExcelData = async (object: object) => {
  addDoc(datasRef, object)
    .then(() => {
      console.log("Success");
      toast.success("Document status updated successfully");
    })
    .catch(() => {
      console.log("Error");
      toast.error("Error in uploading");
    });
};

export const getExcelDatas = async (setGetFile: any) => {
  onSnapshot(datasRef, (response) => {
    setGetFile(
      response.docs.map((docs: DocumentData) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const uploadFileAPI = (file: any, setFileURL: any) => {
  const excelSheets = ref(storage, `ExcelFiles/${file.name}`);
  const uploadTask = uploadBytesResumable(excelSheets, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = `${Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )}`;
      console.log(progress);
    },
    (error) => {
      console.log("Uploading Image error", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((res) => {
        setFileURL(res);
      });
    }
  );
};
