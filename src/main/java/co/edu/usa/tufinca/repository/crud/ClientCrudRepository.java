package co.edu.usa.tufinca.repository.crud;

import org.springframework.data.repository.CrudRepository;

import co.edu.usa.tufinca.entities.Client;

public interface ClientCrudRepository extends CrudRepository <Client, Integer> {
    
}
