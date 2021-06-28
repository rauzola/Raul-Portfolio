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
      category: Categories.WEB,
      link: 'https://github.com/rauzola/GoRestaurant',
      behanceLink: 'https://www.figma.com/file/1lK6AVCPybtWeBLCH8B08N/GoRestaurant',
    },
    {
      id: 2,
      imageUrl: `/projects/Be The Hero.png`,
      title: 'Be The Hero',
      description:
        'Aplicação para conectar ONGs e outras instituições a pessoas que tem disponibilidade para ajudar',
      category: Categories.WEB,
      link: 'https://github.com/rauzola/Be-The-Hero',
      behanceLink: 'https://www.figma.com/file/2C2yvw7jsCOGmaNUDftX9n/Be-The-Hero---OmniStack-11',
    },
    {
      id: 3,
      imageUrl: `/projects/GitHub Explorer.png`,
      title: 'GitHub Explorer',
      description:
        'Aplicação desenvolvida para realizar pesquisas de repositórios utilizando a API do Github.',
      category: Categories.WEB,
      link: 'https://github.com/rauzola/Ignite/tree/master/Chapter%20I/Fundamentos%20do%20ReactJS/01-github-explorer',
      behanceLink: 'https://www.figma.com/file/HOCmxfrElzLpI75LdzFLia/Github-Explorer',
    },
    {
      id: 4,
      imageUrl: `/projects/dev.finances.png`,
      title: 'Dev.Finances',
      description:
        'O Dev.Finances é um projeto de controle de contas pessoais com controle de recebimentos e pagamentos, assim como calculo dos totais.',
      category: Categories.WEB,
      link: 'https://link-to.project',
      behanceLink: 'https://link-to.behance',
    },
    {
      id: 5,
      imageUrl: `/projects/Ig.news.png`,
      title: 'Ig.news',
      description:
        'ig.news é um blog onde você pode ficar por dentro das últimas notícias sobre o mundo React. Aplicação para inscrição de newsletter com pagamento via stripe',
      category: Categories.WEB,
      link: 'https://ignews-blue.vercel.app/',
      behanceLink: 'https://www.figma.com/file/gl0fHkQgvaUfXNjuwGtDDs/ig.news',
    },
    {
      id: 6,
      imageUrl: `/projects/GoBarber.png`,
      title: 'GoBarber',
      description:
        'Esse projeto foi desenvolvido durante o Bootcamp da Rocketseat. Trata-se de um projeto fullstack para uma barbearia ficticia, a GoBarber, o projeto consiste na parte frontend(React), mobile(React Native) e backend(NodeJs).',
      category: Categories.WEB,
      link: 'https://github.com/rauzola/GoBarber-BootCamp-ReactJs',
      behanceLink: 'https://www.figma.com/file/BXCihtXXh9p37lGsENV614/GoBarber',
    },
    {
      id: 7,
      imageUrl: `/projects/project-7.jpg`,
      title: 'Titulo do projeto',
      description:
        'dasdasd',
      category: Categories.UI,
      link: 'https://link-to.project',
      behanceLink: 'https://link-to.behance',
    },
    {
      id: 8,
      imageUrl: `/projects/project-8.jpg`,
      title: 'Titulo do projeto',
      description:
        'dasdasd',
      category: Categories.UI,
      link: 'https://link-to.project',
      behanceLink: 'https://link-to.behance',
    },
    {
      id: 9,
      imageUrl: `/projects/project-9.jpg`,
      title: 'Titulo do projeto',
      description:
        'dasdasd',
      category: Categories.UI,
      link: 'https://link-to.project',
      behanceLink: 'https://link-to.behance',
    },
    {
      id: 10,
      imageUrl: `/projects/project-10.jpg`,
      title: 'Titulo do projeto',
      description:
        'dasdasd',
      category: Categories.UI,
      link: 'https://link-to.project',
      behanceLink: 'https://link-to.behance',
    },
    {
      id: 11,
      imageUrl: `/projects/project-11.jpg`,
      title: 'Titulo do projeto',
      description:
        'dasdasd',
      category: Categories.UI,
      link: 'https://link-to.project',
      behanceLink: 'https://link-to.behance',
    },
    {
      id: 12,
      imageUrl: `/projects/project-12.jpg`,
      title: 'Titulo do projeto',
      description:
        'dasdasd',
      category: Categories.UI,
      link: 'https://link-to.project',
      behanceLink: 'https://link-to.behance',
    },
  ];
  res
    .status(200)
    .json(
      req.query.category
        ? projects.filter(project => project.category === req.query.category)
        : projects,
    );
};
