package co.edu.usa.tufinca.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.usa.tufinca.entities.Farm;
import co.edu.usa.tufinca.repository.FarmRepository;

@Service
public class FarmService {
    
    @Autowired
    private FarmRepository farmRepository;

    public List<Farm> getAll(){
        return farmRepository.getAll();
    }

    public Optional<Farm> getFarm(int fincaId){
        return farmRepository.getFarm(fincaId);
    }

    public Farm save(Farm finca){
        
        if(finca.getId()==null){
            return farmRepository.save(finca);
        }
        else{
            Optional<Farm> farmaux=farmRepository.getFarm(finca.getId());
            if(farmaux.isEmpty()){
                return farmRepository.save(finca);
            }
            else{
                return finca;
            }
        }

    }

    public Farm update(Farm finca){
        if(finca.getId()!=null){
            Optional<Farm> farmaux=farmRepository.getFarm(finca.getId());
            if(!farmaux.isEmpty()){
                if(finca.getName()!=null){
                    farmaux.get().setName(finca.getName());
                }
                if(finca.getAddress()!=null){
                    farmaux.get().setAddress(finca.getAddress());
                }
                if(finca.getExtension()!=null){
                    farmaux.get().setExtension(finca.getExtension());
                }
                if(finca.getDescription()!=null){
                    farmaux.get().setDescription(finca.getDescription());
                }
                if(finca.getCategory()!=null){
                    farmaux.get().setCategory(finca.getCategory());
                }
                farmRepository.save(farmaux.get());
                return farmaux.get();
            }else{
                return finca;
            }
        }else{
            return finca;
        }
    }

    public boolean deleteBike(int fincaId) {
        Boolean aBoolean = getFarm(fincaId).map(finca -> {
            farmRepository.delete(finca);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
