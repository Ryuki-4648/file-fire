import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export const useFileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  // ファイルをドロップ → コンポーネントのonDropに定めたコールバックが呼び出される
  const onDrop = useCallback((uploadedFile: any) => {
    console.log("uploadedFile:", uploadedFile); // Fileオブジェクト（Fileリスト）
    console.log("uploadedFile:", uploadedFile[0].name.split(".")[0]);
    if (uploadedFile.length > 0) {
      setUploadedFile(uploadedFile[0]);
      setIsFinished(false);
      setTimeout(() => {
        setIsFinished(true);
      }, 10000);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop }); // isDragActive: ファイルがドラッグされているかどうか判別する
  const resetFile = () => {
    setUploadedFile(null);
    setIsFinished(false);
  };
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    // タイマーが存在する場合はアンマウント時にクリアする
    if (isFinished) {
      timer = setTimeout(() => {
        setUploadedFile(null);
        setIsFinished(false);
      }, 10000);
    }

    return () => {
      // コンポーネントのアンマウント時にタイマーをクリア
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isFinished]);
  return {
    getRootProps,
    getInputProps,
    uploadedFile,
    isDragActive,
    isFinished,
    resetFile,
  };
};
