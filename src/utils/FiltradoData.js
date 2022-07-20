const FiltradoData = (campos, filtros, general, data) => {
    const filtrosActivos = campos.some((key) => filtros[key] !== '');

    if (filtrosActivos || general != '') {
        const temporal = [];
        data.forEach((condominio) => {
            let coincide = true;
            let concideGeneral = false;
            campos.forEach((campo) => {
                if (
                    filtros[campo] &&
                    !(String(condominio[campo]) || '')?.toUpperCase().includes((String(filtros[campo]) || '').toUpperCase())
                )
                    coincide = false;
                if (general == '' || (String(condominio[campo]) || '')?.toUpperCase().includes(general.toUpperCase()))
                    concideGeneral = true;
            });
            if (coincide && concideGeneral) temporal.push(condominio);
        });
        return temporal;
    }
    return data;
};
export default FiltradoData;
