import colors from '../../../shared/colorPalette'

const stylesBase = theme => ({
  Card: {
    backgroundColor: colors.blue.main
  },
  boxMarginTop: {
    marginTop: 20
  },
  formControl: {
    width: '100%',
    marginBottom: 12
  },
  swithFormButton: {
    marginTop: 10
  },
  cardContent: {
    width: '90%',
    margin: '0 auto',
    [theme.breakpoints.down(920)]: {
      width: '70%'
    }
  },
  icon: {
    verticalAlign: 'middle',
    fill: '#009688'
  }
});

export default stylesBase;