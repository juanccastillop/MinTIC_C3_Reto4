package co.edu.usa.tufinca.repository.crud;

import org.springframework.data.repository.CrudRepository;

import co.edu.usa.tufinca.entities.Reservation;

public interface ReservationCrudRepository extends CrudRepository <Reservation, Integer> {
    
}
