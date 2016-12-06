// var moment = require('moment');
// var viajes = [];
function toJSON(data) {
    // data.forEach(function(viaje){
    //     viaje.conductor.fecha_licencia = moment(viaje.conductor.fecha_licencia).format('L');
    //     viaje.empresa.fecha_resolucion = moment(viaje.empresa.fecha_resolucion).locale("es").format('LL');
    //     viaje.contrato = {
    //         dia: parseInt(moment(viaje.fecha).format('Do')),
    //         mes: moment(viaje.fecha).locale('es').format('MMMM'),
    //         ano: moment(viaje.fecha).format('YYYY')
    //     }
    //     viajes.push(viaje);
    // })
  return JSON.stringify(data);
}