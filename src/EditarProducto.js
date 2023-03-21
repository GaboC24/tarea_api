import React from 'react';
import Ruta from "./Ruta";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from 'react-router-dom';

class EditarProducto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            producto: {
                _id: "",
                "nombre": "",
                "precio": "",
                "descripcion": "",
            },
        };
        // Indica a las funciones a quién nos referimos con "this"
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
    }
    async componentDidMount() {
        // Obtiene ID en la URL
        const idProducto = this.props.match.params.id;
        // Llama a la API para obtener los detalles
        const respuesta = await fetch(`${Ruta.RUTA_API}/${idProducto}`);
        const producto = await respuesta.json();
        // refresca el formulario
        this.setState({
            producto: producto,
        });
    }
    render() {
        return (
            <div className="column is-one-third">
                <h1 className="is-size-3">Editando producto</h1>
                <ToastContainer></ToastContainer>
                <form className="field" onSubmit={this.manejarEnvioDeFormulario}>
                    <div className="form-group">
                        <label className="label mt-5" htmlFor="nombre">Nombre:</label>
                        <input autoFocus required placeholder="Nombre" type="text" id="nombre" onChange={this.manejarCambio} value={this.state.producto.nombre} className="input is-success" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="precio">Precio:</label>
                        <input required placeholder="Precio" type="number" id="precio" onChange={this.manejarCambio} value={this.state.producto.precio} className="input is-warning" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="descripcion">Descripcion:</label>
                        <input required placeholder="Descripcion" type="text" id="descripcion" onChange={this.manejarCambio} value={this.state.producto.descripcion} className="input is-danger" />
                    </div>
                    <div className="form-group">
                        <button className="button is-link mt-5">Guardar</button>
                        &nbsp;
                        <Link to="/productos/ver" className="button is-danger mt-5">Volver</Link>
                    </div>
                </form>
            </div>
        );
    }
    async manejarEnvioDeFormulario(evento) {

        evento.preventDefault();
        // Codifica el producto como JSON
        const cargaUtil = JSON.stringify(this.state.producto);
        // envia
        const respuesta = await fetch(`${Ruta.RUTA_API}/`, {
            method: "PUT",
            body: cargaUtil,
            headers: {
                "Content-Type": "application/json",
            }
        });
        const exitoso = await respuesta.json();
        if (exitoso) {
            toast('Producto guardado', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
            toast.error("Error guardando. Intenta de nuevo");
        }
    }
    manejarCambio(evento) {
        // Extrae la clave del estado que se va a actualizar, así como el valor
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const productoActualizado = state.producto;
            // Actualiza el valor del producto, solo en el campo que se haya cambiado
            productoActualizado[clave] = valor;
            return {
                producto: productoActualizado,
            }
        });
    }
}

export default withRouter(EditarProducto);