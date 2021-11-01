package co.edu.usa.tufinca.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.usa.tufinca.entities.Message;
import co.edu.usa.tufinca.repository.crud.MessageCrudRepository;

@Repository
public class MessageRepository {
    
    @Autowired
    private MessageCrudRepository messageCrudRepository;

    public List<Message> getAll(){
        return (List<Message>) messageCrudRepository.findAll();
    }
    public Optional<Message> getMessage(int id){
        return messageCrudRepository.findById(id);
    }

    public Message save(Message mensaje){
        return messageCrudRepository.save(mensaje);
    }
    public void delete(Message mensaje){
        messageCrudRepository.delete(mensaje);
    }
}
