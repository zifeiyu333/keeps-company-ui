
import * as constants from '@/libs/constants.js'

export function filterCategroyType (value) {
  return constants.categoryType.filter(item => value === item.value)[0].name
}
