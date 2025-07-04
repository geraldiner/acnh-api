async function BlobStores() {
  const response = await fetch("http://localhost:3000/api/blob-stores");
  const data = await response.json();
  return (
    <>
      <h1>Hello, Blob Stores!</h1>
      <section>
        <p>
          {response.status}
          {" "}
          {response.statusText}
        </p>
        {data && <p>{data.message}</p>}
      </section>
    </>
  );
}

export default BlobStores;
