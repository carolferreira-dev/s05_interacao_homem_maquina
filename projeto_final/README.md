# 📚 Projeto Final – Reserva de Salas de Estudo

Nova funcionalidade para o **App Inatel**: o aluno encontra uma sala de estudo livre, vê os recursos da sala (quadro, TV/projetor, tomadas, computador), escolhe dia e horário, envia a reserva e acompanha o status (pendente, confirmada, concluída ou cancelada) com notificações. Reservas de grupo (5 ou mais pessoas) passam pela aprovação do professor.

🔗 **[Ver online](https://carolferreira-dev.github.io/s05_interacao_homem_maquina/projeto_final/)**
📄 **[Documentação (PDF)](documentacao/Projeto_Final_IHM_Reserva_de_Salas_Caroline_Ferreira.pdf)**: User Story, Análise da Tarefa (HTA), Diagrama de Classes e Wireframes.

---

## 🧪 Como testar

| Perfil | Matrícula | Senha |
|---|---|---|
| Aluna | `1234` | `inatel` |
| Professor | `9999` | `inatel` |

- A tela de login também tem botões de acesso de demonstração.
- A **primeira** tentativa de reservar a **Sala de Estudo 3** simula outro aluno pegando o horário (tela de conflito com alternativas).
- Reservas com 5 ou mais pessoas aparecem para o professor aprovar ou recusar.
- No menu: tema escuro e **Reiniciar demonstração**.

## 📏 Regras de negócio

- Salas abertas das 08:00 às 22:00; reservas de 1 a 3 horas seguidas.
- Não é possível reservar horário que já passou nem mais pessoas que a capacidade da sala.
- Cada aluno pode ter no máximo 3 reservas ativas.
- Até 4 pessoas: confirmação automática. 5 ou mais: aprovação do professor.
- Cancelamento até 1 hora antes, com opção de desfazer.
- Lembrete 15 minutos antes; depois do horário a reserva fica concluída e pede avaliação da sala.

## 🗂️ Arquivos

```
projeto_final/
├── index.html      # estrutura e fontes
├── styles.css      # identidade visual do App Inatel (cores, tipografia, componentes)
├── script.js       # telas, regras de negócio e dados (salvos no localStorage)
└── documentacao/
    └── Projeto_Final_IHM_Reserva_de_Salas_Caroline_Ferreira.pdf
```
