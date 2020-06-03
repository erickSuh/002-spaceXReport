import ApolloClient from 'apollo-boost';
const gql = require('graphql-tag');
const ObjectsToCsv = require('objects-to-csv');
require('cross-fetch/polyfill');

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
});

exports.getShips = async () => {
  try {
    const resp = await client.query({
      query: gql`
        query launchesPast {
          launchesPast {
            mission_name
            launch_date_local
            launch_site {
              site_name_long
            }
            rocket {
              rocket_name
              first_stage {
                cores {
                  flight
                  core {
                    reuse_count
                    status
                  }
                }
              }
            }
            ships {
              name
              home_port
              image
            }
          }
        }
      `,
    });
    const csv = new ObjectsToCsv(resp.data.launchesPast);
    return { status: 200, data: await csv.toString() };
  } catch (e) {
    return { status: 500, error: e.message };
  }
};
