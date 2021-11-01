package co.edu.usa.tufinca.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.usa.tufinca.entities.Reservation;
import co.edu.usa.tufinca.repository.crud.ReservationCrudRepository;

@Repository
public class ReservationRepository {
    
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    public List<Reservation> getAll(){
        return (List<Reservation>) reservationCrudRepository.findAll();
    }
    public Optional<Reservation> getReservation(int id){
        return reservationCrudRepository.findById(id);
    }
    public Reservation save(Reservation reservacion){
        return reservationCrudRepository.save(reservacion);
    }
    public void delete(Reservation reservacion){
        reservationCrudRepository.delete(reservacion);
    }
}
