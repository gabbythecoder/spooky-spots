import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";

export default async function PlacePage({ params }) {
  const myParams = await params;
  console.log(myParams);

  async function handleBooking(formData) {
    "use server";
    console.log(formData);
  }

  return (
    <>
      <h1>{myParams.place}</h1>

      <section>
        <h2>History:</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          fugiat atque laborum nam quibusdam ex sit delectus quis, aliquam
          voluptate in. Consequatur accusamus veritatis officia asperiores
          voluptatem ratione, ex odio.
        </p>
      </section>

      <section>
        <h1>
          Book:
          <form action={handleBooking}></form>
        </h1>
      </section>

      <section>
        <h2>Comments:</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          eligendi, voluptate velit sapiente quia natus eius quibusdam quasi
          quisquam saepe minima aspernatur officia accusantium mollitia
          similique ab totam, placeat nisi.
        </p>
      </section>
    </>
  );
}
