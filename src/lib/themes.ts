export interface Theme {
  name: string;
  value: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const themes: Theme[] = [
  {
    name: 'По умолчанию',
    value: 'default',
    colors: {
      primary: '271 91% 65%',
      secondary: '280 60% 50%',
      accent: '24 100% 56%'
    }
  },
  {
    name: 'Лесная',
    value: 'forest',
    colors: {
      primary: '142 76% 36%',
      secondary: '160 84% 39%',
      accent: '84 81% 44%'
    }
  },
  {
    name: 'Закатная',
    value: 'sunset',
    colors: {
      primary: '25 95% 53%',
      secondary: '340 82% 52%',
      accent: '350 89% 60%'
    }
  },
  {
    name: 'Океан',
    value: 'ocean',
    colors: {
      primary: '199 89% 48%',
      secondary: '217 91% 60%',
      accent: '186 94% 50%'
    }
  },
  {
    name: 'Пурпурная',
    value: 'purple',
    colors: {
      primary: '280 100% 70%',
      secondary: '300 76% 72%',
      accent: '330 81% 60%'
    }
  },
  {
    name: 'Огненная',
    value: 'fire',
    colors: {
      primary: '0 84% 60%',
      secondary: '24 100% 50%',
      accent: '45 93% 58%'
    }
  }
];

export function applyTheme(themeValue: string) {
  const theme = themes.find(t => t.value === themeValue);
  if (!theme) return;

  const root = document.documentElement;
  root.style.setProperty('--primary', theme.colors.primary);
  root.style.setProperty('--secondary', theme.colors.secondary);
  root.style.setProperty('--accent', theme.colors.accent);
  
  localStorage.setItem('theme', themeValue);
}

export function getStoredTheme(): string {
  return localStorage.getItem('theme') || 'default';
}
