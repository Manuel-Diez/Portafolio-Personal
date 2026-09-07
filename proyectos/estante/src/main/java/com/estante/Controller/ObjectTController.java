package com.estante.Controller;

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

import com.estante.IService.IObjectTService;

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
    public ResponseEntity<?> saveT(@RequestBody T T) {
    	try {
    		T newT = ObjectTService.save(T);
    		return new ResponseEntity<>(newT, HttpStatus.CREATED);
    	} catch (Exception e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteT(@PathVariable Long id) {
    	try {
    		ObjectTService.delete(id);
    		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    	} catch (Exception e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateT(@PathVariable Long id, @RequestBody T TDetails) {
        try {
            T updatedT = ObjectTService.update(TDetails, id);
            if (updatedT == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(updatedT);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
