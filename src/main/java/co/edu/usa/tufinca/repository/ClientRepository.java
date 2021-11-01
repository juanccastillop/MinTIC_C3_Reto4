package co.edu.usa.tufinca.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.usa.tufinca.entities.Client;
import co.edu.usa.tufinca.repository.crud.ClientCrudRepository;

@Repository
public class ClientRepository {

    @Autowired
    private ClientCrudRepository clientCrudRepository;

    public List<Client> getAll(){
        return (List<Client>) clientCrudRepository.findAll();
    }
    public Optional<Client> getClient(int id){
        return clientCrudRepository.findById(id);
    }

    public Client save(Client cliente){
        return clientCrudRepository.save(cliente);
    }
    public void delete(Client cliente){
        clientCrudRepository.delete(cliente);
    }

    
}
