import { GraphQLClient, gql } from "graphql-request";
import Blog from "./blog";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Form from "../components/form";

export const getStaticProps = async () => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.Space_ID}`;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.CDA_Token}`,
    },
  });

  const Productquery = gql`
    {
      landingPageCollection {
        items {
          header
          subHeader
        }
      }
      postCollection {
        items {
          title
          slug
          description
          logo {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
        }
      }
    }
  `;

  const product = await graphQLClient.request(Productquery);
  console.log(product);
  return {
    props: { product },
  };
};

export default function Home({ product }) {
  return (
    <div className="font-sans text-gray-900 h-full">
      <header className="absolute top-0 left-0 w-full py-4">
        <div className="flex items-center justify-between px-8">
          <span className="text-2xl tracking-tighter font-semibold">
            Egghead-Demo
          </span>
          <div className="">
            <div className="flex items-center">
              <a
                className="text-lg leading-normal text-blue-500 hover:text-blue-600 no-underline ml-8"
                href="#"
              >
                Home
              </a>
              <a
                className="text-lg leading-normal text-blue-500 hover:text-blue-600 no-underline ml-8"
                href="#"
              >
                Products
              </a>
              <a
                className="text-lg leading-normal text-blue-500 hover:text-blue-600 no-underline ml-8"
                href="#"
              >
                Docs
              </a>
            </div>
          </div>
        </div>
      </header>
      {/* <Blog/> */}

      <section className="bg-blue-100 h-full py-8">
        <div className="w-5/6 max-w-lg ml-auto mr-auto h-full">
          <div className="flex items-center justify-center text-center h-full">
            <div>
              <h1 className="text-4xl sm:text-5xl font-semibold leading-none tracking-tighter mb-4">
                {product.landingPageCollection.items[0].header}
              </h1>
              <h2 className="text-2xl sm:text-3xl text-blue-800 opacity-75 font-normal leading-tight mb-8">
                {product.landingPageCollection.items[0].subHeader}
              </h2>

              <Link href="/blog">
                <a className="flex flex-col sm:flex-row justify-center pt-8">
                  <button className="bg-blue-500 hover:bg-blue-600 text-2xl leading-none text-white font-semibold h-12 px-8 rounded-full whitespace-no-wrap mb-2 sm:mb-0 sm:mr-2">
                    Get started
                  </button>
                  <button className="bg-transparent text-2xl leading-none text-blue-500 font-semibold hover:text-blue-600 h-12 px-8 border border-blue-200 hover:border-blue-400 rounded-full whitespace-no-wrap mt-2 sm:mt-0 sm:ml-2">
                    Learn more
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {product.postCollection.items.map((place) => (
        <div key= {place.slug}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div></div>
              <u>
                <h1>{place.title}</h1>
              </u>
              <h3>{place.description}</h3>
            </div>
          </div>
        </div>
      ))}

     <Form/>
    </div>
  );
}
