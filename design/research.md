# Nox — estudo visual, setembro de 2026

38 perfis de referência visitados no GitHub; 33 com README visível.
Capturas da página real, não apenas leitura do Markdown. A disponibilidade
dos widgets variou: a seleção de referências não significa que todas sejam
boas em seu estado atual. Nenhuma arte de terceiros foi incorporada.

## Observações por perfil

| Perfil | Princípio observado / limite |
| --- | --- |
| [caneco](https://github.com/caneco) | Brevidade; pouca identidade visual na versão visitada. |
| [moertel](https://github.com/moertel) | Alinhamento, separação sutil, tipografia contida. |
| [sindresorhus](https://github.com/sindresorhus) | Um título animado memorável; não importar sua estética retrô. |
| [saadeghi](https://github.com/saadeghi) | Marca/mascote fazem o trabalho de muitos parágrafos. |
| [anuraghazra](https://github.com/anuraghazra) | Identidade tipográfica; widgets indisponíveis prejudicam o resultado. |
| [DenverCoder1](https://github.com/DenverCoder1) | Acento consistente; densidade excessiva para Nox. |
| [simonw](https://github.com/simonw) | Conteúdo dinâmico útil e real, sem depender de números decorativos. |
| [BrunnerLivio](https://github.com/BrunnerLivio) | Coerência do retrô e interação pessoal; linguagem inadequada para Nox. |
| [fnky](https://github.com/fnky) | Movimento comunica personalidade; evitar decoração nostálgica gratuita. |
| [innng](https://github.com/innng) | Assimetria entre imagem e texto; reduzir risco de aperto no celular. |
| [afc163](https://github.com/afc163) | Uma única animação reconhecível substitui uma página de componentes. |
| [zackkrida](https://github.com/zackkrida) | Fotografia monocromática cria pausa e atmosfera. |
| [thewhiteh4t](https://github.com/thewhiteh4t) | Unidade visual forte; dashboard não é a direção desejada. |
| [MasonSlover](https://github.com/MasonSlover) | Animação tipográfica simples; fundo branco quebra o dark mode. |
| [CyrisXD](https://github.com/CyrisXD) | Movimento e acento violeta; typing e widgets parecem template. |
| [ABSphreak](https://github.com/ABSphreak) | Estilos misturados e imagens externas quebradas fragmentam o perfil. |
| [mmphego](https://github.com/mmphego) | Dados reais; grandes superfícies claras dominam o tema escuro. |
| [kittinan](https://github.com/kittinan) | Música dá personalidade; dependência de serviços reduz confiabilidade. |
| [andyruwruw](https://github.com/andyruwruw) | Xadrez e música são informação pessoal viva; excesso de caixas. |
| [lowlighter](https://github.com/lowlighter) | Alto acabamento de infografia; densidade inadequada aqui. |
| [Platane](https://github.com/Platane) | Atividade real transformada em animação própria; não reutilizar cobra. |
| [athul](https://github.com/athul) | Atualizações reais concisas; placeholders de inatividade não ajudam. |
| [abhisheknaiidu](https://github.com/abhisheknaiidu) | Conteúdo pessoal; estatísticas vazias não são decoração. |
| [WaylonWalker](https://github.com/WaylonWalker) | Imagem pessoal reconhecível; muitos badges diluem o foco. |
| [orhun](https://github.com/orhun) | Arte própria pequena e marcante; a lista posterior alonga o perfil. |
| [maximousblk](https://github.com/maximousblk) | Feeds reais, mas o resultado se aproxima de um diretório. |
| [Rishit-dagli](https://github.com/Rishit-dagli) | Publicações recentes concisas, conteúdo significativo. |
| [ryo-ma](https://github.com/ryo-ma) | Dependências de estatísticas indisponíveis deixam lacunas. |
| [ShahriarShafin](https://github.com/ShahriarShafin) | Contenção e detalhes recolhíveis; destaque externo quebrado. |
| [SP-XD](https://github.com/SP-XD) | Ilustração concentra personalidade; badges tornam o resto ruidoso. |
| [Andrew6rant](https://github.com/Andrew6rant) | ASCII autoral muito reconhecível; pouca legibilidade pequena. |
| [Anmol-Baranwal](https://github.com/Anmol-Baranwal) | Hierarquia inicial clara; comprimento/texto excessivos para Nox. |
| [rzashakeri](https://github.com/rzashakeri) | Seções claras, porém catálogo de tecnologias muito denso. |

Também visitados: [jhey](https://github.com/jhey), [swyx](https://github.com/swyx),
[bdsqqq](https://github.com/bdsqqq), [luisfun](https://github.com/luisfun),
[PhantomInsights](https://github.com/PhantomInsights): nenhum README identificado
na página visitada. Não contados entre os 33 READMEs.

Coleções de partida:
[awesome-github-profile-readme](https://github.com/abhisheknaiidu/awesome-github-profile-readme),
[creative-profile-readme](https://github.com/coderjojo/creative-profile-readme),
[awesome-github-profiles](https://github.com/EddieHubCommunity/awesome-github-profiles).
A coleção arquivada contém exemplos que já não correspondem à página atual.

## Técnicas estudadas

- [SVG como imagem](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_as_an_image):
  CSS declarativo, sem scripts ou recursos externos. Testar como `img`, não só SVG inline.
- [SMIL](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_animation_with_SMIL):
  animação declarativa possível; CSS facilita `prefers-reduced-motion` neste caso.
- [GIF/WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types):
  adequados a raster, mas piores que vetor para linhas finas escaláveis desta proposta.
- [Camo](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls):
  cache significa que imagens externas não são um canal garantido de tempo real.
- [Actions agendadas](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule):
  podem atrasar ou ser desativadas por inatividade. Não adicionar infraestrutura só para decoração.
- [snk](https://github.com/Platane/snk), [metrics](https://github.com/lowlighter/metrics),
  [typing-svg](https://github.com/DenverCoder1/readme-typing-svg): geração visual possível,
  mas cobra, dashboard e texto digitado foram rejeitados para a identidade Nox.

## Identidade real

Repositórios públicos conferidos: project-nox-manga (Svelte), fonte-extensoes e
anime-fonte-extensoes (Kotlin), project-nox-importer e project-nox-tracker
(JavaScript), repositórios de distribuição e project-nox-requests.
Não exibir stack inferida de uma linguagem principal. Não destacar Scan Staff.
O próprio GitHub já mostra projetos e contribuição; não duplicar esses blocos.

## Propostas locais

A — Relevo: NΩΛ em lâminas grafite/prata, luz lenta.
B — Filamento: fita de linhas dobradas, assimetria e um reflexo violeta.
C — Margem: tipografia editorial, grande NOX e linha pulsante discreta.

Critérios: personalidade, leitura a 320–390 px, repouso visual, primeiro frame
completo, movimento único, nenhuma dependência remota de widget.
As capturas de referências são artefatos locais de pesquisa, não assets do perfil.

## Comparação e síntese

As três propostas foram implementadas e capturadas em 1440 px (README 846 px)
e 390 px. A tem o símbolo mais próprio; B tem bom tratamento de luz, mas sua
fita poderia pertencer a qualquer marca; C tem boa hierarquia, mas pouco caráter
em repouso. A quarta composição usa a geometria de A, a sobriedade editorial
de C e o reflexo isolado de B. Não reutiliza sua fita abstrata.

No refinamento mobile, aumentamos os rótulos para não virarem microtexto.
O movimento percorre o contorno em 24 segundos; a imagem já está completa no
primeiro frame. O teste de screenshots encontrou movimento residual com apenas
a media query dentro do SVG no Chromium. Por isso, `picture` também seleciona
assets explicitamente estáticos para `prefers-reduced-motion`, em desktop/mobile.

Não adicionar estatísticas foi uma decisão visual: a contribuição nativa do
GitHub já registra atividade real logo abaixo. Outro gráfico duplicaria conteúdo
e traria infraestrutura sem melhorar a composição. Todos os assets são locais;
nenhum serviço de stats, fonte remota, GIF pesado ou Action periódica é necessário.

Reproduzir os estudos: `node scripts/art.mjs /tmp/nox-concepts`.
Regerar apenas os assets publicados: `node scripts/art.mjs assets/branding --final`.
