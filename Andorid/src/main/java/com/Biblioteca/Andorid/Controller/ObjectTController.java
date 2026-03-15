package com.Biblioteca.Andorid.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.Biblioteca.Andorid.IService.IObjectTService;

public class ObjectTController<T> {

	@Autowired
    private IObjectTService<T> ObjectTService;

    @GetMapping("/")
    public ResponseEntity<List<T>> getAll() throws Exception{
        List<T> T = ObjectTService.all();
        return new ResponseEntity<>(T, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
	public Optional<T> findById(@PathVariable Long id) throws Exception{
		return ObjectTService.findById(id);
	}
    
    @PostMapping
    public ResponseEntity<T> saveT(@RequestBody T T) throws Exception{
    	T newT = ObjectTService.save(T);
        return new ResponseEntity<>(newT, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteT(@PathVariable Long id) throws Exception{
    	ObjectTService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateT(@PathVariable Long id, @RequestBody T TDetails) throws Exception{
        
        T updatedT = ObjectTService.update( TDetails, id);
        if (updatedT == null) {
            // Manejar el caso en el que no se pueda encontrar el cliente con el ID dado
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(updatedT);
    }
}
