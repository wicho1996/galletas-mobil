import axiosSystem from "../../../utils/axiosSystem";

const getClientes = () => {
    return {
        getClientes: axiosSystem("Login/validarUsuario")
    }
}

export default getRutas;