import axiosSystem from "../../../utils/axiosSystem";

const rutas = () => {
    return {
        
        newClient: axiosSystem("Cliente/newCliente"),
       
    }
}

export default rutas;