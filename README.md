# App Gym 🏋🏽💪🏽

### Descrição : 
Um aplicativo para academias, desenvolvido para gerenciar exercícios organizados por grupos musculares, oferecendo as seguintes funcionalidades:

- [x] Autenticação de usuário com `Sign-in` e `Sign-up`;
- [x] Gestão de sessão com `Token` e `Refresh-token`;
- [x] Listagem de exercícios filtrados por grupo muscular;
- [x] Exibição detalhada de cada exercício;
- [x] Marcação de exercícios como realizados;
- [x] Histórico de atividades do usuário agrupado por dia;
- [x] Perfil do usuário;
- [x] Atualização de informações de perfil (avatar, nome, senha);
- [x] Validação de inputs;
- [x] Integração com API para busca e persistência dos dados.

---

### Principais tecnologias utilizadas: 🚀

- Mobile:
  - Expo | ~51.0.28
  - React Native | 0.74.5
  - Typescript | ~5.3.3 -D
  - @Gluestack-ui | ^1.1.34
  - React Hook Form | ^7.53.0
  - Yup | ^1.4.0
  - Axios | ^1.7.7
  - Async Storage | 1.23.1

- API:
  - Express | ^4.18.1
  - Jsonwebtoken | ^8.5.1
  - Knex | ^2.2.0
  - Multer | ^1.4.5-lts.1
  - Sqlite3 | ^5.0.11

---

## Screens 📲

| SignIn | SignUp | Home | Details | History | Profile |
| --- | --- | --- | --- | --- | --- | 
| <img src="" /> | <img src="" /> | <img src="" /> | <img src="" /> | <img src="" /> | <img src="" /> |

---

### Rodando a API localmente (Porta 3333): 🔌

- Pré-requisitos: Node.js v18 instalado.

1. **Clone o repositório e instale as dependências:**
   ```bash
   git clone https://github.com/jfernandesdev/appgym.git
   cd appgym/api
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   - Renomeie o arquivo `.env-example` para `.env`.
   - No arquivo `.env`, defina o `JWT_SECRET` com um valor de sua escolha.

3. **Executar as migration do banco de dados:**
   ```bash
   npx knex migrate:latest
   ```

4. **Carregar os dados iniciais (exercícios):**
   ```bash
   npx knex seed:run --specific=createExercises.js
   ```

5. **Visualizar o banco de dados (opcional):**
   - Use o Beekeeper Studio ou outro cliente SQL para acessar o banco de dados local na pasta `database`.

---

### Rodando o App Mobile: 📱

1. **Instalar as dependências:**
   ```bash
   cd appgym/mobile
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   - Renomeie o arquivo `.env-example` para `.env`.
   - No arquivo `.env`, configure `BASE_URL` com o endereço IP local da sua máquina seguido de `:3333` (não use `localhost` ou `127.0.0.1` pois o dispositivo físico não tem acesso).

3. **Iniciar o app:**
   - Com o emulador aberto ou um dispositivo físico conectado via USB, execute:
     ```bash
     npx expo start
     ```

<img src="https://i.ibb.co/Yckq764/footer-signature.png" alt="footer-signature" border="0"  width='400px' />
