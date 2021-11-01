package co.edu.usa.tufinca.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.usa.tufinca.entities.Reservation;
import co.edu.usa.tufinca.repository.ReservationRepository;

@Service
public class ReservationService {
    
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int reservacionId) {
        return reservationRepository.getReservation(reservacionId);
    }

    public Reservation save(Reservation reservacion){
        if(reservacion.getIdReservation()==null){
            return reservationRepository.save(reservacion);
        }else{
            Optional<Reservation> e= reservationRepository.getReservation(reservacion.getIdReservation());
            if(e.isEmpty()){
                return reservationRepository.save(reservacion);
            }else{
                return reservacion;
            }
        }
    }

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

    public boolean deleteReservation(int reservacionId) {
        Boolean aBoolean = getReservation(reservacionId).map(reservacion -> {
            reservationRepository.delete(reservacion);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
