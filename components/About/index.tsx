/* eslint-disable prettier/prettier */
import SectionTitle from '@components/SectionTitle';
import { useTheme } from '@contexts/ThemeContext';
import darkModeStyle from '@styles/components/About/dark.module.scss';
import defaultStyle from '@styles/components/About/default.module.scss';
import lightModeStyle from '@styles/components/About/light.module.scss';
import { mergeStyles } from 'merge-style-modules';
import { FC, useMemo } from 'react';

const themes = {
  DARK: darkModeStyle,
  LIGHT: lightModeStyle,
};

const About: FC = (): JSX.Element => {
  const { theme } = useTheme();

  const styles = useMemo(() => {
    const themeStyle = themes[theme];
    return mergeStyles(defaultStyle, themeStyle);
  }, [theme]);

  return (
    <div id='about' className={styles.container}>
      <SectionTitle label='Sobre mim' className={styles.title} />
      <div className={styles.description}>
        <p>
        Moro em Maringá uma Cidade No interior do Paraná, Mais Também conhecida como a cidade dos universitário, por se uma cidade com um grande numero de estudante na área e tecnologia, sempre busco me aprimorar e me atualizar para ser e oferecer o melhor do meu lado profissional, minhas melhores especialidades são projetar Aplicativo Website e sistemas de médio e pequeno porte, com experiencias em diversos projetos, seguimentos e cliente, de pequenas startups a grandes corporações, Busco fazer meu nome nesse gigantesco mercado de Tecnologia, posso te afirmar você contratando o meu serviço terá o melhor de um profissional nessa área
        </p>
      </div>
      <div className={styles.social}>
        <a
          href='https://instagram.com/raul_sigoli'
          className={styles.icon}
          target='_blank'
          rel='noreferrer'
        >
          <img className={styles.instagram} alt='Instagram icon' />
        </a>
        
        <a
          href='https://www.linkedin.com/in/raul-sigoli-137bb4173/'
          className={styles.icon}
          target='_blank'
          rel='noreferrer'
        >
          <img className={styles.linkedin} alt='Linkedin icon' />
        </a>
      
      </div>
      <div className={styles.wrapper}>
        <img
          className={styles.image}
          src='/images/about-picture.png'
          alt='Its me'
        />
      </div>
    </div>
  );
};

export default About;
