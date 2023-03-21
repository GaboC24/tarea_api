import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Ruta from './Ruta';
class Tabla extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            //si se elimina el producto ya no se muestra
            eliminado: false,
        };
        this.redireccionarParaEditar = this.redireccionarParaEditar.bind(this);
        this.eliminar = this.eliminar.bind(this);
    }
    redireccionarParaEditar() {
        return <Redirect to={`/productos/editar/${this.props.producto.id}`} />
    }
    async eliminar() {
        const resultado = await Swal.fire({
            title: 'Confirmación',
            text: `¿Eliminar "${this.props.producto.nombre}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3298dc',
            cancelButtonColor: '#f14668',
            cancelButtonText: 'No',
            confirmButtonText: 'Sí, eliminar'
        });
        // Si no se confirma se detiene
        if (!resultado.value) {
            return;
        }
        const respuesta = await fetch(`${Ruta.RUTA_API}/${this.props.producto._id}`, {
            method: "DELETE",
        });
        const exitoso = await respuesta.json();
        if (exitoso) {
            toast('Producto eliminado ', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({
                eliminado: true,
            });
        } else {
            toast.error("Error eliminando. Intenta de nuevo");
        }
    }
    render() {
        if (this.state.eliminado) {
            return null;
        }
        return (
            <tr>
                <td>{this.props.producto.nombre}</td>
                <td>${this.props.producto.precio}</td>
                <td>{this.props.producto.descripcion}</td>
                <td>
                    <Link to={`/productos/editar/${this.props.producto._id}`} className="button is-info">Editar</Link>
                </td>
                <td>
                    <button onClick={this.eliminar} className="button is-danger">Eliminar</button>
                </td>
            </tr>
        );
    }
}

export default Tabla;