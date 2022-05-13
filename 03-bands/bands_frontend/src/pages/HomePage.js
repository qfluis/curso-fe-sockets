import { useContext } from "react";
import { SocketContext } from '../context/SocketContext';

import { BandAdd } from "../components/BandAdd";
import { BandList } from "../components/BandList";
import { BandsChart } from "../components/BandsChart";


function HomePage() {

  const { online } = useContext( SocketContext )

  return (
    <div className="container" >
      <div className="alert">
        <p>
          Service status:&nbsp;
          {
            (online)
            ?<span className="text-success">Online</span>
            :<span className="text-danger">Offline</span>
          }
          
        </p>
      </div>

      <h1>Band names</h1>
      <hr />
      <div className="row">
        <div className="col" >
          <BandsChart />
        </div>        
      </div>
      <div className="row">
        <div className="col-md-8">
          <BandList/>
        </div>
        <div className="col-md-4">
          {<BandAdd/>}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
