package com.kelly.Compra_usuario_padaria.DTO;

import lombok.Data;

import java.util.List;
@Data
public class CompraRequestDTO {
    private Integer usuarioId;
    private List<Long> produtoIds;
}
