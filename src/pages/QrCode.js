import React, { Component } from "react";
import {QrReader} from "react-qr-reader";
// import { useRoutes } from "react-router-dom";
        
        class QrCode extends Component {
          constructor(props) {
            super(props);
            this.state = {
              delay: 600,
              result: "No result"
            };
            this.handleScan = this.handleScan.bind(this);
          }
          handleScan(data) {
            // console.log(data)
            // const history = useRoutes();
            if (data) {
              this.setState({
                result: data.text
              });
              alert (data.text)
              //  history.push('/curs')
            }
          }
          handleError(err) {
            console.error(err);
          }
          render() {
      
            return (
              <div style={{overflowX: "auto", height: '600px', width: '600px' , border:'1px solid black'}}>
                  
                <QrReader
                  scanDelay={this.state.delay}
                  onError={this.handleError}
                  // onScan={this.handleScan}
                  onResult={(result, error) => {
                    if (!!result) {
                      this.handleScan(result);
                      // console.log(result)
                    }
          
                    if (!!error) {
                      console.info('111',error);
                    }
                  }}
                  videoStyle={{ height: '400px', width: '400px' }}
                />
                <p>{this.state.result}</p>
              </div>
            );
          }
        }
    


export default QrCode;