# ONG Criança Feliz – Front-End

Este é o repositório do front-end da ONG Criança Feliz, uma organização dedicada a promover projetos sociais, educacionais e culturais para crianças. O site apresenta informações sobre projetos, voluntariado, campanhas de doação e transparência institucional.

## Estrutura do Projeto

```
front-end-ong/
├── index.html                # Página inicial (SPA)
├── package.json              # Dependências e scripts do projeto
├── assets/                   # Imagens, vídeos e PDFs
│   └── pdfs/                 # Documentos públicos e releases
├── pages/                    # Páginas internas (SPA)
│   ├── cadastro.html         # Cadastro de voluntários
│   ├── doacoes.html          # Captação de recursos e doações
│   ├── home.html             # Página inicial (conteúdo)
│   ├── projetos.html         # Projetos realizados
│   ├── transparencia.html    # Prestação de contas e documentos
│   └── voluntariado.html     # Portal de voluntariado
├── scripts/                  # Scripts JS
│   ├── form-validation.js    # Validação de formulários
│   ├── main.js               # Lógica principal do SPA
│   └── spa.js                # Navegação SPA
└── styles/
    └── main.css              # Estilos principais
```

## Funcionalidades

- **SPA (Single Page Application):** Navegação dinâmica entre páginas sem recarregar o site.
- **Projetos:** Cards detalhados de cada projeto com galeria de fotos e vídeos.
- **Voluntariado:** Cadastro, oportunidades e área do voluntário.
- **Doações:** Formulário para doações online e acompanhamento de campanhas.
- **Transparência:** Blog, releases, documentos públicos e relatórios financeiros.
- **Validação de formulários:** Scripts para garantir o preenchimento correto dos dados.

## Como rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/celiapaivab/front-end-ong.git
   cd front-end-ong
   ```

2. Abra o arquivo `index.html` em seu navegador ou utilize uma extensão de servidor local (ex: Live Server no VS Code).

## Tecnologias utilizadas

- HTML5, CSS3 (custom properties, flexbox, responsividade)
- JavaScript (ES6+)

## Organização das páginas

- `/pages/home.html` – Página inicial
- `/pages/projetos.html` – Detalhes dos projetos
- `/pages/voluntariado.html` – Portal do voluntário
- `/pages/cadastro.html` – Cadastro de voluntários
- `/pages/doacoes.html` – Doações e campanhas
- `/pages/transparencia.html` – Transparência e documentos

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está sob a licença MIT.
