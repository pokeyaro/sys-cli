class Command {
  // Initialization
  constructor(instance) {
    // Determine whether the incoming instance is empty
    if (!instance) {
      throw new Error('command instance must not be null!')
    }

    // Define the program instance
    this.program = instance

    // Register command
    const cmd = this.program.command(this.command)

    // Register description
    cmd.description(this.description)

    // Register hooks
    cmd.hook('preAction', () => {
      this.preAction()
    })
    cmd.hook('postAction', () => {
      this.postAction()
    })

    // Register options
    if (this.options?.length > 0) {
      this.options.forEach((option) => {
        cmd.option(...option)
      })
    }

    // Register action
    cmd.action((...params) => {
      this.action(params)
    })
  }

  // Create properties
  get command() {
    // This method must be implemented, otherwise an exception will be thrown
    throw new Error('command must be implements')
  }

  get description() {
    // This method must be implemented, otherwise an exception will be thrown
    throw new Error('description must be implements')
  }

  get options() {
    // Non-required method, can be empty
    return []
  }

  get action() {
    // This method must be implemented, otherwise an exception will be thrown
    throw new Error('action must be implements')
  }

  preAction() {
    // Empty by default
  }

  postAction() {
    // Empty by default
  }
}

export default Command
