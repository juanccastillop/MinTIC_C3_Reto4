package co.edu.usa.tufinca.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.usa.tufinca.entities.Category;
import co.edu.usa.tufinca.repository.crud.CategoryCrudRepository;

@Repository
public class CategoryRepository {
    
    @Autowired
    private CategoryCrudRepository categoryCrudRepository;

    public List<Category> getAll(){
        return (List<Category>) categoryCrudRepository.findAll();
    }

    public Optional<Category> getCategory(int categoryId){
        return categoryCrudRepository.findById(categoryId);
    }

    public Category save(Category cat){
        return categoryCrudRepository.save(cat);
    }

    public void delete(Category cat){
        categoryCrudRepository.delete(cat);
    }

}
