import React from "react";
import withMenuNavegation from "../hoc/withMenuNavegation";
import Head from "../components/Head";
import TopTools from "../components/TopTools";
import SensorItemCard from "../components/SensorItemCard";

class Sensors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: 1,
          name: "MAINSTREET_33/023",
          robin_size: "ROBIN XL",
          status: "full",
          porcentage: "95%",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            out_in: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 2,
          name: "FEHRBELLINER STREET 47",
          robin_size: "ROBIN SENSOR X",
          status: "no-full",
          porcentage: "15%",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            out_in: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 3,
          name: "MAINSTREET_33/023",
          robin_size: "ROBIN XL",
          status: "full",
          porcentage: "95%",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            out_in: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 4,
          name: "FEHRBELLINER STREET 47",
          robin_size: "ROBIN SENSOR X",
          status: "no-full",
          porcentage: "15%",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            out_in: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 5,
          name: "MAINSTREET_33/023",
          robin_size: "ROBIN XL",
          status: "full",
          porcentage: "95%",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            out_in: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 6,
          name: "FEHRBELLINER STREET 47",
          robin_size: "ROBIN SENSOR X",
          status: "no-full",
          porcentage: "15%",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            out_in: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 7,
          name: "MAINSTREET_33/023",
          robin_size: "ROBIN XL",
          status: "full",
          porcentage: "95%",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            out_in: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 8,
          name: "FEHRBELLINER STREET 47",
          robin_size: "ROBIN SENSOR X",
          status: "no-full",
          porcentage: "15%",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            out_in: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 9,
          name: "MAINSTREET_33/023",
          robin_size: "ROBIN XL",
          status: "full",
          porcentage: "95%",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            out_in: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 10,
          name: "FEHRBELLINER STREET 47",
          robin_size: "ROBIN SENSOR X",
          status: "no-full",
          porcentage: "15%",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            out_in: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 11,
          name: "MAINSTREET_33/023",
          robin_size: "ROBIN XL",
          status: "full",
          porcentage: "95%",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            out_in: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 12,
          name: "FEHRBELLINER STREET 47",
          robin_size: "ROBIN SENSOR X",
          status: "no-full",
          porcentage: "15%",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            out_in: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 13,
          name: "MAINSTREET_33/023",
          robin_size: "ROBIN XL",
          status: "full",
          porcentage: "95%",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            out_in: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 14,
          name: "FEHRBELLINER STREET 47",
          robin_size: "ROBIN SENSOR X",
          status: "no-full",
          porcentage: "15%",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            out_in: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        }
      ]
    };
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <Head title="lidbot - Sensors" />
        <TopTools />
        <div className="SensorsContainer">
          {data.map(item => (
            <div key={item.id} className='ItemCol'>
              <SensorItemCard {...item} />
            </div>
          ))}
        </div>
        <style jsx>{`
          .SensorsContainer {
            display: flex;
            flex-wrap: wrap;
            padding: 0 30px 30px 30px;

            .ItemCol {
              width: 33.3333%;

              &:nth-child(3n+2) {
                padding-right: 33px
              }

              &:nth-child(3n+1) {
                padding-right: 33px
              }
            }
          }
        `}</style>
      </>
    );
  }
}

export default withMenuNavegation(Sensors);
