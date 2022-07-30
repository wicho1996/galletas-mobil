import axiosSystem from "../../../utils/axiosSystem";

const rutas = () => {
    return {
        getClientes: axiosSystem("Login/getEmpleados"),
        inciarSesion: axiosSystem(""),
    }
}

export default rutas;