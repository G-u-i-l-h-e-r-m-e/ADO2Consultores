# 📌 ConsultApp – Sistema de Consultores  

[![Angular](https://img.shields.io/badge/Angular-v19-DD0031?logo=angular&logoColor=white)](https://angular.dev)  
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![Material Design](https://img.shields.io/badge/Angular%20Material-Design-blueviolet?logo=google&logoColor=white)](https://material.angular.io/)  
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)  

Aplicação desenvolvida em **Angular** para gerenciar consultores de uma empresa.  
O sistema implementa autenticação simples, controle de perfis de usuário (administrador e comum), CRUD de consultores e navegação entre páginas.  

---

## 🚀 Tecnologias utilizadas
- **Angular CLI** v19.2.16  
- **Angular Material** (UI com Material Design)  
- **TypeScript**  
- **RxJS** para manipulação reativa de dados  

---

## ⚙️ Funcionalidades
✅ Login com perfis de usuário (Administrador / Usuário Comum)  
✅ CRUD de Consultores (Adicionar, Editar, Excluir, Listar)  
✅ Tabela com paginação, filtro e ordenação (MatTable)  
✅ Reactive Forms com validações  
✅ Componentes standalone com serviços para autenticação e dados  

---

## 🖥️ Como executar o projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU-USUARIO/ConsultApp.git
cd ConsultApp
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar o servidor de desenvolvimento
```bash
ng serve
```

📌 Acesse em: [http://localhost:4200](http://localhost:4200)

---

## 👩‍💻 Usuários de Teste
- **Administrador**  
  - Login: `admin@empresa.com`  
  - Senha: `admin123`  

- **Usuário Comum**  
  - Login: `user@empresa.com`  
  - Senha: `user123`  

---

## 📂 Estrutura do Projeto
```
src/
 ├── app/
 │    ├── pages/
 │    │    ├── login/               # Tela de login
 │    │    ├── consultores-form/    # Cadastro/edição de consultores
 │    │    ├── consultores-lista/   # Lista com tabela Material
 │    │    └── sobre/               # Página "Sobre"
 │    ├── services/                 # Serviços (auth, consultores)
 │    └── models/                   # Interfaces e tipagens
 ├── assets/                        # Recursos estáticos
 └── styles/                        # Temas e estilos globais
```

---

## ✅ Scripts úteis
- **Gerar novo componente**  
  ```bash
  ng generate component nome-componente
  ```
- **Build de produção**  
  ```bash
  ng build --configuration production
  ```
- **Rodar testes unitários (Karma)**  
  ```bash
  ng test
  ```

---

## 📖 Recursos adicionais
- [Documentação oficial Angular](https://angular.dev)  
- [Angular Material](https://material.angular.io/)  
- [RxJS](https://rxjs.dev/)  

---

## 📌 Sobre a Atividade
Este projeto foi desenvolvido como parte da disciplina **Atividade TypeScript 2 (ADO2)**, aplicando boas práticas de **Angular + TypeScript** em um CRUD completo.  
