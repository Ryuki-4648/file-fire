import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";

function App() {
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
  return (
    <div className="App relative flex h-screen items-center justify-center overflow-hidden">
      <header className="l-header">
        <h1>File Fire</h1>
      </header>
      <img
        src="/img_title01.png"
        className="l-header__logo absolute -bottom-6 right-2 w-72 md:-bottom-10 md:right-4 md:w-1/3"
        alt="タイトル"
      />
      <section className="c-box01 absolute mx-auto h-2/3 w-4/5 rounded-md bg-white px-6 py-12 md:w-96">
        <div className="">
          <p className="c-title01 absolute -top-6 left-0 mb-10 text-center text-xl font-bold tracking-wider text-white md:-top-7 md:text-2xl">
            忘れたい過去をお焚き上げ
          </p>
          <div className="flex flex-wrap justify-center">
            {uploadedFile ? (
              <>
                <div
                  className={
                    isFinished ? "hidden" : "flex flex-wrap justify-center"
                  }
                >
                  <img
                    src="/img_file01.png"
                    alt=""
                    className="image02 absolute top-12 z-10 w-32"
                  />
                  <img
                    src="/img_fire01.png"
                    alt=""
                    className="image01 z-1 absolute top-32 w-40"
                  />
                </div>
              </>
            ) : (
              <div
                {...getRootProps()}
                className="l-upload-box mb-12 flex h-44 w-44 cursor-pointer flex-wrap items-center justify-center border-2 border-dotted border-gray-400 p-4 hover:border-gray-800"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-center text-sm">アップ中...</p>
                ) : (
                  <p className="text-center text-sm leading-relaxed">
                    ファイルをドロップ
                    <br />
                    または
                    <br />
                    クリックして選択
                  </p>
                )}
              </div>
            )}
            {uploadedFile && (
              <div
                className={
                  isFinished
                    ? "hidden"
                    : "absolute bottom-16 mb-6 flex w-full justify-center"
                }
              >
                <p className="mr-2 text-xs md:text-sm">あなたの忘れたいもの</p>
                <p className="text-center text-xs md:text-sm">
                  {uploadedFile.name.split(".")[0]}
                </p>
              </div>
            )}
            <p
              className="c-reset-button text-md absolute bottom-12 w-full cursor-pointer text-center text-blue-500 underline duration-300 hover:text-blue-900"
              onClick={resetFile}
            >
              焚きなおす
            </p>
            {isFinished && <img src="/img_fire02.png" alt="燃えたあと" />}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
