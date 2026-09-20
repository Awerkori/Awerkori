# Nightfall

A revisão anterior foi rejeitada por parecer seca. Esta composição abandona
o monograma vetorial como protagonista: a paisagem noturna dá textura, escala
e profundidade; Awerkori volta ao centro da identidade junto de Project Nox.

Arte original gerada pela ferramenta integrada de imagem, sem copiar referências.
Os prompts integrais estão em [nightfall-prompt.txt](nightfall-prompt.txt)
e [nightfall-mobile-prompt.txt](nightfall-mobile-prompt.txt).
O WebP é uma conversão otimizada da imagem gerada, sem edição do conteúdo.

Assets: `assets/branding/nightfall*`. Regerar os invólucros SVG com
`node scripts/nightfall.mjs`. A imagem fica incorporada: nenhuma dependência
externa. A primeira revisão mobile revelou texto pequeno: uma edição quadrada
própria recompõe a mesma paisagem e amplia a assinatura, sem apenas reduzir o banner.

Uma única animação de 24 segundos modifica discretamente a luz do horizonte,
sem mover tipografia. `picture` seleciona versões estáticas quando há preferência
por movimento reduzido. Não foram adicionados cards, estatísticas ou novas seções.

## Logo oficial

Fornecida pelo mantenedor: `Downloads/Nox Pack icon/nox icone site.png`.
O original está preservado byte a byte em `assets/branding/nox-official.png`.
A versão WebP é reduzida a 280 px para exibição e codificada sem perda adicional,
com transparência preservada. A logo é exibida como imagem independente dentro
do SVG, sem redesenho por IA, alteração das cores ou transformação da geometria.
