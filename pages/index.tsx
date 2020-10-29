const getPigeonQuote = () => {
  const pigeonQuotes = [
    'Wow!',
    'Sleek and graceful',
    'Inspirational',
    'Great!',
    'Lovely stuff',
    'Incredible!',
    'So plump and healthy looking',
    'What a specimen!',
    "Can't wait to see 'im fly",
    'Absolute beaut',
  ]

  return pigeonQuotes[Math.floor(Math.random() * pigeonQuotes.length)]
}

function IndexPage({ pigeons, apiRoot }) {
  return (
    <div>
      <div className="p-4 lg:px-10">
        <h1 className="text-6xl font-bold lg:pt-8 mb-8">
          The Pigeon Directory
        </h1>
        <p className="mb-8 text-gray-700">
          Fusce at libero non ante pulvinar scelerisque.{' '}
          <strong>Nam sagittis lacus eu scelerisque lobortis.</strong> Donec a
          enim nisi. Nullam lacinia viverra volutpat. Duis elementum consectetur
          nunc vitae pharetra.{' '}
          <span className="text-highlight">
            Pellentesque laoreet, nisl id dapibus maximus, ligula augue aliquam
            risus, vitae auctor nunc justo eget arcu.
          </span>
        </p>
        <p className="mb-8 text-gray-700">
          Quisque auctor nulla a libero mollis, vitae tempus massa consequat. Ut
          sodales eros faucibus, mattis mauris tincidunt, bibendum leo. Morbi
          dictum vestibulum rutrum. Donec arcu dolor, egestas sed lobortis eget,
          ultrices pharetra eros. Pellentesque fringilla lorem elit, sed
          vestibulum mi rhoncus ac.{' '}
          <span className="text-highlight">Sed tempus lectus quis odio</span>{' '}
          finibus, porttitor tincidunt quam molestie.
        </p>
        <div className="bg-gray-100 lg:p-4">
          <h2 className="text-4xl text-gray-700 p-4 mb-4">
            Let's hear about these pigeons...
          </h2>
          <ul>
            {pigeons.map(
              (
                {
                  name,
                  age,
                  picture: {
                    formats: { small, medium },
                  },
                  bio,
                },
                index
              ) => {
                return (
                  <li
                    className={`lg:flex lg:flex-1 lg:justify-between p-4 hover:bg-gray-300 cursor-pointer ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                    }`}
                  >
                    <div className="lg:w-2/3 lg:pr-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {name}
                      </h3>
                      <p className="text-md mb-2">
                        ({age} year{age === 1 ? '' : 's'} old)
                      </p>
                      <p
                        className="text-sm text-gray-700 mb-4"
                        dangerouslySetInnerHTML={{ __html: bio }}
                      />
                    </div>
                    <div className="lg:w-1/3">
                      <img
                        className="mb-4 w-full"
                        src={apiRoot + small.url}
                        srcSet={`${apiRoot + small.url} 320w, ${
                          apiRoot + medium.url
                        } 600w`}
                        alt={name + ' the pigeon'}
                      />
                      <blockquote className="italic text-gray-600 text-xl border-l-4 border-highlight pl-2">
                        {getPigeonQuote()}
                      </blockquote>
                    </div>
                  </li>
                )
              }
            )}
          </ul>
        </div>
      </div>
      <style jsx>
        {`
          .pigeon-item {
          }
        `}
      </style>
    </div>
  )
}

export async function getStaticProps() {
  const { API_URL } = process.env

  const res = await fetch(API_URL + '/pigeons')
  const json = await res.json()

  return {
    props: {
      pigeons: json,
      apiRoot: API_URL,
    },
  }
}

export default IndexPage
