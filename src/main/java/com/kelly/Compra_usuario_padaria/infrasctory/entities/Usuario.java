package com.kelly.Compra_usuario_padaria.infrasctory.entities;


import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tb_usuario")

public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "Nome")
    private String nome;
    @Column(name = "Telefone")
    private String telefone;
    @Column(name = "Cpf",unique = true)
    private String cpf;
    @Column(name = "Email")
    private String email;
    @Column(name ="Data de nascimento")
    private LocalDate data;
}