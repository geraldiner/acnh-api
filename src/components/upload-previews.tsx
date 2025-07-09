import { convertFileToBlobUrl } from "@/utils/file_utils";
import AudioPlayer from "./audio-player";
import ImageTile from "./image-tile";

type UploadPreviewsProps = {
  files: File[];
  type: string;
};

function UploadPreviews({ files, type }: UploadPreviewsProps) {
  if (!files || !files.length) {
    return <p>Upload files to see previews here.</p>;
  }
  return (
    <div>
      <h3>Previews</h3>
      <ul className="w-full flex flex-wrap gap-4 my-4">
        {files.map((file) => {
          return (
            <li key={`file-${file.name}`} className="inline-block">
              {type === "image"
                ? (
                    <ImageTile
                      alt={file.name}
                      src={convertFileToBlobUrl(file)}
                      widthClassName="w-24"
                    />
                  )
                : (
                    <>
                      <p>{file.name}</p>
                      <AudioPlayer src={convertFileToBlobUrl(file)} />
                    </>
                  )}
            </li>
          );
        })}
      </ul>
    </div>

  );
}

export default UploadPreviews;
