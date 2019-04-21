import lightenDarkenColor from "./lightenDarkenColor"

/**
 * model -> @ Array
 */
const calculateColorPerModel = (model, color='#FFFFFF', multiplicator=20) => {
  return model.map((_, index) => {
      const count = index * multiplicator
      return lightenDarkenColor(
        color,
        count * -1
      )
  });
}

export default calculateColorPerModel
