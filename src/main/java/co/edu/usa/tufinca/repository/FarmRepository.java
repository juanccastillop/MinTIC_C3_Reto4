package co.edu.usa.tufinca.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.usa.tufinca.entities.Farm;
import co.edu.usa.tufinca.repository.crud.FarmCrudRepository;


@Repository
public class FarmRepository {  
    
    @Autowired
    private FarmCrudRepository farmCrudRepository;

    public List<Farm> getAll(){
        return (List<Farm>) farmCrudRepository.findAll();
    }

    public Optional<Farm> getFarm(int farmId){
        return farmCrudRepository.findById(farmId);
    }

    public Farm save(Farm finca){
        return farmCrudRepository.save(finca);
    }

    public void delete(Farm finca){
        farmCrudRepository.delete(finca);
    }
    
}
