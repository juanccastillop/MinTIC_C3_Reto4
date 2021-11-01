package co.edu.usa.tufinca.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.usa.tufinca.entities.Client;
import co.edu.usa.tufinca.repository.ClientRepository;

@Service
public class ClientService {
    
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll(){
        return clientRepository.getAll();
    }
     
      public Optional<Client> getClient(int clienteId) {
        return clientRepository.getClient(clienteId);
    }

    public Client save(Client cliente){
        if(cliente.getIdClient()==null){
            return clientRepository.save(cliente);
        }else{
            Optional<Client> clientaux= clientRepository.getClient(cliente.getIdClient());
            if(clientaux.isEmpty()){
                return clientRepository.save(cliente);
            }else{
                return cliente;
            }
        }
    }

    public Client update(Client cliente){
        if(cliente.getIdClient()!=null){
            Optional<Client> clientaux= clientRepository.getClient(cliente.getIdClient());
            if(!clientaux.isEmpty()){
                if(cliente.getName()!=null){
                    clientaux.get().setName(cliente.getName());
                }
                if(cliente.getAge()!=null){
                    clientaux.get().setAge(cliente.getAge());
                }
                if(cliente.getPassword()!=null){
                    clientaux.get().setEmail(cliente.getEmail());
                }
                if(cliente.getPassword()!=null){
                    clientaux.get().setPassword(cliente.getPassword());
                }
             clientRepository.save(clientaux.get());
                return clientaux.get();
            }else{
                return cliente;
            }
        }else{
            return cliente;
        }
    }

    public boolean deleteClient(int clienteId) {
        Boolean aBoolean = getClient(clienteId).map(cliente-> {
         clientRepository.delete(cliente);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
