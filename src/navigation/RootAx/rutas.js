import axiosSystem from "../../utils/axiosSystem";

const rutas = () => {
    return {

        actualizarGPS: axiosSystem("Dispositivo/updateUbication"),
    }
}

export default rutas;