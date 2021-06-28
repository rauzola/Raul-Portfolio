/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable prettier/prettier */
import Button from '@components/Button';
import ThemeToggle from '@components/ThemeToggle';
import { useTheme } from '@contexts/ThemeContext';
import darkModeStyle from '@styles/components/Footer/dark.module.scss';
import defaultStyle from '@styles/components/Footer/default.module.scss';
import lightModeStyle from '@styles/components/Footer/light.module.scss';
import { mergeStyles } from 'merge-style-modules';
import { FC, useMemo } from 'react';

const themes = {
  DARK: darkModeStyle,
  LIGHT: lightModeStyle,
};

const Footer: FC = (): JSX.Element => {
  const { theme } = useTheme();

  const styles = useMemo(() => {
    const themeStyle = themes[theme];
    return mergeStyles(defaultStyle, themeStyle);
  }, [theme]);

  return (
    <div className={styles.container}>
      <div className={styles.cta}>
        <h3 className={styles.title}>Bora trabalhar em um projeto juntos?</h3>
        <p className={styles.subtitle}>
          Podemos, juntos, criar um projeto com excelência. Está sem dúvidas e
          preparado para começar essa jornada? Então bora começar!
        </p>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.button}
            onClick={() => console.warn('footer button without handler')}
          >
            <a href="http://WA.me/5544991658351" target='_blank' >
              Fazer um orçamento
            </a>
          </Button>
        </div>
      </div>
      <div className={styles.sitemap}>
        <img className={styles.logo} alt='Logo description' />
        <div className={styles.links}>
          <button className={styles.linkButton}>
            <a href='#home' className={styles.linkText}>
              Home
            </a>
          </button>
          <button className={styles.linkButton}>
            <a href='#about' className={styles.linkText}>
              Sobre mim
            </a>
          </button>
          <button className={styles.linkButton}>
            <a href='#projects' className={styles.linkText}>
              Projetos
            </a>
          </button>
          <ThemeToggle />
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
      </div>
    </div>
  );
};

export default Footer;
