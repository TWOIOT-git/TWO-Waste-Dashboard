import colors from '../../../shared/colorPalette'
import lightenDarkenColor from '../../../shared/lightenDarkenColor';

const stylesBase = theme => ({
  Card: {
    backgroundColor: colors.blue.main,
    height: '80vh'
  },
  TWOIOT: {
    margin: '1rem 0 0 0',
    fontWeight: '100',
    lineHeight: 0
  },
  WASTE: {
    fontSize: '2.2rem',
    fontWeight: '600',
    margin: 0
  },
  boxMarginTop: {
    marginTop: 20
  },
  formControl: {
    width: '100%',
    marginBottom: 12
  },
  Description: {
    fontWeight: '200'
  },
  cardContent: {
    width: '90%',
    margin: '0 auto',
    [theme.breakpoints.down(920)]: {
      width: '70%'
    }
  },
  Button: {
    fontSize: '1.5rem',
    fontWeight: '600',
    border: 'none',
    padding: 0,
    color: colors.orange.main,
    transition: 'color .5s ease',
    cursor: 'pointer',
    ['&:disabled']: {
      cursor: 'none',
      transition: 'color .5s ease',
      color: lightenDarkenColor(colors.orange.dark, 90),
    }
  }
});

export default stylesBase;