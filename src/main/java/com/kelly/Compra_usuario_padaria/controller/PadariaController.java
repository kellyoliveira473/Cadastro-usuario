package com.kelly.Compra_usuario_padaria.controller;

import com.kelly.Compra_usuario_padaria.business.PadariaService;
import com.kelly.Compra_usuario_padaria.infrasctory.entities.Padaria;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:63342") 
@RequestMapping("/padaria")
@RestController
@RequiredArgsConstructor
public class PadariaController {
    private final PadariaService padariaService;
    @PostMapping
    public ResponseEntity<Void>SalvarPorId(@RequestBody Padaria padaria){
        padariaService.SalvarPadariaPorId(padaria);
        return ResponseEntity.ok().build();

    }
    @GetMapping("/{id}")
    public ResponseEntity<Void>AtualizarPadaria(@RequestParam Long id){
        padariaService.BuscarPorId(id);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void>DeletarPadaria(@RequestParam Long id){
        padariaService.DeletarPadariaPorId(id);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Void >AtualizarPadaria(@RequestParam Long id,@RequestBody Padaria padaria){
        padariaService.AtualizarPadariaPorId(id,padaria);
        return ResponseEntity.ok().build();
    }

}
