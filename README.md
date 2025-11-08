# Sistema Médico A4

Aplicação web simples para gerar documentos médicos (receituário, relatório e guia SADT) com impressão garantida em folha A4.

## Funcionalidades
- Formulário único para dados do paciente e informações clínicas.
- Botões de ação para gerar: prescrição, relatório médico e guia SADT.
- Pré-visualização em tempo real dos documentos dentro de um iframe.
- Estilos otimizados para impressão em papel A4 sem perda de formatação.
- Botão dedicado para enviar diretamente para impressão.

## Como usar
1. Abra o arquivo `index.html` em um navegador moderno.
2. Preencha os dados do paciente e as informações clínicas desejadas.
3. Clique em um dos botões **Gerar** para montar o documento correspondente.
4. Use o botão **Imprimir** para abrir a caixa de diálogo de impressão com o layout A4 configurado.

## Estrutura
- `index.html`: Interface e modelos HTML dos documentos.
- `styles.css`: Estilos do aplicativo e dos documentos A4.
- `script.js`: Lógica para preencher os modelos e controlar a impressão.

## Requisitos
- Navegador moderno com suporte a `fetch`, `@page` e `@media print`.
