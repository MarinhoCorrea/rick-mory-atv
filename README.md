# Atv-rick-morty

Aplicativo Expo React Native que lista personagens da API "Rick and Morty" e mostra detalhes ao tocar em um item.

## Tecnologias
- React Native (Expo)
- Expo CLI
- React Navigation (Stack)
- Axios / Fetch (consumo de API)
- JavaScript (ESNext)

## Pré-requisitos
- Node.js (recomenda-se v16+)
- npm ou yarn
- Expo CLI : `npm install -g expo-cli`
- Emulador Android / Xcode ou dispositivo físico com app Expo Go (opcional)

## Instalação (Windows)
1. Abra o terminal integrado do VS Code na pasta do projeto:
   cd c:\Users\Pedro\Desktop\Atv-rick-morty
2. Instale dependências:
   ```sh
   npm install
   # ou
   yarn
   ```
3. Inicie o Metro/Expo:
   ```sh
   npm run start
   # ou
   npx expo start
   ```

## Execução
- Android:
  ```sh
  npm run android
  ```
- iOS (macOS):
  ```sh
  npm run ios
  ```
- Web:
  ```sh
  npm run web
  ```

Siga as instruções do Expo (QR code ou selecione emulador/dispositivo).


## Estrutura do projeto
- App.js — navegação e configuração de telas
- src/CharactersListScreen.js — tela de lista de personagens
- src/CharacterDetailScreen.js — tela de detalhes do personagem
- package.json — dependências e scripts
- app.json — configuração do Expo

## Dicas rápidas / Troubleshooting
- Se alteração de dependência não for refletida, reinicie o bundler:
  ```sh
  npm run start -- --reset-cache
  ```
- Se faltar axios:
  ```sh
  npm install axios
  ```

## Vídeo (YouTube)
- Link do vídeo demonstrativo: https://youtube.com/shorts/NL_2JkPe_4k

## Licença
- Projeto para fins acadêmicos/exercício. Adapte conforme necessário.
