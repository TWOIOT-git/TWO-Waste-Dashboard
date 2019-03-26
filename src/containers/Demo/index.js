import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import ProgressChartTrashCan from "../../components/ProgressChartTrashCan";
import withLayout from "../../hoc/withLayout";
import onlyAuthenticated from "../../hoc/onlyAuthenticated";
import Margin from "../../components/Margin";
import Loader from "../../components/Loader";
import FadeIn from "../../components/FadeIn";
import Title from "../../components/Title";
import FlexCenter from "../../components/FlexCenter";

class Demo extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.fetchPoolData = setInterval(() => {
      fetch(
        "https://qpwqj1knvh.execute-api.ap-northeast-1.amazonaws.com/staging/db-api?sensor_id=ID40",
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
          this.setState({
            data: {
              value: -1 * ((res.Items[0].bin_level / 200) * 100 - 100),
              text: "Sensor ID40"
            }
          });
        })
        .catch(err => console.log(err));
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.fetchPoolData);
  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <Container fluid>
          <Row>
            <Col align="center">
              <Title> Conference </Title>
            </Col>
          </Row>
          {data ? (
            <Row>
              <Margin
                orientation="top"
                breakpoints={["xs", "sm", "md", "lg", "xl"]}

              >
                <Col sm={12} md={12} lg={12} xl={12}>
                  <FadeIn>
                    <ProgressChartTrashCan data={data.value} id={data.text} />
                  </FadeIn>
                </Col>
              </Margin>
            </Row>
          ) : (
            <FlexCenter>
              <Loader />
            </FlexCenter>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default onlyAuthenticated(withLayout(Demo));
