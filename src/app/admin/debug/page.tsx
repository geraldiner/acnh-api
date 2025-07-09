import AudioPlayer from "@/components/audio-player";
import Button from "@/components/button";
import ImageTile from "@/components/image-tile";
import { formatRequestUrl } from "@/utils/env_utils";

function Debug() {
  return (
    <>
      <h1>This is an h1.</h1>
      <h2>This is an h2.</h2>
      <h3>This is an h3.</h3>
      <h4>This is an h4.</h4>
      <h5>This is an h5.</h5>
      <h6>This is an h6.</h6>
      <p>This is a paragraph.</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, illum. Officiis quaerat dolorum vel earum deserunt suscipit veniam distinctio similique eligendi quod velit dicta, quae odit, itaque repudiandae aut optio.</p>
      <section>
        <h2>Components</h2>
        <h3>Button</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <Button type="button" disabled={false}>This is a button</Button>
          <Button type="button" disabled={true}>This is a disabled button</Button>
        </div>
        <h3>AudioPlayer</h3>
        <div className="my-4">
          <AudioPlayer src={formatRequestUrl("netlify", "/api-v2/blobs/audio/mjk_Aloha.mp3")} />
        </div>
        <h3>ImageTile</h3>
        <div className="my-4">
          <ImageTile src={formatRequestUrl("netlify", "/api-v2/blobs/images/mjk_Aloha.png")} alt="mjk_Aloha.png" />
        </div>
      </section>

    </>
  );
}

export default Debug;
