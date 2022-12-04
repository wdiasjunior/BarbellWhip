import light from './light';
import dark from './dark';
import nordDark from './nordDark';
// import nordLight from './nordLight';
import chakraUI from './chakraUI';

export const themes = [
  {
    id: 'light',
    name: 'Default Light',
    theme: light
  },
  {
    id: 'dark',
    name: 'Default Dark',
    theme: dark
  },
  {
    id: 'nordDark',
    name: 'Nord Dark',
    theme: nordDark
  },
  // {
  //   id: 'nordLight',
  //   name: 'Nord Light',
  //   theme: nordLight
  // },
  {
    id: 'chakraUI',
    name: 'Chakra UI',
    theme: chakraUI
  },
];
