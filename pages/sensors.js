import React from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import TopTools from "../components/TopTools";
import SensorItemCard from "../components/SensorItemCard";
import SensorTable from "../components/SensorTable";

class Sensors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layoutMode: "cards",
      data: [
        {
          id: 1,
          name: "MAINSTREET_33/023",
          robinSize: "ROBIN XL",
          porcentage: "95",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            outIn: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 2,
          name: "FEHRBELLINER STREET 47",
          robinSize: "ROBIN SENSOR X",
          porcentage: "15",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            outIn: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 3,
          name: "MAINSTREET_33/023",
          robinSize: "ROBIN XL",
          porcentage: "95",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            outIn: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 4,
          name: "FEHRBELLINER STREET 47",
          robinSize: "ROBIN SENSOR X",
          porcentage: "15",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            outIn: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 5,
          name: "MAINSTREET_33/023",
          robinSize: "ROBIN XL",
          porcentage: "95",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            outIn: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 6,
          name: "FEHRBELLINER STREET 47",
          robinSize: "ROBIN SENSOR X",
          porcentage: "15",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            outIn: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 7,
          name: "MAINSTREET_33/023",
          robinSize: "ROBIN XL",
          porcentage: "95",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            outIn: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 8,
          name: "FEHRBELLINER STREET 47",
          robinSize: "ROBIN SENSOR X",
          porcentage: "15",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            outIn: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 9,
          name: "MAINSTREET_33/023",
          robinSize: "ROBIN XL",
          porcentage: "95",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            outIn: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 10,
          name: "FEHRBELLINER STREET 47",
          robinSize: "ROBIN SENSOR X",
          porcentage: "15",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            outIn: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 11,
          name: "MAINSTREET_33/023",
          robinSize: "ROBIN XL",

          porcentage: "95",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            outIn: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 12,
          name: "FEHRBELLINER STREET 47",
          robinSize: "ROBIN SENSOR X",
          porcentage: "15",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            outIn: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 13,
          name: "MAINSTREET_33/023",
          robinSize: "ROBIN XL",

          porcentage: "95",
          location: {
            city: "Berlin",
            street: "Martinusstr.7, 66802",
            outIn: "indoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        },
        {
          id: 14,
          name: "FEHRBELLINER STREET 47",
          robinSize: "ROBIN SENSOR X",
          porcentage: "15",
          location: {
            city: "Berlin",
            street: "Fehrbelliner Str. 47, 10119",
            outIn: "outdoor"
          },
          owner: {
            name: "LIDBOT POC"
          }
        }
      ]
    };
  }

  render() {
    const { data, layoutMode } = this.state;
    return (
      <LayoutMenuNavegation>
        <Head title="lidbot - Sensors" />
        <TopTools
          layoutMode={layoutMode}
          onChangeLayout={value => this.setState({ layoutMode: value })}
        />
        <div className="SensorsContainer">
          <If condition={layoutMode === "cards"}>
            {data.map(item => (
              <div key={item.id} className="ItemCol">
                <SensorItemCard {...item} />
              </div>
            ))}
          </If>
          <If condition={layoutMode === "table"}>
            <SensorTable items={data} />
          </If>
        </div>
        <style jsx>{`
          .SensorsContainer {
            display: flex;
            flex-wrap: wrap;
            padding: 0 30px 30px 30px;
            margin-top: 22px;

            .ItemCol {
              width: 33.3333%;

              &:nth-child(3n + 2) {
                padding-right: 33px;
              }

              &:nth-child(3n + 1) {
                padding-right: 33px;
              }
            }
          }
        `}</style>
      </LayoutMenuNavegation>
    );
  }
}

export default Sensors;
