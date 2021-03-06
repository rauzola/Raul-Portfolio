/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable prettier/prettier */
import Button from '@components/Button';
import NavItem from '@components/NavItem';
import ThemeToggle from '@components/ThemeToggle';
import { useTheme } from '@contexts/ThemeContext';
import darkModeStyle from '@styles/components/Navbar/dark.module.scss';
import defaultStyle from '@styles/components/Navbar/default.module.scss';
import lightModeStyle from '@styles/components/Navbar/light.module.scss';
import { mergeStyles } from 'merge-style-modules';
import { useMemo, useState } from 'react';

const themes = {
  DARK: darkModeStyle,
  LIGHT: lightModeStyle,
};

const Navbar = (): JSX.Element => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const styles = useMemo(() => {
    const themeStyle = themes[theme];
    return mergeStyles(defaultStyle, themeStyle);
  }, [theme]);

  return (
    <div className={styles.container}>
      <div className={`${styles.content} ${open ? styles.open : ''}`}>
        <button
          onClick={() => setOpen(!open)}
          className={`${styles.icon} ${open ? styles.open : ''}`}
        />
        <img
          className={`${styles.logo} ${open ? styles.open : ''}`}
          alt='Logo description'
        />
        <button className={`${styles.iconCTA} ${open ? styles.open : ''}`}>
          <img alt='Icon dollar' />
        </button>

        <div className={`${styles.nav} ${open ? styles.open : ''}`}>
          <NavItem
            render={
              <ThemeToggle
                className={`${styles.buttonTheme} ${open ? styles.open : ''}`}
              />
            }
          />
          <NavItem onClick={() => open && setOpen(!open)} label='Home' to='#' />
          <NavItem
            onClick={() => open && setOpen(!open)}
            label='Sobre mim'
            to='#about'
          />
          <NavItem
            onClick={() => open && setOpen(!open)}
            label='Projetos'
            to='#projects'
          />
          <NavItem
            render={
              <Button
                className={styles.buttonCTA}
                onClick={() => window.location.href = 'http://WA.me/5544991658351' }
                >
                  Or??amento
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
