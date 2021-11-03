package co.edu.usa.tufinca.repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.usa.tufinca.entities.Client;
import co.edu.usa.tufinca.entities.CountClients;
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
    /*
    * Codigo agregado Reto5 - ArrayList para reportes reservaciones
    */
    public List<Reservation> ReservacionStatusRepositorio (String status){
        return reservationCrudRepository.findAllByStatus(status);
    }
    
    public List<Reservation> ReservacionTiempoRepositorio (Date a, Date b){
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(a, b);
    }
    
    public List<CountClients> getClientesRepositorio(){
        List<CountClients> res = new ArrayList<>();
        List<Object[]> report = reservationCrudRepository.countTotalReservationsByClient();
        for(int i=0; i<report.size(); i++){
            res.add(new CountClients((Long)report.get(i)[1],(Client) report.get(i)[0]));
        }
        return res;
    }
}
