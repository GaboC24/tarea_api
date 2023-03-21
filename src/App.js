import Nav from "./Nav";
import AgregarProducto from "./AgregarProducto";
import VerProductos from "./VerProductos";
import EditarProducto from "./EditarProducto";
import {Switch,Route} from "react-router-dom";

function App() {
  return (
    <div>
      <Nav></Nav>
      <div className="section">
        <div className="columns">
          <Switch>
            <Route path="/productos/agregar">
              <AgregarProducto></AgregarProducto>
            </Route>
            <Route path="/productos/editar/:id">
              <EditarProducto></EditarProducto>
            </Route>
            <Route path="/productos/ver">
              <VerProductos></VerProductos>
            </Route>
            <Route path="/">
              <VerProductos></VerProductos>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
