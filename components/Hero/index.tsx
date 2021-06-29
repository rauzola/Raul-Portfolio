/* eslint-disable prettier/prettier */
import Button from '@components/Button';
import { useTheme } from '@contexts/ThemeContext';
import darkModeStyle from '@styles/components/Hero/dark.module.scss';
import defaultStyle from '@styles/components/Hero/default.module.scss';
import lightModeStyle from '@styles/components/Hero/light.module.scss';
import { mergeStyles } from 'merge-style-modules';
import { FC, useEffect, useMemo, useState } from 'react';
import Fade from 'react-reveal/Fade';

const themes = {
  DARK: darkModeStyle,
  LIGHT: lightModeStyle,
};

type Feature = { value: string; className: string };

const Hero: FC = (): JSX.Element => {
  const { theme } = useTheme();
  const [actualFeature, setActualFeature] = useState(0);

  const styles = useMemo(() => {
    const themeStyle = themes[theme];
    return mergeStyles(defaultStyle, themeStyle);
  }, [theme]);

  const features: Feature[] = useMemo(
    () => [
      { value: 'websites', className: 'websites' },
      { value: 'websites', className: 'websites__static' },
      { value: 'sistemas', className: 'systems' },
      { value: 'sistemas', className: 'systems__static' },
      { value: 'designs', className: 'designs' },
      { value: 'designs', className: 'designs__static' },

    ],
    [],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (actualFeature === features.length - 1) {
        return setActualFeature(0);
      }
      return setActualFeature(actualFeature + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, [actualFeature, features.length]);

  const feature: Feature = useMemo(() => features[actualFeature], [
    actualFeature,
    features,
  ]);

  return (
    <div className={styles.container}>
      <Fade left>
        <h1 className={styles.title}>
          <span className={styles.fixed}>Crio</span>
          <div className={`${styles.dynamic} ${styles[feature.className]}`}>
            {feature.value}
          </div>
        </h1>
      </Fade>
      <p className={styles.subtitle}>
        Raul Sigoli, Jovem Programador Web profissional,
        competente para criação e elaboração de projeto estético e
        funcional de website, com uma uma curta experiencia mais muito densa,
        sempre em busca de um novo desafio para estimulação de um
        crescimento profissional
      </p>
      <div className={styles.button}>
        <Button
          onClick={() =>
            typeof window !== 'undefined'
              ? (window.location.href = '/#about')
              : null
          }
        >
          Saiba mais
        </Button>
      </div>
      <img className={styles.draw} alt='draw with a wireframe' />
    </div>
  );
};

export default Hero;
