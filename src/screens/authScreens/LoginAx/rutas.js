import axiosSystem from "../../../utils/axiosSystem";

const rutas = () => {
    return {
        getClientes: axiosSystem("Login/getEmpleados"),
        inciarSesion: axiosSystem("Login/inciarSesion"),
    }
}

export default rutas;