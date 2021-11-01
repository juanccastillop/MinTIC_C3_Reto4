package co.edu.usa.tufinca.repository.crud;

import org.springframework.data.repository.CrudRepository;

import co.edu.usa.tufinca.entities.Category;

public interface CategoryCrudRepository extends CrudRepository<Category, Integer> {
    
}
