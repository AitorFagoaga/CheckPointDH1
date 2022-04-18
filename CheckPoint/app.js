const autos = require('./autos')


let concesionaria = {
    autos: autos,
  //crear la funcionalidad buscarAuto que reciba por parámetro la patente
  // y devuelva el auto al cual le corresponde. En caso de no encontrar el mismo, deberá retornar null.
    buscarAuto: function buscarAuto(patente){
       let auto = this.autos.filter(function(auto){
             return auto.patente == patente 
    });
       if(auto[0] == null){
        return null;
    }
    else return auto[0];
    },
    //agreguen la funcionalidad de venderAuto que recibe la patente y,
    // en caso de encontrar al automóvil, le asigna el estado de vendido.
    venderAuto: function(patente){
        if(this.buscarAuto (patente) != null){
           let buscar = autos.indexOf(this.buscarAuto(patente));
           autos[buscar].vendido = true;
           }else if(autos.indexOf(this.buscarAuto(patente)) == -1){
              return "no se encontro el vehiculo"
            }
     },
     //habilidad de poder tener la lista de autos para la venta
     //no deberían de aparecer los autos que ya fueron vendidos.
     autosParaLaVenta: function autosParaLaVenta(){
        let enVenta = this.autos.filter(function (auto){
           return auto.vendido == false;
        });
        return enVenta;
     },
     //cuáles de los autos para la venta son 0 km. Se considera auto 0km a uno que tenga menos de 100km.
     autosNuevos: function (){
        let enVenta = this.autosParaLaVenta()
        let ceros = enVenta.filter(function (auto){
           return auto.km < 100;
        });
        return ceros;
     },
     //devuelve una lista que contiene el precio de venta de cada auto vendido
     listaDeVentas: function (){
      let precios = this.autos.filter(function (auto){
         return auto.vendido == true;
      });
      let array = [];
       precios.map(function (auto){
          return array.push(auto.precio);
       });
       return array;
   },
   //devuelva la sumatoria del valor de todas las ventas realizadas.
   totalDeVentas: function (){
      let lista = this.listaDeVentas()
      if (lista[0] == null){
         return 0;
      }else {
      let tVentas = lista.reduce(function (acumulador, numero){
         return acumulador + numero;
      })
      return tVentas;
      }
   },
   // verificar si una persona puede comprar o no un auto 
   //Una persona va a ser representada mediante un objeto literal de la siguiente forma:
   //{nombre: “Juan”, capacidadDePagoEnCuotas: 20000, capacidadDePagoTotal: 100000}
   puedeComprar: function (auto, persona){
      let pCuotas = persona.capacidadDePagoTotal / persona.capacidadDePagoEnCuotas
   if(auto.precio <= persona.capacidadDePagoTotal && auto.cuotas >= persona.capacidadDePagoEnCuotas){ 
       return true;
   } else return false;
   },
   //recibe una persona y devuelve la lista de autos que puede comprar.

   //La función debe de realizar los siguientes pasos:

   //1) Obtener los autos para la venta.

   //2) Por cada uno de los autos debe de probar si la persona puede comprarlo.

   //3) Luego debemos retornar los que pueda comprar.
   
   autosQuePuedeComprar: function(persona){
      let auto = this.autosParaLaVenta().filter((auto) => {
                 return this.puedeComprar(auto,persona)
             });
             return auto
          }
 };
 