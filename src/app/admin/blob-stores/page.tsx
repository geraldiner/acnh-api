async function BlobStores() {
  const response = await fetch("http://localhost:3000/api/blob-stores");
  const data = await response.json();

  return (
    <>
      <h1>Hello, Blob Stores!</h1>
      <section>
        <h2>Response info</h2>
        <p>
          {response.status}
          {" "}
          {response.statusText}
        </p>
      </section>
      {data && (
        <section>
          <h2>JSON data</h2>
          <p>
            Message:
            {" "}
            {data.message}
          </p>
          <p>
            Stores:
            {" "}
            {data.stores.join(", ")}
          </p>
        </section>
      )}

      <section>
        <h2>Blob Actions</h2>
      </section>
    </>

  );
}

export default BlobStores;
