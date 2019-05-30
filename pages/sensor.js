import React, { Component } from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SensorItemCard from "../components/SensorItemCard";

export default class Sensor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      name: "Collision",
      robinSize: "lidbot.sensor",
      status: "full",
      porcentage: "0",
      location: {
        city: "Toronto",
        street: "100 Princes' Blvd",
        outIn: "indoor"
      },
      owner: {
        name: "lidbot"
      }
    };
  }

  componentDidMount() {
    this.fetchPoolData = setInterval(() => {
      fetch(
        "https://qpwqj1knvh.execute-api.ap-northeast-1.amazonaws.com/staging/db-api?sensor_id=ID100",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "rVRWFFuhqpatYCy0fe57N60ZbIX2r96Z8QUUyAdx"
          }
        }
      )
        .then(res => res.json())
        .then(res => {
          const binLevel = res.Items[0].bin_level;
          const porcentage = -1 * ((binLevel / 850) * 100 - 100);

          if (porcentage <= 5) {
            this.setState({ porcentage: "0" });
          } else {
            this.setState({ porcentage: Math.floor(porcentage).toString() });
          }

          // DEBUGGING
          // console.log("BIN LEVEL: " + bin_level);
          // console.log("NO FLOOR: " + porcentage);
          // console.log("WITH FLOOR: " + Math.floor(porcentage));
          // console.log("-----------------------------------");
          // DEBUGGING
        });
    }, 1000);
  }

  render() {
    const { name } = this.state;

    return (
      <LayoutMenuNavegation>
        <Head title={`lidbot - ${name}`} />
        <div className="Container">
          <div>
            <SensorItemCard {...this.state} />
          </div>
          <style jsx>{`
            .Container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;

              > div {
                width: 40vw;
              }
            }
          `}</style>
        </div>
      </LayoutMenuNavegation>
    );
  }
}
