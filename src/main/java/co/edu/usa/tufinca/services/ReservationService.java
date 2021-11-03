package co.edu.usa.tufinca.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.usa.tufinca.entities.CountClients;
import co.edu.usa.tufinca.entities.Reservation;
import co.edu.usa.tufinca.entities.StatusReservation;
import co.edu.usa.tufinca.repository.ReservationRepository;
/**
* Inicio clase principal y marcador service
*/ 
@Service
public class ReservationService {
    /**
    * Anotacion de Autowired para inyeccion de dependencias
    */ 
    @Autowired
    private ReservationRepository reservationRepository;
    /**
    * ArrayList que trae las reservaciones del repository
    */ 
    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }
    /**
    * servicio para capturar la reservacion por id
    */ 
    public Optional<Reservation> getReservation(int reservacionId) {
        return reservationRepository.getReservation(reservacionId);
    }
    /**
    * servicio con logica de condicionales para guardar reservacion
    */ 
    public Reservation save(Reservation reservacion){
        if(reservacion.getIdReservation()==null){
            return reservationRepository.save(reservacion);
        }else{
            Optional<Reservation> eopcional= reservationRepository.getReservation(reservacion.getIdReservation());
            if(eopcional.isEmpty()){
                return reservationRepository.save(reservacion);
            }else{
                return reservacion;
            }
        }
    }
    /**
    * servicio con logica de condicionales para actualizar reservacion
    */ 
    public Reservation update(Reservation reservacion){
        if(reservacion.getIdReservation()!=null){
            Optional<Reservation> reservaux= reservationRepository.getReservation(reservacion.getIdReservation());
            if(!reservaux.isEmpty()){

                if(reservacion.getStartDate()!=null){
                    reservaux.get().setStartDate(reservacion.getStartDate());
                }
                if(reservacion.getDevolutionDate()!=null){
                    reservaux.get().setDevolutionDate(reservacion.getDevolutionDate());
                }
                if(reservacion.getStatus()!=null){
                    reservaux.get().setStatus(reservacion.getStatus());
                }
                reservationRepository.save(reservaux.get());
                return reservaux.get();
            }else{
                return reservacion;
            }
        }else{
            return reservacion;
        }
    }
    /**
    * servicio para eliminar reservacion por id
    */ 
    public boolean deleteReservation(int reservacionId) {
        Boolean aBoolean = getReservation(reservacionId).map(reservacion -> {
            reservationRepository.delete(reservacion);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    /**
    * Codigo agregado Reto5 - 
    */
    public StatusReservation reporteStatusServicio (){
        List<Reservation>completed= reservationRepository.ReservacionStatusRepositorio("completed");
        List<Reservation>cancelled= reservationRepository.ReservacionStatusRepositorio("cancelled");
        
        return new StatusReservation(completed.size(), cancelled.size() );
    }
    /**
    * Array reservaciones por fecha 
    */
	public List<Reservation> reporteTiempoServicio (String datoA, String datoB){
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        
        Date datoUno = new Date();
        Date datoDos = new Date();
        
        try{
             datoUno = parser.parse(datoA);
             datoDos = parser.parse(datoB);
        }catch(ParseException evt){
            evt.printStackTrace();
        }if(datoUno.before(datoDos)){
            return reservationRepository.ReservacionTiempoRepositorio(datoUno, datoDos);
        }else{
            return new ArrayList<>();
        
        } 
    }
    /**
    * List que retorna el conteo de cliente
    */
	public List<CountClients> reporteClientesServicio(){
            return reservationRepository.getClientesRepositorio();
        }

}
