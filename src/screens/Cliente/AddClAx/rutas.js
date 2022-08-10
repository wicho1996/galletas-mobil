import axiosSystem from "../../../utils/axiosSystem";

const rutas = () => {
    return {
        
        getClientes: axiosSystem("Login/getEmpleados"),
       
    }
}

export default rutas;