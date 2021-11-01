package co.edu.usa.tufinca.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.usa.tufinca.entities.Category;
import co.edu.usa.tufinca.repository.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll(){
        return categoryRepository.getAll();
    }
    public Optional<Category> getCategory(int categoriaId){
        return categoryRepository.getCategory(categoriaId);
    }

    public Category save(Category categoria){
        
        if(categoria.getId()==null){
            return categoryRepository.save(categoria);
        }
        else{
            Optional<Category> cataux=categoryRepository.getCategory(categoria.getId());
            if(cataux.isEmpty()){
                return categoryRepository.save(categoria);
            }
            else{
                return categoria;
            }
        }
    }

    public Category update(Category categoria){
        if(categoria.getId()!=null){
            Optional<Category>cataux=categoryRepository.getCategory(categoria.getId());
            if(!cataux.isEmpty()){
                if(categoria.getDescription()!=null){
                    cataux.get().setDescription(categoria.getDescription());
                }
                if(categoria.getName()!=null){
                    cataux.get().setName(categoria.getName());
                }
                return categoryRepository.save(cataux.get());
            }
        }
        return categoria;

    }
    public boolean deletecategoria(int categoriaId){
        Boolean d=getCategory(categoriaId).map(categoria -> {
            categoryRepository.delete(categoria);
            return true;
        }).orElse(false);
        return d;
    }

}
