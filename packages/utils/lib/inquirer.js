import inquirer from 'inquirer'

const make = ({
  choices,
  defaultValue,
  message = 'please choose',
  type = 'list',
  require = true,
  mask = '*',
  validate,
  pageSize,
  loop
}) => {
  const options = {
    name: 'name',
    default: defaultValue,
    message,
    type,
    require,
    mask,
    validate,
    pageSize,
    loop
  }
  if (type === 'list') {
    options.choices = choices
  }
  return inquirer.prompt(options).then((answer) => answer.name)
}

export const makeList = (params) => {
  return make({ ...params })
}

export const makeInput = (params) => {
  return make({
    type: 'input',
    ...params
  })
}
