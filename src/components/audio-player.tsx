type AudioPlayerProps = {
  src: string;
  mimeType?: string;
};

function AudioPlayer({ src }: AudioPlayerProps) {
  if (!src) {
    return null;
  }

  return (
    <audio src={src} controls></audio>
  );
}

export default AudioPlayer;
