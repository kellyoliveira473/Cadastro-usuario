package com.kelly.Compra_usuario_padaria.business;

import com.kelly.Compra_usuario_padaria.infrasctory.entities.Usuario;
import com.kelly.Compra_usuario_padaria.infrasctory.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    // Salva e retorna o usuário salvo
    public Usuario salvarUsuario(Usuario usuario) {
        return repository.save(usuario);
    }

    public Usuario buscarUsuarioPorId(Integer id) {
       return repository.findById(id).orElseThrow(
               () -> new RuntimeException("Id não encontrado em nosso banco de dados")
       );
    }

    public void deleteUsuarioPorId(Integer id) {
        repository.deleteById(id);
    }

    public Usuario atualizarUsuarioPorId(Integer id, Usuario usuario) {
        Usuario usuarioEntities = repository.findById(id).orElseThrow(
                () -> new RuntimeException("Usuario nao encontrado")
        );
        Usuario usuarioAtual = Usuario.builder()
                .id(id) // importante: manter o id vindo do path
                .nome(usuario.getNome() != null ? usuario.getNome() : usuarioEntities.getNome())
                .email(usuario.getEmail() != null ? usuario.getEmail() : usuarioEntities.getEmail())
                .build();
        return repository.save(usuarioAtual);
    }

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }
}






