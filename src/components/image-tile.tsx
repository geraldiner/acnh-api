import clsx from "clsx";
import Image from "next/image";

type ImageTileProps = {
  alt: string;
  src: string;
  widthClassName?: string;
};

function ImageTile({ alt, src, widthClassName = "w-64" }: ImageTileProps) {
  if (!alt || !src) {
    return null;
  }
  return (
    <div className={clsx(widthClassName)}>
      <Image
        className="!static w-full h-auto rounded-sm"
        alt={alt}
        src={src}
        fill={true}
      />
    </div>
  );
}

export default ImageTile;
