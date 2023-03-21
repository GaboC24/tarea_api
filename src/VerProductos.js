import React from 'react';
import Ruta from "./Ruta";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabla from './Tabla';
class VerProductos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
        };
    }
    async componentDidMount() {
        const respuesta = await fetch(`${Ruta.RUTA_API}`);
        const productos = await respuesta.json();
        this.setState({ 
            productos: productos,
        });
    }
    render() {
        return (
            <div>
                <div className="column">
                    <h1 className="is-size-3 ">Ver productos</h1>
                    <ToastContainer></ToastContainer>
                </div>
                <div className="table-container mt-5">
                    <table className="table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Descripcion</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.productos.map(producto => {
                                return <Tabla key={producto._id} producto={producto}></Tabla>;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default VerProductos;