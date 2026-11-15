# GEO-TO-DO — Lembrete de Tarefas Geolocalizadas

Aplicativo mobile desenvolvido para organizar tarefas associadas a locais específicos e emitir lembretes quando o usuário se aproxima do endereço marcado no mapa.

O **GEO-TO-DO** foi desenvolvido como projeto acadêmico e combina **geolocalização, mapas, notificações e sensores do dispositivo** para demonstrar como recursos nativos podem tornar uma lista de tarefas mais contextual.

## Objetivo

Permitir que o usuário cadastre uma tarefa, escolha sua localização no mapa e defina um raio de proximidade. Enquanto o aplicativo estiver em primeiro plano, ele acompanha a posição do dispositivo e pode emitir uma notificação local quando o usuário entrar na área definida.

**Exemplo:** cadastrar a tarefa “Comprar material escolar”, marcar uma papelaria no mapa e definir um raio de 200 metros para receber um lembrete ao se aproximar do local.

## Funcionalidades implementadas

- **Cadastro de tarefas:** título, descrição opcional, coordenadas geográficas e raio de alerta ajustável entre 50 e 1.000 metros.
- **Mapa interativo:** seleção de um ponto no mapa com marcador (`Marker`) e exibição da área de proximidade por um círculo (`Circle`).
- **Lembretes por proximidade:** acompanhamento da localização em primeiro plano por `expo-location` e envio de notificações locais com `expo-notifications` ao entrar no raio de uma tarefa pendente.
- **Tarefas mais próximas:** cálculo da distância por meio da fórmula de Haversine e exibição das **três tarefas pendentes mais próximas** na tela inicial.
- **Gerenciamento:** listagem, visualização dos detalhes, conclusão e exclusão de tarefas.
- **Armazenamento local:** persistência das tarefas com `AsyncStorage`, sem exigir uma conta de usuário ou um servidor próprio.
- **Temas claro e escuro:** seleção manual ou alternância automática com base no sensor de luminosidade (`LightSensor`), quando disponível no aparelho.

> **Importante:** as três tarefas mais próximas aparecem em cards **dentro do aplicativo**. Um widget nativo para a tela inicial do Android **ainda não foi implementado**.

## Download e instalação do APK (Android)

O projeto disponibiliza um arquivo APK para instalação direta em dispositivos Android, permitindo utilizar o aplicativo sem a necessidade de instalar Node.js, Expo ou configurar um ambiente de desenvolvimento.

### Localização do APK

O arquivo de instalação está localizado na pasta **`APK do projeto`**, dentro do diretório principal:

```text
GEO-TO-DO/
└── APK do projeto/
    └── GEO-TO-DO.apk
```

**Caminho do arquivo:** `APK do projeto/GEO-TO-DO.apk`

Caso o arquivo esteja publicado no repositório, ele pode ser acessado pelo seguinte link:

[**Acessar o APK do GEO-TO-DO**](https://github.com/AleatorioCom/GEO-TO-DO/blob/main/APK%20do%20projeto/GEO-TO-DO.apk)

### Como instalar no Android

1. Acesse o repositório do projeto no GitHub.
2. Abra a pasta **`APK do projeto`**.
3. Selecione o arquivo **`GEO-TO-DO.apk`** e faça o download.
4. No dispositivo Android, abra o arquivo APK baixado.
5. Caso seja solicitado, autorize a instalação de aplicativos dessa fonte nas configurações do Android.
6. Confirme a instalação e abra o aplicativo **GEO-TO-DO**.
7. Conceda as permissões de localização e notificações para utilizar as funcionalidades do projeto.

**Observações:**

- O APK é destinado a dispositivos **Android**, não sendo compatível com iOS.
- Não é necessário instalar o Expo Go para utilizar a versão APK.
- O funcionamento das notificações depende das permissões concedidas pelo usuário.
- Os lembretes por proximidade funcionam enquanto o aplicativo está em primeiro plano.
- Instale apenas o APK disponibilizado pelo repositório oficial do projeto.

## Tecnologias utilizadas

| Tecnologia | Aplicação no projeto |
| --- | --- |
| JavaScript | Lógica do aplicativo |
| React Native | Construção da interface mobile |
| Expo (SDK 58) | Ambiente e integração com recursos do dispositivo |
| `react-native-maps` | Exibição do mapa, marcadores e círculos |
| `expo-location` | Consulta e acompanhamento da localização |
| `expo-notifications` | Notificações locais |
| `expo-sensors` | Leitura do sensor de luminosidade |
| `@react-native-async-storage/async-storage` | Salvamento local de tarefas |
| React Navigation | Navegação entre telas |
| `@react-native-community/slider` | Ajuste do raio de proximidade |

## Estrutura do projeto

```text
GEO-TO-DO/
├── APK do projeto/
│   └── GEO-TO-DO.apk
├── assets/
│   ├── icons/
│   └── images/
├── src/
│   ├── components/      # Botões, cards, marcadores e círculos
│   ├── context/         # Estado das tarefas e do tema
│   ├── hooks/           # Hook de localização
│   ├── navigation/      # Navegação entre telas
│   ├── screens/         # Início, mapa, cadastro, detalhes e configurações
│   ├── services/        # Localização, notificações, sensores e armazenamento
│   └── utils/           # Cálculo e formatação de distâncias
├── .gitignore
├── App.js
├── app.json
├── package.json
├── package-lock.json
└── README.md
```

## Como executar pelo código-fonte

Além da instalação direta por APK, o projeto pode ser executado pelo código-fonte para fins de desenvolvimento, testes e modificações.

### Pré-requisitos

- Node.js (versão LTS) e npm instalados.
- Um dispositivo Android ou iOS para testar a localização e as notificações.
- Permissões de localização e notificações habilitadas no dispositivo.
- Aplicativo Expo Go instalado, quando compatível com os recursos nativos do projeto.

### Instalação

**1. Clone este repositório e entre na pasta:**

```bash
git clone https://github.com/AleatorioCom/GEO-TO-DO.git
cd GEO-TO-DO
```

**2. Instale as dependências:**

```bash
npm install
```

Esse comando instalará automaticamente as bibliotecas necessárias com base nos arquivos `package.json` e `package-lock.json`.

**3. Inicie o Expo:**

```bash
npx expo start
```

**4. Abra o aplicativo** no dispositivo ou em um ambiente de desenvolvimento compatível com a configuração do projeto.

**Observação:** alguns recursos nativos podem exigir uma *development build* em vez do Expo Go. A renderização de mapas também pode precisar de configuração de chave de API, dependendo da plataforma e da forma de compilação.

>Caso queira apenas utilizar o aplicativo em um dispositivo Android, recomenda-se instalar o APK disponível na pasta `APK do projeto`, evitando a necessidade de configurar o ambiente de desenvolvimento.

## Como utilizar

1. Abra o app e autorize o uso da localização e das notificações.
2. Na tela **Início**, selecione **+ Adicionar tarefa**.
3. Informe o nome da tarefa e, se quiser, uma descrição.
4. Toque em **Escolher no mapa** para selecionar o local desejado.
5. Ajuste o raio de proximidade e salve a tarefa.
6. Com o app em primeiro plano, aproxime-se da região marcada para que a verificação de proximidade possa disparar um lembrete.
7. Na lista de tarefas, abra os detalhes para marcar uma tarefa como concluída ou excluí-la.
8. Em **Configurações**, escolha o tema manualmente ou habilite o tema automático, se o aparelho tiver sensor de luminosidade.

## Limitações da versão atual

- A verificação de proximidade é feita com atualizações de localização **enquanto o aplicativo está aberto/em primeiro plano**. Não há geofencing nativo em segundo plano.
- A entrega de notificações e a leitura de localização dependem das permissões concedidas e do funcionamento do dispositivo.
- O controle de entrada e saída do raio é mantido em memória; após reiniciar o aplicativo, um novo alerta pode ocorrer caso o aparelho já esteja dentro da área marcada.
- O **widget Android** solicitado na proposta original ainda é uma melhoria futura.
- O tema automático depende da disponibilidade do sensor de luminosidade.

## Possíveis melhorias

- Implementar o widget Android com as três tarefas pendentes mais próximas.
- Adicionar geofencing nativo em segundo plano, com tratamento apropriado de permissões e consumo de bateria.
- Incluir edição de tarefas e mais opções de personalização.
- Criar testes automatizados para os serviços e o cálculo das distâncias.

## Autores

- **Enzo Giuliano Machado Vilar**
- **Guilherme Vieira Seravalli**
- **Gustavo Nicácio Ferreira**
- **Lucas da Silva Ornellas**

---

**Projeto acadêmico — GEO-TO-DO: Lembrete de Tarefas Geolocalizadas.**