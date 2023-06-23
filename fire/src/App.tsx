import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDropzone } from "react-dropzone";

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  // ファイルをドロップ → コンポーネントのonDropに定めたコールバックが呼び出される
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log("acceptedFiles:", acceptedFiles); // Fileオブジェクト（Fileリスト）
    console.log("acceptedFiles:", acceptedFiles[0].name);
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);
  // isDragActive: ファイルがドラッグされているかどうか判別する
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const resetFile = () => {
    setUploadedFile(null);
  };
  return (
    <div className="App relative flex h-screen items-center justify-center">
      <header className="l-header">
        <img src={logo} className="l-header__logo w-24" alt="logo" />
      </header>

      <section className="absolute mx-auto h-2/3 w-96 rounded-md bg-white p-10">
        <h1 className="absolute -bottom-20 -right-24 text-6xl text-white">
          File Fire
        </h1>
        <div className="l-form-area">
          <p className="mb-10 text-center tracking-wider">
            忘れたい過去やファイルをお焚き上げ
          </p>
          <div className="flex flex-wrap justify-center">
            {uploadedFile ? (
              <>
                <img
                  src="/img_file01.png"
                  alt=""
                  className="image02 absolute top-24 z-10 w-20"
                />
                <img
                  src="/img_fire01.png"
                  alt=""
                  className="image01 z-1 absolute top-40 w-40"
                />
              </>
            ) : (
              <div
                {...getRootProps()}
                className="l-upload-box mb-12 flex h-44 w-44 cursor-pointer flex-wrap items-center justify-center border-2 border-dotted border-gray-400 p-4"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-sm">ファイルをアップします</p>
                ) : (
                  <p className="text-center text-sm">
                    ドロップ
                    <br />
                    または
                    <br />
                    クリックして選択
                  </p>
                )}
              </div>
            )}
            {uploadedFile ? (
              <p className="mb-6 w-full text-center">{uploadedFile.name}</p>
            ) : (
              <p></p>
            )}
            <p
              className="absolute bottom-6 w-full cursor-pointer text-center text-sm text-blue-500 underline"
              onClick={resetFile}
            >
              着火しなおす
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
