import "./App.css";
import { useFileUpload } from "./hooks/fileUploadHooks";

function App() {
  const {
    uploadedFile,
    isFinished,
    getRootProps,
    getInputProps,
    isDragActive,
    resetFile,
  } = useFileUpload();
  return (
    <div className="App relative flex h-screen items-center justify-center overflow-hidden">
      <header className="l-header">
        <h1 className="absolute left-4 top-4 w-full text-xl tracking-widest text-white">
          File Fire
        </h1>
      </header>
      <img
        src="/img_title01.png"
        className="l-header__logo absolute -bottom-6 right-2 w-72 md:-bottom-10 md:right-4 md:w-1/3"
        alt="タイトル"
      />
      <section className="c-box01 absolute mx-auto h-2/3 w-4/5 rounded-md bg-white px-6 py-12 md:w-96">
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
                  alt="ファイル"
                  className="image02 absolute top-12 z-10 w-32"
                />
                <img
                  src="/img_fire01.png"
                  alt="焚き火"
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
          {isFinished && <img src="/img_fire02.png" alt="燃えたあとの焚き火" />}
        </div>
      </section>
    </div>
  );
}

export default App;
