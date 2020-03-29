import React from "react";
import "./App.css";
import axios from "axios";
import { Bar } from "react-chartjs-2";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
      data: {}
    };
  }

  fetch = () => {
    axios
      .get(
        " https://api.thingspeak.com/channels/1023166/feeds.json?api_key=A3EHCB68NAMPXWFD&results="
      )
      .then(data => {
        this.setState({ click: true });

        let field1Lable = [];
        let field1 = [];

        data.data.feeds.map(obj => {
          if (obj.field1) {
            field1Lable.push(obj.created_at);
            field1.push(Number(obj.field1));
          }
        });

        const data1 = {
          labels: field1Lable,
          datasets: [
            {
              label: "Pressure",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: field1
            }
          ]
        };

        this.setState({ data: data1 });
      });
  };
  render() {
    return (
      <div className="App">
        <button onClick={this.fetch}>click to get data</button>
        {this.state.data.labels && (
          <Bar
            data={this.state.data && this.state.data}
            width={100}
            height={50}
          />
        )}
      </div>
    );
  }
}

export default App;
