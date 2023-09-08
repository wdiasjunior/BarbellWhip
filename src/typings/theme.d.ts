interface Themes {
  id: string
  name: string
  theme: Theme
}

interface Theme {
  backgroundPrimary: string;
  backgroundSecondary: string;
  text: string;
  textHighlight: string;
  textFaded: string;
  placeholderText: string;
  active: string;
  activeTransparent: string;
  inactive: string;
  statusBar: string;
}
