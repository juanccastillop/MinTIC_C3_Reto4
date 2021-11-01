package co.edu.usa.tufinca;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan(basePackages = {"co.edu.usa.tufinca.entities"})
@SpringBootApplication
public class TufincaApplication {

	public static void main(String[] args) {
		SpringApplication.run(TufincaApplication.class, args);
	}

}
