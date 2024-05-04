import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useLoaderData,
  useRouteError,
} from "react-router-dom";

const Main = () => {
  const data = useLoaderData();
  return (
    <div>
      <ul className="d-flex flex-column mt-3">
        {data.map((item) => {
          const name = item.name?.common || item.name?.official
          return (
            <Link
              to={`country/${name}`}
              key={item.area + name}
              className="pt-2 text-decoration-none text-reset "
            >
              <div className="p-6">
                <h2 className="fw-light">{name}</h2>
              </div>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

const CountryCard = () => {
  const [country] = useLoaderData();
  return (
    <div>
      <div className="d-flex position-absolute top-50 start-50 translate-middle shadow p-5 w-50">
        <div>
          <img
            className="me-4 mt-4 img-thumbnail"
            src={country.flags?.png}
            alt={`Flag of ${country.name?.common}`}
          />
        </div>
        <div className="p-8">
          <div className="mt-2 fs-3">
            {country.name?.common}
          </div>
          <p className="mt-2 fs-3">{country.name?.official}</p>
          <p className="mt-2 fs-3">{country.region}</p>
          <p className="mt-2 fs-3">{country.capital}</p>
          <div className="mt-4">
            <a
              href={country.maps?.googleMaps}
              className="pt-2 text-decoration-none fs-3"
            >
              Google Maps
            </a>
            {country.maps.googleMaps && <span className="mx-2 fs-3">|</span>}
            <a
              href={country.maps?.openStreetMaps}
              className="pt-2 text-decoration-none fs-3"
            >
              OpenStreet Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const ErrorPage = () => {
  let error = useRouteError();
  return <div className="mt-2 fs-1">{error.message}</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }
        return response.json();
      } catch (error) {
        throw new Error("Failed to fetch data from the API");
      }
    },
    errorElement: <ErrorPage />,
  },
  {
    path: "country/:name",
    element: <CountryCard />,
    loader: async ({ params }) => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${params.name}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }
        return response.json();
      } catch (error) {
        throw new Error("Failed to fetch data from the API");
      }
    },
    errorElement: <ErrorPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;