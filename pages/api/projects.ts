/* eslint-disable prettier/prettier */
import { Categories } from '@contexts/CategoryContext';
import { NextApiRequest, NextApiResponse } from 'next';

export type Project = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  category: Categories;
  link: string;
  behanceLink: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Project[]>): void => {
  const projects: Project[] = [
    {
      id: 1,
      imageUrl: `/projects/GoRestaurant.png`,
      title: 'GoRestaurant',
      description:
        'O GoRestaurant é uma aplicação ficticia em React.js que se trata de um painel de adm para restaurantes controlarem quais refeições estão disponíveis e quais estão indisponíveis.',
      category: Categories.SI,
      link: 'https://github.com/rauzola/GoRestaurant',
      behanceLink: 'https://www.figma.com/file/1lK6AVCPybtWeBLCH8B08N/GoRestaurant',
    },
    {
      id: 2,
      imageUrl: `/projects/Be The Hero.png`,
      title: 'Be The Hero',
      description:
        'Aplicação para conectar ONGs e outras institSIções a pessoas que tem disponibilidade para ajudar',
      category: Categories.SI,
      link: 'https://github.com/rauzola/Be-The-Hero',
      behanceLink: 'https://www.figma.com/file/2C2yvw7jsCOGmaNUDftX9n/Be-The-Hero---OmniStack-11',
    },
    {
      id: 3,
      imageUrl: `/projects/GitHub Explorer.png`,
      title: 'GitHub Explorer',
      description:
        'Aplicação desenvolvida para realizar pesqSIsas de repositórios utilizando a API do Github.',
      category: Categories.SI,
      link: 'https://github.com/rauzola/Ignite/tree/master/Chapter%20I/Fundamentos%20do%20ReactJS/01-github-explorer',
      behanceLink: 'https://www.figma.com/file/HOCmxfrElzLpI75LdzFLia/Github-Explorer',
    },
    {
      id: 4,
      imageUrl: `/projects/dev.finances.png`,
      title: 'Dev.Finances',
      description:
        'O Dev.Finances é um projeto de controle de contas pessoais com controle de recebimentos e pagamentos, assim como calculo dos totais.',
      category: Categories.SI,
      link: 'https://link-to.project',
      behanceLink: 'https://link-to.behance',
    },
    {
      id: 5,
      imageUrl: `/projects/Ig.news.png`,
      title: 'Ig.news',
      description:
        'ig.news é um blog onde você pode ficar por dentro das últimas notícias sobre o mundo React. Aplicação para inscrição de newsletter com pagamento via stripe',
      category: Categories.SI,
      link: 'https://ignews-blue.vercel.app/',
      behanceLink: 'https://www.figma.com/file/gl0fHkQgvaUfXNjuwGtDDs/ig.news',
    },
    {
      id: 6,
      imageUrl: `/projects/GoBarber.png`,
      title: 'GoBarber',
      description:
        'Esse projeto foi desenvolvido durante o Bootcamp da Rocketseat. Trata-se de um projeto fullstack para uma barbearia ficticia, a GoBarber, o projeto consiste na parte frontend(React), mobile(React Native) e backend(NodeJs).',
      category: Categories.SI,
      link: 'https://github.com/rauzola/GoBarber-BootCamp-ReactJs',
      behanceLink: 'https://www.figma.com/file/BXCihtXXh9p37lGsENV614/GoBarber',
    },
   {
  id: 7,
  imageUrl: `/projects/site/marev.png`,
  title: 'Marev',
  description:
    'Site desenvolvido por Raul Sigoli com estrutura pronta para personalizações e uso comercial.',
  category: Categories.WEB,
  link: 'https://www.marev.com.br/',
  behanceLink: '#',
},
{
  id: 8,
  imageUrl: `/projects/site/projetomaisvida.png`,
  title: 'Projeto Mais Vida',
  description:
    'Site criado por Raul Sigoli, com base flexível para adaptações conforme a necessidade do projeto.',
  category: Categories.WEB,
  link: 'https://www.projetomaisvida.com.br/',
  behanceLink: '#',
},
{
  id: 9,
  imageUrl: `/projects/site/habilidades humanas rh.png`,
  title: 'Habilidades Humanas RH',
  description:
    'Site feito por Raul Sigoli, pronto para modificações e ideal para divulgação de serviços profissionais.',
  category: Categories.WEB,
  link: 'https://www.habilidadeshumanasrh.com.br/',
  behanceLink: '#',
},

    // {
    //   id: 10,
    //   imageUrl: `/projects/site/gonex.png`,
    //   title: 'gonex',
    //   description:
    //   'Projetos feito pro min Raul, ponto para modificações e seu uso para seu negocio.',
    //   category: Categories.WEB,
    //   link: 'http://raulsigoli.rastremar.com.br/sites/gonex/',
    //   behanceLink: 'http://raulsigoli.rastremar.com.br/sites/gonex/',
    // },
    // {
    //   id: 11,
    //   imageUrl: `/projects/site/Luxestate.png`,
    //   title: 'Luxestate',
    //   description:
    //   'Projetos feito pro min Raul, ponto para modificações e seu uso para seu negocio.',
    //   category: Categories.WEB,
    //   link: 'http://raulsigoli.rastremar.com.br/sites/Luxestate/',
    //   behanceLink: 'http://raulsigoli.rastremar.com.br/sites/Luxestate/',
    // },
    // {
    //   id: 12,
    //   imageUrl: `/projects/site/molly.png`,
    //   title: 'molly',
    //   description:
    //   'Projetos feito pro min Raul, ponto para modificações e seu uso para seu negocio.',
    //   category: Categories.WEB,
    //   link: 'http://raulsigoli.rastremar.com.br/sites/molly/',
    //   behanceLink: 'http://raulsigoli.rastremar.com.br/sites/molly/',
    // },
    // {
    //   id: 0,
    //   imageUrl: `/projects/site/paradigm.png`,
    //   title: 'paradigm-shift',
    //   description:
    //     'Projetos feito pro min Raul, ponto para modificações e seu uso para seu negocio.',
    //   category: Categories.WEB,
    //   link: 'http://raulsigoli.rastremar.com.br/sites/paradigm-shift/',
    //   behanceLink: 'http://raulsigoli.rastremar.com.br/sites/paradigm-shift/',
    // },
    // {
    //   id: 13,
    //   imageUrl: `/projects/site/site-pessoal.jpg`,
    //   title: 'site-pessoal',
    //   description:
    //     'Modelo HTML5 profissional. Responsivo, totalmente personalizável com fácil editor de Nicepage Arrastar e Soltar. Ajuste cores, fontes, cabeçalho e rodapé, layout e outros elementos de design, bem como conteúdo e imagens.',
    //   category: Categories.WEB,
    //   link: 'https://raulsigoli.rastremar.com.br/sites/site-pessoal/',
    //   behanceLink: 'https://raulsigoli.rastremar.com.br/sites/site-pessoal/',
    // },
  ];
  res
    .status(200)
    .json(
      req.query.category
        ? projects.filter(project => project.category === req.query.category)
        : projects,
    );
};

