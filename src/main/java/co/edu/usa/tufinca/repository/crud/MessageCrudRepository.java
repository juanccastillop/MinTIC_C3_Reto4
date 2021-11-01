package co.edu.usa.tufinca.repository.crud;

import org.springframework.data.repository.CrudRepository;

import co.edu.usa.tufinca.entities.Message;

public interface MessageCrudRepository extends CrudRepository <Message, Integer>{
    
}
